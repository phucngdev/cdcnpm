cài nodejs, npm, git

kiểm tra phiên bản
bật terminal

node -v

clone dự án về máy

git clone https://github.com/phucngdev/cdcnpm.git

mở vscode 

bật terminal của folder client:

npm i

bật terminal của folder server:

npm i

chạy xampp
tạo 1 csdl mới trên phpmyadmin để tên teelab7
vào folder server lấy sql trong file entity.sql
vào file .env của server kiểm tra xem có trùng với DB_DATABASE không, trùng thì ok

chạy dự án

bật terminal của folder client:

npm run dev

bật terminal của folder server:

npm start

chạy postman test api

link test api: http://localhost:3000/api/v1/category

test ra mảng rỗng là ok
