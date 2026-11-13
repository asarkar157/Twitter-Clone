# Database Setup

## Prerequisites

- PostgreSQL installed and running
- Database created (e.g., `twitter_clone`)

## Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `DATABASE_URL` in `.env` with your PostgreSQL credentials:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/twitter_clone
   ```

## Initialize Database

To create all tables and indexes:

```bash
npm run db:init
```

To drop all tables and recreate them (WARNING: This will delete all data):

```bash
npm run db:reset
```

## Database Schema

### Tables

- **users**: User accounts with authentication credentials
- **tweets**: User-generated content (max 280 characters)
- **follows**: Follow relationships between users
- **likes**: User likes on tweets
- **retweets**: User retweets of tweets

### Key Features

- UUID primary keys for all entities
- Foreign key constraints with CASCADE delete
- Indexes on frequently queried columns
- Check constraint to prevent self-follows
- Timestamps for all entities

## Connection Pool

The application uses a PostgreSQL connection pool with the following configuration:

- Max connections: 20
- Idle timeout: 30 seconds
- Connection timeout: 2 seconds

The pool is configured in `src/config/database.ts` and can be imported throughout the application.
