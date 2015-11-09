echo '\n\nGet profile\n'
curl -XPOST -H "Content-Type:application/graphql"  -d '{
    profile(id: "1c3ac854-1c3c-3202-9753-93b69dd1566f") {
      name,
      title
    }
}' http://localhost:3000/graphql

echo '\n\nGet members of a group\n'
curl -XPOST -H "Content-Type:application/graphql"  -d '{
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
