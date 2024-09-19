create table color_size
(
    color_size_id char(36) not null
        primary key,
    product_id    char(36) null,
    color_id      char(36) null,
    size_id       char(36) null,
    constraint fk_color
        foreign key (color_id) references colors (color_id)
            on delete cascade,
    constraint fk_product
        foreign key (product_id) references products (product_id)
            on delete cascade,
    constraint fk_size
        foreign key (size_id) references sizes (size_id)
            on delete cascade
);

INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('01d7045e-6395-4b5b-acbc-2b3b36e0c1d4', 'b0360b8b-d781-4dea-8458-e547493f8a43', '92639fa9-87d8-42d6-a671-44c2554c190c', '8a794a67-5801-4afb-8d47-5ecb7931f0cb');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('02c4845c-a3de-455d-b50f-00c90c533a69', 'b0360b8b-d781-4dea-8458-e547493f8a43', '92639fa9-87d8-42d6-a671-44c2554c190c', '9d255578-4b35-4b44-94bc-37770a7c813a');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('0540c850-1a0c-4faf-b567-0e729f68e27b', 'b0360b8b-d781-4dea-8458-e547493f8a43', '92639fa9-87d8-42d6-a671-44c2554c190c', 'd8eb903b-1ab8-42a6-b0ef-665c3d60887b');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('2dba158a-a7a3-472c-a42b-9c3c43908172', '193282af-f128-494d-b3cb-eb38aa13af01', 'f5bb96e2-e078-4a94-90ae-f1a777c0937e', '714ab77b-292b-4c98-8954-859351508dec');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('3f40b266-a45f-4e31-a741-7c32326e4257', 'b0360b8b-d781-4dea-8458-e547493f8a43', '73c05d03-7ea0-4dae-a10c-4e3f34543970', '3cda354f-0d7e-47f4-8c45-8c1a45541a52');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('88a8eb8e-c0fa-46fb-8817-866df5b48969', '193282af-f128-494d-b3cb-eb38aa13af01', 'f5bb96e2-e078-4a94-90ae-f1a777c0937e', 'a7d41e41-bdee-46cc-9c45-81e08d68a2a4');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('8d1fea00-cb80-4681-9752-3eaa5618fcd2', '193282af-f128-494d-b3cb-eb38aa13af01', 'eb8c5b89-d05e-4d97-853b-d33fd210a5eb', 'd3e82b2b-de64-411f-82d2-15313002bcdd');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('a20a8986-847e-4cef-a9f8-a2e5f027e2b9', 'b0360b8b-d781-4dea-8458-e547493f8a43', '73c05d03-7ea0-4dae-a10c-4e3f34543970', '5488ca8a-018f-493e-8aba-a8f330d7af62');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('c52d789e-38fc-4c51-9401-1830fdc5ee72', '193282af-f128-494d-b3cb-eb38aa13af01', 'eb8c5b89-d05e-4d97-853b-d33fd210a5eb', 'e2181dc7-4066-4937-8126-9ea069a14b53');
INSERT INTO teelabfull.color_size (color_size_id, product_id, color_id, size_id) VALUES ('cb08ddfd-30f9-4f1a-bfa7-8012e395ed99', '193282af-f128-494d-b3cb-eb38aa13af01', 'f5bb96e2-e078-4a94-90ae-f1a777c0937e', 'df3792a6-0cf7-4ce2-b135-6710903ca438');
