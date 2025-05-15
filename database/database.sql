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
('a-001', 'admin', '$2b$10$WQgAeG47rWv7Bidzkq1L/ujVLXh41lDbAPG4ZxcirgzYH9yRMzdcC', 'Admin', 'admin@burger.com', '0901122334', 'r-001', 1),
('a-002', 'staff_pizza', 'staff_pass_hash', 'Employee', 'staff@pizza.com', NULL, 'r-002', 1);

-- 3. Bảng Category: Danh mục món ăn
CREATE TABLE Category (
  CategoryID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  Name VARCHAR(50) UNIQUE NOT NULL,
  ImageURL TEXT,
  Status INT DEFAULT 1
);

INSERT INTO `category` (`CategoryID`, `Name`, `ImageURL`, `Status`) VALUES
('c-001', 'Burger', 'http://localhost:3000/api/upload/BurgerBoNuong.jpg', 1),
('c-002', 'Pizza', 'http://localhost:3000/api/upload/PizzaHaiSan.png', 1),
('c-003', 'Coca', 'http://localhost:3000/api/upload/Coca.jpg', 1),
('c-004', 'Juice', 'http://localhost:3000/api/upload/NuocChanh.jpg', 1),
('c-005', 'Fried', 'http://localhost:3000/api/upload/KhoaiChien.jpg', 1),
('c-006', 'Rice', 'http://localhost:3000/api/upload/ComChienDuongChau.jpg', 1),
('c-007', 'Noodles', 'http://localhost:3000/api/upload/BlackBeanNoodles.jpg', 1);

-- 4. Bảng Product: Món ăn
CREATE TABLE Product (
  ProductID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Description TEXT,
  Price DECIMAL(10,2) NOT NULL,
  CategoryID CHAR(36),
  ImageURL TEXT,
  RestaurantID CHAR(36),
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID),
  Status INT DEFAULT 1
);

INSERT INTO `product` (`ProductID`, `Name`, `Description`, `Price`, `CategoryID`, `ImageURL`, `Status`) VALUES
('p-001', 'Grilled Beef Burger', 'Savor our juicy grilled beef patty, seasoned to perfection and flame-grilled for a smoky flavor. Served on a freshly toasted bun with crisp lettuce, ripe tomatoes, onions, pickles, and our special house sauce. A hearty and satisfying choice for true burger lovers.', 75.00, 'c-001', 'http://localhost:3000/api/upload/BurgerBoNuong.jpg',  1),
('p-002', 'Seafood Pizza', 'A delightful mixed seafood pizza topped with shrimp, squid, and melted cheese — perfect for seafood lovers.', 100.00, 'c-002', 'http://localhost:3000/api/upload/PizzaHaiSan.png', 1),
('p-003', 'Pepsi', 'Refreshing carbonated soft drink to quench your thirst and complement any meal.', 15.00, 'c-003', 'http://localhost:3000/api/upload/Pepsi.jpg',  1),
('p-004', 'Crispy Fried Chicken', 'Golden-brown, crispy battered chicken, juicy on the inside and perfectly seasoned.', 87.00, 'c-005', 'http://localhost:3000/api/upload/GaRanGion.jpg',  1),
('p-005', 'Spaghetti Bolognese', 'Classic Italian pasta served with rich, savory minced beef sauce and herbs.', 68.00, 'c-007', 'http://localhost:3000/api/upload/MiY.jpg', 1),
('p-006', 'Coca-Cola', 'Iconic fizzy cola drink with a bold, refreshing taste.', 15.00, 'c-003', 'http://localhost:3000/api/upload/Coca.jpg', 1),
('p-007', 'Crispy Chicken Burger', 'Crispy fried chicken filet served in a soft burger bun with lettuce, pickles, and tangy mayo sauce.', 65.00, 'c-001', 'http://localhost:3000/api/upload/BurgerGa.jpg',  1),
('p-008', 'Beef & Mushroom Pizza', 'Savory beef and fresh mushrooms layered over mozzarella and rich tomato sauce on a crispy crust.', 110.00, 'c-002', 'http://localhost:3000/api/upload/PizzaBoNam.jpg',  1),
('p-009', 'Sprite', 'Light and lemon-lime flavored soft drink — a perfect choice for a refreshing break.', 10.00, 'c-003', 'http://localhost:3000/api/upload/Sprite.jpg', 1),
('p-010', 'French Fries', 'Crispy golden fries, fried to perfection — ideal as a side or snack.', 45.00, 'c-005', 'http://localhost:3000/api/upload/KhoaiChien.jpg',  1),
('p-011', 'Orange Juice', 'Freshly squeezed orange juice, naturally sweet and full of vitamin C.', 16.00, 'c-004', 'http://localhost:3000/api/upload/NuocCam.jpg',  1),
('p-012', 'Lemonade', 'Cool and zesty lemonade made from fresh lemons — light, tangy, and refreshing.', 10.00, 'c-004', 'http://localhost:3000/api/upload/NuocChanh.jpg',  1),
('p-013', 'Yangzhou Fried Rice', 'Classic Chinese-style fried rice with a colorful mix of vegetables, egg, and meat — satisfying and flavorful.', 62.00, 'c-006', 'http://localhost:3000/api/upload/ComChienDuongChau.jpg',  1),
('p-014', 'Black Bean Noodles', 'Black Bean Noodles, also known as Jajangmyeon, are a Korean dish made with thick, savory black bean sauce and diced pork or vegetables.', 72.00, 'c-007', 'http://localhost:3000/api/upload/BlackBeanNoodles.jpg',  1);

CREATE TABLE Restaurant_Product (
    RestaurantID CHAR(36),
    ProductID CHAR(36),
    Price DECIMAL(10,2) NOT NULL,
    Status INT DEFAULT 1,
    PRIMARY KEY (RestaurantID, ProductID),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

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
('t-003', 1, 'qr_pizza_1', 'r-002', 1),
('t-004', 3, 'qr_burger_3', 'r-001', 1),
('t-005', 4, 'qr_burger_4', 'r-001', 1),
('t-006', 5, 'qr_burger_5', 'r-001', 1),
('t-007', 6, 'qr_burger_6', 'r-001', 1),
('t-008', 7, 'qr_burger_7', 'r-001', 1),
('t-009', 8, 'qr_burger_8', 'r-001', 1),
('t-010', 9, 'qr_burger_9', 'r-001', 1),
('t-011', 10, 'qr_burger_10', 'r-001', 1),
('t-012', 11, 'qr_burger_11', 'r-001', 1),
('t-013', 12, 'qr_burger_12', 'r-001', 1);

-- 6. Bảng Order: Đơn hàng
CREATE TABLE `Order` (
    OrderID CHAR(36) DEFAULT UUID() PRIMARY KEY,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TotalPrice DECIMAL(10,2) NOT NULL,
    OrderStatus ENUM('Pending', 'Confirmed', 'Finished','Processing', 'Cancelled') DEFAULT 'Pending',
    OrderType ENUM('Dine-in', 'Takeaway', 'Delivery') DEFAULT 'Takeaway',
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

/*-- 8. Bảng SideDish: món ăn kèm
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
('e-001', 'p-001', 1);*/

-- 8. Bảng Feedback: Đánh giá của khách hàng
CREATE TABLE Feedback (
  FeedbackID CHAR(36) DEFAULT UUID() PRIMARY KEY,
  OrderID CHAR(36) NOT NULL,
  CustomerName VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Message TEXT NOT NULL,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Status INT DEFAULT 1,
  Rating INT CHECK (Rating BETWEEN 1 AND 5),
  FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID)
);

INSERT INTO Feedback (OrderID, CustomerName, Email, Message, Rating) 
VALUES 
( 'o-001', 'John Doe', 'johndoe@example.com', 'I am extremely satisfied with my purchase! The product quality is excellent, and the customer service was outstanding. I will definitely recommend this to my friends and family.', 5),

( 'o-0022', 'Sarah Smith', 'sarahsmith@example.com', 'The product is decent, but the delivery took longer than expected. Overall, it is okay, but there is room for improvement.', 3);

