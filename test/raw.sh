echo '\n\nGet profile\n'
curl -XPOST -H "Content-Type:application/graphql" -d '{
    profile(id: "84dfd8f8-cd91-33d9-8eda-c407f2b72f73") {
      name,
      title,
    }
}' http://localhost:3000/graphql
sleep 1

echo '\n\nGet members of a group\n'
curl -XPOST -H "Content-Type:application/graphql" -d '{
    group(id: "e3630413-abd9-3308-8937-c5f119c17a28") {
      id,
      name,
      owner {
        id,
        name,
      },
      members(limit: 3) {
        id,
        role,
        profile {
          name,
        },
      },
    }
}' http://localhost:3000/graphql
sleep 1

echo '\n\nRoot Introspection\n'
curl -XPOST -H "Content-Type:application/graphql" -d '{
    __schema {
        queryType {
            fields {
                name,
                description,
                type {
                  name
                }
            }
        }
    }
}' http://localhost:3000/graphql
sleep 1

echo '\n\nGet profile from academic statuses\n'
curl -XPOST -H "Content-Type:application/graphql" -d '{
    academicStatuses {
      description,
      profiles(limit: 1) {
        name,
        link,
      }
    }
}' http://localhost:3000/graphql
sleep 1

echo '\n\nIntrospection on ProfileType\n'
curl -XPOST -H "Content-Type:application/graphql" -d '{
    __type(name: "ProfileType") {
      fields {
        name,
        description,
        type {
          name
        }
      }
    }
}' http://localhost:3000/graphql
sleep 1

echo '\n\nIntrospection on GroupType\n'
curl -XPOST -H "Content-Type:application/graphql" -d '{
    __type(name: "GroupType") {
      fields {
        name,
        description,
        type {
          name
        }
      }
    }
}' http://localhost:3000/graphql
