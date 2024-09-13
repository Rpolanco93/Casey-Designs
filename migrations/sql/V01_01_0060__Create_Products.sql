CREATE TABLE products (
    id          BIGSERIAL   NOT NULL PRIMARY KEY,
    seller_id   BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    name        TEXT        NOT NULL,
    description TEXT,
    price       REAL        NOT NULL,
    deleted     BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at  TIMESTAMPTZ
);

CREATE INDEX ON products (seller_id);

ALTER SEQUENCE products_id_seq START WITH 100000 RESTART;

CREATE TRIGGER products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE PROCEDURE SET_UPDATED_AT();
