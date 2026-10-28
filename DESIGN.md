---
name: Maulana — Developer Portfolio
description: High-energy Manga/Comic editorial storytelling developer portfolio with Araki Tri-Palette theme shifting and interactive photo panel.
colors:
  # Ink & Paper Foundations
  ink: "#16151c"
  paper-base: "#f3f0e8"
  paper-surface: "#fffdf7"
  paper-card: "#ffffff"
  muted-ink: "#5f5b62"
  border-line: "#16151c"

  # Palette A: Morioh Pop (Part 4 / Default)
  morioh-paper: "#f3f0e8"
  morioh-surface: "#fffdf7"
  morioh-accent: "#c6b5f7"
  morioh-accent-strong: "#6a37bd"
  morioh-bright: "#f3dc55"
  morioh-pop: "#ef7aa8"

  # Palette B: Golden Wind (Part 5)
  golden-paper: "#f7eddb"
  golden-surface: "#fff9eb"
  golden-accent: "#f7ad84"
  golden-accent-strong: "#a82f35"
  golden-bright: "#edc44b"
  golden-pop: "#e78b65"

  # Palette C: Stone Ocean (Part 6)
  ocean-paper: "#e9f3f2"
  ocean-surface: "#fafffe"
  ocean-accent: "#9bcfdd"
  ocean-accent-strong: "#245e8b"
  ocean-bright: "#b3e8ad"
  ocean-pop: "#b5a2e9"

  # Project Art Themes
  agri-theme: "#d8e7bc"
  sport-theme: "#efc6d6"
  pos-theme: "#c5d8e9"
  lab-theme: "#d7d1f5"
typography:
  display:
    fontFamily: "Anton, Impact, 'Arial Narrow', sans-serif"
    fontWeight: 400
    letterSpacing: "0.015em"
    textTransform: "uppercase"
  body:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "15px"
    lineHeight: 1.55
  mono:
    fontFamily: "'IBM Plex Mono', Consolas, monospace"
    fontSize: "10px - 12px"
    fontWeight: 700
---

# Design System: Maulana Developer Portfolio

<!-- impeccable:design-system -->

## 1. 📖 Konsep & Filosofi Desain

Portofolio ini mengusung pendekatan naratif komik/manga yang berani, berkarakter, dan interaktif:

- **Garis & Bayangan:** Garis *ink* tegas (`2px`, `3px`, dan `4px solid #16151c`) dengan bayangan kaku (*hard offset drop shadow*) `4px 4px 0`, `7px 7px 0`, hingga `10px 10px 0`.
- **Dinamika Tata Letak:** Sudut miring rotasi yang dinamis (`-2deg`, `3deg`, `-4deg`, `9deg`).
- **Efek Komik:** Latar belakang pola titik-titik (*halftone dots pattern*) dan efek garis aksi komik (*speedlines*).
- **Tipografi Editorial:** Judul bergaya display raksasa menggunakan font *Anton*, dipadukan dengan *DM Sans* untuk kenyamanan membaca konten, dan partikel SFX katakana (`ゴゴゴ`, `ドン!!`).
- **Fitur Unggulan:** **Comic Photo Panel** dengan preview upload foto profil interaktif secara lokal.

---

## 2. 🎨 Tri-Palette Architecture (Theme Shifter)

Tema berganti otomatis setiap **8,5 detik** (`src/scripts/portfolio.ts` → `startAutoPaletteCycle`), dapat diganti manual lewat badge palet di header, dan tersimpan di `localStorage` (`porto_palette`). Transisi warna memakai CSS `@property` sehingga perubahan token berjalan halus tanpa flash.

| Token | Morioh Pop (Default) | Golden Wind (Part 5) | Stone Ocean (Part 6) | Peran |
| :--- | :--- | :--- | :--- | :--- |
| `--paper` | `#f3f0e8` (Krem) | `#f7eddb` (Parchment) | `#e9f3f2` (Mint Fog) | Background kanvas utama |
| `--paper-2` | `#fffdf7` (Warm White) | `#fff9eb` (Ivory) | `#fafffe` (Crisp Ice) | Background kartu & dialog |
| `--accent` | `#c6b5f7` (Lilac) | `#f7ad84` (Peach) | `#9bcfdd` (Sky Cerulean) | Latar panel foto & badge |
| `--accent-strong` | `#6a37bd` (Violet) | `#a82f35` (Crimson) | `#245e8b` (Deep Ocean) | Highlight nama & aksen teks |
| `--bright` | `#f3dc55` (Kuning Komik)| `#edc44b` (Gilded Sun) | `#b3e8ad` (Lime) | Tombol aksi & stiker CTA |
| `--pop` | `#ef7aa8` (Punch Pink) | `#e78b65` (Tangerine) | `#b5a2e9` (Electric Violet)| Partikel SFX & dot chapter |

---

## 3. 🔤 Tipografi

- **Display (Judul & Aksen Utama):** `Anton` — Tebal, kapital, berdampak tinggi.
- **Body (Teks & Paragraf):** `DM Sans` — Geometris, bersih, tingkat keterbacaan tinggi.
- **Code & Telemetry (Tag, Tanggal, Metrik):** `IBM Plex Mono` — Monospace developer dengan karakter teknis kuat.

---

## 4. 🧩 Struktur Modul CSS

Stylesheet berada di **`src/styles/`** dan diimpor berurutan lewat `src/styles/style.css`:

- **`variables.css`**: Deklarasi `@property` untuk animasi token, variabel `:root`, dan tiga palet tema (`body[data-palette="morioh|golden|ocean"]`).
- **`base.css`**: Reset, latar halftone, kontainer `.shell`, kelas tipografi (`.display`, `.mono`), state `:focus-visible`, dan aturan `prefers-reduced-motion`.
- **`components.css`**: Seluruh komponen UI — ticker, header & navigasi, tombol, panel komik Hero, photo panel, comic strip, project card beserta miniatur UI aplikasi, Process, About, Contact, dialog, command palette, toast, SFX manga, serta seluruh media query responsif.
- **`style.css`**: Titik masuk (*entry point*) yang mengimpor ketiga modul di atas.

Catatan **Training Arc (Chapter 02)**: setiap tahap dibungkus `.step-wrap` supaya panah alur `.step-arrow` bisa diletakkan di celah antar kartu — di luar `.step` yang memakai `overflow: hidden`. Kartu memakai flex column dengan `.step-output` ber-`margin-top: auto`, jadi baris hasil selalu menempel di dasar sementara label `CH. 0N` dan lipatan halaman tetap di pojok kiri/kanan bawah.

Catatan **Sertifikasi**: data `CERTIFICATIONS` dirender sebagai strip di dalam About (`.cert-block`), bukan section tersendiri, karena jumlahnya sedikit. Bila `credentialUrl` kosong, tautan VERIFY tidak dirender.

Catatan **`.section.shell`**: beberapa section memakai kedua class itu. Karena spesifisitasnya sama, `padding: 73px 0` pada `.section` menimpa padding horizontal `.shell` dan membuat konten menempel ke tepi layar. Aturan `.section.shell` (beserta variannya di media query 860 px dan 580 px) mengembalikan padding tersebut.

---

## 5. 🎞️ Lapisan Interaksi & Motion

Seluruh interaksi klien diinisialisasi dari satu entry point di `src/layouts/Layout.astro`:

| Modul | Tanggung jawab |
| :--- | :--- |
| `src/scripts/portfolio.ts` | Orkestrator utama: siklus palet, modal studi kasus, command palette (Ctrl/Cmd + K), focus trap, menu mobile, upload pratinjau foto, tombol kontak, tahun footer. |
| `src/scripts/wanderer.ts` | Menggerakkan 12 ikon `BackgroundElements.astro` dengan fisika inersia + pantulan viewport memakai `requestAnimationFrame` dan `translate3d`. |
| `src/scripts/manga-fx.ts` | Memunculkan popup SFX onomatope (`ゴゴゴ`, `ドン!!`, `DUARR!!`) saat pointer **masuk** ke kartu proyek, panel foto, strip komik, kartu About, atau tombol CTA utama. Pergerakan di dalam elemen yang sama diabaikan dan jarak antar popup minimal 180 ms, jadi responsif tanpa spam. |

Ikon teknologi pada tag (`.tag-row` di kartu dan `.dialog-stack` di modal) berasal dari satu sprite SVG `TechIconSprite.astro` yang dirender sekali di `Layout.astro`. Path logo disimpan build-time di `src/data/tech-icons.ts` (Simple Icons, CC0, plus ikon garis generik untuk entri tanpa logo resmi), sedangkan klien hanya menerima peta kecil `src/data/tech-icon-ids.ts`. Ikon dirender lewat `<use href="#tech-*">` sehingga nol request jaringan dan bundle JS tidak ikut membengkak. Warna default mengikuti tinta (`currentColor`); warna brand hanya muncul saat tag di-hover lewat `--tech-hover` per `data-icon`.

Aturan motion:
- Preferensi `prefers-reduced-motion: reduce` dinilai lewat helper `src/scripts/motion.ts` dan mematikan **siklus palet otomatis, popup SFX, serta kanvas ikon melayang**. Palet manual (klik badge), modal, dan Command Palette tetap berfungsi karena dipicu pengguna.
- Saat reduced-motion aktif, `.bg-floating-canvas` disembunyikan lewat CSS — posisi ikon hanya dihitung JS, sehingga tanpa guard mereka akan menumpuk di pojok kiri atas.
- `scrollIntoView` memakai `auto` (bukan `smooth`) saat reduced-motion, dan transisi CSS dimatikan global di `base.css`.
- Efek visual bersifat dekoratif: tidak ada elemen motion yang menangkap klik (`pointer-events: none`) atau menggeser layout.
