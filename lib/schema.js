'use strict';

// valid group id: e3630413-abd9-3308-8937-c5f119c17a28
const ACCESS_TOKEN = 'MSwxNDQ2NjQyMzQ3NzE1LDQxMTIwMzY4MSw3MTQsYWxsLCwsNWQ1MWNmYzg4NTJkMDUxZTE4ZDZjZTItYjViMDQ3ZTg4OWVjMGNhNyxFXzNBUGd1NnI2cVltREt2T0tsTHFyTXBPZVk';

let request = require('superagent-promise')(require('superagent'), Promise);
// let request = require('superagent');

let {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    name: {
      type: GraphQLString
    }
  })
});

let schema = new GraphQLSchema({

  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      group: {
        type: GroupType,
        description: 'A Mendeley discussion Group',
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (parent, {id}, ast) => {
          return request
            .get(`https://api.mendeley.com:443/groups/${id}`)
            .set('Authorization', 'Bearer ' + ACCESS_TOKEN)
            .end()
            .then((res) => res.body);
        }
      }
    }
  }),

});


module.exports = schema;
