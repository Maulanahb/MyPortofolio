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
    badge: "WEB APP / SUPPLY CHAIN",
    title: "BAWANGHUB",
    description: "Platform web terintegrasi untuk manajemen rantai pasok komoditas, monitoring stok multi-hub gudang, dan analitik distribusi logistik.",
    category: "CASE 001 / COMMODITY SUPPLY CHAIN & LOGISTICS",
    problem: "Alur distribusi komoditas pangan sering menghadapi kendala pencatatan manual antar pihak, selisih data stok fisik di gudang transit, serta sulitnya melacak status surat jalan pengiriman secara real-time.",
    approach: "Membangun platform dashboard web modern (React, TypeScript, Tailwind CSS) dengan backend REST API dan basis data terstruktur, menghadirkan monitoring stok multi-gudang terpusat, pencatatan surat jalan distribusi komoditas, serta kalkulator indeks harga pasar, dikemas dalam container Docker siap rilis ke cloud.",
    highlights: [
      "Multi-Hub Warehouse Inventory: Monitoring stok masuk, keluar, dan mutasi komoditas terpusat",
      "Fleet & Dispatch Tracking: Pembuatan dan pelacakan surat jalan digital pengiriman antar hub",
      "Commodity Market Index: Pemantauan tren harga pasar harian dan estimasi nilai komoditas",
      "Audit Trail & Non-Destructive Log: Riwayat transaksi dan pergerakan barang terdokumentasi akurat",
      "Containerized Docker Architecture: Standar deployment portable siap rilis ke cloud environment"
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Docker", "REST API", "PostgreSQL"],
    theme: "agri",
    brandColor: "#059669",
    sfx: "DISPATCH!",
    sfxClass: "project-sfx-agri",
    repoUrl: "https://github.com/Maulanahb/BawangHub"
  },
  {
    id: "lapangku",
    caseNumber: "CASE STUDY / 002",
    badge: "MOBILE / FLUTTER RIVERPOD",
    title: "LAPANGKU",
    description: "Aplikasi mobile multi-role pemesanan lapangan olahraga di Malang dengan manajemen jadwal real-time Firebase, Midtrans, dan E-Ticket QR Scanner.",
    category: "CASE 002 / MOBILE SPORTS BOOKING & FINTECH",
    problem: "Pemesanan lapangan olahraga secara manual via chat rentan bentrok jadwal (double-booking), konfirmasi bukti transfer yang merepotkan pemilik GOR, dan belum adanya tiket digital yang tervalidasi saat pengguna tiba di venue.",
    approach: "Merancang arsitektur mobile Flutter dengan Riverpod state management dan Firestore real-time synchronization, menghadirkan 3 peran pengguna (Customer, Mitra Pemilik Lapangan, dan Admin), integrasi gateway Midtrans, serta sistem E-Ticket dengan QR scanner di sisi Mitra.",
    highlights: [
      "Multi-Role System: Customer (Cari & Booking), Mitra (Kelola Jadwal & Scan QR Tiket), dan Admin",
      "Pencarian GOR multi-kategori (Futsal, Mini Soccer, Badminton, Basket, Tenis) area Malang",
      "Kalender Ketersediaan Jadwal & Slot Waktu Real-Time dengan pencegahan double-booking atomik",
      "Integrasi Gateway Pembayaran Midtrans (QRIS, VA, E-Wallet) dengan verifikasi otomatis",
      "Penerbitan E-Ticket Digital Instan dengan QR Code yang dapat discan oleh pihak Mitra"
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
    stack: ["Laravel Framework", "PostgreSQL", "Tailwind CSS", "Alpine.js", "Thermal ESC/POS", "PHPUnit"],
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
}

export interface SkillGroup {
  title: string;
  items: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    sfx: "?",
    index: "STEP 01 — UNDERSTAND",
    title: "PAHAMI<br/>MASALAH.",
    description: "Petakan kebutuhan pengguna, proses bisnis, dan titik yang sering membuat pekerjaan tersendat."
  },
  {
    sfx: "✦",
    index: "STEP 02 — DESIGN",
    title: "RANCANG<br/>ALURNYA.",
    description: "Susun struktur data, interaksi, dan batas sistem sebelum fitur mulai dibangun."
  },
  {
    sfx: "!",
    index: "STEP 03 — BUILD & TEST",
    title: "BANGUN.<br/>UJI. REVISI.",
    description: "Implementasikan fitur, cek skenario penting, lalu perbaiki bagian yang belum nyaman dipakai."
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Web & Backend",
    items: "Laravel, PHP, RESTful API, PostgreSQL, Database Architecture"
  },
  {
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
