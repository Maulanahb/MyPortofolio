/**
 * ==========================================================================
 * TYPE-SAFE DATA LAYER (projects.ts)
 * Mendefinisikan data portofolio Mahasiswa Sistem Informasi Bisnis
 * berdasarkan rekam jejak nyata repositori GitHub (https://github.com/Maulanahb):
 * Hero, Tentang Saya, Skills 4 Kelompok SI, Proyek (Peran, Proses, Dampak),
 * Pengalaman & Kolaborasi Tim, Pendidikan/Kredensial/Capaian, serta Kontak.
 * ==========================================================================
 */

export interface ProjectProcess {
  analysis: string;
  design: string;
  implementation: string;
}

export interface ProjectItem {
  id: string;
  caseNumber: string;
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
  githubRepos: string;
  interests: string[];
  careerGoal: string;
  internshipTarget: string;
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
  role: "Mahasiswa Sistem Informasi Bisnis · System Analyst & Web/Mobile Developer",
  positioning: "Mahasiswa D-IV Sistem Informasi Bisnis di Politeknik Negeri Malang dengan fokus pada analisis sistem, pengembangan web (Laravel & React), dan aplikasi mobile (Flutter).",
  tagline: "Pengembangan aplikasi web dan mobile dengan perancangan database dan kebutuhan sistem yang terstruktur.",
  campus: "Politeknik Negeri Malang (Polinema)",
  department: "Jurusan Teknologi Informasi (JTI)",
  program: "D-IV Sistem Informasi Bisnis",
  period: "2024 – Sekarang",
  semester: "Semester 5",
  gpa: "",
  githubRepos: "67+ repo publik",
  interests: [
    "System Analyst",
    "Full-Stack Web Developer",
    "Mobile Developer (Flutter)",
    "Integrasi AI & Data Mining",
    "Database & Backend"
  ],
  careerGoal: "Berorientasi pada pengembangan aplikasi yang terstruktur, terdokumentasi dengan baik, dan melalui tahapan pengujian yang terukur.",
  internshipTarget: "Magang / Praktik Kerja Lapangan (PKL) sebagai System Analyst, Full-Stack Web Developer, atau Mobile Developer.",
  email: "maulanahmad2287@gmail.com",
  github: "https://github.com/Maulanahb",
  linkedin: "https://linkedin.com/in/maulanahb",
  cvUrl: "/cv-maulana.pdf"
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "cuciin",
    caseNumber: "STUDI KASUS 01",
    badge: "POS & LAUNDRY / LARAVEL",
    projectType: "Proyek tim · Sistem kasir dan operasional laundry",
    title: "CUCI.IN",
    description: "Sistem kasir laundry. Pelanggan bisa cek status cucian cukup dengan nomor nota, tanpa perlu login.",
    category: "STUDI KASUS 01 · KASIR LAUNDRY & CEK STATUS CUCIAN",
    role: "System analyst dan full-stack developer di tim tiga orang. Saya menulis Project Charter dan PRD, lalu membangun fitur cek status cucian, pembayaran, komplain, manajemen user, dan laporan keuangan.",
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
    stack: ["Laravel Framework", "PostgreSQL", "Tailwind CSS", "Alpine.js", "PHPUnit"],
    theme: "pos",
    brandColor: "#0e7490",
    sfx: "CHA-CHING!",
    sfxClass: "project-sfx-pos",
    repoUrl: "https://github.com/Maulanahb/CUCI.IN"
  },
  {
    id: "bawanghub",
    caseNumber: "STUDI KASUS 02",
    badge: "AI AGRITECH / GOOGLE GEMINI",
    projectType: "Proyek individu · Aplikasi web pertanian dengan AI",
    title: "BAWANGHUB",
    description: "Aplikasi web untuk petani bawang merah: tanya AI soal budidaya, pantau harga, cek cuaca, dan catat kas tani.",
    category: "STUDI KASUS 02 · APLIKASI PERTANIAN & ASISTEN AI",
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
    stack: ["React 19", "TypeScript", "Google Gemini AI", "Tailwind CSS", "Firebase", "Express.js", "Docker"],
    theme: "agri",
    brandColor: "#059669",
    sfx: "GROW!",
    sfxClass: "project-sfx-agri",
    repoUrl: "https://github.com/Maulanahb/BawangHub"
  },
  {
    id: "lapangku",
    caseNumber: "STUDI KASUS 03",
    badge: "MOBILE / FLUTTER RIVERPOD",
    projectType: "Proyek tim · Aplikasi mobile booking lapangan",
    title: "LAPANGKU",
    description: "Aplikasi Flutter untuk booking lapangan olahraga, dengan pembayaran Midtrans dan dashboard pendapatan untuk pemilik GOR.",
    category: "STUDI KASUS 03 · BOOKING LAPANGAN & PEMBAYARAN ONLINE",
    role: "Mobile developer di tim tiga orang. Saya menyiapkan struktur Firebase dan state management, membangun modul penyewa dan mitra GOR, memindahkan pembayaran ke Midtrans, dan membuat landing page-nya.",
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
    stack: ["Flutter SDK", "Dart", "Riverpod", "Cloud Firestore", "Midtrans Payment", "Firebase Auth"],
    theme: "sport",
    brandColor: "#1B6B3A",
    sfx: "TAP!",
    sfxClass: "project-sfx-sport",
    repoUrl: "https://github.com/Maulanahb/Lapangku",
    demoUrl: "https://landing-page-lapangku.vercel.app"
  },
  {
    id: "ivss",
    caseNumber: "STUDI KASUS 04",
    badge: "RESEARCH LAB / POLINEMA",
    projectType: "Proyek tim · Portal web laboratorium",
    title: "PORTAL LAB IVSS",
    description: "Portal web Laboratorium IVSS JTI Polinema untuk berita kegiatan, profil peneliti, dan fasilitas lab.",
    category: "STUDI KASUS 04 · PORTAL LAB & PANEL ADMIN BERITA",
    role: "Full-stack developer di tim tiga orang. Saya membangun seluruh panel admin berita, mempercepat statistik dashboard dengan Materialized View, dan merapikan halaman login serta tampilan publik.",
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
    stack: ["PHP", "PostgreSQL", "JavaScript", "HTML5 / CSS3", "Multi-Role RBAC"],
    theme: "lab",
    brandColor: "#0A192F",
    sfx: "SCAN!",
    sfxClass: "project-sfx-lab",
    repoUrl: "https://github.com/Maulanahb/PBL-IVSS"
  },
  {
    id: "aiaas",
    caseNumber: "STUDI KASUS 05",
    badge: "FINTECH AI / GEMINI 2.5 FLASH",
    projectType: "Proyek individu · Aplikasi catatan keuangan dengan AI",
    title: "AI FINANCE (AIAAS)",
    description: "Catatan keuangan otomatis yang memproses kalimat biasa (misal \"beli kopi 25rb kemarin\") menjadi transaksi terstruktur via Gemini 2.5 Flash.",
    category: "STUDI KASUS 05 · CATATAN KEUANGAN & PARSER BAHASA ALAMI",
    role: "System analyst & full-stack developer (proyek individu). Saya menyusun PRD v1.1, merancang skema database & kontrak JSON, membangun frontend React TypeScript, serta REST API PHP 8 OOP.",
    problem: "Banyak orang berhenti mencatat keuangan karena harus mengisi form berulang (tanggal, nominal, jenis, kategori) setiap kali berbelanja.",
    approach: "Pengguna cukup mengetik satu kalimat bebas. Gemini API mengekstrak data menjadi JSON terstruktur sesuai kontrak PRD, lalu divalidasi dan disimpan lewat REST API PHP 8.",
    process: {
      analysis: "Menulis PRD v1.1 berisi spesifikasi FT-01 s/d FT-04, kontrak payload JSON AI, error handling, dan target akurasi parsing.",
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
    stack: ["React 18 & TypeScript", "PHP 8 OOP REST API", "Google Gemini 2.5 Flash", "Tailwind CSS & Vite", "MySQL / PostgreSQL"],
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
  code: string;
  title: string;
  subtitle: string;
  items: string;
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
  gpa: string;
  gpaDetail: string;
  repoMetric: string;
  summary: string;
  coursework: string[];
}

export interface Certification {
  /** Nama sertifikat, program, atau rekam kompetensi. */
  name: string;
  /** Lembaga penerbit atau penyelenggara. */
  issuer: string;
  /** Tahun pelaksanaan. */
  year: string;
  /** Ringkasan kompetensi yang dipelajari/diimplementasikan. */
  focus: string;
  /** URL halaman kredensial/repositori publik. Kosongkan bila tidak ada — tautan VERIFY otomatis disembunyikan. */
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
    index: "TAHAP 01 — KEBUTUHAN",
    title: "ANALISIS &<br/>PERENCANAAN.",
    description: "Menentukan pengguna, kebutuhan, dan ruang lingkup fitur.",
    deliverable: "Project Charter · PRD · Ruang Lingkup Sistem"
  },
  {
    sfx: "✦",
    index: "TAHAP 02 — RANCANGAN",
    title: "PERANCANGAN<br/>DATABASE & UI.",
    description: "Merancang ERD, hak akses per peran, dan prototipe antarmuka.",
    deliverable: "Skema Database · Hak Akses Multi-Peran · Design System"
  },
  {
    sfx: "!",
    index: "TAHAP 03 — IMPLEMENTASI",
    title: "PENGEMBANGAN<br/>& PENGUJIAN.",
    description: "Pengembangan via pull request, pengujian otomatis, lalu deploy.",
    deliverable: "Git Pull Request · Automated Testing · Deployment"
  }
];

/**
 * 3. SKILLS — Diselaraskan dengan repositori publik GitHub Maulanahb:
 * Teknis & Pemrograman, Analisis & Desain Sistem, dan Tools/Cloud/DevOps.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    code: "CORE PROGRAMMING",
    title: "Teknis & Pemrograman",
    subtitle: "Web, mobile, data, dan basis data",
    items: "Laravel dan React untuk web, Flutter untuk mobile, PostgreSQL dan MySQL untuk basis data.",
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
      { name: "Java", iconId: "java" },
      { name: "PostgreSQL", iconId: "postgresql" },
      { name: "MySQL", iconId: "mysql" },
      { name: "Firestore", iconId: "firestore" },
      { name: "Tailwind CSS", iconId: "tailwindcss" }
    ]
  },
  {
    code: "DATABASE & SYSTEM DESIGN",
    title: "Analisis & Desain Sistem",
    subtitle: "Spesifikasi kebutuhan, pemodelan database, dan hak akses",
    items: "PRD, Project Charter, ERD, RBAC, Odoo ERP, dan Microsoft Power BI.",
    icons: [
      { name: "Project Charter & PRD", iconId: "prd" },
      { name: "Skema Database & ERD", iconId: "erd" },
      { name: "Materialized View & Index", iconId: "matview" },
      { name: "Multi-Role RBAC", iconId: "rbac" },
      { name: "Odoo ERP", iconId: "odoo" },
      { name: "Microsoft Power BI", iconId: "powerbi" },
      { name: "Format Data & Kontrak AI", iconId: "ai-json" },
      { name: "Data Mining & Analisis Regresi", iconId: "datamining" },
      { name: "Rencana Biaya Cloud (AWS)", iconId: "cloudcost" }
    ]
  },
  {
    code: "CLOUD & DEPLOYMENT TOOLS",
    title: "Tools, Cloud & DevOps",
    subtitle: "Kontrol versi, deployment, dan integrasi layanan",
    items: "Git, GitHub Actions, Docker ke Cloud Run, Gemini AI, Google Antigravity, Midtrans.",
    icons: [
      { name: "Git", iconId: "git" },
      { name: "GitHub", iconId: "github" },
      { name: "Docker", iconId: "docker" },
      { name: "Google Cloud Run", iconId: "googlecloud" },
      { name: "Google Gemini AI", iconId: "googlegemini" },
      { name: "Google Antigravity", iconId: "antigravity" },
      { name: "Firebase Auth", iconId: "firebase-auth" },
      { name: "Midtrans Payment", iconId: "midtrans" },
      { name: "Figma", iconId: "figma" }
    ]
  }
];

/**
 * 5. PENGALAMAN & REKAM JEJAK PROYEK — Berdasarkan riwayat commit & PR GitHub Maulanahb.
 */
export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-cuciin-pos",
    period: "2026",
    type: "PROYEK TIM · LARAVEL",
    role: "System Analyst & Full-Stack Developer",
    organization: "CUCI.IN (Sistem POS & Operasional Laundry)",
    summary: "Spesifikasi sistem dan modul inti kasir laundry, tim 3 orang.",
    contributions: [
      "Project Charter, PRD, estimasi biaya cloud, design system.",
      "Modul cek status cucian, transaksi, komplain, laporan keuangan.",
      "PHPUnit + CI GitHub Actions."
    ],
    resultHighlight: "Kasir 3 peran, cek status cucian tanpa login."
  },
  {
    id: "exp-aiaas-vibe",
    period: "2026",
    type: "PROYEK INDIVIDU · AI INTEGRATION",
    role: "Full-Stack Developer",
    organization: "AIaaS Keuangan & BawangHub",
    summary: "Dua aplikasi web dengan Gemini API, dari PRD sampai deploy.",
    contributions: [
      "AIaaS Keuangan: PRD, basis data, konversi kalimat menjadi transaksi.",
      "BawangHub: PWA 7 halaman dengan prediksi tren harga.",
      "API key di server, deploy Docker ke Cloud Run."
    ],
    resultHighlight: "Dua aplikasi AI, kode terbuka di GitHub."
  },
  {
    id: "exp-lapangku-mobile",
    period: "2026",
    type: "PROYEK TIM · FLUTTER",
    role: "Mobile & Web Developer",
    organization: "Lapangku (Aplikasi Booking Lapangan Olahraga)",
    summary: "Aplikasi booking lapangan Flutter + Firebase, tim 3 orang.",
    contributions: [
      "Struktur Firestore dan state management Riverpod.",
      "Midtrans Snap, booking batal otomatis setelah 15 menit.",
      "Landing page produk."
    ],
    resultHighlight: "Booking dan pembayaran real-time, pendapatan mitra terpisah otomatis."
  },
  {
    id: "exp-ivss-web",
    period: "2025",
    type: "PROYEK TIM · WEB & DATABASE",
    role: "Full-Stack Web Developer",
    organization: "Portal Riset Laboratorium IVSS Polinema",
    summary: "Panel admin berita dan optimasi dashboard statistik.",
    contributions: [
      "CRUD berita, log aktivitas, filter, paginasi.",
      "Materialized View PostgreSQL untuk dashboard.",
      "Perbaikan login dan tampilan publik responsif."
    ],
    resultHighlight: "Portal lab dengan 4 hak akses."
  }
];

/**
 * 6. PENDIDIKAN, KREDENSIAL KOMPETENSI, DAN CAPAIAN
 * Berdasarkan rekam jejak akademik & repositori publik GitHub Maulanahb.
 */
export const EDUCATION_INFO: EducationInfo = {
  campus: "Politeknik Negeri Malang (Polinema)",
  faculty: "Jurusan Teknologi Informasi (JTI)",
  program: "D-IV Sistem Informasi Bisnis",
  period: "2024 – Sekarang",
  semester: "Semester 5",
  nim: "244107060133",
  gpa: "",
  gpaDetail: "",
  repoMetric: "67+ repo publik",
  summary: "Mempelajari perancangan sistem informasi, analisis proses bisnis, dan implementasi perangkat lunak. Siap berkontribusi pada peran analisis, pengembangan, maupun kualitas sistem.",
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
    focus: "Penerapan siklus SDD (Requirements, Design, Task Implementation) menggunakan Kiro untuk merancang dan membangun fitur web yang terstruktur, modular, dan terdokumentasi.",
    credentialUrl: "https://www.dicoding.com/certificates/ERZR7YNVMZYV"
  },
  {
    name: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia (Google Cloud Partner)",
    year: "2025",
    focus: "Pemahaman fundamental Artificial Intelligence, pemanfaatan data untuk AI, dasar Machine Learning, dan pengenalan Deep Learning dalam arsitektur software modern.",
    credentialUrl: "https://www.dicoding.com/certificates/N9ZO2OK66PG5"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Penyelesaian 4 Semester Akademik Terstruktur",
    organizer: "D-IV Sistem Informasi Bisnis, Polinema",
    year: "2024 – 2026",
    badge: "AKADEMIK",
    description: "Analisis & Perancangan Sistem, Basis Data Lanjut, Pemrograman Web & Mobile, RPL."
  },
  {
    title: "BawangHub — Inisiatif Google Juara Vibe Coding",
    organizer: "Proyek Independen",
    year: "2026",
    badge: "PROYEK AI",
    description: "Aplikasi agritech dengan Gemini API, berjalan di Cloud Run."
  },
  {
    title: "Rekam Jejak 67+ Repositori Publik GitHub",
    organizer: "github.com/Maulanahb",
    year: "2024 – 2026",
    badge: "KONTRIBUSI",
    description: "Tugas kuliah, proyek tim, dan proyek pribadi sejak semester 1."
  }
];
