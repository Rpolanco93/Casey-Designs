CREATE TABLE order_items (
                             order_id   UUID     NOT NULL REFERENCES orders   (id) ON DELETE CASCADE,
                             product_id BIGINT   NOT NULL REFERENCES products (id) ON DELETE SET NULL,
                             quantity   SMALLINT NOT NULL,
                             price      REAL     NOT NULL,
                             created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
                             updated_at TIMESTAMPTZ,

                             PRIMARY KEY (order_id, product_id)
);

CREATE INDEX ON order_items (product_id);

CREATE TRIGGER order_items_updated_at
    BEFORE UPDATE ON order_items
    FOR EACH ROW EXECUTE PROCEDURE SET_UPDATED_AT();
