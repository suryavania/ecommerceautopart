-- ============================================================
-- AutoPrime E-Commerce — Database Seed
-- Jalankan SETELAH prisma db push / migrate
-- ============================================================

-- Bersihkan tabel produk sebelum seed
DELETE FROM products;
ALTER TABLE products AUTO_INCREMENT = 1;

-- ─── SEED DATA PRODUK (21 produk dari proposal) ─────────────
INSERT INTO products (name, slug, category, description, price, image, stock, createdAt, updatedAt) VALUES
(
  'Busi Iridium NGK',
  'busi-iridium-ngk',
  'Pengapian',
  'Busi performa tinggi untuk efisiensi pembakaran mesin yang optimal. Elektroda iridium berdiameter kecil memberikan pengapian yang lebih stabil, hemat bahan bakar, dan umur pakai lebih panjang dibanding busi konvensional.',
  95000,
  '/images/products/busi-ngk.jpg',
  150,
  NOW(), NOW()
),
(
  'Oli Mesin Shell Helix HX7 4L',
  'oli-mesin-shell-helix-hx7-4l',
  'Pelumas',
  'Oli mesin semi-sintetik premium Shell Helix HX7 untuk menjaga keawetan dan performa mesin. Formulasi ActiveCleanse Technology membersihkan deposit dan kotoran di dalam mesin secara aktif.',
  350000,
  '/images/products/oli-shell.jpg',
  200,
  NOW(), NOW()
),
(
  'Kampas Rem Depan Bendix',
  'kampas-rem-depan-bendix',
  'Pengereman',
  'Kampas rem cakram depan dengan teknologi ceramic untuk pengereman pakem dan minim debu. Formulasi keramik memberikan performa konsisten pada berbagai kondisi suhu tanpa fade.',
  280000,
  '/images/products/kampas-rem-bendix.jpg',
  80,
  NOW(), NOW()
),
(
  'Aki GS Astra MF NS40Z',
  'aki-gs-astra-mf-ns40z',
  'Kelistrikan',
  'Aki kering Maintenance Free (MF) kapasitas 35Ah yang awet dan tahan lama. Teknologi sealed recombination meminimalkan penguapan air aki sehingga bebas perawatan rutin.',
  850000,
  '/images/products/aki-gs.jpg',
  60,
  NOW(), NOW()
),
(
  'Filter Udara Sakura',
  'filter-udara-sakura',
  'Filter',
  'Penyaring udara masuk ke ruang bakar untuk mencegah masuknya debu dan kotoran. Material kertas filter berkualitas tinggi menjamin aliran udara optimal dan perlindungan mesin maksimal.',
  75000,
  '/images/products/filter-udara-sakura.jpg',
  200,
  NOW(), NOW()
),
(
  'Filter Oli Denso',
  'filter-oli-denso',
  'Filter',
  'Menyaring kotoran dan gram logam pada sirkulasi oli mesin mobil. Elemen filter presisi tinggi menjaga kebersihan oli dan memperpanjang umur pakai mesin.',
  45000,
  '/images/products/filter-oli-denso.jpg',
  300,
  NOW(), NOW()
),
(
  'Shockbreaker KYB Ultra',
  'shockbreaker-kyb-ultra',
  'Kaki-kaki',
  'Peredam kejut suspensi belakang untuk stabilitas berkendara harian. Teknologi gas-filled KYB memberikan respons yang lebih linear dan nyaman dibanding shockbreaker konvensional.',
  550000,
  '/images/products/shockbreaker-kyb.jpg',
  40,
  NOW(), NOW()
),
(
  'Wiper Blade Bosch Advantage',
  'wiper-blade-bosch-advantage',
  'Eksterior',
  'Karet penghapus kaca depan dengan sapuan bersih dan tidak berisik. Desain aerodinamis tanpa frame mengurangi hambatan angin dan memberikan kontak merata di seluruh permukaan kaca.',
  110000,
  '/images/products/wiper-bosch.jpg',
  120,
  NOW(), NOW()
),
(
  'Lampu Depan Philips H4',
  'lampu-depan-philips-h4',
  'Kelistrikan',
  'Bohlam lampu utama halogen dengan cahaya kuning terang untuk tembus kabut. Teknologi Blue Vision memberikan warna cahaya lebih putih hingga 4200K tanpa mengorbankan penetrasi kabut.',
  130000,
  '/images/products/lampu-philips.jpg',
  100,
  NOW(), NOW()
),
(
  'Radiator Coolant Prestone',
  'radiator-coolant-prestone',
  'Pendingin',
  'Cairan pendingin radiator 4 Liter untuk mencegah overheating dan karat. Formula All-Season Antifreeze/Coolant bekerja efektif pada suhu ekstrem dan melindungi logam dari korosi.',
  140000,
  '/images/products/coolant-prestone.jpg',
  150,
  NOW(), NOW()
),
(
  'Filter Kabin / AC Ken',
  'filter-kabin-ac-ken',
  'Filter',
  'Filter AC karbon aktif untuk menyaring udara kotor dan bau masuk ke kabin. Lapisan karbon aktif menangkap partikel PM2.5, serbuk sari, dan gas berbahaya sebelum masuk ke kabin.',
  65000,
  '/images/products/filter-kabin-ken.jpg',
  180,
  NOW(), NOW()
),
(
  'Kampas Kopling Exedy',
  'kampas-kopling-exedy',
  'Transmisi',
  'Plat kopling (clutch disc) standar OEM untuk perpindahan gigi yang halus dan responsif. Material gesek premium Exedy memberikan daya cengkeram optimal tanpa selip.',
  420000,
  '/images/products/kampas-kopling-exedy.jpg',
  50,
  NOW(), NOW()
),
(
  'Tie Rod End 555 Japan',
  'tie-rod-end-555-japan',
  'Kaki-kaki',
  'Komponen sistem kemudi untuk menjaga kestabilan roda depan. Produksi Jepang dengan presisi tinggi, menggunakan material baja tempa yang tahan beban lateral.',
  210000,
  '/images/products/tierod-555.jpg',
  70,
  NOW(), NOW()
),
(
  'Kampas Rem Belakang Akebono',
  'kampas-rem-belakang-akebono',
  'Pengereman',
  'Sepatu rem tromol (brake shoe) belakang dengan daya tahan aus yang baik. Formula asbestos-free ramah lingkungan dengan koefisien gesek yang stabil di berbagai suhu.',
  230000,
  '/images/products/kampas-rem-akebono.jpg',
  90,
  NOW(), NOW()
),
(
  'Minyak Rem Jumbo DOT 3',
  'minyak-rem-jumbo-dot-3',
  'Pelumas',
  'Cairan hidrolik rem standar DOT 3 untuk performa pengereman yang stabil. Titik didih tinggi mencegah vapor lock dan memastikan respons pengereman konsisten.',
  35000,
  '/images/products/minyak-rem-jumbo.jpg',
  250,
  NOW(), NOW()
),
(
  'V-Belt / Fan Belt Bando',
  'v-belt-fan-belt-bando',
  'Mesin',
  'Sabuk penggerak kipas, alternator, dan kompresor AC yang kuat dan lentur. Komposisi karet khusus Bando tahan suhu tinggi dan mempertahankan ketegangan lebih lama.',
  125000,
  '/images/products/vbelt-bando.jpg',
  110,
  NOW(), NOW()
),
(
  'Fuel Pump Assy Denso',
  'fuel-pump-assy-denso',
  'Bahan Bakar',
  'Pompa bensin in-tank untuk menyuplai bahan bakar ke injektor secara stabil. Unit lengkap (assy) dengan pelampung dan pressure regulator, mudah dipasang langsung.',
  650000,
  '/images/products/fuel-pump-denso.jpg',
  35,
  NOW(), NOW()
),
(
  'Thermostat Honda Genuine',
  'thermostat-honda-genuine',
  'Pendingin',
  'Katup pengatur sirkulasi air radiator untuk menjaga suhu kerja ideal mesin. Produk genuine Honda memastikan kompatibilitas sempurna dan keandalan jangka panjang.',
  180000,
  '/images/products/thermostat-honda.jpg',
  65,
  NOW(), NOW()
),
(
  'Ignition Coil Yaris/Vios',
  'ignition-coil-yaris-vios',
  'Pengapian',
  'Koil pengapian untuk menghasilkan percikan api tegangan tinggi pada busi. Kompatibel untuk Toyota Yaris dan Vios, performa setara OEM dengan harga lebih terjangkau.',
  350000,
  '/images/products/ignition-coil-yaris.jpg',
  55,
  NOW(), NOW()
),
(
  'Oli Gardan TMO GL-5',
  'oli-gardan-tmo-gl-5',
  'Pelumas',
  'Oli khusus differential (gardan) untuk mencegah keausan gigi gardan. Viskositas SAE 90 GL-5 memberikan film pelindung optimal di antara gigi-gigi gardan.',
  85000,
  '/images/products/oli-gardan-tmo.jpg',
  140,
  NOW(), NOW()
),
(
  'Klip Bumper Universal',
  'klip-bumper-universal',
  'Eksterior',
  'Paku rivet plastik untuk mengencangkan bumper atau fender yang kendor. Tipe push-pin universal cocok untuk berbagai merek kendaraan, mudah dipasang tanpa alat khusus.',
  2500,
  '/images/products/klip-bumper.jpg',
  500,
  NOW(), NOW()
);

SELECT COUNT(*) AS total_produk_terseed FROM products;
