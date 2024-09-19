create table cart_item
(
    cart_item_id  char(36)                            not null
        primary key,
    cart_id       char(36)                            null,
    product_id    char(36)                            null,
    color_size_id char(36)                            null,
    quantity      int       default 1                 null,
    created_at    timestamp default CURRENT_TIMESTAMP not null,
    update_at     timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
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

INSERT INTO teelabfull.cart_item (cart_item_id, cart_id, product_id, color_size_id, quantity, created_at, update_at) VALUES ('2d60948f-f671-4feb-b65d-618a8804d67f', 'e382f53b-d019-4a71-98c4-4d154ce338a4', '193282af-f128-494d-b3cb-eb38aa13af01', '88a8eb8e-c0fa-46fb-8817-866df5b48969', 2, '2024-09-17 11:15:39', '2024-09-17 11:15:39');
INSERT INTO teelabfull.cart_item (cart_item_id, cart_id, product_id, color_size_id, quantity, created_at, update_at) VALUES ('6b182fcc-01b8-4623-ac67-48347ec0e9a3', '68bb26ef-33e5-4824-87dd-1a5f6a6ed1c6', 'b0360b8b-d781-4dea-8458-e547493f8a43', '01d7045e-6395-4b5b-acbc-2b3b36e0c1d4', 2, '2024-09-11 22:28:29', '2024-09-12 21:18:40');
INSERT INTO teelabfull.cart_item (cart_item_id, cart_id, product_id, color_size_id, quantity, created_at, update_at) VALUES ('78c669a1-189c-40bb-83e9-f38c0b157f1e', 'e382f53b-d019-4a71-98c4-4d154ce338a4', '193282af-f128-494d-b3cb-eb38aa13af01', '2dba158a-a7a3-472c-a42b-9c3c43908172', 1, '2024-09-17 11:15:33', '2024-09-17 11:15:33');
INSERT INTO teelabfull.cart_item (cart_item_id, cart_id, product_id, color_size_id, quantity, created_at, update_at) VALUES ('c286dccf-a086-4a4c-b846-0f2fbc9bab84', '68bb26ef-33e5-4824-87dd-1a5f6a6ed1c6', 'b0360b8b-d781-4dea-8458-e547493f8a43', '02c4845c-a3de-455d-b50f-00c90c533a69', 4, '2024-09-11 15:18:31', '2024-09-11 21:43:51');
