CREATE TABLE product_categories (
    product_id  BIGINT      NOT NULL REFERENCES products   (id) ON DELETE CASCADE,
    category_id BIGINT      NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    PRIMARY KEY (product_id, category_id)
);

CREATE INDEX ON product_categories (category_id);
