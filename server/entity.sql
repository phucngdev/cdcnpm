CREATE TABLE categories (
    category_id CHAR(36) PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    product_id CHAR(36) PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    thumbnail_hover VARCHAR(255) NOT NULL,
    images JSON NOT NULL,
    status INT DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    sold INT DEFAULT 0,
    description TEXT,
    description_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    category_id CHAR(36),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE colors (
    color_id CHAR(36) PRIMARY KEY,
    color_name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE sizes (
    size_id CHAR(36) PRIMARY KEY,
    size_name VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 0
);


CREATE TABLE color_size (
    color_size_id CHAR(36) PRIMARY KEY,
    product_id CHAR(36),
    color_id CHAR(36),
    size_id CHAR(36),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_color FOREIGN KEY (color_id) REFERENCES colors(color_id) ON DELETE CASCADE,
    CONSTRAINT fk_size FOREIGN KEY (size_id) REFERENCES sizes(size_id) ON DELETE CASCADE
);

CREATE TABLE order_details (
    order_detail_id CHAR(36) PRIMARY KEY,
    product_id CHAR(36),
    color_id CHAR(36),
    size_id CHAR(36),
    CONSTRAINT fk_order_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_order_color FOREIGN KEY (color_id) REFERENCES colors(color_id) ON DELETE CASCADE,
    CONSTRAINT fk_order_size FOREIGN KEY (size_id) REFERENCES sizes(size_id) ON DELETE CASCADE
);

