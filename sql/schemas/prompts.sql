DROP TABLE IF EXISTS prompts CASCADE;

CREATE TABLE IF NOT EXISTS prompts (
    id SERIAL NOT NULL,
    name VARCHAR(255) UNIQUE,
    content TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- This does not work with ./scripts/execute-sql.js
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS
$$ BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS update_modified_time ON prompts;
CREATE TRIGGER update_modified_time
BEFORE UPDATE ON prompts
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
