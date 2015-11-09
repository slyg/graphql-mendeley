'use strict';

const schema = require('./schema'),
    { graphql } = require('graphql'),
    bodyParser = require('body-parser'),

    app  = require('express')(),
    PORT = 3000;

app
  .use(bodyParser.text({ type: 'application/graphql' }))
  .post('/graphql', ({body}, res) => {
    graphql(schema, body).then(result => res.send(JSON.stringify(result, null, 2)));
  })
  .listen(PORT, () => console.log('GraphQL listening at http://localhost:%s', PORT));
