CREATE TABLE categories (
    id          BIGSERIAL   NOT NULL PRIMARY KEY,
    parent_id   BIGINT      REFERENCES categories (id),
    name        TEXT        NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at  TIMESTAMPTZ
);

ALTER SEQUENCE categories_id_seq START WITH 100000 RESTART;

CREATE TRIGGER categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE PROCEDURE SET_UPDATED_AT();
