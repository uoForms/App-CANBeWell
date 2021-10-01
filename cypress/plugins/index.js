const failedLogTask = require('cypress-failed-log/src/failed');
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin');
const cypressExtends = require('@bahmutov/cypress-extends');
const coverage = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  on('task', { failed: failedLogTask() });
  coverage(on, config);
  mochawesomeReporter(on);
  return {
    ...config,
    ...cypressExtends(config.configFile),
  };
};
