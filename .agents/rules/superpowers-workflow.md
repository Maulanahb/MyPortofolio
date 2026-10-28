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

## 3. Fase 2: UI/UX & Design Standards
- **`ui-ux-pro-max`**: Gunakan palet warna terstandar, tipografi modular, dan pedoman UX.
- **`frontend-design` & `web-design-guidelines`**: Pastikan tata letak responsif, hierarki visual bersih, dan lolos standar WCAG accessibility.
- **`impeccable`**: Jalankan audit `impeccable detect` untuk mencegah *UI slop* (side-tabs palsu, clashing borders, font size liar di luar `DESIGN.md`).

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
- **`verification-before-completion`**: Bukti sebelum klaim — wajib jalankan test, linter, dan `npm run build` dan pastikan hasil exit code 0 sebelum menyatakan selesai.
- **`requesting-code-review` & `receiving-code-review`**: Tinjau hasil kerja terhadap kriteria penerimaan secara objektif dan teliti.
- **`finishing-a-development-branch`**: Lakukan merge bersih dan hapus worktree sementara.
- **`graphify update .`**: Selalu perbarui knowledge graph AST setelah memodifikasi file kode agar graphify tetap akurat.

