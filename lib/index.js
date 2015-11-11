'use strict';

const schema = require('./schema'),
      graphqlHTTP = require('express-graphql'),
      app  = require('express')(),
      PORT = 3000;

app
  .use('/graphql', graphqlHTTP({ schema, graphiql: true }))
  .listen(PORT, () => console.log('GraphQL listening at http://localhost:%s/graphql', PORT));
