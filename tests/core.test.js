const test = require('node:test');
const assert = require('node:assert/strict');
const {
  calculateRebalance,
  compound,
  isBackupCandidate,
  normalizeState,
  realRate
} = require('../core.js');

const config = {
  levelIds: ['n1', 'n2'],
  lessonIds: ['l1', 'l2'],
  checkIds: ['l1:0:0'],
  readinessCount: 2,
  stepIds: ['inicio'],
  examDefinitions: { n1: { total: 10, pass: 6 }, cert: { total: 12, pass: 10 } },
  profiles: ['moderado'],
  goals: ['Retiro'],
  horizons: [10],
  decisions: ['Estudiar']
};

test('calcula interés compuesto y rentabilidad real', () => {
  assert.equal(compound(1000, 100, 1, 0), 2200);
  assert.ok(Math.abs(realRate(10, 5) - 4.7619) < 0.001);
});

test('normaliza el estado y descarta claves o tipos desconocidos', () => {
  const state = normalizeState({
    activeLevel: 'invalido',
    lessons: { l1: true, intrusa: true },
    readiness: [1, false, true],
    steps: [],
    exams: { n1: { score: 99, total: 2, passed: false }, desconocido: { score: 1 } },
    journal: { no: 'es una lista' }
  }, config);

  assert.equal(state.activeLevel, 'n1');
  assert.deepEqual(state.lessons, { l1: true });
  assert.deepEqual(state.readiness, [true, false]);
  assert.deepEqual(state.steps, {});
  assert.deepEqual(state.exams.n1, { score: 10, total: 10, passed: true });
  assert.deepEqual(state.journal, undefined);
});

test('conserva únicamente las condiciones de preparación esperadas', () => {
  const state = normalizeState({
    readiness: [true, 0, 'sí', null, false]
  }, { ...config, readinessCount: 4 });

  assert.deepEqual(state.readiness, [true, false, true, false]);
});

test('acepta respaldos actuales y heredados, pero rechaza JSON arbitrario', () => {
  assert.equal(isBackupCandidate({ app: 'RutaETF' }), true);
  assert.equal(isBackupCandidate({ lessons: {} }), true);
  assert.equal(isBackupCandidate({ hello: 'world' }), false);
  assert.equal(isBackupCandidate([]), false);
});

test('rebalancea un objetivo intermedio sin vender', () => {
  const result = calculateRebalance({ target: 70, band: 5, equity: 450, bonds: 150, monthly: 10 });
  assert.equal(result.outside, false);

  const outside = calculateRebalance({ target: 60, band: 5, equity: 80, bonds: 20, monthly: 5 });
  assert.equal(outside.direction, 'bonds');
  assert.ok(Math.abs(outside.contributionNeeded - 33.3333) < 0.001);
  assert.equal(outside.monthsNeeded, 7);
});

test('maneja objetivos de 0% y 100% sin producir infinitos', () => {
  const zero = calculateRebalance({ target: 0, band: 5, equity: 50, bonds: 50, monthly: 10 });
  const hundred = calculateRebalance({ target: 100, band: 5, equity: 50, bonds: 50, monthly: 10 });

  assert.equal(zero.contributionNeeded, null);
  assert.equal(zero.immediateMove, 50);
  assert.equal(hundred.contributionNeeded, null);
  assert.equal(hundred.immediateMove, 50);
  assert.ok(Number.isFinite(zero.actual));
  assert.ok(Number.isFinite(hundred.actual));
});
