CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS conversations CASCADE;

CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT uuid_generate_v4(),
    metadata JSON,
    messages JSON,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);
