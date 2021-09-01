const failedLogTask = require('cypress-failed-log/src/failed');
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin');
const cypressExtends = require('@bahmutov/cypress-extends');

module.exports = (on, config) => {
  on('task', { failed: failedLogTask() });
  mochawesomeReporter(on);
  return cypressExtends(config.configFile);
};
