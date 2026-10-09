(function () {
  'use strict';
  const limits = {hours:[0,10000], hourly:[0,100000], share:[0,100], review:[0,10000], setup:[0,100000000], monthly:[0,10000000], weeks:[1,52], revenue:[0,100000000]};
  function calculate(values) {
    for (const [key,[min,max]] of Object.entries(limits)) {
      if (typeof values[key] !== 'number' || !Number.isFinite(values[key]) || values[key] < min || values[key] > max) throw new RangeError('Invalid ' + key);
    }
    if (!Number.isInteger(values.weeks)) throw new RangeError('Working weeks must be a whole number');
    const savedHours = values.hours * values.share / 100 - values.review;
    const annualHours = savedHours * values.weeks;
    const annualValue = annualHours * values.hourly;
    const annualCost = values.setup + values.monthly * 12;
    const netValue = annualValue - annualCost;
    const monthlyNet = annualValue / 12 - values.monthly;
    return {savedHours, annualHours, annualValue, annualRevenue: values.revenue * 12, annualCost, netValue,
      roi: annualCost > 0 ? netValue / annualCost * 100 : null,
      payback: monthlyNet > 0 ? values.setup / monthlyNet : null};
  }
  if (typeof module !== 'undefined' && module.exports) { module.exports = {calculate}; return; }
  const fields = Object.fromEntries(Object.keys(limits).map(key => [key,document.getElementById(key)]));
  const defaults = Object.fromEntries(Object.entries(fields).map(([key,field]) => [key,field.defaultValue]));
  const number = new Intl.NumberFormat('en-US',{maximumFractionDigits:1});
  const money = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  const error = document.getElementById('input-error');
  const outputs = ['saved-hours','annual-value','annual-revenue','annual-cost','net-value','roi','payback'];
  let announce;
  function update() {
    const values = {};
    const invalid = [];
    for (const [key,field] of Object.entries(fields)) {
      const value = field.value.trim() === '' ? NaN : Number(field.value);
      const [min,max] = limits[key];
      const valid = Number.isFinite(value) && value >= min && value <= max && (key !== 'weeks' || Number.isInteger(value));
      field.setAttribute('aria-invalid',String(!valid));
      if (!valid) invalid.push(key);
      values[key] = value;
    }
    clearTimeout(announce);
    if (invalid.length) {
      document.getElementById('result-status').textContent = '';
      error.hidden = false;
      const key = invalid[0];
      error.textContent = 'Check the highlighted values. ' + fields[key].labels[0].textContent.trim() + ': enter ' + limits[key][0] + '–' + limits[key][1] + (key === 'weeks' ? ' whole weeks.' : '.');
      for (const id of outputs) document.getElementById(id).textContent = '—';
      document.getElementById('result-note').textContent = 'Complete the inputs to see a valid estimate.';
      return;
    }
    error.hidden = true;
    const result = calculate(values);
    document.getElementById('saved-hours').textContent = number.format(result.savedHours);
    document.getElementById('annual-value').textContent = money.format(result.annualValue);
    document.getElementById('annual-revenue').textContent = money.format(result.annualRevenue);
    document.getElementById('annual-cost').textContent = money.format(result.annualCost);
    document.getElementById('net-value').textContent = money.format(result.netValue);
    document.getElementById('roi').textContent = result.roi === null ? 'Not defined' : number.format(result.roi) + '%';
    document.getElementById('payback').textContent = result.payback === null ? 'No payback' :
      result.payback === 0 ? 'No setup cost' : result.payback < 0.1 ? 'Less than 0.1 month' : number.format(result.payback) + ' months';
    const note = result.savedHours < 0 ? 'Review takes more time than automation removes. This estimate adds work.' :
      result.savedHours === 0 ? 'No net time recovered under these assumptions.' :
      result.netValue < 0 ? 'Time is recovered, but its modeled value is below the first-year cost.' :
      'Based on ' + number.format(result.annualHours) + ' net hours recovered per year. Time value is not cash saved.';
    document.getElementById('result-note').textContent = note;
    announce = setTimeout(() => {
      document.getElementById('result-status').textContent = 'Estimate updated. ' + number.format(result.savedHours) + ' net hours per week. ' + money.format(result.netValue) + ' first-year net time value. ' + money.format(result.annualRevenue) + ' potential additional annual revenue, shown separately.';
    },400);
  }
  for (const field of Object.values(fields)) field.addEventListener('input',update);
  document.getElementById('reset').addEventListener('click',() => {
    for (const [key,field] of Object.entries(fields)) field.value = defaults[key];
    update();
  });
  update();
})();
