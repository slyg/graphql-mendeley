'use strict';

// valid group id: e3630413-abd9-3308-8937-c5f119c17a28
const { ACCESS_TOKEN } = require('../config');

console.log(ACCESS_TOKEN);

let agent = require('superagent-promise')(require('superagent'), Promise);
let request = (url) => {
  console.log('requesting', url);
  return agent.get(url).set('Authorization', 'Bearer ' + ACCESS_TOKEN).end()
}

let {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    name    : { type: GraphQLString },
    ownerId : { type: GraphQLString },
    link    : { type: GraphQLString },
    owner   : {
      type: ProfileType,
      resolve : ({ownerId}) => {
        return request(`https://api.mendeley.com:443/profiles/${ownerId}`)
          .then(
            ({body}) => ({
              id: body.id,
              name: body.display_name
            })
          );
      }
    },
  })
});

const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id : { type: GraphQLString },
    name : { type: GraphQLString }
  })
});

const schema = new GraphQLSchema({

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
        resolve: (parent, {id}) => {
          return request(`https://api.mendeley.com:443/groups/${id}`)
            .then(({body}) => ({
                name    : body.name,
                link    : body.link,
                ownerId : body['owning_profile_id']
              })
            );
        }
      }
    }
  }),

});


module.exports = schema;
