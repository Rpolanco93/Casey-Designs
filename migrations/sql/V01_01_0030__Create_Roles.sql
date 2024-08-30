CREATE TABLE roles (
    id          BIGSERIAL   NOT NULL PRIMARY KEY,
    name        TEXT        NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at  TIMESTAMPTZ
);

ALTER SEQUENCE roles_id_seq START WITH 100000 RESTART;

CREATE TRIGGER roles_updated_at
    BEFORE UPDATE ON roles
    FOR EACH ROW EXECUTE PROCEDURE SET_UPDATED_AT();

CREATE TABLE user_roles (
    user_id    BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    role_id    BIGINT      NOT NULL REFERENCES roles (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    PRIMARY KEY (user_id, role_id)
);

CREATE INDEX ON user_roles (role_id);
