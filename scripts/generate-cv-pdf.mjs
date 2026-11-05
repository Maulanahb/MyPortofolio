import fs from 'node:fs';
import path from 'node:path';

// AFM character width approximations for standard Helvetica and Helvetica-Bold (in 1/1000 em)
const HELVETICA_WIDTHS = {
  ' ': 278, '!': 278, '"': 355, '#': 556, '$': 556, '%': 889, '&': 667, "'": 191,
  '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278,
  '0': 556, '1': 556, '2': 556, '3': 556, '4': 556, '5': 556, '6': 556, '7': 556,
  '8': 556, '9': 556, ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556,
  '@': 1015, 'A': 667, 'B': 667, 'C': 722, 'D': 722, 'E': 667, 'F': 611, 'G': 778,
  'H': 722, 'I': 278, 'J': 500, 'K': 667, 'L': 556, 'M': 833, 'N': 722, 'O': 778,
  'P': 667, 'Q': 778, 'R': 722, 'S': 667, 'T': 611, 'U': 722, 'V': 667, 'W': 944,
  'X': 667, 'Y': 667, 'Z': 611, '[': 278, '\\': 278, ']': 278, '^': 469, '_': 556,
  '`': 222, 'a': 556, 'b': 556, 'c': 500, 'd': 556, 'e': 556, 'f': 278, 'g': 556,
  'h': 556, 'i': 222, 'j': 222, 'k': 500, 'l': 222, 'm': 833, 'n': 556, 'o': 556,
  'p': 556, 'q': 556, 'r': 333, 's': 500, 't': 278, 'u': 556, 'v': 500, 'w': 722,
  'x': 500, 'y': 500, 'z': 500, '{': 334, '|': 260, '}': 334, '~': 584,
  '•': 400, '–': 556, '—': 1000
};

const HELVETICA_BOLD_WIDTHS = {
  ...HELVETICA_WIDTHS,
  ' ': 278, 'A': 722, 'B': 722, 'C': 722, 'D': 722, 'E': 667, 'F': 611, 'G': 778,
  'H': 722, 'I': 278, 'J': 556, 'K': 722, 'L': 611, 'M': 833, 'N': 722, 'O': 778,
  'P': 667, 'Q': 778, 'R': 722, 'S': 667, 'T': 611, 'U': 722, 'V': 667, 'W': 944,
  'X': 667, 'Y': 667, 'Z': 611,
  'a': 556, 'b': 611, 'c': 556, 'd': 611, 'e': 556, 'f': 333, 'g': 611, 'h': 611,
  'i': 278, 'j': 278, 'k': 556, 'l': 278, 'm': 889, 'n': 611, 'o': 611, 'p': 611,
  'q': 611, 'r': 389, 's': 556, 't': 333, 'u': 611, 'v': 556, 'w': 778, 'x': 556,
  'y': 556, 'z': 500,
  '0': 556, '1': 556, '2': 556, '3': 556, '4': 556, '5': 556, '6': 556, '7': 556,
  '8': 556, '9': 556
};

function measureText(str, fontSize, isBold = false) {
  const table = isBold ? HELVETICA_BOLD_WIDTHS : HELVETICA_WIDTHS;
  let total = 0;
  for (const char of str) {
    total += table[char] || 550;
  }
  return (total * fontSize) / 1000;
}

function escapePdf(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[–—]/g, '-')
    .replace(/•/g, '*');
}

// Build PDF stream
class PdfBuilder {
  constructor() {
    this.stream = [];
    this.pageWidth = 595.28;
    this.pageHeight = 841.89;
    this.leftMargin = 40;
    this.rightMargin = 555;
    this.contentWidth = this.rightMargin - this.leftMargin;
  }

  setColor(r, g, b, isStroke = false) {
    const cmd = isStroke ? `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} RG\n` : `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg\n`;
    this.stream.push(cmd);
  }

  drawHLine(x1, x2, y, width = 0.5, r = 0.8, g = 0.83, b = 0.88) {
    this.setColor(r, g, b, true);
    this.stream.push(`${width.toFixed(2)} w ${x1.toFixed(1)} ${y.toFixed(1)} m ${x2.toFixed(1)} ${y.toFixed(1)} l S\n`);
  }

  drawBullet(x, y, radius = 1.3, r = 0.25, g = 0.35, b = 0.55) {
    this.setColor(r, g, b, false);
    // Approximate circle with square/rect or 4-point bezier
    const d = radius * 2;
    this.stream.push(`${(x - radius).toFixed(1)} ${(y - radius).toFixed(1)} ${d.toFixed(1)} ${d.toFixed(1)} re f\n`);
  }

  drawText(text, x, y, options = {}) {
    const {
      font = 'F2',
      size = 9,
      color = [0.1, 0.12, 0.17],
      align = 'left'
    } = options;

    const isBold = font === 'F1';
    let posX = x;

    if (align === 'center') {
      const w = measureText(text, size, isBold);
      posX = (this.pageWidth - w) / 2;
    } else if (align === 'right') {
      const w = measureText(text, size, isBold);
      posX = this.rightMargin - w;
    }

    this.setColor(color[0], color[1], color[2], false);
    const escaped = escapePdf(text);
    this.stream.push(`BT /${font} ${size.toFixed(1)} Tf 1 0 0 1 ${posX.toFixed(1)} ${y.toFixed(1)} Tm (${escaped}) Tj ET\n`);
  }

  drawSectionHeader(title, y) {
    // Header title
    this.drawText(title, this.leftMargin, y, {
      font: 'F1',
      size: 9.2,
      color: [0.08, 0.22, 0.50] // Deep navy
    });

    // Horizontal divider
    const lineY = y - 3.5;
    this.drawHLine(this.leftMargin, this.rightMargin, lineY, 0.8, 0.78, 0.82, 0.88);
    return lineY - 10;
  }
}

export function generateCvPdf() {
  const doc = new PdfBuilder();

  // Colors
  const C_DARK = [0.10, 0.12, 0.16];
  const C_MUTED = [0.35, 0.40, 0.48];
  const C_BLUE = [0.08, 0.22, 0.50];
  const C_SUBTLE = [0.45, 0.50, 0.58];

  let y = 808;

  // HEADER
  doc.drawText('MAULANA AHMAD BUKHORI', 0, y, {
    font: 'F1',
    size: 16.5,
    color: [0.06, 0.09, 0.16],
    align: 'center'
  });
  y -= 13;

  doc.drawText('JUNIOR SYSTEM ANALYST & FULL-STACK DEVELOPER', 0, y, {
    font: 'F1',
    size: 8.8,
    color: C_BLUE,
    align: 'center'
  });
  y -= 12;

  doc.drawText('Malang, Indonesia   |   +62 895 2398 9355   |   maulanahmad2287@gmail.com', 0, y, {
    font: 'F2',
    size: 8.2,
    color: C_MUTED,
    align: 'center'
  });
  y -= 10.5;

  doc.drawText('linkedin.com/in/maulanahb   |   github.com/Maulanahb (67+ Repositori)   |   maulana-dev.local', 0, y, {
    font: 'F2',
    size: 8.2,
    color: C_BLUE,
    align: 'center'
  });
  y -= 8;

  // Header separator
  doc.drawHLine(doc.leftMargin, doc.rightMargin, y, 1.0, 0.75, 0.80, 0.88);
  y -= 13;

  // 1. RINGKASAN PROFIL
  y = doc.drawSectionHeader('RINGKASAN PROFIL', y);

  const profileLines = [
    'Junior System Analyst dan Full-Stack Developer berdedikasi dengan keahlian memadukan analisis proses bisnis, perancangan',
    'kebutuhan sistem terstruktur (PRD, ERD, RBAC), dan implementasi software modern (Laravel, React, Flutter, Google Gemini AI).',
    'Terbiasa mengawal siklus pengembangan perangkat lunak dari spesifikasi hingga produksi, mengutamakan kode yang rapi, modular,',
    'serta teruji secara otomatis guna mendukung keandalan operasional perusahaan.'
  ];
  for (const line of profileLines) {
    doc.drawText(line, doc.leftMargin, y, { font: 'F2', size: 8.0, color: C_DARK });
    y -= 10.0;
  }
  y -= 4;

  // 2. PENDIDIKAN
  y = doc.drawSectionHeader('PENDIDIKAN', y);

  // Polinema
  doc.drawText('Politeknik Negeri Malang', doc.leftMargin, y, { font: 'F1', size: 8.6, color: C_DARK });
  doc.drawText('2024 - Sekarang', 0, y, { font: 'F1', size: 8.2, color: C_BLUE, align: 'right' });
  y -= 10;
  doc.drawText('D-IV Sistem Informasi Bisnis (Semester 5 / Angkatan 2024)', doc.leftMargin, y, { font: 'F2', size: 8.0, color: C_DARK });
  doc.drawText('Malang, Jawa Timur', 0, y, { font: 'F2', size: 7.8, color: C_SUBTLE, align: 'right' });
  y -= 9.5;
  doc.drawText('Fokus Studi: Analisis & Perancangan Sistem Informasi, Rekayasa Perangkat Lunak, Basis Data Lanjut, Pemrograman Web & Mobile.', doc.leftMargin + 6, y, { font: 'F2', size: 7.5, color: C_MUTED });
  y -= 11.5;

  // SMAN 3
  doc.drawText('SMAN 3 Nganjuk', doc.leftMargin, y, { font: 'F1', size: 8.6, color: C_DARK });
  doc.drawText('2021 - 2024', 0, y, { font: 'F1', size: 8.2, color: C_MUTED, align: 'right' });
  y -= 10;
  doc.drawText('Matematika dan Ilmu Pengetahuan Alam (MIPA)', doc.leftMargin, y, { font: 'F2', size: 8.0, color: C_DARK });
  doc.drawText('Nganjuk, Jawa Timur', 0, y, { font: 'F2', size: 7.8, color: C_SUBTLE, align: 'right' });
  y -= 12;

  // 3. PROYEK UTAMA
  y = doc.drawSectionHeader('PENGALAMAN PROYEK UTAMA', y);

  const projects = [
    {
      title: 'CUCI.IN - Sistem POS & Operasional Laundry',
      role: 'Proyek Tim (5 Developer)',
      year: '2026',
      stack: 'Laravel, PostgreSQL, Tailwind CSS, Alpine.js, PHPUnit, GitHub Actions CI',
      bullets: [
        'Menyusun Project Charter, PRD, dan skema database PostgreSQL dengan hak akses 3 role (Admin, Kasir, Pelanggan).',
        'Membangun sistem kasir POS operasional serta fitur pelacakan status cucian publik secara transparan tanpa perlu login.',
        'Mengoptimalkan performa laporan keuangan via composite index dan menjaga integritas kode dengan unit testing PHPUnit.'
      ]
    },
    {
      title: 'AI Finance (AIAAS) - Personal Financial Management via Natural Language AI',
      role: 'Proyek Individu',
      year: '2026',
      stack: 'React 18, TypeScript, PHP 8 OOP REST API, Google Gemini 2.5 Flash, MySQL',
      bullets: [
        'Merancang PRD v1.1 dan skema JSON kontrak payload AI untuk parsing percakapan natural menjadi transaksi keuangan valid.',
        'Mengintegrasikan Gemini API untuk konsultasi kesehatan finansial cerdas, alokasi anggaran, dan pelacakan tabungan.',
        'Membangun REST API berarsitektur Controller-Repository-Service dengan audit trail raw_input dan filter dinamis.'
      ]
    },
    {
      title: 'BawangHub - Progressive Web App (PWA) Agritech Budidaya Bawang Merah',
      role: 'Proyek Individu',
      year: '2026',
      stack: 'React 19, TypeScript, Google Gemini AI, Express.js Proxy, Firebase, Docker, Cloud Run',
      bullets: [
        'Membangun PWA 7 modul terintegrasi: asisten konsultasi budidaya Gemini AI, grafik regresi harga pasar, dan buku kas tani.',
        'Mengamankan API key lewat Express proxy server dan menambahkan service worker caching untuk akses offline petani.',
        'Mengonfigurasi containerisasi Docker dan otomatisasi deployment produksi pada serverless Google Cloud Run.'
      ]
    },
    {
      title: 'Lapangku - Aplikasi Mobile Reservasi Lapangan Olahraga & Manajemen Venue',
      role: 'Proyek Tim (4 Developer)',
      year: '2026',
      stack: 'Flutter SDK, Dart, Riverpod State Management, Cloud Firestore, Midtrans Snap Gateway',
      bullets: [
        'Merancang arsitektur mobile multi-role (Penyewa, Mitra GOR, Admin) dengan state management Riverpod dan Firestore.',
        'Mengintegrasikan payment gateway Midtrans Snap dilengkapi mekanisme auto-cancel jika booking tidak dibayar dalam 15 menit.',
        'Menyediakan dashboard pendapatan mitra GOR dengan kalkulasi otomatis pemisahan pendapatan bersih dan komisi platform.'
      ]
    },
    {
      title: 'Portal Riset Laboratorium IVSS Polinema - CMS & Publikasi Kegiatan Ilmiah',
      role: 'Proyek Tim (5 Developer)',
      year: '2025',
      stack: 'PHP, PostgreSQL, Multi-Role RBAC, Materialized Views, Bootstrap/CSS',
      bullets: [
        'Merancang dan membangun CMS portal riset laboratorium untuk publikasi kegiatan ilmiah, berita, dan pengelolaan fasilitas lab.',
        'Mengembangkan panel admin berita (CRUD, pagination, log aktivitas audit) dan sistem hak akses 4 level wewenang.',
        'Mengoptimalkan kecepatan query statistik dashboard laboratorium menggunakan teknik PostgreSQL Materialized Views.'
      ]
    }
  ];

  for (const proj of projects) {
    // Project title & year
    doc.drawText(proj.title, doc.leftMargin, y, { font: 'F1', size: 8.3, color: C_DARK });
    doc.drawText(proj.year, 0, y, { font: 'F1', size: 8.0, color: C_BLUE, align: 'right' });
    y -= 9.5;

    // Sub: role & stack
    doc.drawText(`${proj.role}  |  Stack: ${proj.stack}`, doc.leftMargin + 4, y, { font: 'F2', size: 7.4, color: C_MUTED });
    y -= 8.5;

    // Bullets
    for (const b of proj.bullets) {
      doc.drawBullet(doc.leftMargin + 5, y + 2.5, 1.1, C_BLUE[0], C_BLUE[1], C_BLUE[2]);
      doc.drawText(b, doc.leftMargin + 10, y, { font: 'F2', size: 7.4, color: C_DARK });
      y -= 8.5;
    }
    y -= 2.5;
  }
  y -= 2;

  // 4. SERTIFIKASI
  y = doc.drawSectionHeader('SERTIFIKASI & PELATIHAN RESMI', y);

  const certs = [
    {
      title: 'Spec-Driven Development dengan Kiro',
      issuer: 'Dicoding Indonesia (AWS Partner)',
      year: '2026',
      desc: 'Penerapan metodologi SDD (Requirements, Architecture Design, Task Implementation) untuk membangun software web modular.'
    },
    {
      title: 'Belajar Dasar AI',
      issuer: 'Dicoding Indonesia (Google Cloud Partner)',
      year: '2025',
      desc: 'Pemahaman fundamental Artificial Intelligence, data pipeline, Machine Learning, dan pemanfaatan API AI modern.'
    }
  ];

  for (const cert of certs) {
    doc.drawText(`${cert.title} - ${cert.issuer}`, doc.leftMargin, y, { font: 'F1', size: 8.0, color: C_DARK });
    doc.drawText(cert.year, 0, y, { font: 'F1', size: 8.0, color: C_BLUE, align: 'right' });
    y -= 8.5;
    doc.drawText(cert.desc, doc.leftMargin + 6, y, { font: 'F2', size: 7.3, color: C_MUTED });
    y -= 9.5;
  }
  y -= 2;

  // 5. KEAHLIAN TEKNIS
  y = doc.drawSectionHeader('KEAHLIAN TEKNIS & ANALISIS SISTEM', y);

  const skills = [
    { label: 'Core Languages', val: 'PHP, JavaScript (ES6+), TypeScript, Dart, SQL, Python, HTML5, CSS3' },
    { label: 'Frameworks & UI', val: 'Laravel, React.js, Vite, Flutter, Riverpod, Tailwind CSS, Alpine.js' },
    { label: 'Analisis & Desain', val: 'PRD, Project Charter, SRS, ERD, Multi-Role RBAC, Odoo ERP, Power BI, RESTful API' },
    { label: 'Cloud, AI & DevOps', val: 'Google Gemini API, Google Antigravity, Docker, Cloud Run, Git, GitHub Actions, Midtrans' }
  ];

  for (const s of skills) {
    doc.drawText(`- ${s.label}:`, doc.leftMargin, y, { font: 'F1', size: 7.8, color: C_DARK });
    const labelW = measureText(`- ${s.label}: `, 7.8, true);
    doc.drawText(s.val, doc.leftMargin + labelW, y, { font: 'F2', size: 7.6, color: C_MUTED });
    y -= 9.5;
  }

  // Compile final PDF binary
  const streamContent = doc.stream.join('');
  const streamByteLen = Buffer.byteLength(streamContent, 'latin1');

  const objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[3] = `<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /MediaBox [0 0 595.28 841.89] /Contents 6 0 R >>`;
  objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';
  objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  objects[6] = `<< /Length ${streamByteLen} >>\nstream\n${streamContent}\nendstream`;

  let pdfOutput = '%PDF-1.4\n';
  const offsets = [];

  for (let i = 1; i <= 6; i++) {
    offsets[i] = Buffer.byteLength(pdfOutput, 'latin1');
    pdfOutput += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdfOutput, 'latin1');
  pdfOutput += 'xref\n0 7\n0000000000 65535 f \n';
  for (let i = 1; i <= 6; i++) {
    pdfOutput += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdfOutput += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return {
    pdfContent: pdfOutput,
    remainingY: y
  };
}

// Write to public/ and dist/
const { pdfContent, remainingY } = generateCvPdf();
console.log(`PDF generated successfully. Remaining bottom space: ${remainingY.toFixed(1)} pt (Target bottom margin ~30-40 pt)`);

const publicPdfPath = path.resolve('public/cv-maulana.pdf');
const publicDocPdfPath = path.resolve('public/CV-Maulana-Ahmad-Bukhori.pdf');
fs.writeFileSync(publicPdfPath, pdfContent, 'latin1');
fs.writeFileSync(publicDocPdfPath, pdfContent, 'latin1');
console.log(`Saved: ${publicPdfPath}`);
console.log(`Saved: ${publicDocPdfPath}`);

// Also update dist/ if dist/ exists
const distPdfPath = path.resolve('dist/cv-maulana.pdf');
const distDocPdfPath = path.resolve('dist/CV-Maulana-Ahmad-Bukhori.pdf');
if (fs.existsSync('dist')) {
  fs.writeFileSync(distPdfPath, pdfContent, 'latin1');
  fs.writeFileSync(distDocPdfPath, pdfContent, 'latin1');
  console.log(`Saved: ${distPdfPath}`);
  console.log(`Saved: ${distDocPdfPath}`);
}
