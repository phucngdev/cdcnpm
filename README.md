# cài nodejs, npm, git

kiểm tra phiên bản

bật terminal

node -v

nodejs: sử dụng phiên bản v20.9.0

npm -v

npm: phiên bản 10.1.0

git --version

git: version 2.33.0

# clone dự án về máy

tạo 1 folder để chứa src

mở vscode với folder đã tạo

bật terminal của folder

git clone https://github.com/phucngdev/cdcnpm.git

# tải các package

bật terminal của folder client:

npm i

bật terminal của folder server:

npm i

# chạy xampp

tạo 1 csdl mới trên phpmyadmin để tên trùng với DB_DATABASE trong .env

xem port của xampp chạy cổng nào: 3306 hoặc 3307 xong chỉnh trong .env DB_PORT

# chạy dự án

bật terminal của folder client:

npm run dev

bật terminal của folder server:

npm start

# chạy postman test api

link test api: http://localhost:3000/api/v1/category

test ra [] là ok

# cách lấy code mới

bật terminal của folder tổng

git pull

# trường hợp pull lỗi do có thay đổi ở local

chọn source control => click chuột phải vào Changes => click Discard all changes => sau đó git pull lại
