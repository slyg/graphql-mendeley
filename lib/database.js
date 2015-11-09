'use strict';

const { request } = require('./helpers');

exports.getGroup = (id) => {
  return request(`https://api.mendeley.com:443/groups/${id}`)
    .then( ({id, name, link, owning_profile_id}) => ({
        id,
        name,
        link,
        ownerId : owning_profile_id
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
            role,
            joined,
            id: profile_id
          })
        );
      }
    )
  ;
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
