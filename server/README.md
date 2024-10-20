# công nghệ sử dụng

- nodejs express

# cấu trúc thư mục

- server
  - node_modules : lưu các thông tin thư viên, dữ liệu cần để chạy dự án
  - src : mã nguồn dự án
    - api : lưu các phiên bản v1, v2, ...
      - v1 : phiên bản v1
        - controllers : nhận req sau đó gọi đến service để xử lý và trả về res
        - middlewares : kiểm tra xác thực và quyền truy cập
        - routes : cấu hình các endpoint và controller tương ứng
        - services : xử lý req với database và trả về dữ liệu cho controller
        - utils : hàm dùng chung cho dự án
        - validations : kiểm tra dữ liệu đầu vào
    - config : config database
    - sql : lưu sql
    - app.js : config thư viện dùng trong dự án
    - server.js : tạo và chạy server
  - .env : lưu thông tin bí mật của dự án
