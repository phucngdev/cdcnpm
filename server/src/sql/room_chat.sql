create table room_chat
(
    room_id    char(36)                            not null
        primary key,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    update_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);

INSERT INTO teelabfull.room_chat (room_id, created_at, update_at) VALUES ('0a3c1adf-fa8b-4e81-90f3-164200206f5a', '2024-09-14 13:01:38', '2024-09-14 13:01:38');
INSERT INTO teelabfull.room_chat (room_id, created_at, update_at) VALUES ('0d70f549-1cfe-4499-935f-1bd066649328', '2024-09-12 16:11:57', '2024-09-12 16:11:57');
INSERT INTO teelabfull.room_chat (room_id, created_at, update_at) VALUES ('1351f38a-ac50-4700-b45a-e13f09793c4d', '2024-09-12 16:09:48', '2024-09-12 16:09:48');
INSERT INTO teelabfull.room_chat (room_id, created_at, update_at) VALUES ('68b5c703-c7c1-4268-900b-695b8c650180', '2024-09-09 17:28:48', '2024-09-09 17:28:48');
INSERT INTO teelabfull.room_chat (room_id, created_at, update_at) VALUES ('bd0f937e-46b3-4bd2-bd1c-4503bff1f584', '2024-09-11 15:48:25', '2024-09-11 15:48:25');
INSERT INTO teelabfull.room_chat (room_id, created_at, update_at) VALUES ('db577f51-31ca-40a0-800b-de8bc0485a6a', '2024-09-09 17:29:49', '2024-09-09 17:29:49');
