CREATE TABLE shopping_cart_items (
    user_id    BIGINT      NOT NULL REFERENCES users    (id) ON DELETE CASCADE,
    product_id BIGINT      NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    quantity   SMALLINT    NOT NULL,
    price      REAL        NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at TIMESTAMPTZ,

    PRIMARY KEY (user_id, product_id)
);

CREATE INDEX ON shopping_cart_items (product_id);

CREATE TRIGGER shopping_cart_items_updated_at
    BEFORE UPDATE ON shopping_cart_items
    FOR EACH ROW EXECUTE PROCEDURE SET_UPDATED_AT();
