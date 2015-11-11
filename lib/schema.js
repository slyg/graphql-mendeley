'use strict';

const {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const {
  getGroups,
  getGroup,
  getGroupMembers,
  getProfile,
  getAcademicStatuses,
  getProfilesFromSearch,
  getDocumentsFromProfileId
} = require('./database');

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    id          : { type: GraphQLString },
    accessLevel : { type: GraphQLString, description: 'Group\'s access level' },
    created     : { type: GraphQLString, description: 'Group\'s creation date' },
    description : { type: GraphQLString, description: 'Group\'s description' },
    link        : { type: GraphQLString, description: 'Url of the group' },
    members     : {
      type : new GraphQLList(GroupMemberType),
      description: 'List of group\'s members profile' ,
      args : {
        limit: { name: 'limit', type: GraphQLInt }
      },
      resolve : ({id}, {limit = 10}) => getGroupMembers(id, limit)
    },
    name        : { type: GraphQLString, description: 'Group\'s name'},
    ownerId     : { type: GraphQLString, description: 'Profile id of group owner' },
    owner       : {
      type : ProfileType,
      description: 'Profile of the group owner',
      resolve : ({ownerId}) => getProfile(ownerId)
    },
    role        : { type: GraphQLString },
    webpage     : { type: GraphQLString, description: 'Group\'s webpage' }
  })
});

const GroupMemberType = new GraphQLObjectType({
  name: 'GroupMemberType',
  fields: () => ({
    id    : { type: GraphQLString },
    role  : { type: GraphQLString, description: 'Role of member in the group' },
    profile : {
      type: ProfileType,
      resolve: ({id}) => getProfile(id)
    }
  })
});

const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id        : { type: GraphQLString },
    name      : { type: GraphQLString, description: 'profile\'s user fullname' },
    title     : { type: GraphQLString, description: 'Title, e.g. Dr, PhD, etc.' },
    link      : { type: GraphQLString, description: 'Url of user\'s profile' },
    documents : {
      type: new GraphQLList(DocumentType),
      description: 'list of user\'s documents',
      resolve: ({id}) => getDocumentsFromProfileId(id)
    }
  })
});

const DocumentType = new GraphQLObjectType({
  name: 'DocumentType',
  fields: () => ({
    title: { type: GraphQLString }
  })
});

const AcademicStatusType = new GraphQLObjectType({
  name: 'AcademicStatusType',
  fields: () => ({
    description: { type: GraphQLString, description: 'Academic status' },
    profiles: {
      type: new GraphQLList(ProfileType),
      description: 'Profiles with associated academic status',
      args: {
        limit: { name: 'limit', type: GraphQLInt }
      },
      resolve: ({description}, {limit = 5}) => getProfilesFromSearch(description, limit)
    },
  })
});

const QueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    groups: {
      type: new GraphQLList(GroupType),
      description: 'Mendeley discussion Group list',
      resolve: () => getGroups()
    },
    group: {
      type: GroupType,
      description: 'A Mendeley discussion Group',
      args: {
        id: { name: 'id', type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, {id}) => getGroup(id)
    },
    profile: {
      type: ProfileType,
      description: 'A Mendeley user profile',
      args: {
        id: { name: 'id', type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, {id}) => getProfile(id)
    },
    academicStatuses: {
      type: new GraphQLList(AcademicStatusType),
      description: 'List of academic statuses',
      args: {
        limit: { name: 'limit', type: GraphQLInt }
      },
      resolve: (_, {limit = 50}) => getAcademicStatuses(limit)
    }
  }
});

module.exports = new GraphQLSchema({
  query: QueryType
});
