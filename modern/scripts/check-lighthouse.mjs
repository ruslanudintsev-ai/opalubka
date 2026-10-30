import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const fields = ['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift'];
const reports = ['mobile', 'desktop'];
const summaries = {};
for (const mode of reports) {
  const doc = JSON.parse(readFileSync(join('quality-reports', 'lighthouse-' + mode + '.report.json'), 'utf8'));
  if (doc.runtimeError) throw new Error(mode + ' Lighthouse runtime error: ' + doc.runtimeError.message);
  const finalUrl = new URL(doc.finalDisplayedUrl || doc.finalUrl || '');
  if (finalUrl.hostname !== '127.0.0.1' || finalUrl.port !== '4321') {
    throw new Error(mode + ' unexpectedly measured a non-local URL: ' + finalUrl.href);
  }
  if (!doc.lighthouseVersion) throw new Error(mode + ' missing Lighthouse version');
  const scores = {};
  for (const name of categories) {
    const score = doc.categories?.[name]?.score;
    if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 1) {
      throw new Error(mode + ' missing valid ' + name + ' category score');
    }
    scores[name] = Math.round(score * 100);
  }
  const measured = {};
  for (const name of fields) {
    const metric = doc.audits?.[name]?.numericValue;
    if (typeof metric !== 'number' || !Number.isFinite(metric) || metric < 0) {
      throw new Error(mode + ' missing valid ' + name + ' numeric metric');
    }
    measured[name] = metric;
  }
  summaries[mode] = {
    source: 'LOCAL_CI_SIMULATION_NOT_FIELD_CWV',
    lighthouseVersion: doc.lighthouseVersion,
    scores,
    metrics: measured,
    location: 'localhost:4321',
  };
  console.log('LIGHTHOUSE_LOCAL_' + mode.toUpperCase() + ': ' + JSON.stringify(summaries[mode]));
}
console.log('LIGHTHOUSE_REPORTS_VALIDATED: two local generated reports, four categories each.');
