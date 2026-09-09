DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL NOT NULL,
    linkedin_id VARCHAR(255) UNIQUE,
    title TEXT NOT NULL,
    company TEXT,
    started_at DATE,
    ended_at DATE,
    duration VARCHAR(100),
    description TEXT,
    skills TEXT[],
    metadata JSONB,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);
