## Dukaan internship assignment bonus section

## Run locally

```bash
$ git clone https://github.com/sayeed205/dukaan-internship-assignment-bonus.git
$ cd dukaan-internship-assignment-bonus
$ pnpm install
```

Add a `.env` file in the root directory with the following content:

```env
JWT_SECRET=<secrete_key_for_jwt>
DATABASE_NAME= <database_name>
DATABASE_USERNAME = <database_username>
DATABASE_PASSWORD = <database_password>
```

Then run the following command:

```bash
$ pnpm build
$ pnpm start
```

It will start the server on `http://localhost:5000`.
You should see the following output:

```bash
$ pnpm start

> dukaan-internship-assignment-bonus@1.0.0 start D:\GitHub\dukaan-internship-assignment-bonus
> node dist/server.js

Connecting to database...
Executing (default): SELECT 1+1 AS result
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='User';
Executing (default): PRAGMA INDEX_LIST(`User`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_User_1`)
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='ChatBot';
Executing (default): PRAGMA INDEX_LIST(`ChatBot`)
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='conversations';
Executing (default): PRAGMA INDEX_LIST(`conversations`)
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='EndUser';
Executing (default): PRAGMA INDEX_LIST(`EndUser`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_EndUser_1`)
⚡️[server]: Server is running at http://localhost:5000
```

## API Documentation

You can find postman collection [here](./Dukaan-bonus.postman_collection.json) to test the api

### Authentication

#### User Registration

```http
POST /api/auth/signup/user

Content-Type: application/json

{
    "email": "test@gmail.com",
    "password": "Abcd@1234",
    "name": "Sayed Ahmed"
}

```

#### User Login

```http
POST /api/auth/login/user

Content-Type: application/json

{
    "email": "test@gmail.com",
    "password": "Abcd@1234"
}
```

#### End User Registration

```http
POST /api/auth/signup/end-user

Content-Type: application/json

{
    "email": "test@abc.com",
    "password": "Abcd@1234",
    "name": "Sayed Ahmed"
}

```

#### End User Login

```http

POST /api/auth/login/end-user

Content-Type: application/json

{
    "email": "test@abc.com",
    "password": "Abcd@1234"
}

```

These endpoints return a JSON object containing the following properties:

It will return a JWT token which will be used for authentication.

```bash
{
    "ok": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### ChatBots

#### Create ChatBot

```http
POST /api/chatbot

Content-Type: application/json

Authorization: Bearer <token>

{
    "name": "OpenAI Bot",
    "description": "manage your groups"
}
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "chatbot": {
        "id": 6,
        "name": "OpenAI Bot",
        "description": "manage your groups",
        "userId": 2,
        "updatedAt": "2023-08-26T14:32:55.628Z",
        "createdAt": "2023-08-26T14:32:55.628Z"
    }
}
```

#### Get ChatBots

```http
GET /api/chatbot/user/:id?p=1&l=2&q=

```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "data": {
        "chatbots": [
            {
                "id": 2,
                "name": "Rose Bot",
                "description": "manage your groups"
            },
            {
                "id": 3,
                "name": "Hitarashi Bot",
                "description": "Personal chat bot"
            }
        ],
        "page": 1,
        "limit": 2,
        "total": 5,
        "totalPages": 3
    }
}
```

#### Get ChatBot

```http
GET /api/chatbot/:id

```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "chatbot": {
        "id": 2,
        "name": "Rose Bot",
        "description": "manage your groups",
        "userId": 2,
        "createdAt": "2021-08-26T14:32:55.628Z",
        "updatedAt": "2021-08-26T14:32:55.628Z"
    }
}
```

#### Update ChatBot

```http
PUT /api/chatbot/:id

Content-Type: application/json

Authorization: Bearer <token>

{
    "name": "Rose Bot",
    "description": "manage your groups"
}
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "chatbot": {
        "id": 2,
        "name": "Rose Bot",
        "description": "manage your groups",
        "userId": 2,
        "createdAt": "2021-08-26T14:32:55.628Z",
        "updatedAt": "2021-08-26T14:32:55.628Z"
    }
}
```

#### Delete ChatBot

```http
DELETE /api/chatbot/:id

Authorization: Bearer <token>
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "message": "ChatBot deleted successfully"
}
```

### Conversations

#### Create Conversation

```http
POST /api/conversation

Content-Type: application/json

Authorization: Bearer <token>

{
    "title": "what is kotlin",
    "content": "Give a brief description of kotlin",
    "chatbotId": 5
}
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "conversation": {
        "id": 6,
        "title": "what is kotlin",
        "content": "Give a brief description of kotlin",
        "chatbotId": 5,
        "updatedAt": "2021-08-26T14:32:55.628Z",
        "createdAt": "2021-08-26T14:32:55.628Z"
    }
}
```

#### Get Conversations

```http
GET /api/conversation/chatbot/:id?p=1&l=2&q=

Authorization: Bearer <token>

```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "data": {
        "conversations": [
            {
                "id": 1,
                "title": "what is kotlin",
                "content": "Give a brief description of kotlin",
                "isComplete": true,
                "endUserId": 2,
                "chatbotId": 5,
                "createdAt": "2023-08-26T13:46:43.364Z"
            },
            {
                "id": 2,
                "title": "what is kotlin",
                "content": "Give a brief description of kotlin",
                "isComplete": false,
                "endUserId": 2,
                "chatbotId": 5,
                "createdAt": "2023-08-26T14:12:15.019Z"
            }
        ],
        "page": 1,
        "limit": 2,
        "total": 2,
        "totalPages": 1
    }
}
```

#### Get Conversation

```http
GET /api/conversation/:id

Authorization: Bearer <token>
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "conversation": {
        "id": 1,
        "title": "what is kotlin",
        "content": "Give a brief description of kotlin",
        "isComplete": true,
        "endUserId": 2,
        "chatbotId": 5,
        "createdAt": "2023-08-26T13:46:43.364Z"
    }
}
```

#### Update Conversation

```http
PUT /api/conversation/:id

Content-Type: application/json

Authorization: Bearer <token>

{
    "isComplete": true
}
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "conversation": {
        "id": 1,
        "title": "what is kotlin",
        "content": "Give a brief description of kotlin",
        "isComplete": true,
        "endUserId": 2,
        "chatbotId": 5,
        "createdAt": "2023-08-26T13:46:43.364Z"
    }
}
```

#### Delete Conversation

```http
DELETE /api/conversation/:id

Authorization: Bearer <token>
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "message": "Conversation deleted successfully"
}
```

### End Users

#### Get End Users

```http
GET /api/end-user?p=1&l=2&q=

```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "data": {
        "endUsers": [
            {
                "id": 2,
                "name": "Sayed Ahmed",
                "email": "test@gmail.com"
            }
        ],
        "page": 1,
        "limit": 10,
        "total": 1,
        "totalPages": 1
    }
}
```

#### Get End User

```http
GET /api/end-user/:id

```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "endUser": {
        "id": 2,
        "name": "Sayed Ahmed",
        "email": "test@gmail.com"
    }
}
```

#### Update End User

```http
PUT /api/end-user/:id

Content-Type: application/json

Authorization: Bearer <token>

{
    "name": "Sayed Ahmed"
}
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "endUser": {
        "id": 2,
        "name": "Sayed Ahmed",
        "email": "test@gmail.com",
        "updatedAt": "2023-08-26T14:50:33.121Z"
    }
}
```

#### Delete End User

```http
DELETE /api/end-user/:id

Authorization: Bearer <token>
```

This will return a JSON object containing the following properties:

```json
{
    "ok": true,
    "message": "EndUser deleted successfully"
}
```
