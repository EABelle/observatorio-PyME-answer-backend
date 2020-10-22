# graphql-and-rest-express-server

## Requirements

### For production

As this server runs into a **Docker** container (tested with Docker v19.03.5, so this version is recommended), you'll need to install Docker first:

- Docker v19.03: https://docs.docker.com/install/

Also, as you'll need **docker-compose** to run it with a MongoDB container:

- Docker Compose v1.24.1: https://docs.docker.com/compose/install/

#### Run

**The following environvent variables are necessary:**

- `NODE_ENV`: (`NODE_ENV=production`) 
- `PORT`: The port which the server will be listening (`example: 8080`)
- `EXTERNAL_SERVER_PORT`: The port which binds the application port with the docker ports (`example: 8080`)
- `DOCKER_SERVER_PORTS`: The **ports** value for the web app section of the `docker-compose.yml`, which matches with EXTERNAL_SERVER_PORT:PORT (i.e.: `8080:8080`) 
- `MONGODB_URI`: The uri for the app to connect to the database (i.e.: `mongodb://localhost:270127/workast`)
- `DOCKER_MONGO_PORTS`: The **ports** value for the mongo section of the `docker-compose.yml`, the value of the right has to match with the port of the URI (i.e.: `270127:27017`)
- `API_KEY`: The value of the header which has to match to authorize the requests. (i.e. `5CD4ED173E1C95FE763B753A297D5`).

You may use a `.env` named file like the following, at the root of your working tree, to provide the variables to the app:

```dotenv
NODE_ENV=production

PORT=8080
EXTERNAL_SERVER_PORT=8080
DOCKER_SERVER_PORTS=8080:8080

SERVER_MONGODB_PORT=27017
EXTERNAL_MONGODB_PORT=27017
DOCKER_MONGO_PORTS=27017:27017

MONGODB_URI=mongodb://mongo:27017/workast

API_KEY=5CD4ED173E1C95FE763B753A297D5
```

**The above configuration exposes the API to `http://localhost:8080/`*

Then, you only have to run the following command to build and run both app and MongoDB containers:
```
$ docker-compose up --build
```

### For development

**Node.js**: The project runs with the Node.js v10.15.3, so that is not recommended the using of previous versions.
This version is also present within the `.nvmrc` file in case you have **nvm** installed.

Once you have Node installed, execute:

```
$ npm i
```


To run tests:

```
$ npm test
```

To run the server locally in develoment mode (you need to provide the NODE_ENV, PORT and MONGODB_URI):

```
$ npm run dev
```

## Using the api

#### Authentication

It's necessary tu set to every request an `x-api-key` header, which value must be the same as the environment variable set to the server in order to authorize the requests.
Example of header: `x-api-key: 5CD4ED173E1C95FE763B753A297D5` 

#### Endpoints and methods

**A Postman collection is provided in order to show examples of the requests: https://www.getpostman.com/collections/fedfd07ad9655301249e*

The followings are the HTTP methods and endpoints of the API:

- `POST /users`

  Creates a new user

  - body:
  ```typescript
    {
        "name": string,
        "avatar": string
    }
  ```
  ***name** field is mandatory

- `POST /articles`

  Creates a new article

  - body:
  ```typescript
    {
        "userId": string,
        "text": string,
        "title": string,
        "tags": string[],
     }
  ```
  ***userId** field is mandatory

- `GET /users?tag=tag1&tag=tag2&...`
    
    Receives an array of `tag`'s (as query params: `?tag=tag1&tag=tag2&...`) and returns all articles (from all users) that contains the given tag(s) (1 or more)

    - Query params:
        - `tag`: it can be multiple, as the server takes them as an array.
- `PUT /users/:id`

  Updates an article. The body of the request is the full new article.
  
  - body:
    ```typescript
      {
          "userId": string,
          "text": string,
          "title": string,
          "tags": string[],
       }
    ```
  - params: `/:id`: The id of the article

- `DELETE /users/:id`

  Deletes an article. 
  - params: `/:id`: The id of the article

#### GraphQL
The GraphiQL API is exposed at `/graphql`
