---
trigger: always_on
description: Alur kerja terpadu (Master Workflow) pemanfaatan seluruh skill development dari fase discovery, ideation, UI/UX, planning, TDD execution, hingga verification dan graph update.
---

# Superpowers Master Workflow Rule

Aturan ini mewajibkan seluruh proses pengembangan fitur, perbaikan bug, atau restrukturisasi kode mengikuti alur kerja terpadu (*Superpowers Pipeline*) secara disiplin tanpa melompati fase:

## 1. Fase 0: Context & Discovery (Wajib Sebelum Menulis Kode)
- **`graphify`**: Selalu lakukan query knowledge graph (`query_graph`, `god_nodes`, `shortest_path`) sebelum mengubah kode untuk memetakan dependensi, model, dan arsitektur yang sudah ada.
- **`using-superpowers`**: Aktifkan standar kedisiplinan skill sebelum merespons tugas yang kompleks.
- **`antigravity-guide` / `agy-customizations`**: Pastikan konvensi toolchain dan plugin selaras.

## 2. Fase 1: Ideation & Copywriting
- **`brainstorming`**: Diskusikan kebutuhan, batasan, alternatif solusi, dan trade-off teknis sebelum implementasi.
- **`copywriting` & `humanizer`**: Pastikan teks UI, label, pesan error, dan copy bebas dari tone generik AI dan sesuai standar editorial aplikasi.
- **`generative_ui`**: Manfaatkan widget atau prototipe interaktif untuk menyepakati komponen visual kompleks.

## 3. Fase 2: UI/UX, Design System & Motion/Video Standards
- **`awesome-design-md`**: Rujuk katalog 84 spesifikasi `DESIGN.md` standar industri (Linear, Stripe, Vercel, Claude, Apple, dll.) saat menyusun atau memperbarui `DESIGN.md` dan token sistem desain proyek.
- **`ui-ux-pro-max` & `logo-design`**: Gunakan palet warna terstandar, tipografi modular, pedoman UX, serta perancangan identitas/logo SVG.
- **`frontend-design` & `web-design-guidelines`**: Pastikan tata letak responsif, hierarki visual bersih, dan lolos standar WCAG accessibility.
- **`design-taste-frontend` (`taste-skill`)**: Terapkan standar art direction anti-slop (satu section per layar, margin kiri-kanan seimbang, foto/UI asli, dan validasi browser `consistency.mjs` / `gate.mjs`).
- **`hallmark`**: Gunakan katalog 50 tema (`theme.mjs`) untuk halaman baru atau `/hallmark redesign <path>`, serta jalankan `sloplint.mjs` (`--render`, `--before`, `--kept`) untuk mencegah regresi elemen dan *AI-slop*.
- **`impeccable`**: Jalankan audit `impeccable detect` untuk mencegah *UI slop* (side-tabs palsu, clashing borders, font size liar di luar `DESIGN.md`).
- **`hyperframes` Suite (`hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`, `style-sampling`, `reverse-any-video`, `figma`, `slideshow`, `remotion-to-hyperframes`)**: Gunakan saat membuat video promosi/demo deterministik berbasis HTML/CSS ke MP4, deck presentasi interaktif (`hyperframes present`), atau animasi motion dari Figma/Remotion.

## 4. Fase 3: Strategy & Planning
- **`ponytail`**: Terapkan filter YAGNI — ambil solusi paling ringkas yang menuntaskan masalah secara kokoh tanpa over-engineering.
- **`writing-plans`**: Susun rencana implementasi terstruktur langkah demi langkah dengan checklist verifikasi.
- **`using-git-worktrees`**: Gunakan isolasi cabang git/worktree untuk pengerjaan fitur besar agar branch utama tetap aman.

## 5. Fase 4: Execution & TDD
- **`test-driven-development` (TDD)**: Tulis automated test (Red), implementasikan kode (Green), lalu rapikan (Refactor).
- **`executing-plans`**: Jalankan rencana aksi secara sistematis.
- **`subagent-driven-development` & `dispatching-parallel-agents`**: Pecah tugas independen ke subagent terpisah jika ada 2+ modul tanpa dependensi silang.
- **`caveman`**: Gunakan mode ringkas berdensitas tinggi saat kecepatan eksekusi teknis diprioritaskan.

## 6. Fase 5: Debugging (Jika Ada Masalah)
- **`systematic-debugging`**: Gunakan investigasi berbasis bukti (reproduksi minimalis -> hipotesis -> uji akar masalah).
- **`diagnosing-superpowers`**: Jalankan evaluasi jika ada subagent atau proses otomasi yang macet / looping.

## 7. Fase 6: Verification & Completion
- **`verification-before-completion`**: Bukti sebelum klaim — wajib jalankan test, linter, audit UI (`impeccable detect`, `consistency.mjs`, `sloplint.mjs`, atau `npx hyperframes check --json` untuk proyek video), dan `npm run build` dengan hasil exit code 0 sebelum menyatakan selesai.
- **`browser-use` Suite (`browser-use`, `qa`, `remote-browser`, `cloud`, `open-source`, `x402`)**: Gunakan saat membutuhkan verifikasi browser nyata via CDP/Cloud, QA testing end-to-end dengan skor `1–5` dan bukti error console/network (`qa`), kontrol browser terisolasi (`remote-browser`), atau integrasi SDK/Cloud (`open-source`, `cloud`, `x402`).
- **`requesting-code-review` & `receiving-code-review`**: Tinjau hasil kerja terhadap kriteria penerimaan secara objektif dan teliti.
- **`finishing-a-development-branch`**: Lakukan merge bersih dan hapus worktree sementara.
- **`graphify update .`**: Selalu perbarui knowledge graph AST setelah memodifikasi file kode agar graphify tetap akurat.

