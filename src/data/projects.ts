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
  theme: 'agri' | 'sport' | 'pos' | 'lab';
  brandColor: string;
  sfx: string;
  sfxClass?: string;
  repoUrl: string;
  demoUrl?: string;
  figmaUrl?: string;
}

export interface SiteConfig {
  name: string;
  githubHandle: string;
  role: string;
  positioning: string;
  tagline: string;
  campus: string;
  department: string;
  program: string;
  period: string;
  semester: string;
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
  githubHandle: "Maulanahb",
  role: "Mahasiswa Sistem Informasi Bisnis · System Analyst & Web/Mobile Developer",
  positioning: "Mahasiswa D-IV Sistem Informasi Bisnis Polinema yang fokus pada analisis kebutuhan sistem, perancangan basis data, dan pengembangan aplikasi web serta mobile.",
  tagline: "Style boleh nyentrik. Sistem harus tetap masuk akal.",
  campus: "Politeknik Negeri Malang (Polinema)",
  department: "Jurusan Teknologi Informasi (JTI)",
  program: "D-IV Sistem Informasi Bisnis",
  period: "2024 – Sekarang",
  semester: "Mahasiswa Aktif Tahun Ke-2 (Semester 4)",
  githubRepos: "64+ Repo Proyek & Kuliah",
  interests: [
    "System Analyst",
    "Full-Stack Web Developer",
    "Mobile Developer (Flutter)",
    "Database & Backend Engineering",
    "UI/UX & Product Design"
  ],
  careerGoal: "Menjembatani kebutuhan operasional organisasi dengan solusi perangkat lunak yang terstruktur, terdokumentasi rapi, dan teruji.",
  internshipTarget: "Magang (Internship / PKL) & kolaborasi proyek pada posisi System Analyst, Full-Stack Web Developer, atau Mobile Developer.",
  email: "maulanahmad2287@gmail.com",
  github: "https://github.com/Maulanahb",
  linkedin: "https://linkedin.com/in/maulanahb",
  cvUrl: "/cv-maulana.pdf"
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "cuciin",
    caseNumber: "CASE STUDY / 001",
    badge: "POS & LAUNDRY / LARAVEL",
    projectType: "Proyek Tim Sistem Informasi & Kasir POS · PRD, Project Charter & CI/CD",
    title: "CUCI.IN",
    description: "Sistem informasi operasional dan kasir POS laundry terintegrasi dengan pelacakan status cucian publik tanpa login, manajemen komplain, serta mesin agregasi laporan keuangan.",
    category: "CASE 001 / LAUNDRY POS, SYSTEM ANALYSIS & STATUS TRACKING",
    role: "Repository Owner, System Analyst & Lead Full-Stack Developer — Proyek Tim bersama annora1304 & Zakydawamul (PR #11, #12, #18, #19, #20 & commits: menyusun Project Charter, PRD, Procurement Plan AWS Free Tier, Milestone Guidelines, & Design System; mengimplementasikan modul Transaction Lookup, Transaction & Payment Processing, Complaint Handling, Admin User & Role Management, Reporting Aggregation Engine, PHPUnit Feature Tests, & GitHub Actions CI/CD)",
    problem: "Operasional laundry konvensional yang masih mengandalkan pencatatan manual menyulitkan pelacakan status cucian oleh pelanggan, memperlambat rekapitulasi pemasukan maupun piutang berjalan, serta belum memiliki alur penanganan komplain pelanggan yang terdokumentasi.",
    approach: "Menyusun dokumen perencanaan sistem (Project Charter, PRD, Procurement Plan, dan Design System) serta mengembangkan aplikasi web berbasis Laravel Blade, PostgreSQL, Tailwind CSS, dan Alpine.js dengan 3 portal role (Admin, Staff/Kasir, Customer), fitur cek nota publik tanpa login, mesin agregasi laporan terindeks, dan pengujian otomatis CI/CD.",
    process: {
      analysis: "Penyusunan Project Charter, Product Requirements Document (PRD), Procurement Plan (estimasi infrastruktur AWS Free Tier), serta Milestone Guidelines untuk memetakan kebutuhan 3 aktor (Admin, Staff/Kasir, Customer).",
      design: "Perancangan spesifikasi Design System antarmuka, skema database relasional PostgreSQL dengan optimasi composite index pada tabel transaksi/laporan, serta arsitektur kontrol akses multi-role.",
      implementation: "Implementasi modul Transaction Lookup (cek nota publik), Transaction & Payment Processing, Complaint Handling, Admin User & Role Management (dengan proteksi self-deactivation), Reporting Aggregation Engine, serta feature tests PHPUnit di GitHub Actions CI/CD."
    },
    impact: "Menghasilkan sistem operasional terpadu dengan 3 portal role (Admin, Staff/Kasir, Customer), 4 tahap pelacakan cucian publik via nomor nota tanpa login, mesin agregasi laporan transaksi terindeks, dan pengujian fitur otomatis terintegrasi CI/CD.",
    impactMetrics: [
      "3 portal role terintegrasi (Admin, Staff/Kasir, dan Customer) dengan manajemen user dan proteksi self-deactivation pada akun Admin",
      "4 tahap pelacakan status cucian publik secara real-time via nomor nota (Transaction Lookup) tanpa mewajibkan pelanggan login",
      "Mesin agregasi laporan keuangan (Reporting Aggregation Engine) yang dioptimalkan dengan composite index pada database PostgreSQL",
      "Alur manajemen komplain pelanggan (Complaint Handling) terstruktur serta pipeline pengujian otomatis PHPUnit via GitHub Actions CI/CD"
    ],
    artifacts: ["Project Charter & PRD", "Procurement Plan (AWS)", "Design System Spec", "Skema & Composite Index DB", "GitHub Actions CI/CD"],
    highlights: [
      "Transaction & Payment Processing: Pencatatan transaksi laundry kiloan/satuan beserta pemrosesan status pembayaran",
      "Public Transaction Lookup: Pelacakan 4 tahap status cucian langsung menggunakan nomor nota tanpa login",
      "Complaint Handling Module: Sistem pengajuan dan penanganan komplain cucian terintegrasi antara pelanggan dan pengelola",
      "Admin User & Role Management: Pengelolaan hak akses staf dan admin dilengkapi proteksi self-deactivation",
      "Reporting Aggregation Engine & CI/CD: Mesin rekapitulasi laporan transaksi dengan composite index serta pengujian PHPUnit otomatis"
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
    caseNumber: "CASE STUDY / 002",
    badge: "AI AGRITECH / GOOGLE GEMINI",
    projectType: "Proyek Individu (Google Juara Vibe Coding) · Smart Agriculture PWA & AI",
    title: "BAWANGHUB",
    description: "Aplikasi web progresif (PWA) pertanian bawang merah dan asisten cerdas berbasis Google Gemini AI yang menggabungkan konsultasi AI, prediksi harga regresi linier, prakiraan cuaca Open-Meteo, buku kas tani, dan forum komunitas.",
    category: "CASE 002 / SMART AGRICULTURE PWA, GEMINI AI & PRICE ANALYTICS",
    role: "Full-Stack & AI Developer (Proyek Individu — Google Juara Vibe Coding: merancang Agri Design System bergaya Neo-Brutalism, membangun 7+ modul halaman React 19 & TypeScript, mengamankan GEMINI_API_KEY di backend Express server.ts, membuat fallback proxy cuaca Open-Meteo, mengoptimalkan Firestore caching & PWA Service Worker, serta deployment Docker ke Google Cloud Run)",
    problem: "Petani bawang merah membutuhkan akses cepat terhadap konsultasi hama/budidaya, informasi tren harga pasar untuk memperkirakan waktu jual, prakiraan cuaca lokal yang andal meski koneksi internet tidak stabil, serta pencatatan kas tani yang terpusat.",
    approach: "Membangun aplikasi PWA berbasis React 19, TypeScript, dan Vite dengan antarmuka Neo-Brutalism / Agri Design System; memindahkan pemanggilan Google Gemini AI ke backend Node.js/Express (server.ts) agar API key aman; menerapkan simple linear regression pada grafik Recharts untuk prediksi harga komoditas; serta mengemas aplikasi dengan Docker untuk Google Cloud Run.",
    process: {
      analysis: "Identifikasi kebutuhan informasi harian petani bawang merah meliputi konsultasi budidaya berbasis AI, pemantauan fluktuasi harga komoditas, cuaca lokal, pencatatan buku tani, dan diskusi komunitas.",
      design: "Perancangan antarmuka Neo-Brutalism / Agri Design System yang kontras tinggi dan responsif untuk 7+ modul halaman (Dashboard, Tanya AI, Statistik, Buku Tani, Forum, Galeri, CuacaDetail, dan Admin Dashboard).",
      implementation: "Pengembangan frontend React 19 + TypeScript + Recharts (dengan regresi linier sederhana), backend proxy Express (server.ts) untuk keamanan GEMINI_API_KEY & fallback cuaca Open-Meteo, integrasi Firebase Auth & Firestore caching, Service Worker PWA, serta containerization Docker ke Google Cloud Run."
    },
    impact: "Menyediakan aplikasi PWA pertanian bawang merah terpadu yang menggabungkan konsultasi Gemini AI, prediksi tren harga berbasis regresi linier, prakiraan cuaca lokal Open-Meteo, buku kas tani, dan forum komunitas dalam satu platform.",
    impactMetrics: [
      "7+ modul halaman terintegrasi (Dashboard, Tanya AI, Statistik Harga, Buku Tani, Forum Diskusi, Galeri, CuacaDetail, & Admin Dashboard)",
      "Arsitektur server-side AI proxy pada Node.js/Express (server.ts) untuk menjaga keamanan GEMINI_API_KEY beserta fallback proxy Open-Meteo",
      "Visualisasi tren & prediksi harga bawang merah menggunakan Recharts dan perhitungan simple linear regression",
      "Dukungan aksesibilitas PWA (Service Worker & Firestore local caching) yang ter-deploy menggunakan Docker di Google Cloud Run"
    ],
    artifacts: ["Agri Design System (Neo-Brutalism)", "Express AI Proxy (server.ts)", "Model Regresi Linier Harga", "Konfigurasi Docker & Cloud Run"],
    highlights: [
      "Tanya AI (Server-Secured Gemini API): Konsultasi budidaya bawang merah dengan komunikasi API yang diamankan di sisi server Express",
      "Statistik & Prediksi Harga Pasar: Visualisasi grafik Recharts dilengkapi algoritma simple linear regression untuk proyeksi tren harga",
      "CuacaDetail & Open-Meteo Fallback Proxy: Informasi cuaca pertanian lokal dengan mekanisme proxy cadangan agar data tetap tersedia",
      "Buku Tani, Forum & Galeri Komunitas: Pencatatan transaksi operasional petani serta ruang diskusi berbasis Firebase Auth & Firestore",
      "PWA Offline-Ready & Cloud Run Deployment: Optimasi caching Firestore, Service Worker, dan deployment kontainer Docker"
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
    caseNumber: "CASE STUDY / 003",
    badge: "MOBILE / FLUTTER RIVERPOD",
    projectType: "Proyek Tim Aplikasi Mobile Multi-Role & Web Showcase · Flutter & Midtrans Snap",
    title: "LAPANGKU",
    description: "Aplikasi mobile multi-role reservasi venue olahraga (Flutter, Riverpod, Cloud Firestore) yang terintegrasi dengan pembayaran otomatis Midtrans Snap, perhitungan bagi hasil mitra, dan website showcase interaktif.",
    category: "CASE 003 / MULTI-ROLE SPORTS BOOKING & MIDTRANS SNAP FLOW",
    role: "Repository Owner, Mobile & Web Developer — Proyek Tim bersama GaluhPutri08 & Arsya-Fisa (PR #49 & commits: membangun arsitektur Firebase services & state management Riverpod currentUidProvider, mengembangkan modul Customer & Mitra GOR, unit test BookingModel, migrasi pembayaran ke Midtrans Snap dengan timeout 15 menit & pemisahan platform service fee, pengamanan Firestore security rules & composite index, serta pembuatan LandingPage-Lapangku)",
    problem: "Proses pemesanan lapangan olahraga dan verifikasi pembayaran manual menyulitkan penyewa maupun mitra pengelola GOR dalam memantau ketersediaan slot secara real-time, memisahkan biaya layanan platform dari pendapatan bersih mitra, serta memvalidasi status kedatangan pemain.",
    approach: "Mengembangkan aplikasi mobile Flutter lintas peran (Customer, Mitra GOR, Admin) dengan state management Riverpod dan Cloud Firestore, memigrasikan alur pembayaran manual ke Midtrans Snap (dilengkapi batas waktu pembayaran 15 menit dan kalkulasi platform fee otomatis), serta membangun website showcase LandingPage-Lapangku berbasis TypeScript & Vite.",
    process: {
      analysis: "Pemetaan alur reservasi multi-role antara Customer, Mitra GOR, dan Admin, termasuk aturan transisi status booking, batas waktu pembayaran (payment timeout), serta skema pembagian platform service fee.",
      design: "Perancangan state management Riverpod (currentUidProvider), struktur koleksi & composite index Cloud Firestore, aturan keamanan (Firestore security rules), serta desain antarmuka aplikasi mobile dan web showcase.",
      implementation: "Implementasi modul Customer & Mitra GOR di Flutter, penulisan unit test pada BookingModel untuk memvalidasi logika transisi status, integrasi Midtrans Snap, konfigurasi deep linking (lapangku://) & unifikasi notifikasi, serta pembuatan LandingPage-Lapangku."
    },
    impact: "Menghubungkan 3 role pengguna (Customer, Mitra GOR, Admin) dengan alur booking real-time, pembayaran otomatis Midtrans Snap (timeout 15 menit), perhitungan bagi hasil platform fee otomatis, dan E-Ticket QR Code.",
    impactMetrics: [
      "3 role pengguna terintegrasi (Customer, Mitra GOR, dan Admin) dengan sinkronisasi data real-time melalui Riverpod & Cloud Firestore",
      "Integrasi pembayaran otomatis Midtrans Snap dengan mekanisme payment timeout 15 menit untuk mencegah penguncian slot menggantung",
      "Pemisahan otomatis platform service fee dari pendapatan bersih Mitra GOR pada statistik pendapatan real-time",
      "Cakupan unit test pada BookingModel, pengamanan Firestore security rules + composite index, serta dukungan deep linking lapangku://"
    ],
    artifacts: ["Arsitektur Riverpod & Firebase", "Unit Test BookingModel", "Firestore Rules & Composite Index", "Web Showcase (LandingPage-Lapangku)"],
    highlights: [
      "Multi-Role Architecture (Customer, Mitra GOR, Admin): State management terpusat menggunakan Riverpod (currentUidProvider)",
      "Midtrans Snap Payment & 15-Min Timeout: Checkout pembayaran otomatis disertai pembatalan otomatis bila melewati batas 15 menit",
      "Real-Time Partner Revenue & Fee Split: Statistik pendapatan mitra real-time dengan pemisahan otomatis biaya layanan platform",
      "BookingModel Unit Tests & Deep Linking: Pengujian logika transisi status booking, unifikasi notifikasi, dan skema URL lapangku://",
      "Interactive Web Showcase: Dilengkapi repositori pendamping LandingPage-Lapangku berbasis TypeScript dan Vite"
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
    caseNumber: "CASE STUDY / 004",
    badge: "RESEARCH LAB / POLINEMA",
    projectType: "Proyek Kelompok PBL Semester 3 JTI Polinema · Portal Web Multi-Role & PostgreSQL",
    title: "PBL-IVSS",
    description: "Portal web multi-role Laboratorium Intelligent Vision and Smart System (IVSS) JTI Polinema untuk publikasi riset, manajemen berita kegiatan, direktori dosen/mahasiswa, dan pengelolaan fasilitas lab.",
    category: "CASE 004 / ACADEMIC LAB PORTAL, ADMIN BERITA & MATERIALIZED VIEW",
    role: "Full-Stack Web Developer — Proyek Kelompok PBL Semester 3 bersama RyuuShiro30 & annoraega (Branch Kemaulan, PR #1, #2, #4–#10, #19, #20, #24: membangun panel Admin Berita lengkap dengan CRUD artikel, dashboard statistik berjam real-time, activity logs, manajemen profil, pagination & filtering; optimasi statistik dashboard di PostgreSQL dengan Materialized View; refactoring halaman Login & validasi JS; serta perombakan responsivitas UI publik)",
    problem: "Laboratorium IVSS JTI Polinema membutuhkan portal web terpusat dengan pembagian hak akses yang jelas untuk mengelola publikasi berita kegiatan, profil dosen dan mahasiswa riset, dokumentasi fasilitas laboratorium, serta pemantauan statistik aktivitas secara cepat.",
    approach: "Mengembangkan portal web berbasis PHP Native, PostgreSQL, dan JavaScript yang terbagi ke dalam 4 panel hak akses (user, admin-lab, admin-berita, kepala-lab), dengan fokus khusus pada pembangunan modul Admin Berita secara menyeluruh dan optimasi query statistik dashboard menggunakan Materialized View di PostgreSQL.",
    process: {
      analysis: "Pembagian modul kerja tim Project-Based Learning (PBL) Semester 3 untuk 4 aktor sistem (user publik, admin-lab, admin-berita, dan kepala-lab) serta penentuan kebutuhan fitur manajemen konten berita dan log aktivitas.",
      design: "Perancangan skema tabel PostgreSQL beserta Materialized View untuk mempercepat agregasi statistik dashboard, serta perancangan tata letak responsif sidebar, header, dan kartu berita.",
      implementation: "Pengembangan panel admin-berita (CRUD berita, dashboard statistik real-time clock, activity logs, profil, pagination & filtering), refactoring autentikasi Login & validasi form JavaScript, serta integrasi kode tim melalui 12+ Pull Request di GitHub."
    },
    impact: "Mendigitalisasi portal publikasi riset, berita kegiatan, profil dosen/mahasiswa, dan fasilitas Laboratorium IVSS Polinema ke dalam 4 panel hak akses (user, admin-lab, admin-berita, kepala-lab) dengan optimasi query Materialized View PostgreSQL.",
    impactMetrics: [
      "4 panel hak akses terintegrasi (user, admin-lab, admin-berita, dan kepala-lab) dalam satu portal laboratorium JTI Polinema",
      "Panel Admin Berita (admin-berita) tuntas 100% mencakup manajemen artikel, activity logs, pagination, filtering, dan profil pengguna",
      "Optimasi pengambilan data statistik dashboard menggunakan fitur Materialized View pada database PostgreSQL",
      "12+ Pull Request (PR #1–#24 pada branch Kemaulan) terintegrasi bersih untuk fitur backend, validasi login, dan perbaikan UI responsif"
    ],
    artifacts: ["Modul Admin Berita (CRUD & Logs)", "PostgreSQL Materialized View", "Arsitektur 4-Panel Role", "12+ GitHub Pull Requests"],
    highlights: [
      "Panel Admin Berita Lengkap: Manajemen artikel berita dengan pagination, pencarian/filtering, manajemen profil, dan jam real-time",
      "PostgreSQL Materialized View Optimization: Mempercepat query ringkasan statistik artikel dan aktivitas pada halaman dashboard",
      "Activity Logs & Audit Trail: Pencatatan riwayat aktivitas admin untuk memantau perubahan konten berita secara transparan",
      "Login Refactoring & JS Validation: Perbaikan alur autentikasi multi-role beserta validasi input di sisi klien dan server",
      "Responsive Public UI Overhaul: Perombakan tampilan header, sidebar navigasi, dan tata letak kartu berita di halaman publik"
    ],
    stack: ["PHP", "PostgreSQL", "JavaScript", "HTML5 / CSS3", "Multi-Role RBAC"],
    theme: "lab",
    brandColor: "#0A192F",
    sfx: "SCAN!",
    sfxClass: "project-sfx-lab",
    repoUrl: "https://github.com/Maulanahb/PBL-IVSS"
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

export interface SkillGroup {
  code: string;
  title: string;
  subtitle: string;
  items: string;
  pills: string[];
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
  resultHighlight: string;
}

export interface EducationInfo {
  campus: string;
  faculty: string;
  program: string;
  period: string;
  semester: string;
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
    index: "STEP 01 — REQUIREMENT & CHARTER",
    title: "ANALISIS &<br/>PERENCANAAN.",
    description: "Memetakan kebutuhan aktor sistem, menyusun Project Charter serta Product Requirements Document (PRD), dan menetapkan spesifikasi fitur sebelum menulis kode.",
    deliverable: "Project Charter · Dokumen PRD · Procurement Plan"
  },
  {
    sfx: "✦",
    index: "STEP 02 — SCHEMA & SYSTEM DESIGN",
    title: "PERANCANGAN<br/>DATABASE & UI.",
    description: "Merancang skema database relasional/NoSQL, optimasi query (Materialized View & Composite Index), aturan RBAC, serta spesifikasi Design System antarmuka.",
    deliverable: "Skema Database & ERD · Arsitektur RBAC · Design System"
  },
  {
    sfx: "!",
    index: "STEP 03 — BUILD, TEST & DEPLOY",
    title: "IMPLEMENTASI<br/>& CI/CD TEST.",
    description: "Membangun modul aplikasi web/mobile secara kolaboratif via Git Pull Request, menulis pengujian otomatis (PHPUnit / Flutter Unit Test), dan men-deploy ke cloud.",
    deliverable: "Pull Request Teruji · PHPUnit & GitHub Actions · Docker / Cloud Run"
  }
];

/**
 * 3. SKILLS — 100% diselaraskan dengan repositori publik GitHub Maulanahb:
 * Teknis & Pemrograman, Analisis & Desain Sistem, Tools/Cloud/DevOps, dan Soft Skills terbukti di PR.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    code: "SKILL 01 / ENGINEERING",
    title: "Teknis & Pemrograman",
    subtitle: "Pengembangan Web, Mobile, OOP & Basis Data",
    items: "PHP (Laravel, Blade, Native PHP), TypeScript & JavaScript (React 19, Node.js/Express, Astro, Alpine.js, Vite), Dart (Flutter, Riverpod), Java (OOP / PBO & Algoritma Struktur Data), Python (Machine Learning Dasar / Fashion MNIST), SQL (PostgreSQL, MySQL) & Cloud Firestore.",
    pills: [
      "PHP (Laravel & Native)",
      "TypeScript & JavaScript",
      "React 19 & Astro",
      "Node.js / Express",
      "Dart (Flutter & Riverpod)",
      "Java (PBO & ASD)",
      "Python (ML Dasar)",
      "PostgreSQL, MySQL & Firestore"
    ]
  },
  {
    code: "SKILL 02 / SYSTEM ANALYSIS",
    title: "Analisis & Desain Sistem",
    subtitle: "Perencanaan Produk, Basis Data & Arsitektur Akses",
    items: "Penyusunan Project Charter & Product Requirements Document (PRD), Procurement Plan (estimasi cloud AWS Free Tier), Perancangan Skema Database & ERD, Optimasi Query (PostgreSQL Materialized View & Composite Index), Arsitektur Multi-Role RBAC, serta Pemodelan Alur Sistem.",
    pills: [
      "Project Charter & PRD",
      "Procurement Plan",
      "Skema Database & ERD",
      "Materialized View & Composite Index",
      "Multi-Role RBAC",
      "Pemodelan Alur Sistem"
    ]
  },
  {
    code: "SKILL 03 / TOOLS, CLOUD & DEVOPS",
    title: "Tools, Cloud & DevOps",
    subtitle: "Kolaborasi Git, Kontainerisasi & Integrasi API",
    items: "Git & GitHub (Branching, Pull Request Review, GitHub Actions CI/CD), Docker & Google Cloud Run, Google AI Studio & Gemini API, Firebase (Authentication & Firestore Security Rules), Midtrans Snap API, DBeaver & pgAdmin, serta Figma.",
    pills: [
      "Git, PR & GitHub Actions CI/CD",
      "Docker & Google Cloud Run",
      "Google Gemini API",
      "Firebase Auth & Rules",
      "Midtrans Snap API",
      "DBeaver & pgAdmin",
      "Figma"
    ]
  },
  {
    code: "SKILL 04 / PROVEN SOFT SKILLS",
    title: "Soft Skills (Terbukti di Repo GitHub)",
    subtitle: "Dibuktikan langsung lewat rekam jejak kolaborasi Git, Pull Request, dan dokumentasi proyek",
    items: "Kepemimpinan teknis & manajemen repositori tim, kolaborasi kode lintas cabang (branching & PR review), serta kemandirian riset dan penyelesaian masalah end-to-end.",
    pills: ["Kepemimpinan Proyek & PRD", "Kolaborasi Git & Pull Request", "Problem Solving Teknis", "Komunikasi Tim"],
    proofs: [
      {
        skill: "Kepemimpinan Teknis & Dokumentasi Sistem (CUCI.IN — PR #11 s/d #20)",
        proof: "Bertindak sebagai Repository Owner di CUCI.IN: menyusun Project Charter, PRD, Procurement Plan, dan Milestone Guidelines, sekaligus mengawal integrasi kode tim lewat pipeline GitHub Actions CI/CD."
      },
      {
        skill: "Kolaborasi Tim & Disiplin Pull Request (PBL-IVSS & simple-pos-kel-02)",
        proof: "Mengirimkan 12+ Pull Request terstruktur pada branch Kemaulan di PBL-IVSS (PR #1–#24) untuk modul Admin Berita & Materialized View, serta berkontribusi aktif di simple-pos-kel-02 (PR #53–#57)."
      },
      {
        skill: "Problem Solving & Integrasi Lintas Platform (Lapangku PR #49 & BawangHub)",
        proof: "Menyelesaikan migrasi pembayaran Midtrans Snap dengan timeout 15 menit & unit test BookingModel di Lapangku (PR #49), serta membangun penuh aplikasi PWA BawangHub + backend proxy Gemini AI hingga tayang di Cloud Run."
      }
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
    type: "PROYEK TIM SISTEM INFORMASI · LARAVEL & CI/CD",
    role: "Repository Owner, System Analyst & Lead Full-Stack Developer",
    organization: "Pengembangan Sistem POS Laundry CUCI.IN & Kolaborasi POS (simple-pos-kel-02)",
    summary: "Memimpin perancangan dokumen rekayasa sistem informasi dan pengembangan modul inti pada aplikasi operasional laundry CUCI.IN serta berkolaborasi pada proyek POS kelompok.",
    contributions: [
      "Menyusun dokumen Project Charter, Product Requirements Document (PRD), Procurement Plan (AWS Free Tier), Milestone Guidelines, dan Design System pada repositori CUCI.IN.",
      "Mengimplementasikan modul Transaction Lookup (cek nota publik), Transaction & Payment Processing, Complaint Handling, Admin User & Role Management (dengan proteksi self-deactivation), serta Reporting Aggregation Engine dengan composite index (PR #11, #12, #18, #19, #20).",
      "Membangun rangkaian feature tests PHPUnit, mengonfigurasi pipeline otomatis GitHub Actions CI/CD, serta berkontribusi pada pengembangan aplikasi kasir simple-pos-kel-02 (PR #53–#57)."
    ],
    resultHighlight: "Hasil: Sistem POS 3 role dengan cek nota publik 4 tahap, laporan terindeks, dan pengujian otomatis CI/CD."
  },
  {
    id: "exp-lapangku-mobile",
    period: "2026",
    type: "PENGEMBANGAN APLIKASI MOBILE & OPEN-SOURCE FLUTTER",
    role: "Repository Owner, Mobile & Web Developer",
    organization: "Proyek Aplikasi Reservasi GOR Lapangku & Kontribusi Ekosistem Flutter",
    summary: "Mengembangkan arsitektur aplikasi mobile multi-role menggunakan Flutter, Riverpod, dan Cloud Firestore beserta website showcase interaktif dan kontribusi pada repositori komunitas.",
    contributions: [
      "Membangun fondasi Firebase services, state management Riverpod (currentUidProvider), modul Customer & Mitra GOR, serta unit test transisi status pada BookingModel.",
      "Memigrasikan pembayaran manual ke Midtrans Snap dengan fitur payment timeout 15 menit dan pemisahan otomatis platform service fee dari pendapatan mitra (PR #49).",
      "Mengamankan Firestore security rules & composite index, membangun web showcase LandingPage-Lapangku (TypeScript/Vite), serta berkontribusi PR pada proyek Flutter seperti FinTrack, LayoutFlutter, dan belanjain."
    ],
    resultHighlight: "Hasil: Aplikasi booking GOR 3 role terintegrasi Midtrans Snap (timeout 15 menit), bagi hasil otomatis, dan E-Ticket QR."
  },
  {
    id: "exp-vibe-coding",
    period: "2026",
    type: "GOOGLE JUARA VIBE CODING · CLOUD & AI TRACK",
    role: "Full-Stack & AI Developer (Proyek Individu)",
    organization: "Pengembangan BawangHub — Smart Agriculture PWA & AI Assistant",
    summary: "Merancang dan membangun aplikasi web progresif (PWA) pertanian bawang merah terintegrasi Google Gemini AI, analitik harga komoditas, dan deployment cloud.",
    contributions: [
      "Membangun 7+ modul halaman (Dashboard, Tanya AI, Statistik harga komoditas dengan Recharts & simple linear regression, Buku Tani, Forum, Galeri, CuacaDetail, dan Admin Dashboard) dengan gaya Neo-Brutalism / Agri Design System.",
      "Mengamankan penggunaan GEMINI_API_KEY di sisi server Node.js/Express (server.ts) dan membuat fallback proxy untuk layanan cuaca Open-Meteo.",
      "Mengoptimalkan penyimpanan lokal dengan Firestore caching & Service Worker PWA, lalu mengemas aplikasi dengan Docker untuk di-deploy ke Google Cloud Run."
    ],
    resultHighlight: "Hasil: Aplikasi PWA pertanian cerdas dengan proxy Gemini AI aman, regresi linier harga, dan deployment Cloud Run."
  },
  {
    id: "exp-pbl-ivss",
    period: "Desember 2025",
    type: "PROJECT-BASED LEARNING (PBL) SEMESTER 3 · JTI POLINEMA",
    role: "Full-Stack Web Developer (Modul Admin Berita & Optimasi Database)",
    organization: "Laboratorium Intelligent Vision and Smart System (IVSS) — Polinema",
    summary: "Berkolaborasi dalam tim PBL Semester 3 untuk membangun portal web multi-role Laboratorium IVSS berbasis PHP Native dan PostgreSQL.",
    contributions: [
      "Membangun panel Admin Berita (admin-berita) secara menyeluruh meliputi CRUD artikel berita, dashboard statistik berjam real-time, activity logs, manajemen profil, pagination, dan filtering (Branch Kemaulan, PR #1–#24).",
      "Mengoptimalkan performa query statistik dashboard pada database PostgreSQL menggunakan Materialized View.",
      "Melakukan refactoring halaman Login & validasi JavaScript serta merombak responsivitas sidebar, header, dan kartu berita pada halaman publik."
    ],
    resultHighlight: "Hasil: Portal laboratorium 4 role (user, admin-lab, admin-berita, kepala-lab) dengan optimasi Materialized View PostgreSQL."
  }
];

/**
 * 6. PENDIDIKAN, KREDENSIAL KOMPETENSI, DAN CAPAIAN
 * Selaras 100% dengan rekam jejak akademik & repositori GitHub Maulanahb (Angkatan 2024).
 */
export const EDUCATION_INFO: EducationInfo = {
  campus: "Politeknik Negeri Malang (Polinema)",
  faculty: "Jurusan Teknologi Informasi (JTI)",
  program: "D-IV Sistem Informasi Bisnis",
  period: "2024 – Sekarang",
  semester: "Tahun Ke-2 / Semester 4 (Mahasiswa Aktif)",
  repoMetric: "64+ Repo Proyek & Kuliah",
  summary: "Pendidikan vokasi sarjana terapan yang memadukan analisis dan perancangan sistem informasi, rekayasa perangkat lunak web serta mobile, pengelolaan basis data relasional/NoSQL, dan manajemen proyek TI berbasis studi kasus nyata.",
  coursework: [
    "Dasar Pemrograman & Praktikum (Daspro)",
    "Algoritma & Struktur Data (ASD)",
    "Pemrograman Berorientasi Objek (Java PBO)",
    "Pemrograman Web (HTML/CSS/JS/PHP & Laravel)",
    "Basis Data & Optimasi Query PostgreSQL",
    "Project-Based Learning (PBL Semester 3)",
    "Analisis & Perancangan Sistem Informasi",
    "Pengembangan Aplikasi Mobile (Flutter)"
  ]
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Google Juara Vibe Coding — Cloud & Gemini AI Development Track",
    issuer: "Google Developer / Komunitas Cloud & AI Indonesia",
    year: "2026",
    focus: "Implementasi aplikasi full-stack terintegrasi Google Gemini API, pengamanan server-side API proxy (Node.js/Express), containerization dengan Docker, dan deployment ke Google Cloud Run pada proyek BawangHub.",
    credentialUrl: "https://github.com/Maulanahb/BawangHub"
  },
  {
    name: "Project-Based Learning (PBL) — Pengembangan Sistem Informasi Laboratorium",
    issuer: "Jurusan Teknologi Informasi (JTI) Politeknik Negeri Malang",
    year: "2025",
    focus: "Pengembangan portal web multi-role berbasis PHP & PostgreSQL, implementasi Materialized View untuk optimasi statistik dashboard, serta kolaborasi tim dengan alur Git Branching & Pull Request.",
    credentialUrl: "https://github.com/Maulanahb/PBL-IVSS"
  },
  {
    name: "Eksplorasi Mandiri Machine Learning & Rekognisi Citra (Fashion MNIST)",
    issuer: "Repositori Riset & Praktikum Mandiri (@Maulanahb)",
    year: "2025",
    focus: "Penerapan dasar pengolahan data dan klasifikasi citra menggunakan Python pada dataset Fashion MNIST (fashion-mnist-app) serta fundamental struktur data dan PBO.",
    credentialUrl: "https://github.com/Maulanahb?tab=repositories"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Pengembang BawangHub Smart Agriculture PWA — Google Juara Vibe Coding",
    organizer: "Google Juara Vibe Coding",
    year: "2026",
    badge: "PROYEK AI & CLOUD RUN",
    description: "Membangun aplikasi PWA pertanian bawang merah dengan 7+ modul halaman, integrasi Gemini AI di sisi server Express, prediksi harga regresi linier (Recharts), dan deployment Docker di Google Cloud Run."
  },
  {
    title: "Kontributor Utama Portal Web Multi-Role — PBL Laboratorium IVSS Polinema",
    organizer: "Jurusan Teknologi Informasi Politeknik Negeri Malang",
    year: "2025",
    badge: "PROYEK PBL JTI POLINEMA",
    description: "Menyelesaikan 12+ Pull Request untuk pembangunan panel Admin Berita, activity logs, refactoring autentikasi login, serta optimasi PostgreSQL Materialized View pada portal resmi Lab IVSS."
  },
  {
    title: "64+ Repositori Publik & Kolaborasi Open-Source Aktif di GitHub (@Maulanahb)",
    organizer: "GitHub — github.com/Maulanahb",
    year: "2024 – 2026",
    badge: "REKAM JEJAK GITHUB",
    description: "Mengelola dan berkontribusi aktif pada 64+ repositori proyek sistem informasi, aplikasi mobile Flutter (Lapangku), kasir POS Laravel (CUCI.IN & simple-pos-kel-02), serta repositori perkuliahan JTI Polinema."
  }
];
