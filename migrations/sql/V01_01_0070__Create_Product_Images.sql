CREATE TABLE product_images (
    id         BIGSERIAL   NOT NULL PRIMARY KEY,
    product_id BIGINT      NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    url        TEXT        NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP()
);

CREATE INDEX ON product_images (product_id);

ALTER SEQUENCE product_images_id_seq START WITH 100000 RESTART;
