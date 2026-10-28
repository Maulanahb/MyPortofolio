/**
 * ==========================================================================
 * TYPE-SAFE DATA LAYER (projects.ts)
 * Mendefinisikan data proyek asli berdasarkan inspeksi source code repositori.
 * ==========================================================================
 */

export interface ProjectItem {
  id: string;
  caseNumber: string;
  badge: string;
  title: string;
  description: string;
  category: string;
  problem: string;
  approach: string;
  highlights: string[];
  stack: string[];
  theme: 'agri' | 'sport' | 'pos' | 'lab';
  brandColor: string;
  sfx: string;
  sfxClass?: string;
  repoUrl: string;
  demoUrl?: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
}

export const SITE_CONFIG: SiteConfig = {
  name: "Maulana",
  role: "Software Engineer & System Architect",
  tagline: "Style boleh nyentrik. Sistem harus tetap masuk akal.",
  email: "",
  github: "https://github.com/Maulanahb",
  linkedin: "https://linkedin.com/in/maulanahb",
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "bawanghub",
    caseNumber: "CASE STUDY / 001",
    badge: "AI AGRITECH / GOOGLE GEMINI",
    title: "BAWANGHUB",
    description: "Platform Smart Agriculture untuk membantu petani bawang merah mendeteksi penyakit tanaman, memantau anomali cuaca, mencatat pembukuan operasional, dan menghitung estimasi hasil panen.",
    category: "CASE 001 / SMART AGRICULTURE & AI ASSISTANT",
    problem: "Dinamika budidaya bawang merah di lapangan menuntut keputusan yang serba cepat. Serangan hama daun dan anomali cuaca mendadak kerap memicu risiko penurunan hasil panen bila terlambat diantisipasi. Di sisi lain, kalkulasi modal benih, kebutuhan pupuk berkala, hingga proyeksi margin laba sering kali masih dihitung secara manual tanpa pencatatan operasional yang terukur.",
    approach: "Membangun aplikasi web terpadu berbasis React 19 dan Tailwind CSS yang mengintegrasikan Google Gemini AI untuk konsultasi interaktif serta diagnosis visual tanaman, dipadukan dengan prakiraan cuaca Open-Meteo, kalender jadwal pemupukan terstruktur, serta modul kalkulator proyeksi panen.",
    highlights: [
      "Agri AI Assistant: Konsultasi pertanian & rekomendasi perawatan berbasis Google Gemini AI",
      "Klinik Bawang: Diagnosis penyakit daun dan identifikasi hama tanaman via Gemini Vision",
      "Smart Weather Forecast: Integrasi prakiraan cuaca Open-Meteo dengan saran pemupukan harian AI",
      "Kalkulator Panen & Buku Tani: Estimasi tonase hasil panen, proyeksi margin laba, dan pencatatan kas operasional",
      "Statistik Pasar & Kalender Tanam: Tracking indeks harga komoditas bawang dan jadwal pemupukan terstruktur"
    ],
    stack: ["React 19", "TypeScript", "Google Gemini AI", "Tailwind CSS", "Firebase", "Express.js", "Docker"],
    theme: "agri",
    brandColor: "#059669",
    sfx: "GROW!",
    sfxClass: "project-sfx-agri",
    repoUrl: "https://github.com/Maulanahb/BawangHub"
  },
  {
    id: "lapangku",
    caseNumber: "CASE STUDY / 002",
    badge: "MOBILE / FLUTTER RIVERPOD",
    title: "LAPANGKU",
    description: "Platform mobile multi-role reservasi venue olahraga di Malang dengan sinkronisasi slot real-time, payment gateway Midtrans, dan validasi E-Ticket QR Code.",
    category: "CASE 002 / MOBILE SPORTS BOOKING & FINTECH",
    problem: "Penyewaan lapangan olahraga di berbagai GOR Malang kerap mengandalkan chat manual yang memicu risiko bentrok jadwal (double-booking), rekonsiliasi transfer manual yang merepotkan pengelola, dan ketiadaan tiket digital tervalidasi saat pemain tiba di lokasi.",
    approach: "Merancang arsitektur mobile Flutter dengan Riverpod state management dan transaksi atomik Cloud Firestore. Menghubungkan 3 peran (Customer, Mitra Pengelola, dan Superadmin) lengkap dengan checkout Midtrans otomatis dan penerbitan E-Ticket ber-QR Code untuk verifikasi instan di pintu masuk.",
    highlights: [
      "Multi-Role System: Portal independen Customer (Cari & Booking), Mitra GOR (Kelola Jadwal & Scan Tiket), dan Superadmin",
      "Location-Aware Discovery: Filter multi-kategori (Futsal, Mini Soccer, Badminton, Basket, Tenis) dengan kalkulasi radius jarak Malang",
      "Real-Time Slot Engine: Sinkronisasi ketersediaan jadwal bebas double-booking dengan transaksi atomik Firestore",
      "Gateway Pembayaran Midtrans: Checkout multi-channel (QRIS, Virtual Account, GoPay) dengan callback verifikasi otomatis",
      "E-Ticket & In-Venue QR Check-In: Penerbitan tiket digital instan yang divalidasi langsung oleh kamera aplikasi Mitra"
    ],
    stack: ["Flutter SDK", "Dart", "Riverpod", "Cloud Firestore", "Midtrans Payment", "Firebase Auth"],
    theme: "sport",
    brandColor: "#1B6B3A",
    sfx: "TAP!",
    sfxClass: "project-sfx-sport",
    repoUrl: "https://github.com/Maulanahb/Lapangku"
  },
  {
    id: "ivss",
    caseNumber: "CASE STUDY / 003",
    badge: "RESEARCH LAB / POLINEMA",
    title: "PBL-IVSS",
    description: "Portal web resmi Laboratorium Intelligent Vision and Smart System (IVSS) Polinema untuk publikasi riset, fasilitas computer vision, dan manajemen sivitas.",
    category: "CASE 003 / ACADEMIC RESEARCH & LAB PORTAL",
    problem: "Laboratorium riset IVSS Polinema membutuhkan sistem terpusat untuk mendokumentasikan hasil penelitian, publikasi jurnal internasional/nasional, manajemen peminjaman alat vision canggih, dan pengelolaan berita kegiatan lab.",
    approach: "Mengembangkan portal riset berdesain Midnight Navy dan Orange khas IVSS menggunakan arsitektur multi-role RBAC dengan 4 panel akses terpisah (Pengunjung Publik, Admin Lab, Admin Berita, dan Kepala Lab) yang terhubung ke PostgreSQL.",
    highlights: [
      "4 Hak Akses (RBAC): Kepala Lab, Admin Lab, Admin Berita, dan Pengunjung/Mahasiswa",
      "Manajemen Inventaris Alat Riset (Machine Vision Camera, Depth Camera, Workstation GPU)",
      "Repositori Publikasi Ilmiah, Jurnal, dan Direktori Profil Peneliti/Dosen IVSS Polinema",
      "Pusat Berita Kegiatan Riset, Galeri Lab, dan Alur Peminjaman Fasilitas Laboratorium"
    ],
    stack: ["PHP", "PostgreSQL", "JavaScript", "HTML5 / CSS3", "Multi-Role RBAC"],
    theme: "lab",
    brandColor: "#0A192F",
    sfx: "SCAN!",
    sfxClass: "project-sfx-lab",
    repoUrl: "https://github.com/RyuuShiro30/PBL-IVSS"
  },
  {
    id: "cuciin",
    caseNumber: "CASE STUDY / 004",
    badge: "POS & LAUNDRY / LARAVEL",
    title: "CUCI.IN",
    description: "Sistem kasir POS dan operasional laundry kiloan terintegrasi dengan pelacakan status cucian publik tanpa login (TRX-XXXX) dan cetak struk thermal.",
    category: "CASE 004 / LAUNDRY POS & STATUS TRACKING",
    problem: "Operasional laundry kiloan konvensional yang mencatat di buku nota sering memicu salah hitung kiloan, status cucian tidak transparan sehingga pelanggan harus bolak-balik bertanya, dan bukti bayar tercecer.",
    approach: "Mengembangkan sistem manajemen operasional berbasis Laravel dan PostgreSQL dengan prinsip 'Meja Kasir Dulu': alur kasir POS cepat untuk penimbangan dan cetak struk thermal 58mm, signature 4-stage stepper, serta halaman pencarian nota publik instan tanpa login.",
    highlights: [
      "Alur Meja Kasir POS Cepat: Penimbangan otomatis, kalkulasi tarif kiloan/satuan, dan split payment",
      "Signature 4-Stage Status Stepper: Diterima → Diproses → Selesai → Diambil",
      "Cek Status Cucian Publik Real-Time via Kode Nota (TRX-XXXX) tanpa Harus Membuat Akun/Login",
      "Dukungan Cetak Struk Kasir Thermal ESC/POS (58mm/80mm) dan Ekspor Laporan Finansial (PDF & Excel)",
      "Arsitektur Non-Destructive Data Integrity: Riwayat transaksi dan perubahan status tersimpan rapi"
    ],
    stack: ["Laravel Framework", "PostgreSQL", "Tailwind CSS", "Alpine.js", "Livewire", "Thermal ESC/POS"],
    theme: "pos",
    brandColor: "#0e7490",
    sfx: "CHA-CHING!",
    sfxClass: "project-sfx-pos",
    repoUrl: "https://github.com/Maulanahb/CUCI.IN"
  }
];


export interface ProcessStep {
  sfx: string;
  index: string;
  title: string;
  description: string;
  /** Hasil konkret di akhir tahap, dipisah dengan " · ". */
  deliverable: string;
}

export interface SkillGroup {
  title: string;
  items: string;
}

export interface Certification {
  /** Nama sertifikat persis seperti yang tertera di sertifikat. */
  name: string;
  /** Lembaga penerbit, mis. "Dicoding". */
  issuer: string;
  /** Tahun terbit, empat digit. */
  year: string;
  /** URL halaman kredensial publik. Kosongkan bila tidak ada — tautan VERIFY otomatis disembunyikan. */
  credentialUrl?: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    sfx: "?",
    index: "STEP 01 — UNDERSTAND",
    title: "PAHAMI<br/>MASALAHNYA.",
    description: "Siapa yang memakai, pekerjaan mana yang macet, dan bagian mana yang tidak boleh salah. Ditulis ulang dengan bahasa pengguna sebelum menyentuh kode.",
    deliverable: "1 paragraf masalah · Daftar aktor · Batasan nyata"
  },
  {
    sfx: "✦",
    index: "STEP 02 — SYSTEM MAP",
    title: "PETAKAN<br/>SISTEMNYA.",
    description: "Alur data, hak akses, dan titik gagal dipetakan sebelum satu layar dibuat. Keputusan teknis diambil di sini, bukan saat coding sudah setengah jalan.",
    deliverable: "Skema data · Aturan hak akses · Titik gagal"
  },
  {
    sfx: "!",
    index: "STEP 03 — BUILD & TEST",
    title: "BANGUN,<br/>LALU UJI.",
    description: "Fitur dibangun bertahap dan diuji pada skenario yang paling mungkin gagal — bukan hanya jalur mulus yang saya bayangkan sendiri.",
    deliverable: "Fitur jalan · Skenario uji · Catatan revisi"
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Web & Backend",
    items: "Laravel, PHP, RESTful API, PostgreSQL, Database Architecture"
  },  {
    title: "Mobile & Frontend",
    items: "Flutter SDK, Dart, Riverpod, React, TypeScript, Tailwind CSS"
  },
  {
    title: "Cloud & AI Infrastructure",
    items: "Google Cloud Platform (GCP), Cloud Run, Docker, Google Gemini AI, Firebase"
  },
  {
    title: "System Analysis & QA",
    items: "Multi-Role RBAC, POS Thermal I/O, PHPUnit, Dokumentasi Sistem"
  }
];

/**
 * Sertifikasi. Ditampilkan sebagai strip ringkas di dalam About (bukan section
 * tersendiri) karena jumlahnya sedikit. Contoh isian:
 *
 *   { name: "Belajar Dasar Pemrograman Web", issuer: "Dicoding", year: "2024",
 *     credentialUrl: "https://www.dicoding.com/certificates/XXXXXXXXXXXX" }
 *
 * Selama `credentialUrl` kosong, tautan VERIFY tidak dirender.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    name: "Nama Sertifikat Dicoding",
    issuer: "Dicoding",
    year: "2025",
    credentialUrl: ""
  },
  {
    name: "Nama Sertifikat Dicoding",
    issuer: "Dicoding",
    year: "2025",
    credentialUrl: ""
  }
];
