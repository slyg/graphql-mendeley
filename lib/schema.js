'use strict';
const { ACCESS_TOKEN } = require('../config');

let agent = require('superagent-promise')(require('superagent'), Promise);
let request = (url) => {
  console.log('requesting', url);
  return agent.
    get(url)
    .set('Authorization', 'Bearer ' + ACCESS_TOKEN)
    .end()
    .then(({body}) => body)
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
    id      : { type: GraphQLString },
    name    : { type: GraphQLString },
    ownerId : { type: GraphQLString },
    link    : { type: GraphQLString },
    owner   : {
      type : ProfileType,
      resolve : ({ownerId}) => {
        return request(`https://api.mendeley.com:443/profiles/${ownerId}`)
          .then(
            body => ({
              id: body.id,
              name: body.display_name
            })
          );
      }
    },
    members : {
      type : new GraphQLList(GroupMemberProfileType),
      resolve : ({id}) => {
        return request(`https://api.mendeley.com:443/groups/${id}/members`);
      }
    }
  })
});

const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id : { type: GraphQLString },
    name : { type: GraphQLString }
  })
});

const GroupMemberProfileType = new GraphQLObjectType({
  name: 'GroupMemberProfileType',
  fields: () => ({
    profile_id : { type: GraphQLString },
    role : { type: GraphQLString },
    profile : {
      type: ProfileType,
      resolve: ({profile_id}) => {
        return request(`https://api.mendeley.com:443/profiles/${profile_id}`)
          .then(
            body => ({
              id: body.id,
              name: body.display_name
            })
          );
      }
    }
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
            .then( body => ({
                id      : body.id,
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
