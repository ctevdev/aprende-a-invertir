/* RutaETF · Academia de inversión — lógica de la aplicación
   Sin dependencias. Los datos del contenido viven en /data y se cargan antes que este archivo. */

/* ─────────────── Utilidades ─────────────── */
const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const pct = (v, d = 2) => `${v.toFixed(d).replace('.', ',')}%`;
const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];
const {
  buildProgression,
  calculateRebalance,
  compound,
  isBackupCandidate,
  normalizeState,
  realRate
} = window.RutaETFCore;

function escapeHtml(value) {
  const node = document.createElement('div');
  node.textContent = value == null ? '' : String(value);
  return node.innerHTML;
}

const STATE_KEY = 'ruta-etf-v2';
const LEGACY_KEY = 'ruta-etf-v1';

const STATE_CONFIG = {
  levelIds: window.CURRICULUM.map(level => level.id),
  lessonIds: window.CURRICULUM.flatMap(level => level.lessons.map(lesson => lesson.id)),
  checkIds: window.CURRICULUM.flatMap(level => level.lessons.flatMap(lesson => lesson.blocks.flatMap((block, index) =>
    block.t === 'check' ? block.items.map((_, itemIndex) => `${lesson.id}:${index}:${itemIndex}`) : []))),
  readinessCount: $$('[data-ready]').length,
  stepIds: $$('[data-step]').map(box => box.dataset.step),
  examDefinitions: {
    ...Object.fromEntries(Object.entries(window.EXAMENES).map(([id, exam]) => [id, { total: exam.questions.length, pass: exam.pass }])),
    cert: { total: window.CERTIFICACION.draw, pass: window.CERTIFICACION.pass }
  },
  profiles: $$('#profile option').map(option => option.value),
  goals: $$('#goal option').map(option => option.value),
  horizons: $$('#horizon option').map(option => Number(option.value)),
  decisions: $$('#decision option').map(option => option.value)
};

function loadState() {
  try { return normalizeState(JSON.parse(localStorage.getItem(STATE_KEY)) || {}, STATE_CONFIG); }
  catch { return normalizeState({}, STATE_CONFIG); }
}
function saveState(patch) {
  const next = normalizeState({ ...loadState(), ...patch }, STATE_CONFIG);
  try { localStorage.setItem(STATE_KEY, JSON.stringify(next)); } catch { /* almacenamiento lleno o bloqueado */ }
  return next;
}
function migrateLegacy() {
  const current = loadState();
  if (current.migrated) return;
  try {
    const old = JSON.parse(localStorage.getItem(LEGACY_KEY));
    if (old) saveState({ plan: old.plan, journal: old.journal, steps: old.steps, migrated: true });
    else saveState({ migrated: true });
  } catch { saveState({ migrated: true }); }
}
migrateLegacy();

const ALL_LESSONS = () => window.CURRICULUM.flatMap(l => l.lessons);

/* ─────────────── Renderizador de bloques de lección ─────────────── */
function renderBlock(block, lessonId, index) {
  switch (block.t) {
    case 'p':
      return `<p>${block.html}</p>`;

    case 'concepts':
      return `<div class="concept-grid cols-${block.cols || 2}">${block.items
        .map(i => `<div><strong>${i.h}</strong><p>${i.p}</p></div>`).join('')}</div>`;

    case 'table':
      return `<div class="table-scroll"><table class="data-table"><thead><tr>${block.head
        .map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${block.rows
        .map(r => `<tr>${r.map((c, k) => `<td data-label="${block.head[k] || ''}">${c}</td>`).join('')}</tr>`)
        .join('')}</tbody></table></div>`;

    case 'kv':
      return `<dl class="definition-list">${block.items
        .map(i => `<div><dt>${i.k}</dt><dd>${i.v}</dd></div>`).join('')}</dl>`;

    case 'tip':
      return `<div class="tip-box"><span class="box-tag">Píldora</span><strong>${block.h || 'Tip'}</strong><p>${block.html}</p></div>`;

    case 'warn':
      return `<div class="warning-box"><span class="box-tag warn">Atención</span><strong>${block.h || 'Advertencia'}</strong><p>${block.html}</p></div>`;

    case 'example':
      return `<div class="example"><strong>Ejemplo:</strong> ${block.html}</div>`;

    case 'task':
      return `<div class="task"><strong>Tarea:</strong> ${block.html}</div>`;

    case 'steps': {
      const cls = block.numbered ? 'guided-steps numbered' : 'guided-steps';
      return `<ol class="${cls}">${block.items
        .map((i, k) => `<li><span>${block.numbered ? k + 1 : '·'}</span><div><strong>${i.h}</strong><p>${i.p}</p></div></li>`)
        .join('')}</ol>`;
    }

    case 'check':
      return `<div class="check-block">${block.title ? `<strong>${block.title}</strong>` : ''}
        <div class="etf-checklist">${block.items
          .map((i, k) => `<label><input type="checkbox" data-check="${lessonId}:${index}:${k}"> ${i}</label>`)
          .join('')}</div></div>`;

    case 'formula':
      return `<div class="formula-box"><span class="box-tag">${block.label || 'Fórmula'}</span>
        <code>${block.tex}</code>${block.html ? `<p>${block.html}</p>` : ''}</div>`;

    case 'mistakes':
      return `<div class="mistake-list"><strong>Errores frecuentes</strong>${block.items
        .map(i => `<div><span>✕</span><div><strong>${i.h}</strong><p>${i.p}</p></div></div>`).join('')}</div>`;

    case 'flow':
      return `<div class="cost-chain">${block.items
        .map((i, k) => `${k ? '<b>→</b>' : ''}<span>${i}</span>`).join('')}</div>`;

    case 'scale':
      return `<div class="scale-box">${block.title ? `<strong>${block.title}</strong>` : ''}
        <div class="scale-rows">${block.rows
          .map(r => `<div><span class="down">${r[0]}</span><i>necesita</i><span class="up">${r[1]}</span></div>`).join('')}</div>
        ${block.note ? `<p class="microcopy">${block.note}</p>` : ''}</div>`;

    default:
      return '';
  }
}

function renderLesson(lesson) {
  const blocks = lesson.blocks.map((b, i) => renderBlock(b, lesson.id, i)).join('');
  return `<article id="${lesson.id}" class="lesson-card" role="tabpanel" aria-labelledby="lesson-tab-${lesson.id}">
    <div class="lesson-top">
      <div>
        <p class="week">Lección ${lesson.num} · ${lesson.tag} · ${lesson.min} min</p>
        <h3>${lesson.title}</h3>
        <p class="lesson-goal">${lesson.goal}</p>
      </div>
      <label class="lesson-check"><input type="checkbox" data-lesson="${lesson.id}"> Estudiada</label>
    </div>
    <div class="objectives"><strong>Al terminar sabrás</strong><ul>${lesson.objectives
      .map(o => `<li>${o}</li>`).join('')}</ul></div>
    ${blocks}
    <div class="key-idea"><span>Idea clave</span><p>${lesson.keyIdea}</p></div>
    ${lesson.pills && lesson.pills.length
      ? `<div class="lesson-pills"><strong>Píldoras de esta lección</strong>${lesson.pills
          .map(p => `<div>${p}</div>`).join('')}</div>`
      : ''}
  </article>`;
}

/* ─────────────── Niveles y academia ─────────────── */
let activeLevel = loadState().activeLevel || 'n1';
const activeLessonByLevel = {};

function progressionState() {
  return buildProgression(window.CURRICULUM, loadState());
}

function levelAccess(levelId) {
  return progressionState().levels.find(level => level.id === levelId);
}

function ensureAccessibleActiveLevel(persist = false) {
  const progression = progressionState();
  if (progression.levels.find(level => level.id === activeLevel)?.unlocked) return;
  activeLevel = [...progression.levels].reverse().find(level => level.unlocked)?.id || window.CURRICULUM[0].id;
  if (persist) saveState({ activeLevel });
}

ensureAccessibleActiveLevel();

function levelStats(mod) {
  const done = loadState().lessons || {};
  const total = mod.lessons.length;
  const studied = mod.lessons.filter(l => done[l.id]).length;
  return { total, studied, percent: total ? Math.round(studied / total * 100) : 0 };
}

function selectedLessonForLevel(mod) {
  const remembered = activeLessonByLevel[mod.id];
  if (mod.lessons.some(lesson => lesson.id === remembered)) return remembered;
  const done = loadState().lessons || {};
  return (mod.lessons.find(lesson => !done[lesson.id]) || mod.lessons[0]).id;
}

function selectLesson(lessonId, scroll = true) {
  const mod = window.CURRICULUM.find(level => level.id === activeLevel);
  if (!mod?.lessons.some(lesson => lesson.id === lessonId)) return;
  activeLessonByLevel[mod.id] = lessonId;
  renderAcademy();
  if (scroll) $('#levelContent').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderLevelGrid() {
  const progression = progressionState();
  $('#levelGrid').innerHTML = window.CURRICULUM.map((mod, index) => {
    const s = levelStats(mod);
    const access = progression.levels[index];
    const previous = window.CURRICULUM[index - 1];
    const status = access.complete ? 'Completado' : access.unlocked ? 'Disponible' : 'Bloqueado';
    const requirement = access.unlocked ? '' : `<div class="level-lock-note"><strong>🔒 Requisito</strong> Completa todas las lecciones y aprueba el examen del Nivel ${previous.level}: ${previous.name}.</div>`;
    return `<article class="level-card${access.complete ? ' complete' : ''}${access.unlocked ? '' : ' locked'}">
      <div class="level-head"><span class="level-num">Nivel ${mod.level}</span><span class="level-sub">${mod.subtitle}</span></div>
      <h3>${mod.name}</h3>
      <p>${mod.claim}</p>
      <div class="level-outcome">${mod.outcome}</div>
      ${requirement}
      <div class="level-meta"><span>${mod.lessons.length} lecciones</span><span>${mod.hours}</span></div>
      <div class="progress-track"><span style="width:${s.percent}%"></span></div>
      <div class="level-foot"><strong>${status} · ${s.studied}/${s.total}</strong><button class="button ghost small" data-goto="${mod.id}" ${access.unlocked ? '' : 'disabled'}>${access.unlocked ? 'Ir al nivel' : 'Bloqueado'}</button></div>
    </article>`;
  }).join('');
}

function renderLevelTabs() {
  const progression = progressionState();
  $('#levelTabs').innerHTML = window.CURRICULUM.map((mod, index) => {
    const s = levelStats(mod);
    const access = progression.levels[index];
    const selected = mod.id === activeLevel;
    return `<button type="button" role="tab" id="level-tab-${mod.id}" class="level-tab${selected ? ' active' : ''}${access.unlocked ? '' : ' locked'}" data-level="${mod.id}"
      aria-controls="levelContent" aria-selected="${selected}" tabindex="${selected ? 0 : -1}" ${access.unlocked ? '' : `disabled title="Completa y aprueba el Nivel ${mod.level - 1}"`}><span>Nivel ${mod.level}</span><strong>${mod.name}</strong><i>${access.unlocked ? `${s.studied}/${s.total}` : '🔒 Prerrequisito pendiente'}</i></button>`;
  }).join('');
}

function renderAcademy() {
  const mod = window.CURRICULUM.find(m => m.id === activeLevel) || window.CURRICULUM[0];
  const s = levelStats(mod);
  const access = levelAccess(mod.id);
  const selectedLessonId = selectedLessonForLevel(mod);
  const selectedIndex = mod.lessons.findIndex(lesson => lesson.id === selectedLessonId);
  const selectedLesson = mod.lessons[selectedIndex];
  activeLessonByLevel[mod.id] = selectedLessonId;
  $('#levelContent').setAttribute('aria-labelledby', `level-tab-${mod.id}`);

  $('#levelBanner').innerHTML = `<div>
      <p class="card-kicker">Nivel ${mod.level} · ${mod.subtitle}</p>
      <h3>${mod.name}</h3><p>${mod.outcome}</p>
    </div>
    <div class="banner-progress"><strong>${s.studied} de ${s.total} lecciones</strong>
      <div class="lesson-progress"><span style="width:${s.percent}%"></span></div>
      <small>${mod.hours} de estudio estimadas</small></div>`;

  $('#lessonIndex').innerHTML = mod.lessons.map(l => {
    const done = (loadState().lessons || {})[l.id];
    const selected = l.id === selectedLessonId;
    return `<button type="button" role="tab" id="lesson-tab-${l.id}" data-lesson-tab="${l.id}" class="${done ? 'done' : ''}${selected ? ' active' : ''}" aria-controls="${l.id}" aria-selected="${selected}" tabindex="${selected ? 0 : -1}"><span>${String(l.num).padStart(2, '0')}</span><strong>${l.title}</strong>${done ? '<i>✓</i>' : ''}</button>`;
  }).join('') + `<a href="#evaluacion" class="index-exam${access.examUnlocked ? '' : ' locked'}" aria-disabled="${!access.examUnlocked}"><span>${access.examUnlocked ? '✓' : '🔒'}</span> ${access.examUnlocked ? 'Presentar examen del nivel' : `Examen bloqueado · estudia ${access.total - access.studied} ${access.total - access.studied === 1 ? 'lección' : 'lecciones'} más`}</a>`;

  const previous = mod.lessons[selectedIndex - 1];
  const next = mod.lessons[selectedIndex + 1];
  $('#lessons').innerHTML = `${renderLesson(selectedLesson)}
    <nav class="lesson-navigation" aria-label="Navegación entre lecciones">
      <button type="button" class="button ghost dark" data-lesson-move="${previous?.id || ''}" ${previous ? '' : 'disabled'}>← ${previous ? 'Anterior' : 'Primera lección'}</button>
      <span><strong>Lección ${selectedIndex + 1} de ${mod.lessons.length}</strong><small>${s.studied} estudiadas</small></span>
      <button type="button" class="button primary" data-lesson-move="${next?.id || ''}" ${next ? '' : 'disabled'}>${next ? 'Siguiente' : 'Nivel terminado'} →</button>
    </nav>`;
  restoreLessonBoxes();
  updateGlobalProgress();
}

function restoreLessonBoxes() {
  const state = loadState();
  $$('[data-lesson]').forEach(box => {
    box.checked = Boolean((state.lessons || {})[box.dataset.lesson]);
    box.closest('.lesson-card').classList.toggle('studied', box.checked);
    box.addEventListener('change', () => {
      const lessons = { ...(loadState().lessons || {}) };
      lessons[box.dataset.lesson] = box.checked;
      saveState({ lessons });
      box.closest('.lesson-card').classList.toggle('studied', box.checked);
      renderLevelGrid(); renderLevelTabs(); updateGlobalProgress();
      const mod = window.CURRICULUM.find(m => m.id === activeLevel);
      $('#lessonIndex').querySelectorAll('[data-lesson-tab]').forEach((tab, i) => {
        if (mod.lessons[i]) {
          const done = Boolean((loadState().lessons || {})[mod.lessons[i].id]);
          tab.classList.toggle('done', done);
          tab.querySelector('i')?.remove();
          if (done) tab.insertAdjacentHTML('beforeend', '<i>✓</i>');
        }
      });
      $('.lesson-navigation span small').textContent = `${levelStats(mod).studied} estudiadas`;
      renderBanner();
      renderExamTabs(); renderExam(); renderExamScores();
    });
  });

  $$('[data-check]').forEach(box => {
    box.checked = Boolean((state.checks || {})[box.dataset.check]);
    box.addEventListener('change', () => {
      const checks = { ...(loadState().checks || {}) };
      checks[box.dataset.check] = box.checked;
      saveState({ checks });
    });
  });
}

$('#lessonIndex').addEventListener('click', event => {
  const tab = event.target.closest('[data-lesson-tab]');
  if (tab) selectLesson(tab.dataset.lessonTab);
});

$('#lessons').addEventListener('click', event => {
  const button = event.target.closest('[data-lesson-move]');
  if (button?.dataset.lessonMove) selectLesson(button.dataset.lessonMove);
});

function renderBanner() {
  const mod = window.CURRICULUM.find(m => m.id === activeLevel);
  const s = levelStats(mod);
  const bp = $('#levelBanner').querySelector('.banner-progress');
  if (bp) {
    bp.querySelector('strong').textContent = `${s.studied} de ${s.total} lecciones`;
    bp.querySelector('.lesson-progress span').style.width = `${s.percent}%`;
  }
}

function updateGlobalProgress() {
  const all = ALL_LESSONS();
  const done = loadState().lessons || {};
  const studied = all.filter(l => done[l.id]).length;
  const percent = Math.round(studied / all.length * 100);
  $('#globalProgressText').textContent = `${studied} de ${all.length} lecciones estudiadas`;
  $('#globalProgressBar').style.width = `${percent}%`;
  renderDataSummary();
}

$('#levelTabs').addEventListener('click', e => {
  const btn = e.target.closest('[data-level]');
  if (!btn || !levelAccess(btn.dataset.level)?.unlocked) return;
  activeLevel = btn.dataset.level;
  saveState({ activeLevel });
  renderLevelTabs(); renderAcademy();
});

$('#levelGrid').addEventListener('click', e => {
  const btn = e.target.closest('[data-goto]');
  if (!btn || !levelAccess(btn.dataset.goto)?.unlocked) return;
  activeLevel = btn.dataset.goto;
  saveState({ activeLevel });
  renderLevelTabs(); renderAcademy();
  $('#tutorial').scrollIntoView({ behavior: 'smooth' });
});

/* ─────────────── Diagnóstico ─────────────── */
const readyBoxes = $$('[data-ready]');
const READINESS_ADVICE = [
  {
    title: 'Construye primero tu fondo de emergencia',
    text: 'Suma vivienda, alimentación, servicios, transporte, salud y pagos mínimos. Guarda entre 3 y 6 meses de esos gastos —o más si tu ingreso es variable— en una cuenta líquida y separada de la inversión.'
  },
  {
    title: 'Elimina la deuda de consumo cara',
    text: 'Anota saldo, cuota y tasa efectiva anual de cada deuda. Mantén los pagos mínimos y dirige todo excedente a la tasa más alta. Una tarjeta al 30% E.A. cuesta mucho más de lo que una cartera diversificada puede prometer.'
  },
  {
    title: 'Invierte únicamente capital propio',
    text: 'No uses avances, libre inversión, margen ni dinero de familiares. La deuda tiene fecha y cuota; el mercado no tiene fecha para recuperarse. Separa el aporte de inversión dentro de tu presupuesto mensual.'
  },
  {
    title: 'Traduce una caída a pesos',
    text: 'Multiplica el monto que planeas invertir por 30%. Si ver esa pérdida temporal te haría vender o perder el sueño, reduce la porción de acciones y practica primero en una cuenta demo.'
  },
  {
    title: 'Protege las metas de los próximos cinco años',
    text: 'El dinero para matrícula, vivienda, emergencias o cualquier fecha rígida no debería depender de la bolsa. Llévalo a ahorro o renta fija acorde con el plazo y reserva para invertir solo las metas aplazables.'
  },
  {
    title: 'Acepta la incertidumbre antes de continuar',
    text: 'Ningún ETF, acción, asesor o algoritmo garantiza ganancias. Desconfía de rentabilidad fija alta, presión para decidir hoy y pagos por referidos. Puedes perder capital incluso haciendo todo con disciplina.'
  }
];
let gateDismissed = false;

function setCourseLocked(locked) {
  document.body.classList.toggle('prerequisite-pending', locked);
  $('#prerequisito').hidden = !locked;
}

function updateReadiness() {
  const total = readyBoxes.filter(b => b.checked).length;
  const missing = readyBoxes.map((box, index) => ({ box, advice: READINESS_ADVICE[index] }))
    .filter(item => !item.box.checked);
  const complete = total === readyBoxes.length;
  const el = $('#readinessResult');
  el.textContent = complete
    ? 'Base lista. Ya puedes comenzar la ruta educativa.'
    : `${total} de ${readyBoxes.length} condiciones listas — completa las ${missing.length} pendientes para desbloquear la academia.`;
  el.classList.toggle('ok', complete);
  $('#readinessProgressBar').style.width = `${Math.round(total / readyBoxes.length * 100)}%`;
  $('#readinessAdvice').innerHTML = complete
    ? '<div class="readiness-success"><strong>✓ Prerrequisito completado</strong><p>La base está protegida. Empieza por Fundamentos y practica en demo antes de usar dinero real.</p></div>'
    : `<div class="readiness-advice-heading"><strong>Qué debes resolver ahora</strong><span>${missing.length} ${missing.length === 1 ? 'punto pendiente' : 'puntos pendientes'}</span></div>
      <div class="readiness-advice-list">${missing.map((item, index) => `<article>
        <span>${index + 1}</span><div><strong>${item.advice.title}</strong><p>${item.advice.text}</p></div>
      </article>`).join('')}</div>`;
  $('#startCourseBtn').hidden = !complete;
  setCourseLocked(!(complete && gateDismissed));
  saveState({ readiness: readyBoxes.map(b => b.checked) });
}
readyBoxes.forEach(b => b.addEventListener('change', updateReadiness));
$('#startCourseBtn').addEventListener('click', () => {
  if (!readyBoxes.every(box => box.checked)) return;
  gateDismissed = true;
  setCourseLocked(false);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  $('.hero h1').focus?.();
});

/* ─────────────── Ruta de 12 semanas ─────────────── */
const stepBoxes = $$('[data-step]');
function updateProgress() {
  const done = stepBoxes.filter(b => b.checked).length;
  const percent = Math.round(done / stepBoxes.length * 100);
  $('#progressBar').style.width = `${percent}%`;
  $('#progressText').textContent = `${percent}% completado`;
  stepBoxes.forEach(b => b.closest('.step').classList.toggle('done', b.checked));
  saveState({ steps: Object.fromEntries(stepBoxes.map(b => [b.dataset.step, b.checked])) });
  renderDataSummary();
}
stepBoxes.forEach(b => b.addEventListener('change', updateProgress));

/* ─────────────── Píldoras ─────────────── */
let pillFilter = 'todas';
function pillCategories() {
  return ['todas', ...new Set(window.PILDORAS.map(p => p.c))];
}
function renderPillChips() {
  $('#pillChips').innerHTML = pillCategories()
    .map(c => `<button class="chip${c === pillFilter ? ' active' : ''}" data-pill-cat="${c}">${c === 'todas' ? 'Todas' : c}</button>`)
    .join('');
}
function renderPillGrid() {
  const list = pillFilter === 'todas' ? window.PILDORAS : window.PILDORAS.filter(p => p.c === pillFilter);
  $('#pillGrid').innerHTML = list
    .map(p => `<article class="pill-card"><span class="chip static">${p.c}</span><strong>${p.t}</strong><p>${p.d}</p></article>`)
    .join('');
}
function renderFeaturedPill(index) {
  const i = typeof index === 'number' ? index : Math.floor(Math.random() * window.PILDORAS.length);
  const p = window.PILDORAS[i];
  $('#pillFeatured').innerHTML = `<div>
      <p class="card-kicker">Píldora del día · ${p.c}</p>
      <h3>${p.t}</h3><p>${p.d}</p>
    </div>
    <button class="button ghost solid" id="nextPill" type="button">Otra píldora</button>`;
  $('#nextPill').addEventListener('click', () => renderFeaturedPill());
}
$('#pillChips').addEventListener('click', e => {
  const btn = e.target.closest('[data-pill-cat]');
  if (!btn) return;
  pillFilter = btn.dataset.pillCat;
  renderPillChips(); renderPillGrid();
});

/* ─────────────── Errores comunes ─────────────── */
function renderErrors() {
  $('#errorGrid').innerHTML = window.ERRORES.map((e, i) => `<article class="error-card">
    <span class="error-num">${String(i + 1).padStart(2, '0')}</span>
    <h3>${e.t}</h3><p>${e.d}</p>
    <div class="error-fix"><strong>Corrección:</strong> ${e.f}</div>
  </article>`).join('');
}

/* ─────────────── Glosario ─────────────── */
const CAT_NAMES = {
  todas: 'Todas', basico: 'Básico', producto: 'Productos', riesgo: 'Riesgo',
  costo: 'Costos', analisis: 'Análisis', fiscal: 'Fiscal', operativa: 'Operativa'
};
let glossaryCat = 'todas';

function normalizeSearch(value) {
  return value.toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/g, '');
}
function renderGlossaryChips() {
  const cats = ['todas', ...new Set(window.GLOSARIO.map(g => g.c))];
  $('#glossaryChips').innerHTML = cats
    .map(c => `<button class="chip${c === glossaryCat ? ' active' : ''}" data-glo-cat="${c}">${CAT_NAMES[c] || c}</button>`)
    .join('');
}
function renderGlossary() {
  const query = normalizeSearch($('#glossarySearch').value.trim());
  const list = window.GLOSARIO
    .filter(g => glossaryCat === 'todas' || g.c === glossaryCat)
    .filter(g => !query || normalizeSearch(`${g.t} ${g.d} ${g.n || ''}`).includes(query))
    .sort((a, b) => a.t.localeCompare(b.t, 'es'));
  $('#glossaryGrid').innerHTML = list.map(g => `<article>
    <span class="chip static">${CAT_NAMES[g.c] || g.c}</span>
    <h3>${g.t}</h3><p>${g.d}</p>${g.n ? `<p class="glo-note">${g.n}</p>` : ''}
  </article>`).join('');
  $('#glossaryEmpty').hidden = list.length !== 0;
}
$('#glossarySearch').addEventListener('input', renderGlossary);
$('#glossaryChips').addEventListener('click', e => {
  const btn = e.target.closest('[data-glo-cat]');
  if (!btn) return;
  glossaryCat = btn.dataset.gloCat;
  renderGlossaryChips(); renderGlossary();
});

/* ─────────────── Exámenes ─────────────── */
let activeExam = 'n1';
let currentQuestions = [];

function buildCertification() {
  const perLevel = Math.ceil(window.CERTIFICACION.draw / 4);
  const picked = [];
  Object.keys(window.EXAMENES).forEach(k => {
    const pool = [...window.EXAMENES[k].questions].sort(() => Math.random() - 0.5);
    picked.push(...pool.slice(0, perLevel));
  });
  return picked.sort(() => Math.random() - 0.5).slice(0, window.CERTIFICACION.draw);
}

function examAccess(examId) {
  const progression = progressionState();
  if (examId === 'cert') {
    return {
      unlocked: progression.certificationUnlocked,
      reason: 'Completa las lecciones y aprueba los exámenes de los cuatro niveles.'
    };
  }
  const index = window.CURRICULUM.findIndex(level => level.id === examId);
  const level = progression.levels[index];
  if (!level?.unlocked) {
    return { unlocked: false, reason: `Primero completa y aprueba el Nivel ${index}.` };
  }
  return {
    unlocked: level.examUnlocked,
    reason: `Estudia las ${level.total} lecciones del Nivel ${index + 1} antes de presentar su examen.`
  };
}

function renderExamTabs() {
  const tabs = window.CURRICULUM.map(m => ({ id: m.id, label: `Nivel ${m.level}`, sub: m.name }));
  tabs.push({ id: 'cert', label: 'Final', sub: 'Certificación' });
  $('#examTabs').innerHTML = tabs.map(t => {
    const selected = t.id === activeExam;
    const access = examAccess(t.id);
    return `<button type="button" role="tab" id="exam-tab-${t.id}" class="exam-tab${selected ? ' active' : ''}${access.unlocked ? '' : ' locked'}"
      data-exam="${t.id}" aria-controls="examPanel" aria-selected="${selected}" tabindex="${selected ? 0 : -1}" ${access.unlocked ? '' : `disabled title="${access.reason}"`}><span>${t.label}</span><strong>${t.sub}</strong>${access.unlocked ? '' : '<i>🔒 Bloqueado</i>'}</button>`;
  }).join('');
}

function renderExam() {
  const isCert = activeExam === 'cert';
  const access = examAccess(activeExam);
  $('#examPanel').setAttribute('aria-labelledby', `exam-tab-${activeExam}`);
  if (!access.unlocked) {
    currentQuestions = [];
    $('#quizForm').innerHTML = `<div class="exam-lock-panel"><span>🔒</span><div><strong>Evaluación bloqueada</strong><p>${access.reason}</p></div></div>`;
    $('.quiz-actions').hidden = true;
    $('#quizResult').className = 'quiz-result';
    $('#quizResult').textContent = '';
    $('#quizBadge').textContent = 'Bloqueado';
    $('#quizBadge').classList.remove('passed');
    return;
  }
  $('.quiz-actions').hidden = false;
  currentQuestions = isCert ? buildCertification() : window.EXAMENES[activeExam].questions;
  const title = isCert ? window.CERTIFICACION.title : window.EXAMENES[activeExam].title;
  const pass = isCert ? window.CERTIFICACION.pass : window.EXAMENES[activeExam].pass;
  $('#quizForm').innerHTML = `<p class="exam-title">${title} · se aprueba con ${pass} de ${currentQuestions.length}</p>` +
    currentQuestions.map((q, i) => `<fieldset>
      <legend>${i + 1}. ${q.q}</legend>
      ${q.o.map((opt, k) => `<label><input type="radio" name="q${i}" value="${k}"> ${opt}</label>`).join('')}
      <div class="answer-note" hidden></div>
    </fieldset>`).join('');
  $('#quizResult').className = 'quiz-result';
  $('#quizResult').textContent = '';
  updateQuizBadge();
}

function updateQuizBadge() {
  const scores = loadState().exams || {};
  const key = activeExam;
  const badge = $('#quizBadge');
  if (scores[key]) {
    badge.textContent = `${scores[key].score}/${scores[key].total}`;
    badge.classList.toggle('passed', scores[key].passed);
  } else {
    badge.textContent = 'Pendiente';
    badge.classList.remove('passed');
  }
}

function renderExamScores() {
  const scores = loadState().exams || {};
  const rows = [...window.CURRICULUM.map(m => ({ id: m.id, name: `Nivel ${m.level} · ${m.name}` })),
    { id: 'cert', name: 'Certificación final' }];
  $('#examScores').innerHTML = rows.map(r => {
    const s = scores[r.id];
    const access = examAccess(r.id);
    const cls = s ? (s.passed ? 'ok' : 'retry') : access.unlocked ? 'idle' : 'locked';
    const txt = s ? `${s.score}/${s.total} · ${s.passed ? 'aprobado' : 'reintentar'}` : access.unlocked ? 'disponible' : 'bloqueado';
    return `<div class="score-row ${cls}"><span>${r.name}</span><b>${txt}</b></div>`;
  }).join('');
}

$('#examTabs').addEventListener('click', e => {
  const btn = e.target.closest('[data-exam]');
  if (!btn || !examAccess(btn.dataset.exam).unlocked) return;
  activeExam = btn.dataset.exam;
  renderExamTabs(); renderExam();
});

$('#quizSubmit').addEventListener('click', () => {
  if (!examAccess(activeExam).unlocked || !currentQuestions.length) return;
  const form = $('#quizForm');
  const data = new FormData(form);
  const isCert = activeExam === 'cert';
  const pass = isCert ? window.CERTIFICACION.pass : window.EXAMENES[activeExam].pass;
  let score = 0;
  let unanswered = 0;

  currentQuestions.forEach((q, i) => {
    const given = data.get(`q${i}`);
    if (given === null) unanswered++;
    const correct = Number(given) === q.a;
    if (correct) score++;
    const fs = form.querySelectorAll('fieldset')[i];
    const note = fs.querySelector('.answer-note');
    fs.classList.remove('right', 'wrong');
    fs.classList.add(correct ? 'right' : 'wrong');
    note.hidden = false;
    note.innerHTML = `<strong>${correct ? 'Correcto.' : `Respuesta correcta: ${q.o[q.a]}.`}</strong> ${q.e}`;
  });

  const passed = score >= pass;
  const result = $('#quizResult');
  result.className = `quiz-result ${passed ? 'success' : 'retry'}`;
  const currentIndex = window.CURRICULUM.findIndex(level => level.id === activeExam);
  const nextLevel = window.CURRICULUM[currentIndex + 1];
  result.textContent = passed
    ? `${score}/${currentQuestions.length} correctas. Aprobado${isCert ? ': completaste la certificación de la academia.' : nextLevel ? `. Nivel ${nextLevel.level}: ${nextLevel.name} desbloqueado.` : ': ya puedes presentar la certificación final.'}`
    : `${score}/${currentQuestions.length} correctas${unanswered ? ` (${unanswered} sin responder)` : ''}. Necesitas ${pass}. Revisa las explicaciones y vuelve a intentarlo.`;

  const exams = { ...(loadState().exams || {}) };
  exams[activeExam] = { score, total: currentQuestions.length, passed, date: new Date().toISOString().slice(0, 10) };
  saveState({ exams });
  updateQuizBadge(); renderExamScores(); renderDataSummary(); renderLevelGrid(); renderLevelTabs(); renderExamTabs();
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

$('#quizReset').addEventListener('click', renderExam);

/* ─────────────── Mi plan ─────────────── */
const allocations = {
  cauteloso: { title: 'Cauteloso', global: 45, bonds: 55, satellite: 0, rate: 4.5, drop: '15–20%' },
  moderado: { title: 'Moderado', global: 65, bonds: 30, satellite: 5, rate: 6, drop: '25–30%' },
  crecimiento: { title: 'Crecimiento', global: 82, bonds: 13, satellite: 5, rate: 7, drop: '35–45%' },
  agresivo: { title: 'Agresivo', global: 92, bonds: 3, satellite: 5, rate: 7.5, drop: '50% o más' }
};
function allocationRow(label, value, type) {
  return `<div class="allocation-row"><span>${label}</span><span>${value}%</span></div>
    <div class="allocation-bar"><span class="${type}" style="width:${value}%"></span></div>`;
}
function renderPlan(event) {
  if (event) event.preventDefault();
  const goal = $('#goal').value;
  const years = Number($('#horizon').value);
  const initial = Math.max(0, Number($('#initial').value) || 0);
  const monthly = Math.max(0, Number($('#monthly').value) || 0);
  const profile = $('#profile').value;
  const model = allocations[profile];
  const projection = compound(initial, monthly, years, model.rate);
  const contributed = initial + monthly * years * 12;
  const dropRange = model.drop.match(/[\d.,]+/g).map(value => Number(value.replace(',', '.')));
  const lossRange = dropRange.map(value => money.format(projection * value / 100));

  $('#planOutput').innerHTML = `
    <p class="card-kicker">Plantilla ${model.title}</p><h3>${goal}</h3>
    <p>Aporte inicial <strong>${money.format(initial)}</strong> más <strong>${money.format(monthly)}</strong> al mes durante ${years} años.</p>
    ${allocationRow('ETF global de acciones', model.global, 'global')}
    ${allocationRow('ETF de bonos', model.bonds, 'bonds')}
    ${allocationRow('Satélite opcional', model.satellite, 'satellite')}
    <div class="plan-rules">
      <p><strong>Escenario ilustrativo al ${pct(model.rate, 1)} nominal:</strong> ${money.format(projection)}, de los cuales ${money.format(contributed)} son aportes tuyos.</p>
      <p><strong>Caída que debes poder soportar:</strong> ${model.drop}. Sobre el valor proyectado equivaldría a perder ${lossRange.length > 1 ? `entre ${lossRange[0]} y ${lossRange[1]}` : `cerca de ${lossRange[0]}`} en el papel sin vender nada.</p>
      <p><strong>Reglas mínimas:</strong> aportar cada mes de forma automática · sin apalancamiento · revisar cada trimestre · rebalancear una vez al año o al romper una banda de 5 puntos · no vender por caídas de mercado.</p>
    </div>
    <p class="microcopy">Plantilla educativa generada con supuestos que tú elegiste. No es una recomendación personalizada ni considera tu situación tributaria.</p>`;
  saveState({ plan: { goal, years, initial, monthly, profile } });
  renderDataSummary();
}
$('#planForm').addEventListener('submit', renderPlan);

/* ─────────────── Laboratorio ─────────────── */
const LABS = [
  { id: 'compuesto', name: 'Compuesto real' },
  { id: 'costos', name: 'Impacto de costos' },
  { id: 'operacion', name: 'Costo de operar' },
  { id: 'drawdown', name: 'Prueba de estrés' },
  { id: 'retiro', name: 'Independencia' },
  { id: 'rebalanceo', name: 'Rebalanceo' }
];
let activeLab = 'compuesto';

function renderLabTabs() {
  $('#labTabs').innerHTML = LABS.map(l => {
    const selected = l.id === activeLab;
    return `<button type="button" role="tab" id="lab-tab-${l.id}" class="lab-tab${selected ? ' active' : ''}"
      data-lab-tab="${l.id}" aria-controls="lab-${l.id}" aria-selected="${selected}" tabindex="${selected ? 0 : -1}">${l.name}</button>`;
  }).join('');
  $$('.lab-panel').forEach(p => {
    p.hidden = p.dataset.lab !== activeLab;
    p.setAttribute('aria-labelledby', `lab-tab-${p.dataset.lab}`);
  });
}
$('#labTabs').addEventListener('click', e => {
  const btn = e.target.closest('[data-lab-tab]');
  if (!btn) return;
  activeLab = btn.dataset.labTab;
  renderLabTabs();
});

const num = id => Number($(id).value) || 0;

/* A · Compuesto real */
function labCompuesto() {
  const initial = Math.max(0, num('#cInitial'));
  const monthly = Math.max(0, num('#cMonthly'));
  const years = num('#cYears');
  const rate = num('#cRate');
  const infl = num('#cInfl');
  const cost = num('#cCost');

  $('#cYearsLbl').textContent = `${years} años`;
  $('#cRateLbl').textContent = pct(rate, 1);
  $('#cInflLbl').textContent = pct(infl, 1);
  $('#cCostLbl').textContent = pct(cost, 2);

  const netNominal = rate - cost;
  const months = Math.round(years * 12);
  const contributed = initial + monthly * months;
  const nominal = compound(initial, monthly, years, netNominal);
  const real = nominal / Math.pow(1 + infl / 100, years);

  /* Aportes traídos a pesos de hoy: cada cuota vale menos cuanto más tarde se hace */
  const im = Math.pow(1 + infl / 100, 1 / 12) - 1;
  const contributedToday = im < 1e-12
    ? contributed
    : initial + monthly * ((1 - Math.pow(1 + im, -months)) / im);

  const gainReal = real - contributedToday;
  const share = real > 0 ? Math.min(100, Math.max(0, contributedToday / real * 100)) : 100;

  $('#cOut').innerHTML = `
    <p class="out-kicker">Valor nominal al final</p>
    <strong class="out-big">${money.format(nominal)}</strong>
    <div class="out-row"><span>En poder de compra de hoy</span><b>${money.format(real)}</b></div>
    <div class="out-row"><span>Aportes propios (pesos de cada año)</span><b>${money.format(contributed)}</b></div>
    <div class="out-row"><span>Esos aportes en pesos de hoy</span><b>${money.format(contributedToday)}</b></div>
    <div class="out-row total"><span>Ganancia real (poder de compra ganado)</span><b class="${gainReal >= 0 ? 'pos' : 'neg'}">${money.format(gainReal)}</b></div>
    <div class="out-row"><span>Retorno real neto anual</span><b>${pct(realRate(netNominal, infl))}</b></div>
    <div class="bar"><span style="width:${share}%"></span><span style="width:${100 - share}%"></span></div>
    <p class="microcopy">Todo comparado en pesos de hoy: barra verde, tu dinero; barra clara, el crecimiento real. Los costos ya están restados del retorno. El modelo supone un aporte mensual fijo en pesos; si lo subes cada año con la inflación, el resultado mejora.</p>`;
}

/* B · Impacto de costos */
function labCostos() {
  const monthly = Math.max(0, num('#fMonthly'));
  const years = num('#fYears');
  const rate = num('#fRate');
  const low = num('#fLow');
  const high = num('#fHigh');

  $('#fYearsLbl').textContent = `${years} años`;
  $('#fRateLbl').textContent = pct(rate, 1);
  $('#fLowLbl').textContent = pct(low, 2);
  $('#fHighLbl').textContent = pct(high, 2);

  const a = compound(0, monthly, years, rate - low);
  const b = compound(0, monthly, years, rate - high);
  const diff = a - b;
  const contributed = monthly * years * 12;
  const lost = a > 0 ? diff / a * 100 : 0;

  $('#fOut').innerHTML = `
    <p class="out-kicker">Diferencia que se llevan las comisiones</p>
    <strong class="out-big neg">${money.format(diff)}</strong>
    <div class="out-row"><span>Opción A · ${pct(low, 2)} de costo</span><b>${money.format(a)}</b></div>
    <div class="out-row"><span>Opción B · ${pct(high, 2)} de costo</span><b>${money.format(b)}</b></div>
    <div class="out-row"><span>Aportado en ambos casos</span><b>${money.format(contributed)}</b></div>
    <div class="out-row"><span>Porción del capital final perdida por costos</span><b class="neg">${pct(lost, 1)}</b></div>
    <p class="microcopy">Mismo mercado, mismo aporte, misma disciplina. Lo único que cambia es cuánto cobra el intermediario.</p>`;
}

/* C · Costo real de operar */
function labOperacion() {
  const amount = Math.max(0, num('#oAmount'));
  const fx = num('#oFx');
  const commPct = num('#oCommPct');
  const commFix = num('#oCommFix');
  const spread = num('#oSpread');
  const ter = num('#oTer');
  const freq = Math.max(1, num('#oFreq'));

  const costFx = amount * fx / 100;
  const costComm = amount * commPct / 100 + commFix;
  const costSpread = amount * spread / 100;
  const perOp = costFx + costComm + costSpread;
  const perOpPct = amount > 0 ? perOp / amount * 100 : 0;
  const yearInvested = amount * freq;
  const terYear = (yearInvested / 2) * ter / 100;
  const yearTotal = perOp * freq + terYear;
  const yearPct = yearInvested > 0 ? yearTotal / yearInvested * 100 : 0;

  $('#oOut').innerHTML = `
    <p class="out-kicker">Costo por cada compra</p>
    <strong class="out-big">${money.format(perOp)}</strong>
    <div class="out-row"><span>Equivale al</span><b class="${perOpPct > 1 ? 'neg' : 'pos'}">${pct(perOpPct)} del monto</b></div>
    <div class="out-row"><span>Conversión de divisa</span><b>${money.format(costFx)}</b></div>
    <div class="out-row"><span>Comisión del broker</span><b>${money.format(costComm)}</b></div>
    <div class="out-row"><span>Spread del activo</span><b>${money.format(costSpread)}</b></div>
    <div class="out-row"><span>TER del primer año (saldo promedio)</span><b>${money.format(terYear)}</b></div>
    <div class="out-row total"><span>Costo total del primer año</span><b>${money.format(yearTotal)} · ${pct(yearPct)}</b></div>
    <p class="microcopy">${perOpPct > 1
      ? 'Por encima del 1% por operación conviene aportar menos veces con montos mayores.'
      : 'Costo por operación razonable. Aun así, agrupar compras casi siempre lo reduce más.'} No incluye el costo de retirar ni el cambio de vuelta a pesos.</p>`;
}

/* D · Prueba de estrés */
function labDrawdown() {
  const value = Math.max(0, num('#dValue'));
  const drop = num('#dDrop');
  const rate = num('#dRate');
  const monthly = Math.max(0, num('#dMonthly'));

  $('#dDropLbl').textContent = `${drop}%`;
  $('#dRateLbl').textContent = pct(rate, 1);

  const loss = value * drop / 100;
  const remaining = value - loss;
  const needed = (1 / (1 - drop / 100) - 1) * 100;
  const yearsAlone = Math.log(1 / (1 - drop / 100)) / Math.log(1 + rate / 100);

  let months = 0;
  let balance = remaining;
  const mRate = rate / 100 / 12;
  while (balance < value && months < 1200) { balance = balance * (1 + mRate) + monthly; months++; }
  const withAports = months >= 1200 ? null : months / 12;

  $('#dOut').innerHTML = `
    <p class="out-kicker">Pérdida en papel</p>
    <strong class="out-big neg">−${money.format(loss)}</strong>
    <div class="out-row"><span>Valor de la cartera tras la caída</span><b>${money.format(remaining)}</b></div>
    <div class="out-row"><span>Subida necesaria para volver al punto de partida</span><b>${pct(needed, 1)}</b></div>
    <div class="out-row"><span>Años para recuperar sin aportar</span><b>${yearsAlone.toFixed(1).replace('.', ',')} años</b></div>
    <div class="out-row total"><span>Años aportando ${money.format(monthly)} al mes</span><b class="pos">${withAports === null ? 'más de 100' : withAports.toFixed(1).replace('.', ',') + ' años'}</b></div>
    <p class="microcopy">Escribe ahora, en frío, qué harías si vieras esta cifra en tu cuenta. Esa respuesta define tu asignación real, no el cuestionario de perfil del broker.</p>`;
}

/* E · Independencia financiera */
function labRetiro() {
  const spend = Math.max(0, num('#rSpend'));
  const wr = num('#rRate');
  const current = Math.max(0, num('#rCurrent'));
  const monthly = Math.max(0, num('#rMonthly'));
  const real = num('#rReal');

  $('#rRateLbl').textContent = pct(wr, 2);
  $('#rRealLbl').textContent = pct(real, 1);

  const annual = spend * 12;
  const target = wr > 0 ? annual / (wr / 100) : Infinity;

  let months = 0;
  let balance = current;
  const mRate = real / 100 / 12;
  while (balance < target && months < 1200) { balance = balance * (1 + mRate) + monthly; months++; }
  const years = months >= 1200 ? null : months / 12;
  const progress = target > 0 ? Math.min(100, current / target * 100) : 0;

  $('#rOut').innerHTML = `
    <p class="out-kicker">Capital objetivo aproximado</p>
    <strong class="out-big">${isFinite(target) ? money.format(target) : '—'}</strong>
    <div class="out-row"><span>Gasto anual a cubrir</span><b>${money.format(annual)}</b></div>
    <div class="out-row"><span>Avance actual</span><b>${pct(progress, 1)}</b></div>
    <div class="out-row total"><span>Años faltantes al ritmo actual</span><b class="pos">${years === null ? 'más de 100' : years.toFixed(1).replace('.', ',') + ' años'}</b></div>
    <div class="bar"><span style="width:${progress}%"></span><span style="width:${100 - progress}%"></span></div>
    <p class="microcopy">La tasa de retiro proviene de estudios sobre mercados y periodos concretos; no es una garantía. Con inflación colombiana conviene trabajar con tasas más conservadoras y revisar el plan cada año.</p>`;
}

/* F · Rebalanceo */
function labRebalanceo() {
  const target = num('#bTarget');
  const band = num('#bBand');
  const equity = Math.max(0, num('#bEquity'));
  const bonds = Math.max(0, num('#bBonds'));
  const monthly = Math.max(0, num('#bMonthly'));

  $('#bTargetLbl').textContent = `${target}%`;
  $('#bBandLbl').textContent = `${band} pp`;

  const result = calculateRebalance({ target, band, equity, bonds, monthly });
  const { total, actual, deviation: dev, outside, immediateMove: move } = result;

  let fixText;
  if (total === 0) {
    fixText = `Aún no hay cartera. Distribuye el primer aporte según el objetivo: ${target}% a renta variable y ${100 - target}% a renta fija.`;
  } else if (!outside) {
    fixText = 'Dentro de la banda: no se requiere ninguna acción. Sigue aportando según tu plan.';
  } else if (result.direction === 'bonds') {
    const contribution = result.contributionNeeded === null
      ? 'Un objetivo de 0% no puede alcanzarse solo añadiendo renta fija.'
      : `Sin vender, dirige los próximos aportes íntegramente a renta fija: harían falta ${money.format(result.contributionNeeded)}${result.monthsNeeded ? `, es decir unos ${result.monthsNeeded} meses de aporte` : ''}.`;
    fixText = `Tienes exceso de renta variable. ${contribution} Para corregir de inmediato, vende ${money.format(move)} de renta variable.`;
  } else {
    const contribution = result.contributionNeeded === null
      ? 'Un objetivo de 100% no puede alcanzarse solo añadiendo renta variable mientras exista renta fija.'
      : `Sin vender, dirige los próximos aportes íntegramente a renta variable: harían falta ${money.format(result.contributionNeeded)}${result.monthsNeeded ? `, es decir unos ${result.monthsNeeded} meses de aporte` : ''}.`;
    fixText = `Tienes defecto de renta variable. ${contribution} Para corregir de inmediato, compra ${money.format(move)} de renta variable.`;
  }

  $('#bOut').innerHTML = `
    <p class="out-kicker">Composición actual</p>
    <strong class="out-big">${pct(actual, 1)} / ${pct(100 - actual, 1)}</strong>
    <div class="out-row"><span>Objetivo</span><b>${target}% / ${100 - target}%</b></div>
    <div class="out-row"><span>Desviación</span><b class="${outside ? 'neg' : 'pos'}">${dev >= 0 ? '+' : ''}${dev.toFixed(1).replace('.', ',')} pp</b></div>
    <div class="out-row"><span>Patrimonio total</span><b>${money.format(total)}</b></div>
    <div class="out-row total"><span>Estado</span><b class="${outside ? 'neg' : 'pos'}">${outside ? 'Fuera de banda · toca rebalancear' : 'Dentro de banda'}</b></div>
    <p class="lab-advice">${fixText}</p>
    <p class="microcopy">Orden recomendado: corrige primero con aportes nuevos, luego con dividendos y solo al final vendiendo, para minimizar costos e impuestos.</p>`;
}

const LAB_BINDINGS = [
  { ids: ['#cInitial', '#cMonthly', '#cYears', '#cRate', '#cInfl', '#cCost'], fn: labCompuesto },
  { ids: ['#fMonthly', '#fYears', '#fRate', '#fLow', '#fHigh'], fn: labCostos },
  { ids: ['#oAmount', '#oFx', '#oCommPct', '#oCommFix', '#oSpread', '#oTer', '#oFreq'], fn: labOperacion },
  { ids: ['#dValue', '#dDrop', '#dRate', '#dMonthly'], fn: labDrawdown },
  { ids: ['#rSpend', '#rRate', '#rCurrent', '#rMonthly', '#rReal'], fn: labRetiro },
  { ids: ['#bTarget', '#bBand', '#bEquity', '#bBonds', '#bMonthly'], fn: labRebalanceo }
];
LAB_BINDINGS.forEach(b => b.ids.forEach(id => $(id).addEventListener('input', b.fn)));

/* ─────────────── Diario ─────────────── */
function journalEntries() { return loadState().journal || []; }
function renderJournal() {
  const list = $('#journalList');
  const entries = journalEntries();
  if (!entries.length) { list.innerHTML = '<p class="empty">Aún no hay decisiones registradas.</p>'; return; }
  list.innerHTML = entries.map(entry => `<article class="journal-entry">
    <strong>${escapeHtml(entry.asset)}<br><small>${escapeHtml(entry.decision)}</small></strong>
    <p>${escapeHtml(entry.reason)}<br><small>${escapeHtml(entry.date)}</small></p>
    <button data-delete="${entry.id}" aria-label="Eliminar entrada">Eliminar</button>
  </article>`).join('');
}
$('#journalForm').addEventListener('submit', event => {
  event.preventDefault();
  const entries = journalEntries();
  entries.unshift({
    id: Date.now(),
    asset: $('#asset').value.trim(),
    decision: $('#decision').value,
    reason: $('#reason').value.trim(),
    date: new Date().toLocaleDateString('es-CO')
  });
  saveState({ journal: entries.slice(0, 100) });
  event.currentTarget.reset();
  renderJournal(); renderDataSummary();
});
$('#journalList').addEventListener('click', event => {
  const id = event.target.dataset.delete;
  if (!id) return;
  saveState({ journal: journalEntries().filter(e => e.id !== Number(id)) });
  renderJournal(); renderDataSummary();
});

/* ─────────────── Datos: resumen, exportar, importar, reiniciar ─────────────── */
function renderDataSummary() {
  const s = loadState();
  const all = ALL_LESSONS();
  const lessonsDone = all.filter(l => (s.lessons || {})[l.id]).length;
  const stepsDone = Object.values(s.steps || {}).filter(Boolean).length;
  const examsPassed = Object.values(s.exams || {}).filter(e => e.passed).length;
  const items = [
    ['Lecciones estudiadas', `${lessonsDone} de ${all.length}`],
    ['Semanas completadas', `${stepsDone} de ${stepBoxes.length}`],
    ['Exámenes aprobados', `${examsPassed} de 5`],
    ['Entradas en el diario', String((s.journal || []).length)],
    ['Plan guardado', s.plan ? 'sí' : 'no']
  ];
  $('#dataSummary').innerHTML = items
    .map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join('');
}

$('#exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(loadState(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rutaetf-progreso-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  $('#dataMsg').textContent = 'Respaldo descargado.';
});

$('#importInput').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!isBackupCandidate(data)) throw new Error('formato');
      const safeState = normalizeState(data, STATE_CONFIG);
      localStorage.setItem(STATE_KEY, JSON.stringify(safeState));
      $('#dataMsg').textContent = 'Respaldo importado. Recargando…';
      setTimeout(() => location.reload(), 600);
    } catch {
      $('#dataMsg').textContent = 'No se pudo leer el archivo: no parece un respaldo válido de RutaETF.';
    }
  };
  reader.readAsText(file);
  event.target.value = '';
});

function enableKeyboardTabs(containerSelector) {
  $(containerSelector).addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(event.target.closest('[role="tab"]'));
    if (current < 0) return;
    event.preventDefault();
    let next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
      : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    tabs[next].click();
  });
}

$('#resetBtn').addEventListener('click', () => {
  if (!confirm('Se borrará todo tu progreso guardado en este navegador: lecciones, exámenes, plan y diario. Esta acción no se puede deshacer. ¿Continuar?')) return;
  localStorage.removeItem(STATE_KEY);
  location.reload();
});

/* ─────────────── Arranque ─────────────── */
const saved = loadState();
(saved.readiness || []).forEach((v, i) => { if (readyBoxes[i]) readyBoxes[i].checked = v; });
gateDismissed = readyBoxes.every(box => box.checked);
stepBoxes.forEach(b => { b.checked = Boolean(saved.steps?.[b.dataset.step]); });
if (saved.plan) {
  $('#goal').value = saved.plan.goal ?? $('#goal').value;
  $('#horizon').value = saved.plan.years ?? $('#horizon').value;
  $('#initial').value = saved.plan.initial ?? $('#initial').value;
  $('#monthly').value = saved.plan.monthly ?? $('#monthly').value;
  if (allocations[saved.plan.profile]) $('#profile').value = saved.plan.profile;
}

renderLevelGrid();
renderLevelTabs();
renderAcademy();
renderPillChips();
renderPillGrid();
renderFeaturedPill();
renderErrors();
renderGlossaryChips();
renderGlossary();
renderExamTabs();
renderExam();
renderExamScores();
renderLabTabs();
LAB_BINDINGS.forEach(b => b.fn());
updateReadiness();
updateProgress();
renderPlan();
renderJournal();
renderDataSummary();
enableKeyboardTabs('#levelTabs');
enableKeyboardTabs('#labTabs');
enableKeyboardTabs('#examTabs');
