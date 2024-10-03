create table products
(
    product_id        char(36)                                 not null
        primary key,
    product_name      varchar(255)                             not null,
    thumbnail         varchar(255)                             not null,
    thumbnail_hover   varchar(255)                             not null,
    images            longtext collate utf8mb4_bin             not null,
    status            int            default 1                 null,
    price             decimal(10, 2)                           not null,
    discount          decimal(10, 2) default 0.00              null,
    sold              int            default 0                 null,
    description       text                                     null,
    description_image text                                     null,
    created_at        timestamp      default CURRENT_TIMESTAMP not null,
    update_at         timestamp      default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    category_id       char(36)                                 null,
    price_max         decimal(10, 2)                           not null,
    constraint fk_category
        foreign key (category_id) references categories (category_id)
            on update cascade on delete cascade,
    check (json_valid(`images`))
);
