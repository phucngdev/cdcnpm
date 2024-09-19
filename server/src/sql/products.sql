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

INSERT INTO teelabfull.products (product_id, product_name, thumbnail, thumbnail_hover, images, status, price, discount, sold, description, description_image, created_at, update_at, category_id, price_max) VALUES ('193282af-f128-494d-b3cb-eb38aa13af01', 'Áo polo Teelab Local Brand Unisex Struck by Cupid Tshirt TS273', 'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/1-339729eb-4006-40a7-862e-e56acc90b08d.jpg?v=1722062826447', 'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/2-c5e13b06-dae2-4c4b-839a-c17c79ddf262.jpg?v=1722062827093', '["https://bizweb.dktcdn.net/thumb/large/100/415/697/products/nta121-pplltwmq-1-ezx4-hinh-mat-truoc-0.jpg?v=1710412099570","https://bizweb.dktcdn.net/thumb/large/100/415/697/products/z5248902648933-3aee690222b02a7a328c9f4a60789554.jpg?v=1710412089877"]', 1, 176000.00, 20.00, 0, 'description', 'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-5427-1.jpg?v=1714643240400', '2024-09-09 20:40:59', '2024-09-09 20:40:59', 'daad91e8-6452-4b96-82d7-b64205f4b6d0', 220000.00);
INSERT INTO teelabfull.products (product_id, product_name, thumbnail, thumbnail_hover, images, status, price, discount, sold, description, description_image, created_at, update_at, category_id, price_max) VALUES ('b0360b8b-d781-4dea-8458-e547493f8a43', 'Áo polo Teelab Local Brand Unisex Struck by Cupid Tshirt TS273', 'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/1-339729eb-4006-40a7-862e-e56acc90b08d.jpg?v=1722062826447', 'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/2-c5e13b06-dae2-4c4b-839a-c17c79ddf262.jpg?v=1722062827093', '["https://bizweb.dktcdn.net/thumb/large/100/415/697/products/nta121-pplltwmq-1-ezx4-hinh-mat-truoc-0.jpg?v=1710412099570","https://bizweb.dktcdn.net/thumb/large/100/415/697/products/z5248902648933-3aee690222b02a7a328c9f4a60789554.jpg?v=1710412089877"]', 1, 196000.00, 51.00, 0, 'description', 'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-5427-1.jpg?v=1714643240400', '2024-09-09 21:37:22', '2024-09-09 21:37:22', 'daad91e8-6452-4b96-82d7-b64205f4b6d0', 400000.00);
