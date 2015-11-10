'use strict';

const request = require('../utils/request');

exports.getGroup = (id) => request(`https://api.mendeley.com:443/groups/${id}`)
  .then(
    ({id, access_level, created, description, disciplines, link, name, photo, owning_profile_id, role, tags, webpage}) => ({
      id,
      accessLevel: access_level,
      created,
      description,
      disciplines,
      link,
      name,
      photo,
      ownerId : owning_profile_id,
      role,
      tags,
      webpage
    })
  )
;

exports.getGroupMembers = (groupId, limit) => request(`https://api.mendeley.com:443/groups/${groupId}/members?limit=${limit}`)
  .then(
    (members) => {
      return members.map(
        ({profile_id, joined, role}) => ({
          id: profile_id,
          joined,
          role
        })
      );
    }
  )
;

exports.getAcademicStatuses = (limit) => request(`https://api.mendeley.com:443/academic_statuses/`)
  .then(statuses => statuses.slice(0, limit))
;

exports.getDocumentsFromProfileId = (id) => request(`https://api.mendeley.com:443/documents?profile_id=${id}`);

// Profile

const profileDataNormalize = ({id, link, display_name, title}) => ({
  id,
  link,
  name: display_name,
  title
});

exports.getProfile = (id) => {
  return request(`https://api.mendeley.com:443/profiles/${id}`)
    .then(profileDataNormalize)
  ;
};

exports.getProfilesFromSearch = (query, limit) => {
  return request(`https://api.mendeley.com:443/search/profiles?query=${query}&limit=${limit}`)
    .then(profiles => profiles.map(profileDataNormalize))
  ;
};
