# 🚗 AutoPrime E-Commerce — Toko Sparepart Mobil

Website e-commerce sparepart mobil modern, responsif, dan siap pakai — dibangun dengan **Next.js 14 App Router**, **Tailwind CSS**, **Prisma ORM + MySQL**, dan **NextAuth.js**.

---

## ✨ Fitur Lengkap

| Fitur | Keterangan |
|-------|-----------|
| 🔐 Autentikasi | Register, Login, Session JWT, Logout |
| 🧭 Navbar | Search, Cart Badge, User Menu, Kategori Dropdown, Responsive |
| 🏠 Homepage | Hero Banner, Kategori Grid, Produk Unggulan, Semua Produk, CTA |
| 🗂️ Katalog | Filter kategori + search, sidebar, grid produk |
| 📦 Detail Produk | Gambar, deskripsi, qty selector, add to cart |
| 🛒 Keranjang | Add/remove/update qty, subtotal, gratis ongkir, persistensi |
| 💳 Checkout 3-step | Pengiriman → Pembayaran → Konfirmasi |
| ✅ Sukses Order | Halaman konfirmasi + instruksi bayar |
| 📋 Riwayat Pesanan | Daftar pesanan dengan status real-time |
| 👤 Profil User | Info akun + statistik belanja |
| ⚙️ Dashboard Admin | Statistik + tabel pesanan terbaru |
| 📁 Manajemen Produk | Daftar semua produk (admin) |
| 🛡️ Middleware | Proteksi route checkout/orders/admin |
| 🎨 404 Custom | Halaman not-found bergaya |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 14 App Router |
| Styling | Tailwind CSS v3 |
| Database | MySQL 8 + Prisma ORM v5 |
| Auth | NextAuth.js v4 (Credentials + JWT) |
| State (Cart) | Zustand v4 + localStorage persist |
| Icons | Heroicons v2 |
| Language | TypeScript |

---

## 🚀 Instalasi & Cara Menjalankan

### 1. Prasyarat
- **Node.js** ≥ 18
- **MySQL** server berjalan (local / cloud)
- **npm** atau **pnpm**

### 2. Install dependencies
```bash
cd autoprime
npm install
```

### 3. Konfigurasi environment
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3306/autoprime_db"
NEXTAUTH_SECRET="isi-dengan-string-random-panjang"
NEXTAUTH_URL="http://localhost:3000"
```
Generate secret:
```bash
openssl rand -base64 32
```

### 4. Setup Database — PILIH SALAH SATU:

#### Opsi A: Via Prisma (Rekomendasi)
```bash
# Buat tabel dari schema.prisma
npm run db:push

# Isi data awal (21 produk + akun demo)
npm run db:seed
```

#### Opsi B: Via SQL Murni
```bash
# Di MySQL client / phpMyAdmin / DBeaver:
SOURCE database/create_tables.sql;
SOURCE database/seed.sql;
```

### 5. Jalankan
```bash
npm run dev
```
Buka **http://localhost:3000** 🎉

---

## 👤 Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Customer | `demo@autoprime.id` | `demo123` |
| Admin | `admin@autoprime.id` | `admin123` |

---

## 📁 Struktur Folder Lengkap

```
autoprime/
├── public/
│   └── images/products/          # 21 foto produk (dari file proposal)
│       ├── busi-ngk.jpg
│       ├── oli-shell.jpg
│       └── ...21 file...
│
├── database/
│   ├── create_tables.sql          # DDL: CREATE TABLE users/products/orders/order_items
│   └── seed.sql                   # DML: INSERT 21 produk
│
├── prisma/
│   ├── schema.prisma              # Skema Prisma ORM
│   └── seed.ts                    # Seed script TypeScript
│
├── src/
│   ├── middleware.ts              # Proteksi route (checkout, orders, admin)
│   │
│   ├── app/
│   │   ├── layout.tsx             # Root layout (Navbar + Footer + Providers)
│   │   ├── page.tsx               # 🏠 Homepage
│   │   ├── not-found.tsx          # 404 custom
│   │   ├── globals.css            # Tailwind base styles
│   │   ├── providers.tsx          # SessionProvider wrapper
│   │   │
│   │   ├── login/page.tsx         # 🔐 Login
│   │   ├── register/page.tsx      # 📝 Register
│   │   ├── cart/page.tsx          # 🛒 Keranjang belanja
│   │   ├── checkout/page.tsx      # 💳 Checkout 3-step
│   │   ├── profile/page.tsx       # 👤 Profil user
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx           # 🗂️ Katalog + filter
│   │   │   └── [slug]/page.tsx    # 📦 Detail produk
│   │   │
│   │   ├── orders/
│   │   │   ├── page.tsx           # 📋 Riwayat pesanan
│   │   │   └── success/page.tsx   # ✅ Pesanan berhasil
│   │   │
│   │   ├── admin/
│   │   │   ├── page.tsx           # ⚙️ Dashboard admin
│   │   │   └── products/page.tsx  # 📁 Manajemen produk
│   │   │
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts   # NextAuth handler
│   │       │   └── register/route.ts        # POST /api/auth/register
│   │       ├── products/
│   │       │   ├── route.ts                 # GET /api/products
│   │       │   └── [slug]/route.ts          # GET /api/products/:slug
│   │       └── orders/
│   │           ├── route.ts                 # POST /api/orders
│   │           └── [id]/route.ts            # GET/PATCH /api/orders/:id
│   │
│   ├── components/
│   │   ├── Navbar.tsx             # Navigasi utama
│   │   ├── Footer.tsx             # Footer
│   │   ├── ProductCard.tsx        # Kartu produk (add to cart)
│   │   ├── ProductSkeleton.tsx    # Loading skeleton
│   │   ├── AddToCartButton.tsx    # Tombol tambah keranjang
│   │   ├── SearchBar.tsx          # Search bar reusable
│   │   └── Toast.tsx              # Notifikasi pop-up
│   │
│   ├── lib/
│   │   ├── prisma.ts              # Singleton Prisma Client
│   │   ├── auth.ts                # Konfigurasi NextAuth
│   │   └── utils.ts               # formatRupiah, slugify
│   │
│   ├── store/
│   │   └── cartStore.ts           # Zustand cart (persist localStorage)
│   │
│   └── types/
│       ├── index.ts               # Product, CartItem, ShippingDetails
│       └── next-auth.d.ts         # Extend Session type
│
├── .env.example                   # Template environment variables
├── next.config.js                 # Konfigurasi Next.js
├── tailwind.config.ts             # Konfigurasi Tailwind CSS
├── postcss.config.js              # PostCSS
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies & scripts
```

---

## 🗄️ Skema Database

```sql
users        (id, name, email, password, role, createdAt, updatedAt)
products     (id, name, slug, category, description, price, image, stock, ...)
orders       (id, userId, status, totalAmount, recipientName, phone, address,
              city, province, postalCode, paymentMethod, paidAt, ...)
order_items  (id, orderId, productId, quantity, price)
```

---

## 📦 Produk (21 item dari Proposal)

| # | Nama | Kategori | Harga |
|---|------|----------|-------|
| 1 | Busi Iridium NGK | Pengapian | Rp 95.000 |
| 2 | Oli Mesin Shell Helix HX7 4L | Pelumas | Rp 350.000 |
| 3 | Kampas Rem Depan Bendix | Pengereman | Rp 280.000 |
| 4 | Aki GS Astra MF NS40Z | Kelistrikan | Rp 850.000 |
| 5 | Filter Udara Sakura | Filter | Rp 75.000 |
| 6 | Filter Oli Denso | Filter | Rp 45.000 |
| 7 | Shockbreaker KYB Ultra | Kaki-kaki | Rp 550.000 |
| 8 | Wiper Blade Bosch Advantage | Eksterior | Rp 110.000 |
| 9 | Lampu Depan Philips H4 | Kelistrikan | Rp 130.000 |
| 10 | Radiator Coolant Prestone | Pendingin | Rp 140.000 |
| 11 | Filter Kabin / AC Ken | Filter | Rp 65.000 |
| 12 | Kampas Kopling Exedy | Transmisi | Rp 420.000 |
| 13 | Tie Rod End 555 Japan | Kaki-kaki | Rp 210.000 |
| 14 | Kampas Rem Belakang Akebono | Pengereman | Rp 230.000 |
| 15 | Minyak Rem Jumbo DOT 3 | Pelumas | Rp 35.000 |
| 16 | V-Belt / Fan Belt Bando | Mesin | Rp 125.000 |
| 17 | Fuel Pump Assy Denso | Bahan Bakar | Rp 650.000 |
| 18 | Thermostat Honda Genuine | Pendingin | Rp 180.000 |
| 19 | Ignition Coil Yaris/Vios | Pengapian | Rp 350.000 |
| 20 | Oli Gardan TMO GL-5 | Pelumas | Rp 85.000 |
| 21 | Klip Bumper Universal | Eksterior | Rp 2.500 |

---

## 🔧 Scripts NPM

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Build production
npm run start        # Jalankan production build
npm run lint         # Lint TypeScript/ESLint
npm run db:push      # Push schema Prisma ke MySQL
npm run db:seed      # Isi data awal
npm run db:studio    # Buka Prisma Studio (UI database)
```

---

## 🎨 Warna Tema

| Warna | Hex | Penggunaan |
|-------|-----|-----------|
| Merah Primary | `#E53E1A` | Tombol, badge, highlight |
| Merah Dark | `#C53010` | Hover state |
| Oranye Accent | `#F97316` | Aksen dekoratif |
| Gray Dark | `#111827` | Teks utama |
| Gray Light | `#F9FAFB` | Background section |

---

*Dibangun dengan ❤️ sebagai Proyek Aplikasi Web — AutoPrime 2024*
