# REST API Routes

## Users Routes

| Method | Endpoint          | Description           | Roles         |
| ------ | ----------------- | --------------------- | ------------- |
| GET    | /api/v1/users     | Get all users         | admin         |
| GET    | /api/v1/users/:id | Get user by ID        | admin, author |
| POST   | /api/v1/users     | Create new user       | admin         |
| PUT    | /api/v1/users/:id | Update user fully     | admin         |
| PATCH  | /api/v1/users/:id | Update user partially | admin         |
| DELETE | /api/v1/users/:id | Delete user           | admin         |

## Posts Routes

| Method | Endpoint                    | Description                          | Roles         |
| ------ | --------------------------- | ------------------------------------ | ------------- |
| GET    | /api/v1/posts               | Get all posts (filtering/pagination) | all users     |
| GET    | /api/v1/posts/:id           | Get a single post                    | all users     |
| POST   | /api/v1/posts               | Create post                          | admin, author |
| PUT    | /api/v1/posts/:id           | Update post fully                    | admin, author |
| PATCH  | /api/v1/posts/:id           | Update post partially                | admin, author |
| DELETE | /api/v1/posts/:id           | Delete post                          | admin         |
| GET    | /api/v1/users/:userId/posts | Get all posts by a specific user     | all users     |

## Comments Routes

| Method | Endpoint                       | Description                 | Roles       |
| ------ | ------------------------------ | --------------------------- | ----------- |
| GET    | /api/v1/posts/:postId/comments | Get all comments for a post | all users   |
| GET    | /api/v1/comments/:id           | Get a single comment        | all users   |
| POST   | /api/v1/posts/:postId/comments | Create comment on a post    | all users   |
| PUT    | /api/v1/comments/:id           | Update comment fully        | owner/admin |
| PATCH  | /api/v1/comments/:id           | Update comment partially    | owner/admin |
| DELETE | /api/v1/comments/:id           | Delete comment              | owner/admin |

## Likes Routes

| Method | Endpoint                         | Description              | Roles     |
| ------ | -------------------------------- | ------------------------ | --------- |
| POST   | /api/v1/posts/:postId/like       | Like a post              | all users |
| DELETE | /api/v1/posts/:postId/like       | Remove like from post    | all users |
| POST   | /api/v1/comments/:commentId/like | Like a comment           | all users |
| DELETE | /api/v1/comments/:commentId/like | Remove like from comment | all users |

## Elasticsearch Routes

### Users Index

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| POST   | /api/v1/es/users        | Index a new user document      |
| GET    | /api/v1/es/users/:id    | Get user document by ID        |
| PUT    | /api/v1/es/users/:id    | Update user document           |
| DELETE | /api/v1/es/users/:id    | Delete user document           |
| GET    | /api/v1/es/users/search | Search users with query params |

### Posts Index

| Method | Endpoint                | Description                                      |
| ------ | ----------------------- | ------------------------------------------------ |
| POST   | /api/v1/es/posts        | Index a new post document                        |
| GET    | /api/v1/es/posts/:id    | Get post document by ID                          |
| PUT    | /api/v1/es/posts/:id    | Update post document                             |
| DELETE | /api/v1/es/posts/:id    | Delete post document                             |
| GET    | /api/v1/es/posts/search | Search posts with filters, pagination, full-text |

### Comments Index

| Method | Endpoint                   | Description                             |
| ------ | -------------------------- | --------------------------------------- |
| POST   | /api/v1/es/comments        | Index a new comment document            |
| GET    | /api/v1/es/comments/:id    | Get comment document by ID              |
| PUT    | /api/v1/es/comments/:id    | Update comment document                 |
| DELETE | /api/v1/es/comments/:id    | Delete comment document                 |
| GET    | /api/v1/es/comments/search | Search comments with filters, full-text |
