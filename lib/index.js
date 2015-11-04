'use strict';

let express = require('express'),
    schema = require('./schema'),
    // new dependencies
    { graphql } = require('graphql'),
    bodyParser = require('body-parser'),

    app  = express(),
    PORT = 3000;

// parse POST body as text
app
  .use(bodyParser.text({ type: 'application/graphql' }))
  .post('/graphql', (req, res) => {
    graphql(schema, req.body)
      .then( result => {
        res.send(JSON.stringify(result, null, 2));
      });
  });

let server = app.listen(PORT, function () {
  const host = server.address().address,
        port = server.address().port;

  console.log('GraphQL listening at http://localhost:%s', port);
});
