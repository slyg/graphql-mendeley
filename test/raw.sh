
curl -XPOST -H "Content-Type:application/graphql"  -d '{
    group(id:"e3630413-abd9-3308-8937-c5f119c17a28") {
      id,
      name,
      owner {
        id,
        name,
      },
      members {
        id,
        role,
        profile {
          id,
          name
        },
      },
    }
}' http://localhost:3000/graphql
