-- ============================================================
-- AutoPrime E-Commerce — MySQL Schema
-- Jalankan script ini di MySQL client kamu
-- ============================================================

-- Buat database (opsional jika sudah ada)
CREATE DATABASE IF NOT EXISTS autoprime_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE autoprime_db;

-- ─── TABEL USERS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT          NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  role        ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER',
  createdAt   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt   DATETIME(3)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX users_email_key (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABEL PRODUCTS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          INT           NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255)  NOT NULL,
  slug        VARCHAR(255)  NOT NULL UNIQUE,
  category    VARCHAR(100)  NOT NULL,
  description LONGTEXT      NOT NULL,
  price       INT           NOT NULL,
  image       VARCHAR(500)  NOT NULL,
  stock       INT           NOT NULL DEFAULT 100,
  createdAt   DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt   DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE INDEX products_slug_key (slug),
  INDEX products_category_idx (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABEL ORDERS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              INT          NOT NULL AUTO_INCREMENT,
  userId          INT          NOT NULL,
  status          ENUM('PENDING','PAID','PROCESSING','SHIPPED','DELIVERED','CANCELLED')
                               NOT NULL DEFAULT 'PENDING',
  totalAmount     INT          NOT NULL,
  recipientName   VARCHAR(255) NOT NULL,
  phone           VARCHAR(30)  NOT NULL,
  address         LONGTEXT     NOT NULL,
  city            VARCHAR(100) NOT NULL,
  province        VARCHAR(100) NOT NULL,
  postalCode      VARCHAR(10)  NOT NULL,
  paymentMethod   VARCHAR(50)  NOT NULL DEFAULT 'Transfer Bank',
  paidAt          DATETIME(3)  NULL,
  createdAt       DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt       DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  INDEX orders_userId_idx (userId),
  CONSTRAINT orders_userId_fkey FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABEL ORDER ITEMS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          INT NOT NULL AUTO_INCREMENT,
  orderId     INT NOT NULL,
  productId   INT NOT NULL,
  quantity    INT NOT NULL,
  price       INT NOT NULL,
  PRIMARY KEY (id),
  INDEX order_items_orderId_idx   (orderId),
  INDEX order_items_productId_idx (productId),
  CONSTRAINT order_items_orderId_fkey   FOREIGN KEY (orderId)   REFERENCES orders(id)   ON DELETE CASCADE  ON UPDATE CASCADE,
  CONSTRAINT order_items_productId_fkey FOREIGN KEY (productId) REFERENCES products(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verifikasi tabel berhasil dibuat
SHOW TABLES;
