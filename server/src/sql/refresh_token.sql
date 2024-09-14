create table refresh_token
(
    refresh_token_id char(36) not null primary key,
    token            char(36) not null unique,
);

