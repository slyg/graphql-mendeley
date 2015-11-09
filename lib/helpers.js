'use strict';

const { ACCESS_TOKEN } = require('../config');
let agent = require('superagent-promise')(require('superagent'), Promise);

exports.request = (url) => {
  console.log('requesting', url);
  return agent.
    get(url)
    .set('Authorization', 'Bearer ' + ACCESS_TOKEN)
    .end()
    .then(({body}) => body)
  ;
}
