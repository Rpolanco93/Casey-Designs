CREATE TABLE product_reviews (
    product_id  BIGINT   NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    user_id     BIGINT   NOT NULL REFERENCES users    (id) ON DELETE CASCADE,
    review      TEXT     NOT NULL,
    stars       SMALLINT NOT NULL CHECK (stars >= 1 AND stars <= 10),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at  TIMESTAMPTZ,

    PRIMARY KEY (product_id, user_id)
);

CREATE INDEX ON product_reviews (user_id);

CREATE TRIGGER product_reviews_updated_at
    BEFORE UPDATE ON product_reviews
    FOR EACH ROW EXECUTE PROCEDURE SET_UPDATED_AT();
