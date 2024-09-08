create table cart_item
(
    cart_item_id  char(36)                              not null
        primary key,
    cart_id       char(36)                              null,
    product_id    char(36)                              null,
    color_size_id char(36)                              null,
    quantity      int       default 1                   null,
    created_at    timestamp default current_timestamp() not null,
    update_at     timestamp default current_timestamp() not null on update current_timestamp(),
    constraint fk_cart_item
        foreign key (cart_id) references carts (cart_id)
            on delete cascade,
    constraint fk_color_size_cart_item
        foreign key (color_size_id) references color_size (color_size_id)
            on delete cascade,
    constraint fk_product_cart_id
        foreign key (product_id) references products (product_id)
            on delete cascade
);
