# Dynamic Island Hover-Expand Navbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengubah perilaku Dynamic Island sticky navbar saat di-scroll ke bawah agar tersembunyi rapi di belakang logo `MAULANA.DEV` (pill compact), dan mekar (expand) menampilkan menu navigasi lengkap saat cursor diarahkan (hover/focus), serta menghapus dekorasi garis speedlines dan debounce berlebih.

**Architecture:**
- State 1 (Top/Unscrolled): Navbar penuh transparan-blur standar di atas hero, logo di kiri, menu di kanan.
- State 2 (Scrolled/Default): Saat scroll melewati 80px, navbar bertransformasi menjadi Floating Dynamic Island mini berukuran compact (`max-width: 215px`) hanya menampilkan logo `[A] MAULANA.DEV` + spark aksen, berpusat di atas layar dengan border neo-brutalist dan bayangan hard shadow `4px 4px 0 var(--ink)`.
- State 3 (Scrolled + Hover/Focus): Ketika kursor diarahkan ke pill logo (`:hover` atau `:focus-within`), pill mekar secara elastis (`max-width: 780px`) dengan kurva animasi komik spring (`cubic-bezier(0.34, 1.56, 0.64, 1)`), memunculkan menu link navigasi dengan transisi slide & opacity.
- Cleanup: Menghapus elemen `.island-speedlines` (garis sayap) baik dari HTML maupun CSS sesuai permintaan ("ga perlu debounce sampai garisnya").
- Konfirmasi Badge: Memastikan badge `D-IV SISTEM INFORMASI BISNIS · POLITEKNIK NEGERI MALANG` yang dilampirkan user tetap 100% bersih terhapus dari Hero.

**Tech Stack:** Astro, CSS3 Flexbox/Transitions (Neo-brutalist comic theme), Vanilla TypeScript (Scroll hysteresis with `requestAnimationFrame`).

---

## Global Constraints

- Comic Book / Neo-brutalist visual token: Border `2.5px solid var(--ink)`, hard shadow `4px 4px 0 var(--ink)`, spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Tidak ada speedlines ekstra di samping pill (`.island-speedlines` dihapus).
- Bebas dari debounce timer lag: Menggunakan native `requestAnimationFrame` dengan hysteresis scroll threshold (`> 80px` activate, `< 50px` deactivate).
- Aksesibilitas keyboard terjaga via `:focus-within` sehingga pengguna tab navigation tetap bisa membuka menu saat tab masuk ke logo/link.

---

## Review Focus

1. **Transisi Mekar & Menguncup Mulus:** Pastikan tidak ada layout shift atau teks menu terpotong patah saat hover masuk dan keluar.
2. **Hit-box Hover Stabil:** Pill memiliki padding yang nyaman sehingga pergerakan kursor mouse di atas menu tidak memicu hover flicker (bouncing in/out).
3. **Respon Mobile/Touch:** Pada layar kecil (di bawah 768px), sentuhan/tap pada pill mengaktifkan menu tanpa mengandalkan hover mouse.
4. **Scroll Spy Active Indicator:** Menu link yang aktif sesuai section tetap memiliki badge highlight warna kuning (`var(--bright)`) saat mekar.
5. **Zero Redundant Lines:** Menghilangkan seluruh sisa class `.island-speedlines` dan style yang tidak terpakai.

---

## Task Decomposition

### Task 1: Bersihkan Markup Header dari Garis Speedlines
**Files:**
- Modify: `src/components/Header.astro`

- [ ] Hapus container `.island-speedlines left` dan `.island-speedlines right` dari `src/components/Header.astro`.
- [ ] Pastikan struktur markup `header-inner` hanya memuat: `.island-halftone`, `.brand`, `.nav`, dan `.header-actions` (mobile toggle).
- [ ] Berikan data attribute atau kelas bantuan aksesibilitas `data-scrolled-nav` jika diperlukan.

### Task 2: Implementasi Dynamic Island Mini-Pill & Hover-Expand di CSS
**Files:**
- Modify: `src/styles/components.css`

- [ ] Hapus rule CSS `.island-speedlines`, `.speedline`, dan keyframes `@keyframes mangaSpeedlinesBurst`.
- [ ] Modifikasi `.site-header.is-scrolled`:
  - `position: fixed; top: 0; left: 0; right: 0; z-index: 500; pointer-events: none;`
  - Pusatkan pill secara horizontal: `display: flex; justify-content: center; padding-top: 14px;`
- [ ] Modifikasi `.site-header.is-scrolled .header-inner`:
  - Default (scrolled): Ukuran compact `width: max-content; max-width: 220px; padding: 6px 14px; cursor: pointer; pointer-events: auto;`
  - Transisi elastis komik: `transition: max-width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, transform 0.2s ease, padding 0.3s ease;`
- [ ] Sembunyikan `.nav` saat default scrolled:
  - `.site-header.is-scrolled .nav { max-width: 0; opacity: 0; pointer-events: none; overflow: hidden; transform: translateX(12px) scale(0.92); transition: max-width 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.22s ease, transform 0.3s ease, margin 0.3s ease; margin: 0; white-space: nowrap; }`
- [ ] Tampilkan `.nav` saat kursor di-hover atau di-fokus:
  - `.site-header.is-scrolled .header-inner:hover, .site-header.is-scrolled .header-inner:focus-within, .site-header.is-scrolled .header-inner.is-expanded`:
    - `max-width: 780px; padding: 6px 18px; box-shadow: 5px 5px 0 var(--ink); transform: translateY(-2px);`
  - `.site-header.is-scrolled .header-inner:hover .nav, .site-header.is-scrolled .header-inner:focus-within .nav, .site-header.is-scrolled .header-inner.is-expanded .nav`:
    - `max-width: 580px; opacity: 1; pointer-events: auto; transform: translateX(0) scale(1); margin-left: 12px; gap: 5px;`
- [ ] Atur tampilan mobile (`@media (max-width: 768px)`):
  - Saat scrolled di mobile, pill tetap compact di tengah, dan jika di-tap akan toggle class `.is-expanded`.

### Task 3: Optimasi Scroll Logic di TypeScript
**Files:**
- Modify: `src/scripts/portfolio.ts`

- [ ] Pastikan tidak ada debounce berlebihan (menggunakan `requestAnimationFrame` murni).
- [ ] Tambahkan listener klik/tap pada mobile untuk toggle class `.is-expanded` pada `.header-inner` ketika dalam mode `.is-scrolled`.
- [ ] Auto-close expanded state saat link navigasi di-klik atau saat pengguna mengklik di luar header.

### Task 4: Verifikasi & Test Build
**Files:**
- Run: `npx tsc --noEmit`
- Run: `npx astro build`

- [ ] Jalankan TypeScript check: pastikan 0 error.
- [ ] Jalankan Astro build: pastikan 100% build sukses tanpa peringatan PostCSS/Vite.
- [ ] Verifikasi bahwa teks badge `D-IV SISTEM INFORMASI BISNIS · POLITEKNIK NEGERI MALANG` tetap terhapus secara total dari file hasil build `dist/index.html`.

