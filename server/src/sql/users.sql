create table users
(
    user_id    char(36)                                         not null
        primary key,
    username   varchar(255)                                     not null,
    email      varchar(255)                                     not null,
    password   varchar(255)                                     not null,
    role       enum ('user', 'admin') default 'user'            null,
    status     int                    default 1                 null,
    avatar     varchar(255)                                     null,
    cart_id    char(36)                                         null,
    room_id    char(36)                                         null,
    created_at timestamp              default CURRENT_TIMESTAMP not null,
    update_at  timestamp              default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint cart_id
        unique (cart_id),
    constraint email
        unique (email),
    constraint room_id
        unique (room_id),
    constraint fk_cart
        foreign key (cart_id) references carts (cart_id)
            on delete cascade,
    constraint users_users__fk
        foreign key (room_id) references room_chat (room_id)
            on delete cascade
);

INSERT INTO teelabfull.users (user_id, username, email, password, role, status, avatar, cart_id, room_id, created_at, update_at) VALUES ('90e0bf1e-0a0b-45c5-9812-f75468ecc998', 'phucnguyen', 'phucnguyen@gmail.com', '$2b$10$tZjAZ5R0Ca0x2/I8hdZ7SOFHqH1H.tXe.1JBn/eeBzUCOkz8tkDai', 'admin', 1, '', '68bb26ef-33e5-4824-87dd-1a5f6a6ed1c6', 'db577f51-31ca-40a0-800b-de8bc0485a6a', '2024-09-09 17:29:49', '2024-09-09 17:32:04');
INSERT INTO teelabfull.users (user_id, username, email, password, role, status, avatar, cart_id, room_id, created_at, update_at) VALUES ('928bfea0-be93-4292-99d0-428bab41fa4f', 'abc', 'freelancerit@gmail.com', '$2b$10$fPsHYw5rltPvqogYsUsuMumrbwUSEAlqqTHkU4CifhX2MyxOf7jKq', 'user', 1, '', 'cd2044c4-2e7c-4738-931f-7cce0dc03638', '0a3c1adf-fa8b-4e81-90f3-164200206f5a', '2024-09-14 13:01:38', '2024-09-14 13:01:38');
INSERT INTO teelabfull.users (user_id, username, email, password, role, status, avatar, cart_id, room_id, created_at, update_at) VALUES ('e261b4ec-49e0-4376-93c8-4c3d363b6cd9', 'phucdeptrai', 'phucnguyen09022003@gmail.com', '$2b$10$bnnBqOLHkhPbFh4dSXuho.rXrhmORnzznlTC1gfwBcP6LmdfzqOx2', 'user', 1, '', 'e382f53b-d019-4a71-98c4-4d154ce338a4', '0d70f549-1cfe-4499-935f-1bd066649328', '2024-09-12 16:11:57', '2024-09-12 16:11:57');
