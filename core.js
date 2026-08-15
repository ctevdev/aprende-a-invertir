/* RutaETF · lógica pura compartida por la aplicación y las pruebas */
(function exposeCore(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.RutaETFCore = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function buildCore() {
  'use strict';

  const APP_ID = 'RutaETF';
  const SCHEMA_VERSION = 2;

  function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function finiteNumber(value, fallback = 0, min = -Infinity, max = Infinity) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(max, Math.max(min, number));
  }

  function cleanString(value, fallback = '', maxLength = 400) {
    return typeof value === 'string' ? value.slice(0, maxLength) : fallback;
  }

  function compound(initial, monthly, years, annualRate) {
    const safeInitial = finiteNumber(initial, 0, 0);
    const safeMonthly = finiteNumber(monthly, 0, 0);
    const safeYears = finiteNumber(years, 0, 0);
    const safeRate = finiteNumber(annualRate);
    const months = Math.round(safeYears * 12);
    const rate = safeRate / 100 / 12;
    if (Math.abs(rate) < 1e-12) return safeInitial + safeMonthly * months;
    return safeInitial * Math.pow(1 + rate, months)
      + safeMonthly * ((Math.pow(1 + rate, months) - 1) / rate);
  }

  function realRate(nominal, inflation) {
    const safeNominal = finiteNumber(nominal);
    const safeInflation = finiteNumber(inflation, 0, -99.99);
    return ((1 + safeNominal / 100) / (1 + safeInflation / 100) - 1) * 100;
  }

  function filterBooleanMap(value, allowedKeys) {
    if (!isPlainObject(value)) return {};
    const allowed = new Set(allowedKeys || []);
    return Object.fromEntries(Object.entries(value)
      .filter(([key, item]) => allowed.has(key) && typeof item === 'boolean'));
  }

  function normalizeExam(value, definition) {
    if (!isPlainObject(value) || !definition) return null;
    const total = definition.total;
    const score = Math.round(finiteNumber(value.score, 0, 0, total));
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value.date || '') ? value.date : '';
    return { score, total, passed: score >= definition.pass, ...(date ? { date } : {}) };
  }

  function normalizeState(value, config = {}) {
    const input = isPlainObject(value) ? value : {};
    const levelIds = config.levelIds || ['n1', 'n2', 'n3', 'n4'];
    const activeLevel = levelIds.includes(input.activeLevel) ? input.activeLevel : levelIds[0];
    const readinessCount = config.readinessCount ?? 6;
    const state = {
      app: APP_ID,
      schemaVersion: SCHEMA_VERSION,
      migrated: Boolean(input.migrated),
      activeLevel,
      lessons: filterBooleanMap(input.lessons, config.lessonIds),
      checks: filterBooleanMap(input.checks, config.checkIds),
      readiness: Array.from({ length: readinessCount }, (_, index) => Boolean(input.readiness?.[index])),
      steps: filterBooleanMap(input.steps, config.stepIds),
      exams: {}
    };

    Object.entries(config.examDefinitions || {}).forEach(([id, definition]) => {
      const normalized = normalizeExam(input.exams?.[id], definition);
      if (normalized) state.exams[id] = normalized;
    });

    if (isPlainObject(input.plan)) {
      const profiles = config.profiles || [];
      const goals = config.goals || [];
      const horizons = config.horizons || [];
      state.plan = {
        goal: goals.includes(input.plan.goal) ? input.plan.goal : goals[0],
        years: horizons.includes(Number(input.plan.years)) ? Number(input.plan.years) : horizons[0],
        initial: finiteNumber(input.plan.initial, 0, 0, 1e15),
        monthly: finiteNumber(input.plan.monthly, 0, 0, 1e15),
        profile: profiles.includes(input.plan.profile) ? input.plan.profile : profiles[0]
      };
    }

    if (Array.isArray(input.journal)) {
      const decisions = config.decisions || [];
      state.journal = input.journal.slice(0, 100).filter(isPlainObject).map((entry, index) => ({
        id: finiteNumber(entry.id, Date.now() + index, 0),
        asset: cleanString(entry.asset, '', 30),
        decision: decisions.includes(entry.decision) ? entry.decision : decisions[0],
        reason: cleanString(entry.reason, '', 400),
        date: cleanString(entry.date, '', 40)
      })).filter(entry => entry.asset && entry.reason);
    }

    return state;
  }

  function isBackupCandidate(value) {
    if (!isPlainObject(value)) return false;
    if (value.app === APP_ID) return true;
    const legacyKeys = ['lessons', 'checks', 'readiness', 'steps', 'exams', 'plan', 'journal', 'activeLevel'];
    return legacyKeys.some(key => Object.hasOwn(value, key));
  }

  function calculateRebalance({ target, band, equity, bonds, monthly }) {
    const safeTarget = finiteNumber(target, 0, 0, 100);
    const safeBand = finiteNumber(band, 0, 0, 100);
    const safeEquity = finiteNumber(equity, 0, 0);
    const safeBonds = finiteNumber(bonds, 0, 0);
    const safeMonthly = finiteNumber(monthly, 0, 0);
    const total = safeEquity + safeBonds;
    const actual = total > 0 ? safeEquity / total * 100 : 0;
    const deviation = actual - safeTarget;
    const outside = total > 0 && Math.abs(deviation) > safeBand;
    const idealEquity = total * safeTarget / 100;
    const immediateMove = Math.abs(safeEquity - idealEquity);

    let direction = 'none';
    let contributionNeeded = 0;
    if (outside && deviation > 0) {
      direction = 'bonds';
      contributionNeeded = safeTarget === 0 ? null : safeEquity / (safeTarget / 100) - total;
    } else if (outside && deviation < 0) {
      direction = 'equity';
      contributionNeeded = safeTarget === 100
        ? null
        : (safeTarget / 100 * total - safeEquity) / (1 - safeTarget / 100);
    }

    const monthsNeeded = contributionNeeded === null || contributionNeeded <= 0 || safeMonthly <= 0
      ? null
      : Math.ceil(contributionNeeded / safeMonthly);

    return {
      target: safeTarget,
      total,
      actual,
      deviation,
      outside,
      immediateMove,
      direction,
      contributionNeeded,
      monthsNeeded
    };
  }

  return {
    APP_ID,
    SCHEMA_VERSION,
    calculateRebalance,
    compound,
    isBackupCandidate,
    isPlainObject,
    normalizeState,
    realRate
  };
}));
