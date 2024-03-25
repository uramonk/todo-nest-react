# Overview

Todo app using Next.js and Nest.js.

# frontend

https://localhost:3000

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

# backend

https://localhost:3001

## env

1. Rename .env.sample to .env
2. Set the `JWT_SECRET` environment variables

## Create certificates

### mkcert

```bash
brew install mkcert
mkcert -install
```

### Create certificate for localhost

```bash
cd backend
mkcert localhost
```

## Installation

```bash
npm install
```

## Docker

Use docker to build the database.
See `/backend/mysql/initialize/001-init.sql` for schema and initial data.

```bash
docker-compose up -d
```

## Run

```bash
npm run start:dev
```

# References 🙏

- https://zenn.dev/red_frasco/articles/d5b7ec71ceacf6
- https://github.com/tkcel/todo-app-nest-react
- https://zenn.dev/morinokami/articles/nestjs-overview
- https://nestjs.com
- https://nextjs.org
- https://tailwindcss.com
- https://tailwindui.com
- https://recoiljs.org
