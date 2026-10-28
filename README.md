# 🌟 Maulana Developer Portfolio (Astro + TypeScript Edition)

Portofolio interaktif web berbasis narasi komik / manga yang dibangun dengan arsitektur modern kelas dunia menggunakan **Astro 5** dan **TypeScript**.

---

## 🚀 Keunggulan Arsitektur Astro + TypeScript

- **HTML Statis + JS Minimal**: Halaman dirender penuh saat build; browser hanya menerima satu bundle JS kecil (**±21 kB**, gzip ±8 kB) untuk interaktivitas (modal, command palette, upload foto).
- **Type-Safe Data Layer**: Seluruh data proyek, konfigurasi profil, dan atribut divalidasi ketat menggunakan interface TypeScript (`src/data/projects.ts`).
- **Komponen Modular**: Setiap seksi dipecah menjadi berkas `.astro` yang bersih dan mudah dirawat.
- **Tema Otomatis**: Tiga palet warna berganti tiap 8,5 detik dan tersimpan di `localStorage`; klik badge palet di header untuk ganti manual.

---

## 📁 Struktur Folder Proyek

```text
WEB-PORTO/
├── astro.config.mjs            # Konfigurasi Astro (site & output statis)
├── tsconfig.json               # Konfigurasi TypeScript
├── package.json                # Dependensi Astro & script perintah
├── DESIGN.md                   # Dokumentasi design system & token warna
│
├── public/                     # Aset publik statis (disalin apa adanya ke dist/)
│   ├── foto-profil.jpg         # Opsional — letakkan foto asli Anda di sini
│   └── projects/               # Screenshot asli untuk miniatur proyek
│       ├── IVSS.png
│       └── gedung.png
│
└── src/
    ├── layouts/
    │   └── Layout.astro        # Head, fonts, background, toast, & entry runtime
    ├── components/             # Komponen antarmuka (.astro)
    │   ├── BackgroundElements.astro # 12 ikon vektor ambient (digerakkan JS)
    │   ├── TopNote.astro       # Ticker telemetry bar di bagian atas
    │   ├── Header.astro        # Bilah navigasi sticky & indikator palet otomatis
    │   ├── Hero.astro          # Comic hero panel & avatar photo frame
    │   ├── ComicStrip.astro    # 3-Panel comic narrative strip
    │   ├── Projects.astro      # Seksi showcase proyek utama
    │   ├── ProjectCard.astro   # Kartu proyek + miniatur UI asli tiap aplikasi
    │   ├── TechTag.astro       # Tag teknologi: ikon logo (sprite) + label
    │   ├── TechIconSprite.astro# Sprite SVG semua logo teknologi (dirender sekali)
    │   ├── Process.astro       # Training arc: 3 tahap berurutan + panah alur
    │   ├── About.astro         # Seksi bio & toolkit keahlian teknis
    │   ├── Contact.astro       # Kotak kontak & tombol kolaborasi
    │   ├── Footer.astro        # Footer hak cipta & pemicu Command Palette
    │   ├── Modal.astro         # Dialog pop-up detail studi kasus proyek
    │   └── CommandPalette.astro# Dialog pencarian keyboard (Ctrl + K)
    ├── data/
    │   ├── projects.ts         # Sumber tunggal: proyek, proses, skill, & kontak
    │   ├── tech-icons.ts       # Path SVG logo teknologi (build-time saja)
    │   └── tech-icon-ids.ts    # Peta label teknologi → id ikon (dipakai klien)
    ├── scripts/
    │   ├── portfolio.ts        # Orkestrator: modal, palet, Ctrl+K, upload foto
    │   ├── wanderer.ts         # Fisika ikon background (requestAnimationFrame)
    │   ├── manga-fx.ts         # Popup SFX onomatope pada kartu, panel, & CTA
    │   └── motion.ts           # Helper prefers-reduced-motion untuk runtime
    ├── styles/                 # Modular CSS
    │   ├── variables.css       # Token warna & Araki Tri-Palette
    │   ├── base.css            # Reset, layout shell, tipografi
    │   ├── components.css      # Seluruh gaya komponen UI & responsive
    │   └── style.css           # Entry point stylesheet
    └── pages/
        └── index.astro         # Halaman utama aplikasi
```

> Catatan: seluruh lapisan interaksi (`palette`, modal, command palette, SFX, ikon melayang) diinisialisasi dari satu entry point di `Layout.astro` → `src/scripts/portfolio.ts`. Saat `prefers-reduced-motion` aktif, efek gerak (siklus palet otomatis, SFX, ikon melayang) dimatikan; modal dan command palette tetap berfungsi.

---

## ⚡ Perintah Menjalankan Proyek

Buka terminal di folder `C:\laragon\www\WEB-PORTO` dan jalankan:

### 1. Mode Development (Live Reload)
```bash
npm run dev
```
Buka browser ke alamat: **`http://localhost:4321`**  
Setiap perubahan kode akan langsung terbarui di browser secara instan (*Hot Module Replacement*).

### 2. Build untuk Produksi
```bash
npm run build
```
Hasil kompilasi siap publikasi akan tersimpan di dalam folder `dist/`.

### 3. Pratinjau Hasil Build
```bash
npm run preview
```

---

## 📌 Studi Kasus Proyek Unggulan

Portofolio ini mengintegrasikan 4 proyek rekayasa nyata:

1. [**BAWANGHUB**](https://github.com/Maulanahb/BawangHub) — *Cloud Supply Chain Ecosystem (Google Cloud Run, Docker, GCP)*
2. [**LAPANGKU**](https://github.com/Maulanahb/Lapangku) — *Sports Facility Booking & FinTech (Flutter, Riverpod, Firebase, Midtrans)*
3. [**PBL-IVSS**](https://github.com/RyuuShiro30/PBL-IVSS) — *Multi-Role Research Laboratory Portal (PHP, PostgreSQL, JS, RBAC)*
4. [**CUCI.IN**](https://github.com/Maulanahb/CUCI.IN) — *Laundry Operations & POS Management (Laravel, PostgreSQL, Alpine.js, Thermal ESC/POS)*

---

## 🛠️ Cara Kustomisasi Data & Foto

1. **Mengubah Data & Kontak**:
   Buka file [**`src/data/projects.ts`**](file:///c:/laragon/www/WEB-PORTO/src/data/projects.ts). Di satu berkas ini tersimpan `SITE_CONFIG` (nama, email, GitHub, LinkedIn), `PROJECTS`, `PROCESS_STEPS`, `SKILL_GROUPS`, dan `CERTIFICATIONS`. Anda dapat memperbarui kontak, mengubah narasi studi kasus, atau menambah proyek baru — TypeScript akan memeriksa kelengkapan tipe datanya.

   > `CERTIFICATIONS` masih berisi dua entri contoh (`name: "Nama Sertifikat Dicoding"`) sebagai penanda. Ganti dengan data asli: `name`, `issuer`, `year`, dan `credentialUrl`. Bila `credentialUrl` dikosongkan, tautan **VERIFY** otomatis tidak dirender — tidak ada tautan mati. Menambah entri keempat tidak perlu mengubah CSS; strip-nya tetap satu daftar.

   > `SITE_CONFIG.email` saat ini kosong. Selama masih kosong, tombol "Kirim email" hanya menampilkan notifikasi, bukan membuka klien email.
2. **Memasang Foto Profil**:
   Letakkan file foto Anda di `public/foto-profil.jpg`. Selama file tersebut belum ada, Hero menampilkan ilustrasi placeholder. Tombol "GANTI FOTO" hanya membuat pratinjau lokal di browser (tidak menyimpan file ke server), jadi jangan mengandalkannya untuk foto permanen.
3. **Menambah Gambar Miniatur Proyek**:
   Simpan screenshot ke `public/projects/`, lalu rujuk dengan path absolut, misalnya `/projects/IVSS.png`.
4. **Mengubah Palet Warna**:
   Token warna ada di `src/styles/variables.css` (blok `:root` dan `body[data-palette="..."]`). Palet aktif disimpan di `localStorage` dengan kunci `porto_palette`.
5. **Menambah Teknologi Baru**:
   Tambahkan labelnya ke `stack` di `src/data/projects.ts`, lalu daftarkan di `TECH_ICON_BY_LABEL` (`src/data/tech-icon-ids.ts`) dengan id ikon yang sesuai. Path SVG-nya ditaruh di `TECH_ICONS` (`src/data/tech-icons.ts`). Tanpa pemetaan, tag tetap tampil sebagai teks biasa — tidak ada ikon yang salah tampil.

---

## 🌐 Deploy Online (Gratis & 1-Klik)

Proyek ini siap di-deploy secara otomatis ke:
- **Vercel**: Cukup import repositori GitHub Anda dan pilih framework preset *Astro*.
- **Cloudflare Pages** atau **GitHub Pages**.
"# MyPortofolio" 
