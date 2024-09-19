create table orders
(
    order_id       char(36)                                             not null
        primary key,
    user_id        char(36)                                             null,
    total          decimal(10, 2)                                       not null,
    transaction    enum ('normal', 'zalopay') default 'normal'          null,
    payment_status enum ('0', '1')            default '0'               null,
    status         enum ('0', '1', '2', '3')  default '0'               null,
    created_at     timestamp                  default CURRENT_TIMESTAMP not null,
    update_at      timestamp                  default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    address        varchar(255)                                         not null,
    city           varchar(255)                                         not null,
    district       varchar(255)                                         not null,
    ward           varchar(255)                                         not null,
    phone          varchar(20)                                          not null,
    email          varchar(255)                                         not null,
    note           varchar(255)                                         null,
    username       varchar(255)                                         not null,
    constraint fk_user
        foreign key (user_id) references users (user_id)
            on delete cascade
);

INSERT INTO teelabfull.orders (order_id, user_id, total, transaction, payment_status, status, created_at, update_at, address, city, district, ward, phone, email, note, username) VALUES ('2eb70869-dc1e-43f3-88b1-bb02104c91de', '90e0bf1e-0a0b-45c5-9812-f75468ecc998', 804000.00, 'zalopay', '1', '1', '2024-09-11 22:27:35', '2024-09-12 22:21:31', 'Việt cường', 'Thành phố Hà Nội', 'Quận Cầu Giấy', 'Phường Mai Dịch', '0793395545', 'phucnguyen09022003@gmail.com', 'mì tôm hảo hảo', 'phucdeptrai 2');
INSERT INTO teelabfull.orders (order_id, user_id, total, transaction, payment_status, status, created_at, update_at, address, city, district, ward, phone, email, note, username) VALUES ('46a89d79-ab46-4e28-b5f8-a689de0dac1b', '90e0bf1e-0a0b-45c5-9812-f75468ecc998', 1196000.00, 'normal', '0', '0', '2024-09-12 21:18:49', '2024-09-12 21:18:49', 'Việt cường', 'Tỉnh Hà Giang', 'Huyện Đồng Văn', 'Xã Lũng Cú', '0793395545', 'phucnguyen09022003@gmail.com', '', 'phuc');
INSERT INTO teelabfull.orders (order_id, user_id, total, transaction, payment_status, status, created_at, update_at, address, city, district, ward, phone, email, note, username) VALUES ('5da20e22-8f24-4688-87f4-7dea1dbe0be7', '90e0bf1e-0a0b-45c5-9812-f75468ecc998', 1220000.00, 'normal', '0', '0', '2024-09-09 19:39:49', '2024-09-09 19:39:49', 'Việt cường', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Phúc Xá', '0793395545', 'phucnguyen09022003@gmail.com', 'thêm hành', 'phucdeptrai');
INSERT INTO teelabfull.orders (order_id, user_id, total, transaction, payment_status, status, created_at, update_at, address, city, district, ward, phone, email, note, username) VALUES ('ab351be3-2a19-49ea-a70c-7cab656c86bb', '90e0bf1e-0a0b-45c5-9812-f75468ecc998', 1620000.00, 'zalopay', '1', '0', '2024-09-09 19:45:36', '2024-09-09 19:45:36', 'Việt cường', 'Tỉnh Bắc Kạn', 'Thành Phố Bắc Kạn', 'Phường Sông Cầu', '0793395545', 'phucnguyen09022003@gmail.com', 'con vịt con', 'phuc');
INSERT INTO teelabfull.orders (order_id, user_id, total, transaction, payment_status, status, created_at, update_at, address, city, district, ward, phone, email, note, username) VALUES ('dd49fc27-7666-4de1-bb9e-91a7812e4dd2', 'e261b4ec-49e0-4376-93c8-4c3d363b6cd9', 548000.00, 'normal', '0', '0', '2024-09-17 11:16:23', '2024-09-17 11:16:23', 'Việt cường', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Liễu Giai', '0793395545', 'phucnguyen09022003@gmail.com', '', 'phucdeptrai');
