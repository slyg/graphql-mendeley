## Facebook's GraphQL implementation on top of Mendeley's API

### Prerequisites

- `nodejs > 4.0` and `npm`
- Linux/OSX system (Haven't tested on Windows).

### Installation

```$ npm i```

### Configuration

Add a valid token in the `config.json` file

### Start server

```$ npm start```

NB: To start server with live reload: `$ npm run dev`

This will setup a GraphQL endpoint at `http://localhost:3000/graphql`

### Play with it

Request spec:

- Method `POST`
- Headers `Content-Type: application/graphql`

#### Query on a group

Get the name

```
{
    group(id:"e3630413-abd9-3308-8937-c5f119c17a28") {
        name
    }
}

// requesting https://api.mendeley.com:443/groups/e3630413-abd9-3308-8937-c5f119c17a28
```

Get a little bit more informations

```
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

```
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

```
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
