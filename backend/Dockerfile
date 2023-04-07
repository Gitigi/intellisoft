FROM python:3.11-alpine3.17 AS builder

RUN apk update && apk add musl-dev libpq-dev gcc

RUN python -m venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .

RUN pip install -r requirements.txt

FROM python:3.11-alpine3.17

RUN apk update && apk add libpq-dev

COPY --from=builder /opt/venv /opt/venv

ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONBUFFERED=1 \
  PATH="/opt/venv/bin:$PATH"

WORKDIR /usr/src/app

COPY . .

CMD uvicorn main:app --reload --host 0.0.0.0
