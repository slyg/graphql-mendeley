'use strict';

const request = require('../utils/request');

// Groups

const groupDataNormalize = ({id, access_level, created, description, disciplines, link, name, photo, owning_profile_id, role, tags, webpage}) => ({
  id,
  accessLevel: access_level,
  created, description, disciplines, link, name, photo,
  ownerId : owning_profile_id,
  role, tags, webpage
});

const groupMembersNormalize = ({profile_id, joined, role}) => ({
  id: profile_id,
  joined, role
});

exports.getGroups = () =>
  request(`https://api.mendeley.com:443/groups`)
    .then(groups => groups.map(groupDataNormalize));

exports.getGroup = (id) =>
  request(`https://api.mendeley.com:443/groups/${id}`)
    .then(groupDataNormalize);

exports.getGroupMembers = (groupId, limit) =>
  request(`https://api.mendeley.com:443/groups/${groupId}/members?limit=${limit}`)
    .then(members => members.map(groupMembersNormalize));

// Academic Statuses

exports.getAcademicStatuses = (limit) =>
  request(`https://api.mendeley.com:443/academic_statuses/`)
    .then(statuses => statuses.slice(0, limit));

// Documents

exports.getDocumentsFromProfileId = (id) => request(`https://api.mendeley.com:443/documents?profile_id=${id}`);

// Profiles

const profileDataNormalize = ({id, link, display_name, title}) => ({
  id, link,
  name: display_name,
  title
});

exports.getProfile = (id) =>
  request(`https://api.mendeley.com:443/profiles/${id}`)
    .then(profileDataNormalize);

exports.getProfilesFromSearch = (query, limit) =>
  request(`https://api.mendeley.com:443/search/profiles?query=${query}&limit=${limit}`)
    .then(profiles => profiles.map(profileDataNormalize));
