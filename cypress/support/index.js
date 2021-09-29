import './commands';
import 'cypress-mochawesome-reporter/register';
import '@cypress/code-coverage/support';

require('cypress-get-it');
require('cypress-failed-log');

chai.use(require('deep-equal-in-any-order'));
