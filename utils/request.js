'use strict';

const { ACCESS_TOKEN } = require('../config');
const agent = require('superagent-promise')(require('superagent'), Promise);

module.exports = (url) => {
  console.log('requesting', url);
  return agent
    .get(url)
    .set('Authorization', 'Bearer ' + ACCESS_TOKEN)
    .end()
    .then(({body}) => body)
  ;
}
