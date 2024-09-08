create table categories
(
    category_id   char(36)                              not null
        primary key,
    category_name varchar(255)                          not null,
    path          varchar(255)                          not null,
    created_at    timestamp default current_timestamp() not null,
    update_at         timestamp      default current_timestamp() not null on update current_timestamp(),
    `index`       int                                   null
);
