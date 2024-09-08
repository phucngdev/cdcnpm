create table carts
(
    cart_id    char(36)                              not null
        primary key,
    created_at timestamp default current_timestamp() not null,
    update_at  timestamp default current_timestamp() not null on update current_timestamp()
);
