// src/lib/autoReply.ts
// Mesin auto-reply berbasis kata kunci — mencocokkan pesan customer
// dengan beberapa pola pertanyaan umum, lalu memilih jawaban yang relevan.
// Kalau tidak ada kata kunci yang cocok, kembalikan jawaban default.

interface ReplyRule {
  keywords: string[]
  responses: string[] // beberapa variasi jawaban, dipilih acak agar tidak monoton
}

const RULES: ReplyRule[] = [
  {
    keywords: ['ongkir', 'pengiriman', 'kirim', 'dikirim', 'sampai', 'ekspedisi', 'kurir'],
    responses: [
      'Untuk pengiriman, kami bekerja sama dengan beberapa ekspedisi terpercaya. Estimasi sampai 1–3 hari kerja untuk area Jabodetabek, dan 3–7 hari untuk luar pulau. Gratis ongkir untuk pembelian di atas Rp 500.000 ya! 🚚',
      'Pengiriman pesanan kamu akan diproses maksimal 1×24 jam setelah pembayaran dikonfirmasi. Setelah itu, estimasi tiba tergantung lokasi — biasanya 1–5 hari kerja. 📦',
    ],
  },
  {
    keywords: ['garansi', 'rusak', 'cacat', 'komplain', 'retur', 'tukar', 'refund'],
    responses: [
      'Semua produk di AutoPart bergaransi keaslian dari distributor resmi. Kalau barang yang diterima rusak/cacat produksi, kamu bisa ajukan retur maksimal 3 hari setelah barang diterima dengan menyertakan foto/video unboxing ya. 🛡️',
      'Untuk komplain produk, silakan siapkan foto kondisi barang dan nomor pesanan kamu. Tim kami akan proses penggantian atau refund sesuai kebijakan retur dalam 1–2 hari kerja. 🙏',
    ],
  },
  {
    keywords: ['original', 'asli', 'palsu', 'kw', 'keaslian'],
    responses: [
      'Tenang, semua produk kami 100% original dan resmi dari distributor terpercaya — bukan barang KW ya! Setiap produk juga sudah melalui quality check sebelum dikirim. ✅',
    ],
  },
  {
    keywords: ['cod', 'bayar di tempat', 'cash on delivery'],
    responses: [
      'Saat ini kami menyediakan metode pembayaran Transfer Bank (BCA, Mandiri, BNI) dan COD (Bayar di Tempat) untuk area tertentu. Kamu bisa pilih metode COD saat checkout di halaman pembayaran. 💵',
    ],
  },
  {
    keywords: ['harga', 'diskon', 'promo', 'murah', 'mahal'],
    responses: [
      'Harga yang tertera di setiap produk sudah merupakan harga terbaik kami. Pantau terus halaman utama untuk promo dan diskon menarik setiap bulannya ya! 🏷️',
    ],
  },
  {
    keywords: ['stok', 'tersedia', 'ready', 'kosong', 'habis'],
    responses: [
      'Untuk cek ketersediaan stok, kamu bisa lihat langsung di halaman detail produk — kami selalu update stok secara real-time. Kalau ada stok terbatas, biasanya muncul label "Stok Terbatas" di kartu produk. 📦',
    ],
  },
  {
    keywords: ['cara pesan', 'cara beli', 'checkout', 'bagaimana cara'],
    responses: [
      'Cara belanja gampang banget: 1) Pilih produk → masukkan keranjang, 2) Klik ikon keranjang → Lanjut ke Checkout, 3) Isi alamat pengiriman, 4) Pilih metode pembayaran, 5) Konfirmasi pesanan. Selesai! 🛒',
    ],
  },
  {
    keywords: ['halo', 'hai', 'hi', 'pagi', 'siang', 'sore', 'malam', 'min', 'admin'],
    responses: [
      'Halo juga! 👋 Selamat datang di AutoPart. Ada yang bisa kami bantu seputar produk atau pesanan kamu?',
      'Hai! Senang bisa membantu kamu hari ini 😊 Ada pertanyaan seputar sparepart yang kamu cari?',
    ],
  },
  {
    keywords: ['terima kasih', 'makasih', 'thanks', 'thx'],
    responses: [
      'Sama-sama! Senang bisa membantu 😊 Kalau ada pertanyaan lain seputar produk atau pesanan, jangan ragu untuk chat kami lagi ya!',
    ],
  },
  {
    keywords: ['kompatibel', 'cocok', 'sesuai', 'muat'],
    responses: [
      'Untuk memastikan kompatibilitas sparepart dengan kendaraan kamu, mohon sebutkan merek, tipe, dan tahun kendaraan kamu ya — nanti tim kami bantu cek kecocokannya. 🔧',
    ],
  },
]

const DEFAULT_RESPONSES = [
  'Terima kasih atas pesannya! Pertanyaan kamu sudah kami catat dan tim CS kami akan membalas lebih detail dalam jam kerja (08.00–17.00 WIB). 🙏',
  'Pesan kamu sudah kami terima. Untuk pertanyaan yang lebih spesifik, tim support kami akan segera menindaklanjuti ya. Terima kasih sudah menghubungi AutoPart! 😊',
  'Baik, kami sudah mencatat pertanyaan kamu. Sementara itu, kamu juga bisa cek halaman FAQ atau detail produk untuk info lebih lanjut. Tim kami akan follow up segera. 📩',
]

/**
 * Menentukan balasan otomatis berdasarkan kata kunci di pesan customer.
 * Jika beberapa rule cocok, pilih rule dengan jumlah kata kunci cocok terbanyak.
 */
export function generateAutoReply(message: string): string {
  const normalized = message.toLowerCase()

  let bestMatch: { rule: ReplyRule; score: number } | null = null

  for (const rule of RULES) {
    const score = rule.keywords.filter((kw) => normalized.includes(kw)).length
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { rule, score }
    }
  }

  const pool = bestMatch ? bestMatch.rule.responses : DEFAULT_RESPONSES
  return pool[Math.floor(Math.random() * pool.length)]
}
