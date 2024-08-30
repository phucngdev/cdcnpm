# cài nodejs, npm, git

kiểm tra phiên bản

bật terminal

node -v
sử dụng phiên bản v20.9.0

npm -v
phiên bản 10.1.0

git --version
git version 2.33.0

# clone dự án về máy

git clone https://github.com/phucngdev/cdcnpm.git

# tải các package

mở vscode

bật terminal của folder client:

npm i

bật terminal của folder server:

npm i

# chạy xampp

tạo 1 csdl mới trên phpmyadmin để tên trùng với DB_DATABASE trong .env

vào folder server lấy sql trong file entity.sql

# chạy dự án

bật terminal của folder client:

npm run dev

bật terminal của folder server:

npm start

# chạy postman test api

link test api: http://localhost:3000/api/v1/category

test ra mảng rỗng là ok
