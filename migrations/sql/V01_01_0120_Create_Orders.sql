CREATE TABLE orders (
                        id          UUID   NOT NULL PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
                        purchase_id BIGINT NOT NULL REFERENCES users (id),
                        total       REAL   NOT NULL,
                        created_at  TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
                        updated_at  TIMESTAMPTZ
);

CREATE TRIGGER orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE PROCEDURE SET_UPDATED_AT();
