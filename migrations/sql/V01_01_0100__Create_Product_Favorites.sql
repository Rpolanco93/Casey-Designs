CREATE TABLE product_favorites (
    product_id BIGINT      NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    user_id    BIGINT      NOT NULL REFERENCES users    (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    PRIMARY KEY (product_id, user_id)
);

CREATE INDEX ON product_favorites (user_id);
