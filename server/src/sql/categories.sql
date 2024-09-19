create table categories
(
    category_id    char(36)                            not null
        primary key,
    category_name  varchar(255)                        not null,
    path           varchar(255)                        not null,
    created_at     timestamp default CURRENT_TIMESTAMP not null,
    update_at      timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    category_index int auto_increment,
    constraint category_index
        unique (category_index)
);

