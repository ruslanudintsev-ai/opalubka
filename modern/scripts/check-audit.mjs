import { readFileSync } from 'node:fs';

const doc = JSON.parse(readFileSync('quality-reports/npm-audit-production.json','utf8'));
if (doc.error) throw new Error('npm audit did not complete: ' + JSON.stringify(doc.error));
const summary = doc.metadata?.vulnerabilities;
if (!summary || !['low','moderate','high','critical'].every(k => Number.isInteger(summary[k]))) {
  throw new Error('Incomplete npm audit report: cannot assert dependencies safe.');
}
console.log('NPM_AUDIT_PRODUCTION: ' + JSON.stringify({
  info: summary.info, low: summary.low, moderate: summary.moderate, high: summary.high,
  critical: summary.critical, total: summary.total,
}));
if (summary.high > 0 || summary.critical > 0) {
  console.error('BLOCK_RELEASE: npm audit --omit=dev found HIGH/CRITICAL vulnerabilities.');
  process.exitCode = 1;
}
