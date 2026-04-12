# Blogging Platform API

A RESTful API for a personal blogging platform with full CRUD operations.

Project from [roadmap.sh](https://roadmap.sh/projects/blogging-platform-api).

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** PostgreSQL
- **ORM:** Prisma 7

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

```bash
git clone https://github.com/Fikri-20/blogging-platform-api.git
cd blogging-platform-api
npm install
```

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/blog_db"
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

The server runs on `http://localhost:3000`.

## API Endpoints

### Get all posts
```
GET /posts
```

### Search posts
```
GET /posts?term=keyword
```
Searches across title, content, and category fields.

### Get a single post
```
GET /posts/:id
```

### Create a post
```
POST /posts
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content",
  "category": "Category",
  "tags": ["tag1", "tag2"]
}
```

### Update a post
```
PUT /posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "category": "Updated Category",
  "tags": ["tag1", "tag2"]
}
```

### Delete a post
```
DELETE /posts/:id
```

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Post created |
| 204 | Post deleted |
| 400 | Invalid request data |
| 404 | Post not found |
