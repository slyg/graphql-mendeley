'use strict';

const request = require('../utils/request');

exports.getGroup = (id) => {
  return request(`https://api.mendeley.com:443/groups/${id}`)
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
};

exports.getGroupMembers = (groupId, limit) => {
  return request(`https://api.mendeley.com:443/groups/${groupId}/members?limit=${limit}`)
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
}

exports.getAcademicStatuses = () => {
  return request(`https://api.mendeley.com:443/academic_statuses/`)
}

exports.getProfile = (id) => {
  return request(`https://api.mendeley.com:443/profiles/${id}`)
    .then(
      ({id, display_name, title}) => ({
        id,
        name: display_name,
        title
      })
    )
  ;
};

exports.getProfilesFromSearch = (query, limit) => {
  return request(`https://api.mendeley.com:443/search/profiles?query=${query}&limit=${limit}`)
    .then(
      (profiles) => {
        return profiles.map(
          ({id, display_name, title}) => ({
            id,
            name: display_name,
            title
          })
        );
      }
    )
  ;
};
