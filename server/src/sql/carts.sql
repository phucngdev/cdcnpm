create table carts
(
    cart_id    char(36)                            not null
        primary key,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    update_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);

INSERT INTO teelabfull.carts (cart_id, created_at, update_at) VALUES ('18c3caa6-ae7b-402a-afa8-38dd8fcd4c78', '2024-09-11 15:48:25', '2024-09-11 15:48:25');
INSERT INTO teelabfull.carts (cart_id, created_at, update_at) VALUES ('5d992f19-2235-4c66-bba2-28d50d99ce18', '2024-09-09 17:28:48', '2024-09-09 17:28:48');
INSERT INTO teelabfull.carts (cart_id, created_at, update_at) VALUES ('68bb26ef-33e5-4824-87dd-1a5f6a6ed1c6', '2024-09-09 17:29:49', '2024-09-09 17:29:49');
INSERT INTO teelabfull.carts (cart_id, created_at, update_at) VALUES ('8b752b2a-cbfc-4079-9116-afc625fc4119', '2024-09-12 16:09:47', '2024-09-12 16:09:47');
INSERT INTO teelabfull.carts (cart_id, created_at, update_at) VALUES ('cd2044c4-2e7c-4738-931f-7cce0dc03638', '2024-09-14 13:01:38', '2024-09-14 13:01:38');
INSERT INTO teelabfull.carts (cart_id, created_at, update_at) VALUES ('e382f53b-d019-4a71-98c4-4d154ce338a4', '2024-09-12 16:11:57', '2024-09-12 16:11:57');
