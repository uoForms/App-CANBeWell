const cyView = require('cy-view');

const devices = [
  {
    model: 'Laptop',
    width: 1440,
    height: 900,
  },
  {
    model: 'Tablet Horizontal',
    width: 1024,
    height: 768,
  },
  {
    model: 'Tablet Vertical',
    width: 768,
    height: 1024,
  },
  {
    model: 'Phone Horizontal',
    width: 736,
    height: 414,
  },
  {
    model: 'Phone Vertical',
    width: 414,
    height: 736,
  },
];

const devicesTestWrapper = (describeName, describeFunction, urls = [Cypress.config().baseUrl]) => {
  cyView(devices)(urls,
    () => {
      describe(describeName, describeFunction);
    });
};

export default devicesTestWrapper;
