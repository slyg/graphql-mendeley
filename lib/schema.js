'use strict';

let { request } = require('./helpers');

let {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

let {
  getGroup,
  getGroupMembers,
  getProfile
} = require('./database');

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
        return getProfile(ownerId);
      }
    },
    members : {
      type : new GraphQLList(GroupMemberType),
      args : {
        limit: { name: 'limit', type: GraphQLInt }
      },
      resolve : ({id}, {limit = 10}) => {
        return getGroupMembers(id, limit);
      }
    }
  })
});

const GroupMemberType = new GraphQLObjectType({
  name: 'GroupMemberType',
  fields: () => ({
    id    : { type: GraphQLString },
    role  : { type: GraphQLString },
    profile : {
      type: ProfileType,
      resolve: ({id}) => {
        return getProfile(id);
      }
    }
  })
});

const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id    : { type: GraphQLString },
    name  : { type: GraphQLString }
  })
});

const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    group: {
      type: GroupType,
      description: 'A Mendeley discussion Group',
      args: {
        id: { name: 'id', type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, {id}) => {
        return getGroup(id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: queryType,
});
