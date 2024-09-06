CREATE TABLE carts (
    cart_id CHAR(36) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY,
    username  VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    status INT DEFAULT 1,
    avatar VARCHAR(255),
    cart_id CHAR(36) UNIQUE,
    room_id CHAR(36) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE
);

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

CREATE TABLE orders (
    order_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    total DECIMAL(10, 2) NOT NULL,
    transaction ENUM("normal", "zalopay") DEFAULT "normal",
    payment_status ENUM("0", "1") DEFAULT "0",
    status ENUM("0", "1", "2", "3") DEFAULT "0",
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    ward VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    note VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE order_details (
    order_detail_id CHAR(36) PRIMARY KEY,
    order_id CHAR(36),
    product_id CHAR(36),
    color_size_id CHAR(36),
    quantity INT DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_item FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_product_item FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_color_size_item FOREIGN KEY (color_size_id) REFERENCES color_size(color_size_id) ON DELETE CASCADE
);


CREATE TABLE cart_item (
    cart_item_id CHAR(36) PRIMARY KEY,
    cart_id CHAR(36),
    product_id CHAR(36),
    color_size_id CHAR(36),
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_item FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
    CONSTRAINT fk_product_cart_id FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_color_size_cart_item FOREIGN KEY (color_size_id) REFERENCES color_size(color_size_id) ON DELETE CASCADE
);

CREATE TABLE room_chat (
    room_id CHAR(36) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    message_id CHAR(36) PRIMARY KEY,
    room_id CHAR(36) NOT NULL,
    sender_id CHAR(36) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES room_chat(room_id)
);