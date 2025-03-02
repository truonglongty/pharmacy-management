# Pharmacy Management Proposal

## Thông tin
### Nhóm
- **Thành viên 1**: Trương Long Tý - 22656001  
- **Thành viên 2**: Nguyễn Thái Uy - 22656171  
- **Thành viên 3**: Trần Anh Tuấn - 22651711  
- **Thành viên 4**: Vương Nguyễn Anh Khoa - 22681791  

- **Git repository**: [GitHub Repository](https://github.com/truonglongty/pharmacy-management)  

## Ý tưởng
### Minimum Viable Product (MVP)
Phiên bản MVP của **Pharmacy Management** tập trung vào các tính năng cốt lõi nhất để giải quyết những vấn đề cấp thiết trong quản lý nhà thuốc. Với giao diện thân thiện và dễ sử dụng, nhà thuốc có thể:
- **Đăng ký, đăng nhập và phân quyền**
- **Quản lý danh sách thuốc**: Thêm, sửa, xóa và kiểm tra tồn kho.
- **Xử lý đơn hàng nhanh chóng**, giúp nhân viên bán hàng dễ dàng thao tác.

### Complete Product
Không dừng lại ở một công cụ quản lý cơ bản, phiên bản hoàn thiện của **Pharmacy Management** sẽ mang đến nhiều tính năng hơn:
- **Hệ thống cảnh báo** thuốc sắp hết hạn, sắp hết hàng.
- **Báo cáo doanh thu**, thống kê bán hàng trực quan theo ngày, tháng, năm.
- **Tích hợp thanh toán trực tuyến** giúp giao dịch dễ dàng hơn. *(có thể)*

## Chức năng 
### Nhân viên Quản lý - Admin
- Quản lý nhân viên (CRUD)
- Quản lý tài khoản nhân viên
- Xem thống kê doanh thu, chi phí, lợi nhuận
- Xem thống kê nhân viên

### Nhân viên Bán Hàng
- Lập hóa đơn bán hàng
- Tìm kiếm, quản lý hóa đơn
- Tìm kiếm, quản lý khách hàng
- Tìm kiếm, quản lý đơn đặt hàng
- Xem thống kê khách hàng
- Xem thống kê hóa đơn

### Nhân viên Quản lý Sản Phẩm
- Lập hóa đơn phiếu thu
- Tìm kiếm, quản lý thuốc
- Tìm kiếm, quản lý nhà cung cấp
- Tìm kiếm, quản lý phiếu thu
- Xem thống kê phiếu thu

## Lược đồ CSDL (dự kiến)
```md
Employee (employeeID, fullName, phoneNumber, gender, yearOfBirth, hireDate)  
Customer (customerID, fullName, phoneNumber, gender, joinDate)  
Account (accountID, username, password, employeeID, roleID)  
Role (roleID, roleName)  
Medicine (medicineID, medicineName, image, ingredients, unitID, catalogID, originID, stockQuantity, importPrice, unitPrice)  
Supplier (supplierID, supplierName, phoneNumber, address)  
Orders (orderID, orderTime, employeeID, customerID)  
Order_detail (orderID, medicineID, quantity, unitPrice)  
Invoices (invoiceID, invoiceTime, customerID, address, paymentMethod, status)  
Invoice_detail (invoiceID, medicineID, quantity, unitPrice)  
Payments (paymentID, paymentTime, employeeID, supplierID)  
Payment_detail (paymentID, medicineID, quantity, unitPrice)  
Catalog (catalogID, catalogName)  
Unit (unitID, unitName)  
Origin (originID, originName) 
```

## Giao diện (dự kiến)
```md
- Đăng nhập: login.html
- Đăng ký: register.html
- Trang chủ: home.html
- Quản lý thuốc: medicines.html
- Chi tiết thuốc: medicine-detail.html
- Quản lý khách hàng: customers.html
- Quản lý nhân viên : employees.html
- Quản lý hóa đơn: orders.html
- Chi tiết hóa đơn: order-detail.html
- Quản lý đặt hàng: invoices.html
- Chi tiết đặt hàng: invoice-detail.html
- Quản lý phiếu thu: payments.html
- Chi tiết phiếu thu: payment-detail.html
```

## Kế hoạch thực hiện dự kiến
- **Tuần 1**: Phân tích yêu cầu và thiết kế hệ thống
  - Xác định chức năng chính
  - Thiết kế CSDL
  - Lên mockup UI/UX bằng Figma

- **Tuần 2**: Dựng Backend với Django
  - Thiết lập PostgreSQL & tạo models
  - Dựng API REST với DRF *(có thể)*
  - Xác thực người dùng (JWT, session) *(có thể)*

- **Tuần 3**: Dựng Frontend (ReactJS dự kiến)
  - Hiện thực giao diện từ mockup
  - Fetch data từ API

- **Tuần 4**: Tích hợp Backend và Frontend

- **Tuần 5**: Hoàn thiện tính năng & Testing (Unit Test)

- **Tuần 6**: Deploy & Report
  - Tách và deploy độc lập
  - or Đóng gói bằng Docker
