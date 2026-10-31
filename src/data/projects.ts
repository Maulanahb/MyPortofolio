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
  positioning: "Mahasiswa Sistem Informasi Bisnis Polinema. Saya menulis kebutuhan sistem, merancang database, lalu ikut membangun aplikasinya di web dan mobile.",
  tagline: "Style boleh nyentrik. Sistem harus tetap masuk akal.",
  campus: "Politeknik Negeri Malang (Polinema)",
  department: "Jurusan Teknologi Informasi (JTI)",
  program: "D-IV Sistem Informasi Bisnis",
  period: "2024 – Sekarang",
  semester: "Semester 5",
  gpa: "3.68 / 4.00",
  githubRepos: "67+ repo publik",
  interests: [
    "System Analyst",
    "Full-Stack Web Developer",
    "Mobile Developer (Flutter)",
    "Integrasi AI & Data Mining",
    "Database & Backend"
  ],
  careerGoal: "Membuat sistem yang kebutuhannya jelas, dokumentasinya rapi, dan sudah diuji sebelum dipakai.",
  internshipTarget: "Magang atau PKL sebagai System Analyst, Full-Stack Web Developer, atau Mobile Developer.",
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
    projectType: "Proyek tim · Sistem kasir dan operasional laundry",
    title: "CUCI.IN",
    description: "Sistem kasir laundry. Pelanggan bisa cek status cucian cukup dengan nomor nota, tanpa perlu login.",
    category: "CASE 001 / KASIR LAUNDRY & CEK STATUS CUCIAN",
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
    caseNumber: "CASE STUDY / 002",
    badge: "AI AGRITECH / GOOGLE GEMINI",
    projectType: "Proyek individu · Aplikasi web pertanian dengan AI",
    title: "BAWANGHUB",
    description: "Aplikasi web untuk petani bawang merah: tanya AI soal budidaya, pantau harga, cek cuaca, dan catat kas tani.",
    category: "CASE 002 / APLIKASI PERTANIAN & ASISTEN AI",
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
    caseNumber: "CASE STUDY / 003",
    badge: "MOBILE / FLUTTER RIVERPOD",
    projectType: "Proyek tim · Aplikasi mobile booking lapangan",
    title: "LAPANGKU",
    description: "Aplikasi Flutter untuk booking lapangan olahraga, dengan pembayaran Midtrans dan dashboard pendapatan untuk pemilik GOR.",
    category: "CASE 003 / BOOKING LAPANGAN & PEMBAYARAN ONLINE",
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
    artifacts: ["Arsitektur Riverpod & Firebase", "Unit test booking", "Aturan keamanan Firestore", "Landing page"],
    highlights: [
      "Tiga role dalam satu aplikasi: penyewa, mitra GOR, dan admin",
      "Pembayaran Midtrans: bayar di aplikasi, batal otomatis setelah 15 menit",
      "Dashboard mitra: pendapatan real-time setelah dipotong biaya platform",
      "Deep link: notifikasi langsung membuka halaman booking yang sesuai",
      "Landing page: halaman perkenalan aplikasi yang sudah online"
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
    caseNumber: "CASE STUDY / 004",
    badge: "RESEARCH LAB / POLINEMA",
    projectType: "Proyek tim · Portal web laboratorium",
    title: "PORTAL LAB IVSS",
    description: "Portal web Laboratorium IVSS JTI Polinema untuk berita kegiatan, profil peneliti, dan fasilitas lab.",
    category: "CASE 004 / PORTAL LAB & PANEL ADMIN BERITA",
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
    caseNumber: "CASE STUDY / 005",
    badge: "FINTECH AI / GEMINI 2.5 FLASH",
    projectType: "Proyek individu · Aplikasi catatan keuangan dengan AI",
    title: "AIAAS KEUANGAN",
    description: "Catatan keuangan yang cukup diisi dengan kalimat biasa, misalnya \"beli kopi 25rb kemarin\". AI mengubahnya jadi transaksi.",
    category: "CASE 005 / CATATAN KEUANGAN & PARSER BAHASA ALAMI",
    role: "System analyst dan full-stack developer. Saya menulis PRD, merancang database, membangun frontend React, dan membuat REST API PHP yang terhubung ke Gemini.",
    problem: "Banyak orang berhenti mencatat keuangan karena harus mengisi form setiap kali belanja: tanggal, nominal, jenis, dan kategori.",
    approach: "Pengguna cukup mengetik kalimat. Gemini mengubahnya menjadi data transaksi dengan format JSON yang sudah ditentukan di PRD, lalu disimpan lewat REST API PHP.",
    process: {
      analysis: "Menulis PRD berisi empat kebutuhan fungsional, format JSON yang harus dikembalikan AI, penanganan error, dan target keberhasilan MVP.",
      design: "Merancang tiga tabel (transaksi, target tabungan, anggaran) dengan index, plus tujuh halaman aplikasi.",
      implementation: "Membangun frontend React dan TypeScript, serta REST API PHP 8 dengan pola controller, repository, dan service."
    },
    impact: "Mencatat transaksi cukup dengan satu kalimat. Asisten AI juga bisa menjawab pertanyaan keuangan berdasarkan saldo, tabungan, dan anggaran pengguna.",
    impactMetrics: [
      "7 halaman: dashboard, transaksi, laporan, tabungan, anggaran, asisten AI, pengaturan",
      "Paham singkatan nominal (rb, jt, k) dan tanggal relatif (kemarin, 3 hari lalu)",
      "Asisten AI membaca data keuangan pengguna sebelum menjawab",
      "REST API PHP 8 dengan struktur controller, repository, dan service"
    ],
    artifacts: ["PRD v1.1", "Skema database", "Format JSON untuk AI", "REST API PHP 8"],
    highlights: [
      "Input kalimat: \"makan siang 45rb\" langsung jadi transaksi pengeluaran",
      "Asisten keuangan: tanya soal pengeluaran, tabungan, atau sisa anggaran",
      "Riwayat aman: kalimat asli disimpan dan data yang dihapus bisa ditelusuri",
      "Target tabungan dan anggaran bulanan per kategori",
      "Dashboard arus kas dengan filter harian, mingguan, dan bulanan"
    ],
    stack: ["React 18 & TypeScript", "PHP 8 OOP REST API", "Google Gemini 2.5 Flash", "Tailwind CSS & Vite", "MySQL"],
    theme: "fintech",
    brandColor: "#4f46e5",
    sfx: "PARSE!",
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
  resultHighlight: string;
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
    index: "STEP 01 — KEBUTUHAN",
    title: "ANALISIS &<br/>PERENCANAAN.",
    description: "Sebelum menulis kode, saya mencatat siapa penggunanya, apa yang mereka butuhkan, dan fitur mana yang masuk versi pertama.",
    deliverable: "Project Charter · PRD · Rencana biaya"
  },
  {
    sfx: "✦",
    index: "STEP 02 — RANCANGAN",
    title: "PERANCANGAN<br/>DATABASE & UI.",
    description: "Merancang tabel dan relasinya, hak akses tiap role, dan tampilan dasar supaya tim punya acuan yang sama.",
    deliverable: "Skema database · Hak akses · Design system"
  },
  {
    sfx: "!",
    index: "STEP 03 — BANGUN & UJI",
    title: "IMPLEMENTASI<br/>& PENGUJIAN.",
    description: "Membangun fitur lewat pull request, menulis test untuk logika penting, lalu deploy.",
    deliverable: "Pull request · Test otomatis · Deploy"
  }
];

/**
 * 3. SKILLS — 100% diselaraskan dengan 67+ repositori publik GitHub Maulanahb:
 * Teknis & Pemrograman, Analisis & Desain Sistem, Tools/Cloud/DevOps, dan Soft Skills terbukti di PR.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    code: "SKILL 01 / ENGINEERING",
    title: "Teknis & Pemrograman",
    subtitle: "Web, mobile, data, dan database",
    items: "Paling sering memakai Laravel dan React untuk web, Flutter untuk mobile, dan PostgreSQL untuk database. Python saya pakai untuk analisis data mining.",
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
    code: "SKILL 02 / SYSTEM ANALYSIS",
    title: "Analisis & Desain Sistem",
    subtitle: "Dokumen kebutuhan, database, dan hak akses",
    items: "Menulis PRD dan Project Charter, merancang skema database dan hak akses tiap role, serta mengoptimalkan query yang lambat.",
    icons: [
      { name: "Project Charter & PRD", iconId: "prd" },
      { name: "Skema Database & ERD", iconId: "erd" },
      { name: "Materialized View & Index", iconId: "matview" },
      { name: "Multi-Role RBAC", iconId: "rbac" },
      { name: "Format Data & Kontrak AI", iconId: "ai-json" },
      { name: "Data Mining & Analisis Regresi", iconId: "datamining" },
      { name: "Rencana Biaya Cloud (AWS)", iconId: "cloudcost" }
    ]
  },
  {
    code: "SKILL 03 / TOOLS, CLOUD & DEVOPS",
    title: "Tools, Cloud & DevOps",
    subtitle: "Kolaborasi, deploy, dan layanan pihak ketiga",
    items: "Kerja tim lewat Git dan pull request, test otomatis di GitHub Actions, deploy dengan Docker ke Cloud Run, serta integrasi Firebase, Midtrans, dan Gemini API.",
    icons: [
      { name: "Git", iconId: "git" },
      { name: "GitHub", iconId: "github" },
      { name: "Docker", iconId: "docker" },
      { name: "Google Cloud Run", iconId: "googlecloud" },
      { name: "Google Gemini AI", iconId: "googlegemini" },
      { name: "Firebase Auth", iconId: "firebase-auth" },
      { name: "Midtrans Payment", iconId: "midtrans" },
      { name: "Jupyter Notebook", iconId: "jupyter" },
      { name: "Figma", iconId: "figma" }
    ]
  },
  {
    code: "SKILL 04 / PROVEN SOFT SKILLS",
    title: "Soft Skills",
    subtitle: "Bisa dicek langsung di repositori GitHub",
    items: "Memimpin perencanaan proyek, bekerja dalam tim lewat pull request, dan menyelesaikan masalah integrasi sampai jalan.",
    proofs: [
      {
        skill: "Memimpin perencanaan (CUCI.IN & AIaaS Keuangan)",
        proof: "Menulis Project Charter, PRD, dan rencana biaya untuk tim CUCI.IN, lalu PRD lengkap untuk aplikasi keuangan berbasis AI."
      },
      {
        skill: "Kerja tim lewat pull request",
        proof: "Aktif berkolaborasi dalam tim lewat pull request untuk modul admin berita dan integrasi pembayaran."
      },
      {
        skill: "Problem solving (Lapangku & BawangHub)",
        proof: "Memindahkan pembayaran manual Lapangku ke Midtrans dengan batas waktu 15 menit, dan memindahkan panggilan AI BawangHub ke server agar API key aman."
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
    type: "PROYEK TIM · LARAVEL",
    role: "System Analyst & Full-Stack Developer",
    organization: "CUCI.IN, sistem kasir laundry",
    summary: "Memimpin perencanaan dan membangun sebagian besar fitur inti sistem kasir laundry bersama dua rekan tim.",
    contributions: [
      "Menulis Project Charter, PRD, rencana biaya server, dan design system.",
      "Membangun fitur cek status cucian, pembayaran, komplain, manajemen user, dan laporan keuangan.",
      "Menyiapkan feature test PHPUnit yang berjalan otomatis di GitHub Actions."
    ],
    resultHighlight: "Sistem kasir 3 role dengan cek status cucian tanpa login."
  },
  {
    id: "exp-aiaas-vibe",
    period: "2026",
    type: "PROYEK INDIVIDU · INTEGRASI AI",
    role: "Full-Stack Developer",
    organization: "AIaaS Keuangan & BawangHub",
    summary: "Membangun dua aplikasi web yang memakai Gemini API, dari dokumen kebutuhan sampai deploy.",
    contributions: [
      "AIaaS Keuangan: menulis PRD, merancang database, dan membuat fitur yang mengubah kalimat biasa menjadi data transaksi.",
      "BawangHub: membangun tujuh halaman untuk petani, termasuk grafik harga dengan prediksi tren.",
      "Menyimpan API key di server, bukan di browser, lalu men-deploy BawangHub dengan Docker ke Cloud Run."
    ],
    resultHighlight: "Dua aplikasi AI yang bisa dicoba dan kodenya terbuka di GitHub."
  },
  {
    id: "exp-lapangku-mobile",
    period: "2026",
    type: "PROYEK TIM · FLUTTER",
    role: "Mobile & Web Developer",
    organization: "Lapangku, aplikasi booking lapangan",
    summary: "Membangun aplikasi booking lapangan dengan Flutter bersama dua rekan tim, plus landing page-nya.",
    contributions: [
      "Menyiapkan struktur Firebase dan state management Riverpod, lalu membangun modul penyewa dan mitra GOR.",
      "Mengganti pembayaran manual dengan Midtrans. Booking batal otomatis kalau tidak dibayar dalam 15 menit.",
      "Membuat landing page dan ikut berkontribusi di beberapa proyek Flutter teman."
    ],
    resultHighlight: "Booking dan pembayaran lapangan dari aplikasi, dengan pendapatan mitra yang terpisah otomatis."
  },
  {
    id: "exp-ivss-web",
    period: "2025",
    type: "PROYEK TIM · WEB & DATABASE",
    role: "Full-Stack Web Developer",
    organization: "Portal Web Laboratorium IVSS",
    summary: "Membangun modul pengelolaan konten berita dan mempercepat query dashboard statistik dengan Materialized View.",
    contributions: [
      "Membangun panel admin berita: kelola artikel, dashboard statistik, log aktivitas, profil, pagination, dan filter.",
      "Mempercepat waktu muat dashboard statistik menggunakan Materialized View di PostgreSQL.",
      "Merapikan alur login dan tampilan antarmuka publik agar responsif di berbagai perangkat."
    ],
    resultHighlight: "Portal web lab dengan 4 hak akses dan dashboard statistik yang responsif."
  }
];

/**
 * 6. PENDIDIKAN, KREDENSIAL KOMPETENSI, DAN CAPAIAN
 * Selaras dengan KHS resmi (Semester 1–4) & 67+ repositori GitHub Maulanahb (Angkatan 2024).
 */
export const EDUCATION_INFO: EducationInfo = {
  campus: "Politeknik Negeri Malang (Polinema)",
  faculty: "Jurusan Teknologi Informasi (JTI)",
  program: "D-IV Sistem Informasi Bisnis",
  period: "2024 – Sekarang",
  semester: "Semester 5",
  nim: "244107060133",
  gpa: "3.68 / 4.00",
  gpaDetail: "IPK semester 1–4 dari KHS resmi. IP per semester: 3.53 · 3.89 · 3.65 · 3.67.",
  repoMetric: "67+ repo publik",
  summary: "Program sarjana terapan yang menggabungkan analisis proses bisnis, perancangan sistem informasi, pemrograman web dan mobile, serta pengolahan data.",
  coursework: [
    "Analisis & Perancangan Sistem Informasi (A)",
    "Pemrograman Mobile (A)",
    "Pemrograman Web (A)",
    "Rekayasa Perangkat Lunak (A)",
    "Desain UI/UX (A)",
    "Basis Data & Basis Data Lanjut (A)",
    "Algoritma & Struktur Data (A)",
    "Workshop (A)",
    "Data Mining & Data Warehouse",
    "E-Business & Startup Digital"
  ]
};

export const CERTIFICATIONS: Certification[] = [];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "IPK 3.68 dari empat semester",
    organizer: "D-IV Sistem Informasi Bisnis, Polinema",
    year: "2024 – 2026",
    badge: "AKADEMIK",
    description: "IP tertinggi 3.89 di semester 2. Nilai A di Analisis & Perancangan SI, Pemrograman Web, Pemrograman Mobile, dan Desain UI/UX."
  },
  {
    title: "BawangHub untuk Google Juara Vibe Coding",
    organizer: "Proyek individu",
    year: "2026",
    badge: "PROYEK AI",
    description: "Aplikasi web pertanian dengan asisten Gemini, dibuat sendiri dan sudah berjalan di Google Cloud Run."
  },
  {
    title: "67+ repositori publik di GitHub",
    organizer: "github.com/Maulanahb",
    year: "2024 – 2026",
    badge: "GITHUB",
    description: "Tugas kuliah, proyek tim, dan proyek pribadi sejak semester 1. Semua kode di portofolio ini bisa dicek langsung."
  }
];
