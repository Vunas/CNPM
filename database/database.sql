-- 1. Bảng Restaurant: Thông tin cửa hàng đồ ăn nhanh
CREATE TABLE Restaurant (
  RestaurantID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  Phone VARCHAR(15),
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Status INT DEFAULT 1
);

INSERT INTO Restaurant (RestaurantID, Name, Address, Phone, Status)
VALUES
('r-001', 'Burger Express', '12 Lê Lợi, Q.1, TP.HCM', '0901122334', 1),
('r-002', 'Pizza Hub', '88 Trần Phú, Q.5, TP.HCM', '0912233445', 1);

-- 2. Bảng Account: Tài khoản người dùng
CREATE TABLE Account (
  AccountID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  Username VARCHAR(50) UNIQUE NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  Role ENUM('Admin', 'Employee', 'Kitchen') NOT NULL,
  Email VARCHAR(100) UNIQUE,
  Phone VARCHAR(15) UNIQUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  RestaurantID CHAR(36),
  FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID),
  Status INT DEFAULT 1
);

INSERT INTO Account (AccountID, Username, PasswordHash, Role, Email, Phone, RestaurantID, Status)
VALUES
('a-001', 'admin_burger', 'admin_pass_hash', 'Admin', 'admin@burger.com', '0901122334', 'r-001', 1),
('a-002', 'staff_pizza', 'staff_pass_hash', 'Employee', 'staff@pizza.com', NULL, 'r-002', 1);

-- 3. Bảng Category: Danh mục món ăn
CREATE TABLE Category (
  CategoryID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  Name VARCHAR(50) UNIQUE NOT NULL,
  ImageURL TEXT,
  Status INT DEFAULT 1
);

INSERT INTO `category` (`CategoryID`, `Name`, `ImageURL`, `Status`) VALUES
('c-001', 'Burger', 'src/assets/BurgerBoNuong.jpg', 1),
('c-002', 'Pizza', 'src/assets/PizzaHaiSan.png', 1),
('c-003', 'Coca', 'src/assets/Coca.jpg', 1),
('c-004', 'Juice', 'src/assets/NuocChanh.jpg', 1),
('c-005', 'Fried', 'src/assets/KhoaiChien.jpg', 1),
('c-006', 'Rice', 'src/assets/ComChienDuongChau.jpg', 1),
('c-007', 'Noodles', 'src/assets/BlackBeanNoodles.jpg', 1);

-- 4. Bảng Product: Món ăn
CREATE TABLE Product (
  ProductID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Description TEXT,
  Price DECIMAL(10,2) NOT NULL,
  CategoryID CHAR(36),
  Status ENUM('Available', 'Out of Stock') DEFAULT 'Available',
  ImageURL TEXT,
  RestaurantID CHAR(36),
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID),
  FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID),
  -- Thêm cột Status cho xóa mềm (INT, default 1)
  IsActive INT DEFAULT 1
);

INSERT INTO `product` (`ProductID`, `Name`, `Description`, `Price`, `CategoryID`, `Status`, `ImageURL`, `RestaurantID`, `IsActive`) VALUES
('p-001', 'Burger Bò Nướng', 'Burger bò nướng phô mai', 75.00, 'c-001', 'Available', 'src/assets/BurgerBoNuong.jpg', 'r-001', 1),
('p-002', 'Pizza Hải Sản', 'Pizza hải sản thập cẩm', 100.00, 'c-002', 'Available', 'src/assets/PizzaHaiSan.png', 'r-002', 1),
('p-003', 'Pepsi', 'Nước ngọt có ga', 15.00, 'c-003', 'Available', 'src/assets/Pepsi.jpg', 'r-001', 1),
('p-004', 'Gà Rán Giòn', 'Gà rán tẩm bột giòn tan', 87.00, 'c-005', 'Available', 'src/assets/GaRanGion.jpg', 'r-001', 1),
('p-005', 'Mỳ Ý Spaghetti', 'Mỳ Ý sốt bò bằm truyền thống', 68.00, 'c-002', 'Available', 'src/assets/MiY.jpg', 'r-002', 1),
('p-006', 'Coca-Cola', 'Nước ngọt có ga', 15.00, 'c-003', 'Available', 'src/assets/Coca.jpg', 'r-002', 1),
('p-007', 'Burger Gà', 'Burger gà chiên xù', 65.00, 'c-001', 'Available', 'src/assets/BurgerGa.jpg', 'r-001', 1),
('p-008', 'Pizza Bò', 'Pizza bò và nấm', 110.00, 'c-002', 'Available', 'src/assets/PizzaBoNam.jpg', 'r-001', 1),
('p-009', 'Sprite', 'Nước ngọt có ga vị chanh', 10.00, 'c-003', 'Available', 'src/assets/Sprite.jpg', 'r-002', 1),
('p-010', 'Khoai Tây Chiên', 'Khoai tây chiên giòn rụm', 45.00, 'c-005', 'Available', 'src/assets/KhoaiChien.jpg', 'r-001', 1),
('p-011', 'Nước Cam', 'Nước cam nguyên chất siêu ngon', 16.00, 'c-004', 'Available', 'src/assets/NuocCam.jpg', 'r-001', 1),
('p-012', 'Nước Chanh', 'Chanh tươi siêu mát', 10.00, 'c-004', 'Available', 'src/assets/NuocChanh.jpg', 'r-001', 1),
('p-013', 'Cơm chiên dương châu', 'Ăn 3 tô cơm', 62.00, 'c-006', 'Available', 'src/assets/ComChienDuongChau.jpg', 'r-001', 1),
('p-014', 'Black Bean Noodles', 'My tuong den', 72.00, 'c-007', 'Available', 'src/assets/BlackBeanNoodles.jpg', 'r-001', 1);

-- 5. Bảng RestaurantTable: Bàn ăn
CREATE TABLE RestaurantTable (
  TableID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  TableNumber INT NOT NULL,
  QRCode VARCHAR(255) NOT NULL,
  RestaurantID CHAR(36) NOT NULL,
  FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID),
  Status INT DEFAULT 1
);

INSERT INTO RestaurantTable (TableID, TableNumber, QRCode, RestaurantID, Status)
VALUES
('t-001', 1, 'qr_burger_1', 'r-001', 1),
('t-002', 2, 'qr_burger_2', 'r-001', 1),
('t-003', 1, 'qr_pizza_1', 'r-002', 1);

-- 6. Bảng Order: Đơn hàng
CREATE TABLE `Order` (
    OrderID CHAR(36) DEFAULT UUID() PRIMARY KEY,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TotalPrice DECIMAL(10,2) NOT NULL,
    OrderStatus ENUM('Pending', 'Confirmed','Cooking', 'Finished', 'Cancelled') DEFAULT 'Pending',
    OrderType ENUM('Dine-in', 'Takeaway') DEFAULT 'Takeaway',
    PaymentMethod ENUM('Cash', 'Credit Card', 'E-wallet') NULL,
    TableID CHAR(36),
    CustomerContact VARCHAR(50),
    AccountID CHAR(36) NULL,
    RestaurantID CHAR(36) NOT NULL,
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID),
    FOREIGN KEY (TableID) REFERENCES RestaurantTable(TableID),
    Status INT DEFAULT 1
);

INSERT INTO `Order` (OrderID, TotalPrice, OrderStatus, OrderType, PaymentMethod, TableID, CustomerContact, AccountID, RestaurantID, Status)
VALUES
('o-001', 75000.00, 'Confirmed', 'Takeaway', 'Cash', NULL, '0123456789', 'a-001', 'r-001', 1),
('o-002', 135000.00, 'Pending', 'Dine-in', NULL, NULL, '0987654321', 'a-002', 'r-002', 1);

-- 7. Bảng OrderDetail: Chi tiết đơn hàng
CREATE TABLE OrderDetail (
  OrderDetailID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  OrderID CHAR(36) NOT NULL,
  ProductID CHAR(36) NOT NULL,
  Quantity INT NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  Discount DECIMAL(10,2) DEFAULT 0,
  Notes TEXT,
  FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID),
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
  Status INT DEFAULT 1
);

INSERT INTO OrderDetail (OrderDetailID, OrderID, ProductID, Quantity, Price, Discount, Notes, Status)
VALUES
('od-001', 'o-001', 'p-001', 1, 60000.00, 0.00, NULL, 1),
('od-002', 'o-001', 'p-003', 1, 15000.00, 0.00, 'Không đá', 1),
('od-003', 'o-002', 'p-002', 1, 120000.00, 0.00, NULL, 1),
('od-004', 'o-002', 'p-003', 1, 15000.00, 0.00, NULL, 1);

-- 8. Bảng SideDish: món ăn kèm
CREATE TABLE SideDish (
  SideDishID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  -- Thêm cột Status cho xóa mềm (INT, default 1)
  IsActive INT DEFAULT 1
);

INSERT INTO `sidedish` (`SideDishID`, `Name`, `Price`, `IsActive`) VALUES
('e-001', 'Rau thơm', 3.00, 1),
('e-002', 'Sốt cay, muối ớt', 2.00, 1);

-- 9. Bảng ExtraPair: ghép món ăn với đồ ăn kèm
CREATE TABLE ExtraPair (
  SideDishID CHAR(36) NOT NULL,
  ProductID CHAR(36) NOT NULL,
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
  FOREIGN KEY (SideDishID) REFERENCES SideDish(SideDishID),
  -- Thêm cột Status cho xóa mềm (INT, default 1)
  IsActive INT DEFAULT 1
);

INSERT INTO `extrapair` (`SideDishID`, `ProductID`, `IsActive`) VALUES
('e-001', 'p-001', 1);