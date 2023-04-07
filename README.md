# intellisoft


# Run application

- Start application
  ```bash
    docker compose up
  ```
- Run db migrations
  ```bash
    docker compose exec backend sh -c "alembic upgrade head"
  ```
