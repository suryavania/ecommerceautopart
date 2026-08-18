// src/components/PaymentIcons.tsx
// Logo bank & pembayaran sebagai SVG inline — tidak butuh file eksternal

export function BCAIcon({ className = 'h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="6" fill="#005BAA"/>
      <text x="12" y="27" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="white">BCA</text>
      <rect x="72" y="10" width="36" height="20" rx="3" fill="#FF6B00"/>
      <text x="90" y="25" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="white" textAnchor="middle">bank</text>
    </svg>
  )
}

export function MandiriIcon({ className = 'h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="6" fill="#003087"/>
      <rect x="0" y="0" width="120" height="40" rx="6" fill="#FFCC00"/>
      <text x="60" y="26" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#003087" textAnchor="middle">mandiri</text>
    </svg>
  )
}

export function BNIIcon({ className = 'h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="6" fill="#FF6200"/>
      <text x="14" y="28" fontFamily="Arial" fontWeight="bold" fontSize="22" fill="white">BNI</text>
      <circle cx="95" cy="20" r="12" fill="white" opacity="0.2"/>
      <text x="95" y="25" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="white" textAnchor="middle">46</text>
    </svg>
  )
}

export function CODIcon({ className = 'h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="6" fill="#16A34A"/>
      <text x="10" y="17" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">BAYAR DI</text>
      <text x="10" y="32" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">TEMPAT</text>
      <text x="95" y="27" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="white" textAnchor="middle">💵</text>
    </svg>
  )
}

export function QRISIcon({ className = 'h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background putih dengan border merah */}
      <rect width="120" height="40" rx="6" fill="white" stroke="#E53E1A" strokeWidth="1.5"/>
      {/* Teks QRIS merah */}
      <text x="14" y="17" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#E53E1A">QRIS</text>
      {/* Garis bawah dekoratif */}
      <rect x="14" y="20" width="40" height="2" fill="#E53E1A"/>
      {/* Subtitle */}
      <text x="14" y="33" fontFamily="Arial" fontSize="8" fill="#666">Scan QR Code</text>
      {/* QR icon kanan */}
      <rect x="85" y="8" width="24" height="24" rx="3" fill="#E53E1A" opacity="0.1"/>
      <rect x="89" y="12" width="7" height="7" rx="1" fill="#E53E1A"/>
      <rect x="98" y="12" width="7" height="7" rx="1" fill="#E53E1A"/>
      <rect x="89" y="21" width="7" height="7" rx="1" fill="#E53E1A"/>
      <rect x="99" y="21" width="2" height="2" fill="#E53E1A"/>
      <rect x="103" y="21" width="2" height="2" fill="#E53E1A"/>
      <rect x="99" y="25" width="2" height="2" fill="#E53E1A"/>
      <rect x="103" y="25" width="2" height="2" fill="#E53E1A"/>
    </svg>
  )
}
