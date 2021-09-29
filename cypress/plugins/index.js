const failedLogTask = require('cypress-failed-log/src/failed');
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin');
const cypressExtends = require('@bahmutov/cypress-extends');

module.exports = (on, config) => {
  on('task', { failed: failedLogTask() });
  // eslint-disable-next-line global-require
  require('@cypress/code-coverage/task')(on, config);
  // eslint-disable-next-line no-param-reassign
  mochawesomeReporter(on);
  return {
    ...config,
    ...cypressExtends(config.configFile),
  };
};
