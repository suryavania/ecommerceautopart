// prisma/seed.ts — Jalankan: npx ts-node prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const products = [
  { name: 'Busi Iridium NGK', slug: 'busi-iridium-ngk', category: 'Pengapian', description: 'Busi performa tinggi untuk efisiensi pembakaran mesin yang optimal. Elektroda iridium berdiameter kecil memberikan pengapian yang lebih stabil, hemat bahan bakar, dan umur pakai lebih panjang dibanding busi konvensional.', price: 95000, image: '/images/products/busi-ngk.jpg', stock: 150 },
  { name: 'Oli Mesin Shell Helix HX7 4L', slug: 'oli-mesin-shell-helix-hx7-4l', category: 'Pelumas', description: 'Oli mesin semi-sintetik premium Shell Helix HX7 untuk menjaga keawetan dan performa mesin. Formulasi ActiveCleanse Technology membersihkan deposit dan kotoran di dalam mesin secara aktif.', price: 350000, image: '/images/products/oli-shell.jpg', stock: 200 },
  { name: 'Kampas Rem Depan Bendix', slug: 'kampas-rem-depan-bendix', category: 'Pengereman', description: 'Kampas rem cakram depan dengan teknologi ceramic untuk pengereman pakem dan minim debu. Formulasi keramik memberikan performa konsisten pada berbagai kondisi suhu tanpa fade.', price: 280000, image: '/images/products/kampas-rem-bendix.jpg', stock: 80 },
  { name: 'Aki GS Astra MF NS40Z', slug: 'aki-gs-astra-mf-ns40z', category: 'Kelistrikan', description: 'Aki kering Maintenance Free (MF) kapasitas 35Ah yang awet dan tahan lama. Teknologi sealed recombination meminimalkan penguapan air aki sehingga bebas perawatan rutin.', price: 850000, image: '/images/products/aki-gs.jpg', stock: 60 },
  { name: 'Filter Udara Sakura', slug: 'filter-udara-sakura', category: 'Filter', description: 'Penyaring udara masuk ke ruang bakar untuk mencegah masuknya debu dan kotoran. Material kertas filter berkualitas tinggi menjamin aliran udara optimal dan perlindungan mesin maksimal.', price: 75000, image: '/images/products/filter-udara-sakura.jpg', stock: 200 },
  { name: 'Filter Oli Denso', slug: 'filter-oli-denso', category: 'Filter', description: 'Menyaring kotoran dan gram logam pada sirkulasi oli mesin mobil. Elemen filter presisi tinggi menjaga kebersihan oli dan memperpanjang umur pakai mesin.', price: 45000, image: '/images/products/filter-oli-denso.jpg', stock: 300 },
  { name: 'Shockbreaker KYB Ultra', slug: 'shockbreaker-kyb-ultra', category: 'Kaki-kaki', description: 'Peredam kejut suspensi belakang untuk stabilitas berkendara harian. Teknologi gas-filled KYB memberikan respons yang lebih linear dan nyaman dibanding shockbreaker konvensional.', price: 550000, image: '/images/products/shockbreaker-kyb.jpg', stock: 40 },
  { name: 'Wiper Blade Bosch Advantage', slug: 'wiper-blade-bosch-advantage', category: 'Eksterior', description: 'Karet penghapus kaca depan dengan sapuan bersih dan tidak berisik. Desain aerodinamis tanpa frame mengurangi hambatan angin dan memberikan kontak merata di seluruh permukaan kaca.', price: 110000, image: '/images/products/wiper-bosch.jpg', stock: 120 },
  { name: 'Lampu Depan Philips H4', slug: 'lampu-depan-philips-h4', category: 'Kelistrikan', description: 'Bohlam lampu utama halogen dengan cahaya kuning terang untuk tembus kabut. Teknologi Blue Vision memberikan warna cahaya lebih putih hingga 4200K tanpa mengorbankan penetrasi kabut.', price: 130000, image: '/images/products/lampu-philips.jpg', stock: 100 },
  { name: 'Radiator Coolant Prestone', slug: 'radiator-coolant-prestone', category: 'Pendingin', description: 'Cairan pendingin radiator 4 Liter untuk mencegah overheating dan karat. Formula All-Season Antifreeze/Coolant bekerja efektif pada suhu ekstrem dan melindungi logam dari korosi.', price: 140000, image: '/images/products/coolant-prestone.jpg', stock: 150 },
  { name: 'Filter Kabin / AC Ken', slug: 'filter-kabin-ac-ken', category: 'Filter', description: 'Filter AC karbon aktif untuk menyaring udara kotor dan bau masuk ke kabin. Lapisan karbon aktif menangkap partikel PM2.5, serbuk sari, dan gas berbahaya sebelum masuk ke kabin.', price: 65000, image: '/images/products/filter-kabin-ken.jpg', stock: 180 },
  { name: 'Kampas Kopling Exedy', slug: 'kampas-kopling-exedy', category: 'Transmisi', description: 'Plat kopling (clutch disc) standar OEM untuk perpindahan gigi yang halus dan responsif. Material gesek premium Exedy memberikan daya cengkeram optimal tanpa selip.', price: 420000, image: '/images/products/kampas-kopling-exedy.jpg', stock: 50 },
  { name: 'Tie Rod End 555 Japan', slug: 'tie-rod-end-555-japan', category: 'Kaki-kaki', description: 'Komponen sistem kemudi untuk menjaga kestabilan roda depan. Produksi Jepang dengan presisi tinggi, menggunakan material baja tempa yang tahan beban lateral.', price: 210000, image: '/images/products/tierod-555.jpg', stock: 70 },
  { name: 'Kampas Rem Belakang Akebono', slug: 'kampas-rem-belakang-akebono', category: 'Pengereman', description: 'Sepatu rem tromol (brake shoe) belakang dengan daya tahan aus yang baik. Formula asbestos-free ramah lingkungan dengan koefisien gesek yang stabil di berbagai suhu.', price: 230000, image: '/images/products/kampas-rem-akebono.jpg', stock: 90 },
  { name: 'Minyak Rem Jumbo DOT 3', slug: 'minyak-rem-jumbo-dot-3', category: 'Pelumas', description: 'Cairan hidrolik rem standar DOT 3 untuk performa pengereman yang stabil. Titik didih tinggi mencegah vapor lock dan memastikan respons pengereman konsisten.', price: 35000, image: '/images/products/minyak-rem-jumbo.jpg', stock: 250 },
  { name: 'V-Belt / Fan Belt Bando', slug: 'v-belt-fan-belt-bando', category: 'Mesin', description: 'Sabuk penggerak kipas, alternator, dan kompresor AC yang kuat dan lentur. Komposisi karet khusus Bando tahan suhu tinggi dan mempertahankan ketegangan lebih lama.', price: 125000, image: '/images/products/vbelt-bando.jpg', stock: 110 },
  { name: 'Fuel Pump Assy Denso', slug: 'fuel-pump-assy-denso', category: 'Bahan Bakar', description: 'Pompa bensin in-tank untuk menyuplai bahan bakar ke injektor secara stabil. Unit lengkap (assy) dengan pelampung dan pressure regulator, mudah dipasang langsung.', price: 650000, image: '/images/products/fuel-pump-denso.jpg', stock: 35 },
  { name: 'Thermostat Honda Genuine', slug: 'thermostat-honda-genuine', category: 'Pendingin', description: 'Katup pengatur sirkulasi air radiator untuk menjaga suhu kerja ideal mesin. Produk genuine Honda memastikan kompatibilitas sempurna dan keandalan jangka panjang.', price: 180000, image: '/images/products/thermostat-honda.jpg', stock: 65 },
  { name: 'Ignition Coil Yaris/Vios', slug: 'ignition-coil-yaris-vios', category: 'Pengapian', description: 'Koil pengapian untuk menghasilkan percikan api tegangan tinggi pada busi. Kompatibel untuk Toyota Yaris dan Vios, performa setara OEM dengan harga lebih terjangkau.', price: 350000, image: '/images/products/ignition-coil-yaris.jpg', stock: 55 },
  { name: 'Oli Gardan TMO GL-5', slug: 'oli-gardan-tmo-gl-5', category: 'Pelumas', description: 'Oli khusus differential (gardan) untuk mencegah keausan gigi gardan. Viskositas SAE 90 GL-5 memberikan film pelindung optimal di antara gigi-gigi gardan.', price: 85000, image: '/images/products/oli-gardan-tmo.jpg', stock: 140 },
  { name: 'Klip Bumper Universal', slug: 'klip-bumper-universal', category: 'Eksterior', description: 'Paku rivet plastik untuk mengencangkan bumper atau fender yang kendor. Tipe push-pin universal cocok untuk berbagai merek kendaraan, mudah dipasang tanpa alat khusus.', price: 2500, image: '/images/products/klip-bumper.jpg', stock: 500 },
]

async function main() {
  console.log('🌱 Memulai seed database...')

  // Seed produk
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }
  console.log(`✅ ${products.length} produk berhasil di-seed`)

  // Buat akun admin demo
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@autoprime.id' },
    update: {},
    create: {
      name: 'Admin AutoPrime',
      email: 'admin@autoprime.id',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Akun admin dibuat: admin@autoprime.id / admin123')

  // Buat akun customer demo
  const custPassword = await bcrypt.hash('demo123', 12)
  await prisma.user.upsert({
    where: { email: 'demo@autoprime.id' },
    update: {},
    create: {
      name: 'Budi Santoso',
      email: 'demo@autoprime.id',
      password: custPassword,
      role: 'CUSTOMER',
    },
  })
  console.log('✅ Akun customer dibuat: demo@autoprime.id / demo123')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
