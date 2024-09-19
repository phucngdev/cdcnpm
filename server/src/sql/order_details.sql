create table order_details
(
    order_detail_id char(36)                            not null
        primary key,
    order_id        char(36)                            null,
    product_id      char(36)                            null,
    color_size_id   char(36)                            null,
    quantity        int       default 1                 null,
    price           decimal(10, 2)                      not null,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    update_at       timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint fk_color_size_item
        foreign key (color_size_id) references color_size (color_size_id)
            on delete cascade,
    constraint fk_order_item
        foreign key (order_id) references orders (order_id)
            on delete cascade,
    constraint fk_product_item
        foreign key (product_id) references products (product_id)
            on delete cascade
);

INSERT INTO teelabfull.order_details (order_detail_id, order_id, product_id, color_size_id, quantity, price, created_at, update_at) VALUES ('2f3235ed-14ed-4918-aca2-737dab88f377', 'dd49fc27-7666-4de1-bb9e-91a7812e4dd2', '193282af-f128-494d-b3cb-eb38aa13af01', '2dba158a-a7a3-472c-a42b-9c3c43908172', 1, 176000.00, '2024-09-17 11:16:23', '2024-09-17 11:16:23');
INSERT INTO teelabfull.order_details (order_detail_id, order_id, product_id, color_size_id, quantity, price, created_at, update_at) VALUES ('3f5d0835-2a0d-4611-8069-7813514cfbbf', '2eb70869-dc1e-43f3-88b1-bb02104c91de', 'b0360b8b-d781-4dea-8458-e547493f8a43', '02c4845c-a3de-455d-b50f-00c90c533a69', 4, 196000.00, '2024-09-11 22:27:35', '2024-09-11 22:27:35');
INSERT INTO teelabfull.order_details (order_detail_id, order_id, product_id, color_size_id, quantity, price, created_at, update_at) VALUES ('78e365d1-1a49-49fb-95fa-95ee5d691f90', '46a89d79-ab46-4e28-b5f8-a689de0dac1b', 'b0360b8b-d781-4dea-8458-e547493f8a43', '01d7045e-6395-4b5b-acbc-2b3b36e0c1d4', 2, 196000.00, '2024-09-12 21:18:49', '2024-09-12 21:18:49');
INSERT INTO teelabfull.order_details (order_detail_id, order_id, product_id, color_size_id, quantity, price, created_at, update_at) VALUES ('96e37608-8bd1-4efd-94c9-70cf944e6d25', 'dd49fc27-7666-4de1-bb9e-91a7812e4dd2', '193282af-f128-494d-b3cb-eb38aa13af01', '88a8eb8e-c0fa-46fb-8817-866df5b48969', 2, 176000.00, '2024-09-17 11:16:23', '2024-09-17 11:16:23');
INSERT INTO teelabfull.order_details (order_detail_id, order_id, product_id, color_size_id, quantity, price, created_at, update_at) VALUES ('c484fa42-be3c-4ab3-9a36-29e74f9457b9', '46a89d79-ab46-4e28-b5f8-a689de0dac1b', 'b0360b8b-d781-4dea-8458-e547493f8a43', '02c4845c-a3de-455d-b50f-00c90c533a69', 4, 196000.00, '2024-09-12 21:18:49', '2024-09-12 21:18:49');
