## GraphQL implementation on top of Mendeley's REST api

NB: This is just a sandbox app

### Prerequisites

`nodejs > 4.0` and `npm`

### Installation

```shell
$ npm i
```

### Configuration

Add a valid token in a `config.json` file, e.g.:
```json
{
  "ACCESS_TOKEN": "SDaSD6VSDfFVgg3FV4SsD5gFV2S6VSDfFVgD3FV4sD5gFV2SD3SsD5gFV"
}
```

### Start server

```shell
$ npm start
```

NB: To start server with live reload: `$ npm run dev`

This will setup a GraphQL endpoint at `http://localhost:3000/graphql`

### Play with it

Use your browser on `http://localhost:3000/graphql` to access a graph*i*ql GUI.

#### Query on a group

Get the name

```graphql
{
    group(id:"e3630413-abd9-3308-8937-c5f119c17a28") {
        name
    }
}

// requesting https://api.mendeley.com:443/groups/e3630413-abd9-3308-8937-c5f119c17a28
```

Get a little bit more informations

```graphql
{
    group(id:"e3630413-abd9-3308-8937-c5f119c17a28") {
        name,
        link,
        ownerId
    }
}

// requesting https://api.mendeley.com:443/groups/e3630413-abd9-3308-8937-c5f119c17a28
```


Get some informations about its owner

```graphql
{
    group(id:"e3630413-abd9-3308-8937-c5f119c17a28") {
        name,
        owner {
          name
        }
    }
}

// requesting https://api.mendeley.com:443/groups/e3630413-abd9-3308-8937-c5f119c17a28
// requesting https://api.mendeley.com:443/profiles/69df88dc-f4fd-3faf-82d2-353363aa7138
```

Get Members of this group, their role and their profile (name and id)

```graphql
{
    group(id:"e3630413-abd9-3308-8937-c5f119c17a28") {
        name,
        members {
            role,
            profile {
                name, id
            }
        }
    }
}
```

Add some limits to the fetch

```graphql
{
    group(id:"e3630413-abd9-3308-8937-c5f119c17a28") {
        name,
        members(limit: 5) {
            role,
            profile {
                name, id
            }
        }
    }
}
```
