/**
 * ==========================================================================
 * DATA LAYER (projects.ts)
 * Data portofolio Maulana Ahmad Bukhori: profil, proyek, alur kerja,
 * keahlian teknis, pengalaman, pendidikan, sertifikasi, dan kontak.
 * ==========================================================================
 */

export interface ProjectProcess {
  analysis: string;
  design: string;
  implementation: string;
}

export type ProjectDomain = 'web' | 'mobile' | 'ai';

export interface ProjectItem {
  id: string;
  badge: string;
  projectType: string;
  title: string;
  description: string;
  category: string;
  role: string;
  problem: string;
  approach: string;
  process: ProjectProcess;
  impact: string;
  impactMetrics: string[];
  artifacts: string[];
  highlights: string[];
  stack: string[];
  domains: ProjectDomain[];
  skillIds: string[];
  theme: 'agri' | 'sport' | 'pos' | 'lab' | 'fintech';
  brandColor: string;
  sfx: string;
  sfxClass?: string;
  repoUrl: string;
  demoUrl?: string;
  figmaUrl?: string;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  githubHandle: string;
  nim: string;
  role: string;
  positioning: string;
  tagline: string;
  campus: string;
  department: string;
  program: string;
  period: string;
  semester: string;
  gpa: string;
  availability: string;
  interests: string[];
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

export const SITE_CONFIG: SiteConfig = {
  name: "Maulana",
  fullName: "Maulana Ahmad Bukhori",
  githubHandle: "Maulanahb",
  nim: "244107060133",
  role: "System Analyst & Web / Mobile Developer",
  positioning: "Mahasiswa D-IV Sistem Informasi Bisnis di Politeknik Negeri Malang. Fokus pada analisis kebutuhan sistem, aplikasi web (Laravel & React), dan mobile (Flutter).",
  tagline: "Merancang kebutuhan sistem, skema database, hingga implementasi aplikasi web dan mobile.",
  campus: "Politeknik Negeri Malang (Polinema)",
  department: "Jurusan Teknologi Informasi (JTI)",
  program: "D-IV Sistem Informasi Bisnis",
  period: "2024 – Sekarang",
  semester: "Semester 5",
  gpa: "",
  availability: "Open to Work",
  interests: [
    "System Analyst",
    "Web Developer",
    "Mobile Developer (Flutter)",
    "AI Integration",
    "Database Design"
  ],
  email: "maulanahmad2287@gmail.com",
  github: "https://github.com/Maulanahb",
  linkedin: "https://linkedin.com/in/maulanahb",
  cvUrl: "/CV-Maulana-Ahmad-Bukhori.pdf"
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "cuciin",
    badge: "Kasir Laundry",
    projectType: "Proyek Tim · Laravel",
    title: "CUCI.IN",
    description: "Sistem kasir laundry. Pelanggan bisa cek status cucian cukup dengan nomor nota, tanpa perlu login.",
    category: "Kasir Laundry & Cek Status",
    role: "System analyst dan full-stack developer di tim 5 developer. Saya menulis Project Charter dan PRD, lalu membangun fitur cek status cucian, pembayaran, komplain, manajemen user, dan laporan keuangan.",
    problem: "Laundry kecil masih mencatat pesanan di buku. Pelanggan harus datang atau menelepon untuk tahu cuciannya sudah selesai, dan pemilik kesulitan merekap pemasukan tiap bulan.",
    approach: "Kebutuhan tiga pengguna (admin, kasir, pelanggan) saya tulis dulu di PRD, baru dibangun dengan Laravel dan PostgreSQL. Setiap fitur utama punya feature test yang berjalan otomatis di GitHub Actions.",
    process: {
      analysis: "Menyusun Project Charter, PRD, rencana biaya server (AWS Free Tier), dan target milestone bersama tim.",
      design: "Merancang skema database, pembagian hak akses tiga role, dan design system untuk tampilan.",
      implementation: "Membangun fitur cek nota, pembayaran, komplain, manajemen user, dan laporan, lengkap dengan test PHPUnit dan CI di GitHub Actions."
    },
    impact: "Pelanggan bisa memantau cucian dari HP tanpa akun, kasir mencatat transaksi dan pembayaran di satu tempat, dan admin langsung melihat rekap pemasukan.",
    impactMetrics: [
      "3 role pengguna: admin, kasir, dan pelanggan",
      "4 tahap status cucian yang bisa dicek dengan nomor nota",
      "Laporan keuangan dipercepat dengan index komposit di PostgreSQL",
      "Feature test PHPUnit jalan otomatis setiap push ke GitHub"
    ],
    artifacts: ["Project Charter & PRD", "Rencana biaya AWS", "Design System", "Skema database", "CI GitHub Actions"],
    highlights: [
      "Cek status cucian: pelanggan cukup memasukkan nomor nota",
      "Kasir dan pembayaran: transaksi kiloan atau satuan, status bayar tercatat",
      "Komplain: pelanggan mengajukan keluhan yang langsung terhubung ke notanya",
      "Manajemen user: admin tidak bisa menonaktifkan akunnya sendiri secara tidak sengaja",
      "Laporan keuangan: rekap pemasukan per periode"
    ],
    stack: ["Laravel", "PostgreSQL", "Tailwind CSS", "Alpine.js", "PHPUnit"],
    domains: ["web"],
    skillIds: ["laravel", "php", "postgresql", "tailwindcss", "prd", "erd", "matview", "rbac", "cloudcost", "git", "github"],
    theme: "pos",
    brandColor: "#0e7490",
    sfx: "CHA-CHING!",
    sfxClass: "project-sfx-pos",
    repoUrl: "https://github.com/Maulanahb/CUCI.IN"
  },
  {
    id: "bawanghub",
    badge: "Web AI Agritech",
    projectType: "Proyek Individu · React & Gemini",
    title: "BAWANGHUB",
    description: "Aplikasi web untuk petani bawang merah: tanya AI soal budidaya, pantau harga, cek cuaca, dan catat kas tani.",
    category: "Aplikasi Pertanian & Asisten AI",
    role: "Dikerjakan sendiri dari desain sampai deploy. Saya membangun tujuh halaman utama, menyimpan API key Gemini di server agar tidak bocor ke browser, dan men-deploy aplikasinya ke Google Cloud Run.",
    problem: "Petani bawang merah butuh jawaban cepat soal hama, gambaran harga pasar sebelum menjual, dan info cuaca lokal, sering kali dengan sinyal internet yang tidak stabil.",
    approach: "Saya membangun PWA dengan React dan TypeScript. Panggilan ke Gemini lewat server Express kecil, prediksi harga memakai regresi linier sederhana, dan data cuaca diambil dari Open-Meteo.",
    process: {
      analysis: "Memetakan kebutuhan harian petani: konsultasi budidaya, harga, cuaca, catatan kas, dan forum diskusi.",
      design: "Membuat tampilan kontras tinggi bergaya neo-brutalism supaya tetap terbaca di layar HP saat di luar ruangan.",
      implementation: "Membangun frontend React, server Express untuk Gemini dan cuaca, login dan data di Firebase, service worker untuk mode offline, lalu deploy dengan Docker."
    },
    impact: "Konsultasi AI, grafik harga, cuaca, catatan kas, dan forum petani ada dalam satu aplikasi yang bisa dipasang di HP.",
    impactMetrics: [
      "7 halaman utama, termasuk Tanya AI, Statistik Harga, dan Buku Tani",
      "API key Gemini hanya ada di server, tidak terlihat di browser",
      "Prediksi tren harga dengan regresi linier di grafik Recharts",
      "Bisa dipasang sebagai PWA dan berjalan di Google Cloud Run"
    ],
    artifacts: ["Design system neo-brutalism", "Server Express untuk AI", "Model regresi harga", "Docker & Cloud Run"],
    highlights: [
      "Tanya AI: konsultasi budidaya bawang merah lewat Gemini",
      "Statistik harga: grafik harga dan perkiraan tren ke depan",
      "Cuaca: prakiraan lokal dengan sumber cadangan kalau API utama gagal",
      "Buku Tani dan forum: catat pengeluaran dan berdiskusi dengan petani lain",
      "Mode offline: halaman yang pernah dibuka tetap bisa diakses tanpa sinyal"
    ],
    stack: ["React", "TypeScript", "Gemini API", "Tailwind CSS", "Firebase", "Express.js", "Docker"],
    domains: ["web", "ai"],
    skillIds: ["react", "typescript", "javascript", "nodejs", "tailwindcss", "googlegemini", "firebase-auth", "docker", "googlecloud", "git", "github"],
    theme: "agri",
    brandColor: "#059669",
    sfx: "GROW!",
    sfxClass: "project-sfx-agri",
    repoUrl: "https://github.com/Maulanahb/BawangHub"
  },
  {
    id: "lapangku",
    badge: "Booking Lapangan",
    projectType: "Proyek Tim · Flutter",
    title: "LAPANGKU",
    description: "Aplikasi Flutter untuk booking lapangan olahraga, dengan pembayaran Midtrans dan dashboard pendapatan untuk pemilik GOR.",
    category: "Booking Lapangan & Midtrans",
    role: "Mobile developer di tim 4 developer. Saya menyiapkan struktur Firebase dan state management, membangun modul penyewa dan mitra GOR, memindahkan pembayaran ke Midtrans, dan membuat landing page-nya.",
    problem: "Booking lapangan biasanya lewat chat dan transfer manual. Pemilik GOR harus mengecek bukti bayar satu per satu, dan slot sering tertahan oleh penyewa yang tidak jadi bayar.",
    approach: "Aplikasi Flutter dengan tiga role (penyewa, mitra GOR, admin), data real-time di Firestore, dan pembayaran lewat Midtrans Snap. Booking yang tidak dibayar dalam 15 menit otomatis batal.",
    process: {
      analysis: "Memetakan alur booking tiga role, aturan status booking, batas waktu pembayaran, dan pembagian biaya platform.",
      design: "Merancang state management dengan Riverpod, struktur data dan aturan keamanan Firestore, serta tampilan aplikasi dan landing page.",
      implementation: "Membangun modul penyewa dan mitra, menulis unit test untuk status booking, integrasi Midtrans, deep link, dan landing page dengan Vite."
    },
    impact: "Penyewa bisa pesan dan bayar dari aplikasi. Slot yang tidak dibayar dilepas otomatis, dan mitra GOR melihat pendapatan bersih setelah dipotong biaya platform.",
    impactMetrics: [
      "3 role pengguna: penyewa, mitra GOR, dan admin",
      "Booking otomatis batal kalau tidak dibayar dalam 15 menit",
      "Pendapatan mitra dipisah otomatis dari biaya platform",
      "Unit test untuk logika status booking"
    ],
    artifacts: ["Arsitektur Riverpod & Firebase", "Unit Test Logika Booking", "Aturan Keamanan Firestore", "Integrasi Midtrans Snap Gateway"],
    highlights: [
      "Tiga role dalam satu aplikasi: penyewa, mitra GOR, dan admin",
      "Pembayaran Midtrans: bayar di aplikasi, batal otomatis setelah 15 menit",
      "Dashboard mitra: pendapatan real-time setelah dipotong biaya platform",
      "Deep link: notifikasi langsung membuka halaman booking yang sesuai",
      "E-Ticket digital: validasi status booking otomatis"
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Firestore", "Midtrans", "Firebase Auth"],
    domains: ["mobile"],
    skillIds: ["flutter", "dart", "firebase-auth", "midtrans", "rbac", "git", "github"],
    theme: "sport",
    brandColor: "#1B6B3A",
    sfx: "TAP!",
    sfxClass: "project-sfx-sport",
    repoUrl: "https://github.com/Maulanahb/Lapangku",
    demoUrl: "https://landing-page-lapangku.vercel.app"
  },
  {
    id: "ivss",
    badge: "Portal Lab Riset",
    projectType: "Proyek Tim · PHP & PostgreSQL",
    title: "PORTAL LAB IVSS",
    description: "Portal web Laboratorium IVSS JTI Polinema untuk berita kegiatan, profil peneliti, dan fasilitas lab.",
    category: "Portal Lab & Panel Berita",
    role: "Full-stack developer di tim 5 developer. Saya membangun seluruh panel admin berita, mempercepat statistik dashboard dengan Materialized View, dan merapikan halaman login serta tampilan publik.",
    problem: "Informasi Lab IVSS tersebar dan tidak ada tempat resmi untuk mempublikasikan berita kegiatan, profil dosen dan mahasiswa riset, serta fasilitas lab.",
    approach: "Portal PHP dan PostgreSQL dengan empat hak akses: pengunjung, admin lab, admin berita, dan kepala lab. Bagian saya adalah panel admin berita dan optimasi query dashboard.",
    process: {
      analysis: "Membagi modul kerja tim untuk empat jenis pengguna dan menentukan kebutuhan pengelolaan berita.",
      design: "Merancang tabel PostgreSQL dan Materialized View untuk statistik, serta layout sidebar dan kartu berita yang responsif.",
      implementation: "Membangun CRUD berita, dashboard statistik, log aktivitas, profil, pagination dan filter, lalu menggabungkannya lewat pull request."
    },
    impact: "Lab IVSS punya satu portal resmi dengan empat hak akses. Admin berita bisa mengelola artikel sendiri, dan dashboard statistik memuat lebih cepat.",
    impactMetrics: [
      "4 hak akses dalam satu portal",
      "Panel admin berita saya kerjakan dari awal sampai selesai",
      "Statistik dashboard diambil dari Materialized View PostgreSQL",
      "Lebih dari 12 pull request digabung ke repositori tim"
    ],
    artifacts: ["Panel admin berita", "Materialized View PostgreSQL", "Pembagian 4 hak akses", "Pull request tim"],
    highlights: [
      "Kelola berita: tulis, edit, hapus, cari, dan filter artikel",
      "Dashboard cepat: ringkasan statistik dari Materialized View",
      "Log aktivitas: setiap perubahan konten oleh admin tercatat",
      "Login lebih aman: alur login dirapikan dan input divalidasi",
      "Tampilan publik: header, navigasi, dan kartu berita yang responsif"
    ],
    stack: ["PHP 8", "PostgreSQL", "JavaScript", "HTML & CSS", "RBAC"],
    domains: ["web"],
    skillIds: ["php", "postgresql", "javascript", "erd", "matview", "rbac", "git", "github"],
    theme: "lab",
    brandColor: "#0A192F",
    sfx: "SCAN!",
    sfxClass: "project-sfx-lab",
    repoUrl: "https://github.com/Maulanahb/PBL-IVSS"
  },
  {
    id: "aiaas",
    badge: "Catatan Keuangan AI",
    projectType: "Proyek Individu · React & PHP",
    title: "AI FINANCE (AIAAS)",
    description: "Catatan keuangan otomatis yang memproses kalimat biasa (misal \"beli kopi 25rb kemarin\") menjadi transaksi terstruktur via Gemini 2.5 Flash.",
    category: "Catatan Keuangan Bahasa Alami",
    role: "System analyst & full-stack developer (proyek individu). Saya menyusun PRD v1.1, merancang skema database & kontrak JSON, membangun frontend React TypeScript, serta REST API PHP 8 OOP.",
    problem: "Banyak orang berhenti mencatat keuangan karena harus mengisi form berulang (tanggal, nominal, jenis, kategori) setiap kali berbelanja.",
    approach: "Pengguna cukup mengetik satu kalimat bebas. Gemini API mengekstrak data menjadi JSON terstruktur sesuai kontrak PRD, lalu divalidasi dan disimpan lewat REST API PHP 8.",
    process: {
      analysis: "Menulis PRD v1.1 berisi empat fitur inti (FT-01 hingga FT-04), kontrak payload JSON AI, error handling, dan target akurasi parsing.",
      design: "Merancang skema database (transaksi, target tabungan, anggaran) dengan index komposit, serta antarmuka neobrutalist di React.",
      implementation: "Membangun REST API PHP 8 OOP (pola Controller, Repository, Service) terintegrasi Gemini API, serta frontend Vite React TSX."
    },
    impact: "Mencatat transaksi cukup dalam satu kalimat tanpa form manual. Dilengkapi asisten AI untuk konsultasi arus kas, target tabungan, dan anggaran bulanan.",
    impactMetrics: [
      "Input natural language dengan konversi singkatan nominal (rb, jt, k) & tanggal relatif",
      "Format JSON terstandardisasi dengan validasi backend sebelum masuk database",
      "Fitur lengkap: Overview arus kas, target tabungan, anggaran, dan asisten konsultasi AI",
      "Arsitektur bersih: PHP 8 REST API (Controller-Repository-Service) & React TSX"
    ],
    artifacts: ["PRD v1.1", "Skema Database & Index", "Kontrak Payload JSON AI", "REST API PHP 8 OOP"],
    highlights: [
      "Input kalimat cerdas: \"makan siang 45rb\" langsung jadi transaksi terarsip",
      "Konsultan finansial AI: menjawab kondisi tabungan dan sisa anggaran pengguna",
      "Audit aman: menyimpan kalimat asli (raw_input) dan pelacakan transaksi",
      "Dashboard arus kas dengan filter dinamis: bulanan, mingguan, dan semua periode"
    ],
    stack: ["React", "TypeScript", "PHP 8", "Gemini API", "Tailwind CSS", "MySQL"],
    domains: ["web", "ai"],
    skillIds: ["react", "typescript", "php", "mysql", "tailwindcss", "googlegemini", "prd", "erd", "matview", "ai-json", "git", "github"],
    theme: "fintech",
    brandColor: "#0B63F6",
    sfx: "SIMPAN!",
    sfxClass: "project-sfx-fintech",
    repoUrl: "https://github.com/Maulanahb/AiASService"
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

export interface SoftSkillProof {
  skill: string;
  proof: string;
}

export interface SkillIconItem {
  name: string;
  iconId: string;
}

export interface SkillGroup {
  title: string;
  subtitle: string;
  icons?: SkillIconItem[];
  pills?: string[];
  proofs?: SoftSkillProof[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  type: string;
  role: string;
  organization: string;
  summary: string;
  contributions: string[];
  resultHighlight?: string;
}

export interface EducationInfo {
  campus: string;
  faculty: string;
  program: string;
  period: string;
  semester: string;
  nim: string;
  status: string;
  summary: string;
  coursework: string[];
}

export interface Certification {
  /** Nama sertifikat atau kredensial. */
  name: string;
  /** Lembaga penerbit atau penyelenggara. */
  issuer: string;
  /** Tahun pelaksanaan. */
  year: string;
  /** Ringkasan kompetensi utama. */
  focus: string;
  /** URL halaman kredensial publik. */
  credentialUrl?: string;
}

export interface AchievementItem {
  title: string;
  organizer: string;
  year: string;
  badge: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    sfx: "?",
    index: "01",
    title: "Analisis Sistem",
    description: "Menentukan pengguna, kebutuhan, dan ruang lingkup fitur.",
    deliverable: "Project Charter · PRD · Ruang Lingkup Sistem"
  },
  {
    sfx: "✦",
    index: "02",
    title: "Desain Database & UI",
    description: "Merancang ERD, hak akses per peran, dan prototipe antarmuka.",
    deliverable: "Skema Database · RBAC · Design System"
  },
  {
    sfx: "!",
    index: "03",
    title: "Implementasi & Pengujian",
    description: "Pengembangan via pull request, pengujian otomatis, lalu deploy.",
    deliverable: "Git Pull Request · Automated Testing · Deployment"
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Bahasa & Framework",
    subtitle: "Web, mobile, dan pemrosesan data",
    icons: [
      { name: "PHP", iconId: "php" },
      { name: "Laravel", iconId: "laravel" },
      { name: "TypeScript", iconId: "typescript" },
      { name: "JavaScript", iconId: "javascript" },
      { name: "React", iconId: "react" },
      { name: "Node.js", iconId: "nodejs" },
      { name: "Flutter", iconId: "flutter" },
      { name: "Dart", iconId: "dart" },
      { name: "Python", iconId: "python" },
      { name: "PostgreSQL", iconId: "postgresql" },
      { name: "MySQL", iconId: "mysql" },
      { name: "Tailwind CSS", iconId: "tailwindcss" }
    ]
  },
  {
    title: "Analisis & Desain Sistem",
    subtitle: "Dokumentasi kebutuhan, database, dan hak akses",
    icons: [
      { name: "PRD & Charter", iconId: "prd" },
      { name: "Database ERD", iconId: "erd" },
      { name: "SQL Indexing", iconId: "matview" },
      { name: "RBAC", iconId: "rbac" },
      { name: "Odoo ERP", iconId: "odoo" },
      { name: "Power BI", iconId: "powerbi" },
      { name: "JSON Schema", iconId: "ai-json" },
      { name: "Data Mining", iconId: "datamining" },
      { name: "Cloud Costing", iconId: "cloudcost" }
    ]
  },
  {
    title: "Tools & Cloud",
    subtitle: "Kontrol versi, deployment, dan integrasi API",
    icons: [
      { name: "Git", iconId: "git" },
      { name: "GitHub", iconId: "github" },
      { name: "Docker", iconId: "docker" },
      { name: "Cloud Run", iconId: "googlecloud" },
      { name: "Gemini API", iconId: "googlegemini" },
      { name: "Antigravity", iconId: "antigravity" },
      { name: "Firebase Auth", iconId: "firebase-auth" },
      { name: "Midtrans", iconId: "midtrans" },
      { name: "Figma", iconId: "figma" }
    ]
  }
];

export const SKILL_CONTEXT_NOTES: Record<string, string> = {
  python: "Digunakan pada mata kuliah Data Mining & eksplorasi pemrosesan data di D-IV SIB Polinema.",
  odoo: "Dipraktikkan pada studi kasus proses bisnis ERP & alur operasional modul perkuliahan.",
  powerbi: "Digunakan untuk penyusunan dashboard indikator & visualisasi data perkuliahan Data Warehouse.",
  datamining: "Mata kuliah Data Mining & Data Warehouse: eksplorasi pola & pra-pemrosesan dataset.",
  antigravity: "Lingkungan kerja agen AI untuk perancangan komponen, uji coba kode, dan automasi dokumentasi.",
  figma: "Digunakan untuk menyusun wireframe antarmuka dan design system sebelum tahap implementasi UI."
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-cuciin-pos",
    period: "2026",
    type: "Proyek Tim · Laravel",
    role: "System Analyst & Full-Stack Developer",
    organization: "CUCI.IN — Kasir & Operasional Laundry",
    summary: "Spesifikasi sistem dan modul inti kasir laundry dalam tim 5 orang.",
    contributions: [
      "Project Charter, PRD, estimasi biaya server, dan design system.",
      "Modul cek nota, transaksi, komplain, manajemen user, dan laporan keuangan.",
      "PHPUnit dan CI GitHub Actions."
    ],
    resultHighlight: "Kasir 3 peran dan cek status cucian tanpa login."
  },
  {
    id: "exp-aiaas-vibe",
    period: "2026",
    type: "Proyek Individu · AI Integration",
    role: "Full-Stack Developer",
    organization: "AIaaS Keuangan & BawangHub",
    summary: "Dua aplikasi web dengan Gemini API, dari perancangan hingga deploy.",
    contributions: [
      "AIaaS Keuangan: PRD, skema database, dan parser kalimat ke transaksi.",
      "BawangHub: PWA 7 halaman dengan prediksi harga dan info cuaca.",
      "API key disimpan di server; aplikasi di-deploy ke Cloud Run."
    ],
    resultHighlight: "Dua aplikasi AI berjalan stabil di web."
  },
  {
    id: "exp-lapangku-mobile",
    period: "2026",
    type: "Proyek Tim · Flutter",
    role: "Mobile & Web Developer",
    organization: "Lapangku — Booking Lapangan Olahraga",
    summary: "Aplikasi booking lapangan Flutter dan Firebase dalam tim 4 orang.",
    contributions: [
      "Struktur Firestore dan state management Riverpod.",
      "Integrasi Midtrans Snap dengan pembatalan otomatis 15 menit.",
      "Pembuatan landing page produk."
    ],
    resultHighlight: "Booking real-time dengan pembagian pendapatan mitra otomatis."
  },
  {
    id: "exp-ivss-web",
    period: "2025",
    type: "Proyek Tim · Web & Database",
    role: "Web Developer",
    organization: "Portal Lab Riset IVSS Polinema",
    summary: "Panel admin berita dan optimasi dashboard statistik dalam tim 5 orang.",
    contributions: [
      "CRUD berita, log aktivitas, pencarian, dan paginasi.",
      "Materialized View PostgreSQL untuk query dashboard.",
      "Perbaikan alur login dan tampilan publik responsif."
    ],
    resultHighlight: "Portal resmi lab dengan 4 tingkatan hak akses."
  }
];

export const EDUCATION_INFO: EducationInfo = {
  campus: "Politeknik Negeri Malang (Polinema)",
  faculty: "Jurusan Teknologi Informasi (JTI)",
  program: "D-IV Sistem Informasi Bisnis",
  period: "2024 – Sekarang",
  semester: "Semester 5",
  nim: "244107060133",
  status: "Open to Work",
  summary: "Fokus perkuliahan pada perancangan sistem informasi bisnis, basis data lanjutan, dan rekayasa perangkat lunak.",
  coursework: [
    "Analisis & Perancangan Sistem Informasi",
    "Rekayasa Perangkat Lunak",
    "Pemrograman Web",
    "Pemrograman Mobile",
    "Basis Data & Basis Data Lanjut",
    "Desain UI/UX",
    "Algoritma & Struktur Data",
    "Data Mining & Data Warehouse",
    "E-Business & Startup Digital",
    "Workshop Pengembangan Aplikasi"
  ]
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Spec-Driven Development dengan Kiro",
    issuer: "Dicoding Indonesia (AWS Partner)",
    year: "2026",
    focus: "Alur perancangan dari spesifikasi kebutuhan, desain struktur data, hingga implementasi modul web.",
    credentialUrl: "https://www.dicoding.com/certificates/ERZR7YNVMZYV"
  },
  {
    name: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia (Google Cloud Partner)",
    year: "2025",
    focus: "Dasar kecerdasan buatan, pengolahan data untuk AI, dan konsep machine learning pada aplikasi.",
    credentialUrl: "https://www.dicoding.com/certificates/N9ZO2OK66PG5"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "4 Semester Akademik D-IV SIB",
    organizer: "Politeknik Negeri Malang",
    year: "2024 – 2026",
    badge: "Akademik",
    description: "Analisis & Perancangan Sistem, Basis Data Lanjut, Pemrograman Web & Mobile, RPL."
  },
  {
    title: "BawangHub · Google Juara Vibe Coding",
    organizer: "Proyek Individu",
    year: "2026",
    badge: "Proyek AI",
    description: "Aplikasi agritech dengan Gemini API dan Google Cloud Run."
  }
];
