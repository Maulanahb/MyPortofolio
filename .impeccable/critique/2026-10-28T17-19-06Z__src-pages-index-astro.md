---
target: src/pages/index.astro
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\laragon\\www\\WEB-PORTO\\src\\pages\\index.astro"
target_fingerprint: "sha256:266037d6770c7703726cbc1c2298fc83b815738562c449d8c941410cd6c16c21"
target_path: "C:\\laragon\\www\\WEB-PORTO\\src\\pages\\index.astro"
timestamp: 2026-10-28T17-19-06Z
slug: src-pages-index-astro
---
Method: dual-agent (A: 9c3cad96-cb30-4360-a47a-2fdc35703e98 · B: ab98faae-d22d-41da-b3d5-7ac83dd080df)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Palet tema berganti otomatis setiap 8.5 detik tanpa indikator durasi/kemajuan; navigasi belum memiliki scrollspy aktif. |
| 2 | Match System / Real World | 3 | Metafora manga/komik panel, speedlines, dan SFX onomatopoeia sangat konsisten dan terbaca jelas. |
| 3 | User Control and Freedom | 1 | Perputaran palet otomatis tidak memiliki tombol Pause/Stop; popup SFX hover terpicu terus-menerus tanpa toggle audio/visual. |
| 4 | Consistency and Standards | 2 | Ekor speech bubble bersudut tajam 90° menabrak bubble squircle organik; tombol GANTI FOTO menumpuk langsung di atas frame foto. |
| 5 | Error Prevention | 3 | Modal detail proyek dan command palette memiliki focus trapping dan backdrop click dismiss yang aman. |
| 6 | Recognition Rather Than Recall | 3 | Miniatur antarmuka aplikasi live pada tiap card memberikan konteks visual instan sebelum membuka modal. |
| 7 | Flexibility and Efficiency | n/a | Portfolio & Experience surface (mode-applicability rule diterapkan). |
| 8 | Aesthetic and Minimalist Design | 2 | Kicker stacking 4 lapis di Hero; 12 elemen vektor background berkeliaran tanpa henti; popup SFX manga spam di setiap hover. |
| 9 | Error Recovery | 3 | Dismiss modal via tombol Escape dan klik luar berjalan mulus; tautan proyek eksternal valid. |
| 10 | Help and Documentation | n/a | Portfolio & Experience surface (mode-applicability rule diterapkan). |
| **Total** | | **22/32** | **Acceptable (68.8%)** |

---

#### Design Specificity Verdict

**LLM Assessment**:
Fondasi portofolio ini memiliki karakter yang sangat orisinal dan jauh dari kesan template AI generik. Maulana memiliki bukti kerja (*proof-of-work*) teknis yang nyata: 4 studi kasus arsitektur (*BawangHub*, *Lapangku*, *PBL-IVSS*, *CUCI.IN*) yang dilengkapi miniatur UI hand-coded dengan CSS murni yang merefleksikan antarmuka aslinya. Token desain CSS neobrutalisme manga (*Morioh Pop / JoJo editorial*) terintegrasi rapi ke seluruh komponen.

Namun, lapisan interaksinya tercemar oleh **"AI maximalist slop"** (gimmick visual berlebihan yang menurunkan kegunaan):
1. **Sensory Noise & Spam Interaksi**: 12 ikon SVG melayang bebas tanpa henti di seluruh layar (wanderer.ts) dan efek popup onomatopoeia manga (manga-fx.ts) yang meledak di hampir setiap elemen interaktif dengan cooldown agresif 110ms.
2. **Perpindahan Tema Involunter**: Warna berganti otomatis setiap 8.5 detik tanpa kendali jeda (*pause*) dari pengguna, mengacaukan kontras saat pengguna sedang membaca teks panjang.
3. **Kicker Stacking**: 4 lapis label meta ditumpuk berturut-turut sebelum pembaca sampai ke headline utama <h1>.

**Deterministic Scan (Assessment B)**:
- Total temuan detector: **298 temuan** (293 advisory token warna/ukuran font di luar DESIGN.md standar, 5 warning slop).
- **False Positive vs True Slop**:
  - Deteksi side-tab pada .intro-bubble:after adalah false positive untuk konstruksi ekor balon kata CSS border. Namun, secara estetika pertemuan ekor tajam dengan balon squircle ber-radius asimetris memang menghasilkan sambungan sambung yang janggal (*visual seam clash*).
  - Garis aksen bawah .step:after dan penumpukan kicker di Hero serta Section Heads terkonfirmasi sebagai true slop.

**Visual Overlays**:
- Dev server lokal aktif di http://localhost:4321. Inspeksi DOM memverifikasi rendering container #manga-fx-container, 12 node #bg-wanderers, dan panel preview modal.

---

#### Overall Impression
Portofolio Maulana memiliki pondasi konten teknis dan identitas visual neobrutalisme manga yang sangat kuat dan unik. Namun, pengalaman membaca saat ini terasa seperti *"berjalan di dalam arena dingdong"* karena terlalu banyak elemen gerak otonom dan efek hover yang berebut perhatian. Membersihkan gimmick slop akan langsung mengubah website ini dari sekadar mainan visual menjadi portofolio engineer kelas atas yang sangat berwibawa.

---

#### What's Working
1. **Miniatur Antarmuka Hand-Coded**: Panel preview untuk BawangHub, Lapangku, PBL-IVSS, dan CUCI.IN bukan gambar tangkapan layar buram, melainkan miniatur UI HTML/CSS hidup yang membuktikan kemampuan frontend autentik.
2. **Sistem Token Neobrutalisme yang Solid**: Palet warna (Morioh, Golden Wind, Stone Ocean), variabel CSS @property, font stack (Anton, DM Sans, IBM Plex Mono), dan halftone grid konsisten di seluruh viewport.
3. **Aksesibilitas & Keyboard Navigation**: Dialog modal proyek dan command palette sudah mengimplementasikan focus trapping, dukungan tombol Escape, serta query @media (prefers-reduced-motion: reduce).

---

#### Priority Issues

##### [P1] Kicker Stacking di Hero dan Section Headings
- **What**: Penumpukan 4 layer meta-label sebelum judul utama di Hero (NEW SERIES, P.001 THE ORIGIN, THE DEVELOPER HAS ENTERED THE STORY, HEY! Kenalan dulu), serta label chapter dobel di Section 01 dan 02.
- **Why it matters**: Menghambat pembaca mengenali siapa pemilik portofolio dan apa spesialisasi utamanya dalam 3 detik pertama (F-pattern scanning terganggu).
- **Fix**: Konsolidasi menjadi satu kicker editorial yang tajam dan satu speech bubble pengantar yang menyatu langsung dengan nama.
- **Suggested command**: /impeccable typeset atau /impeccable clarify

##### [P1] Sensory Noise & Spam Efek Hover (Wanderer & Manga SFX)
- **What**: 12 ikon SVG background bergerak acak terus-menerus (wanderer.ts) melintasi area baca, ditambah popup tulisan Jepang/ledakan SFX di setiap hover tombol, badge, dan link dengan interval 110ms (manga-fx.ts).
- **Why it matters**: Mengaburkan keterbacaan (*legibility*), membebani CPU dengan loop equestAnimationFrame konstan, dan menciptakan rasa murah/slop seperti widget internet tahun 2000-an.
- **Fix**: Matikan pergerakan dinamis 12 ikon wanderer (jadikan watermark statis di sudut luar container), batasi efek SFX manga hanya pada momen deliberate seperti tombol aksi utama Hero atau saat proyek dibuka.
- **Suggested command**: /impeccable quieter atau /impeccable distill

##### [P1] Rotasi Palet Tema Otomatis Tanpa Kontrol Pengguna
- **What**: Transisi warna tema berganti otomatis setiap 8.5 detik tanpa opsi jeda (*pause*) atau kunci warna pilihan pengguna.
- **Why it matters**: Pelanggaran langsung terhadap Heuristic 3 (User Control and Freedom). Memaksa mata pengguna beradaptasi ulang dengan kontras warna baru saat sedang membaca deskripsi proyek.
- **Fix**: Ubah badge palet di header menjadi tombol toggle interaktif yang memungkinkan pengunjung memilih palet favorit atau mengaktifkan/menonaktifkan mode auto-cycle.
- **Suggested command**: /impeccable harden atau /impeccable polish

##### [P2] Sambungan Ekor Speech Bubble & Tumpukan Tombol Upload Foto
- **What**: Balon kata .intro-bubble menggunakan squircle rounded organik, tetapi ekor segitiganya kaku dengan kemiringan yang tidak mengarah ke avatar. Tombol GANTI FOTO menumpuk langsung di atas batas frame avatar.
- **Why it matters**: Terlihat seperti komponen yang belum selesai di-*finishing* secara presisi; tombol upload mengaburkan visual avatar.
- **Fix**: Gunakan pseudo-element mask SVG atau clip-path terpadu untuk ekor balon, dan pindahkan kontrol foto profil ke bar alat yang tidak tumpang-tindih dengan artwork.
- **Suggested command**: /impeccable polish

##### [P2] Monotoni Grid Katalog Proyek (2x2 Box Homogen)
- **What**: Keempat proyek (baik aplikasi mobile Flutter seperti Lapangku maupun web Laravel seperti CUCI.IN) dipaksa masuk ke dalam kartu persegi panjang 2 kolom yang identik.
- **Why it matters**: Menghilangkan ritme editorial komik yang seharusnya dinamis dan gagal menonjolkan keunggulan format mobile vs web.
- **Fix**: Gunakan layout asimetris editorial: jadikan satu proyek unggulan (misal BawangHub) sebagai bentang lebar (*hero case study*), dan beri mockup frame ponsel vertikal untuk proyek Flutter (Lapangku).
- **Suggested command**: /impeccable layout

---

#### Persona Red Flags

**Alex (Tech Recruiter / Senior Lead - Impatient Power User)**:
- Terganggu oleh pergantian warna latar otomatis saat sedang membaca ringkasan arsitektur sistem.
- Terganggu oleh popup SFX manga yang terus bermunculan saat kursor bergerak cepat mencari tautan GitHub dan resume.
- *Red Flag*: Meninggalkan halaman dalam 15 detik pertama karena menduga portofolio ini adalah playground eksperimen daripada portofolio developer profesional.

**Jordan (Junior Dev / Student - Confused First-Timer)**:
- Bingung membedakan antara aksi navigasi utama dan teks dekorasi manga karena terlalu banyak kata dalam bahasa Jepang dan label bab (CHAPTER 00, P.001, VOL. 01).
- Mencoba mengklik badge status dan tulisan onomatopoeia yang dikira tombol karena memiliki gaya visual border tebal yang sama dengan tombol nyata.

**Sam (Accessibility-Dependent User - Keyboard / Screen Reader)**:
- Meskipun penanganan tombol Tab dan trapping modal sudah baik, perubahan warna otomatis 8.5 detik berpotensi menurunkan rasio kontras warna teks di beberapa palet bagi pengguna dengan penglihatan terbatas (*low vision*).
- Ikon melayang di latar belakang berpotensi menyebabkan mabuk gerak (*vestibular trigger*) jika pengguna belum mengaktifkan setting prefers-reduced-motion di OS mereka.

---

#### Minor Observations
1. Tulisan mikro pada beberapa preview badge (6px-7px) terlalu kecil untuk dibaca dengan nyaman tanpa zoom.
2. Tautan GitHub dan kontak di bagian bio hero belum menyertakan link eksternal langsung selain tombol scroll ke bawah.
3. Garis aksen bawah .step:after pada kartu proses terasa seperti sisa template umum (*card decoration cliché*) yang tidak mendukung tema strip komik.

---

#### Questions to Consider
1. *"Apakah tema manga ini ingin diposisikan sebagai aksen editorial yang cerdas dan dewasa, atau sebagai game interaktif yang berisik?"*
2. *"Jika seorang perekrut hanya memiliki waktu 30 detik, informasi apa yang paling mutlak ingin Anda perlihatkan pertama kali tanpa terhalang elemen dekoratif?"*
3. *"Bagaimana jika proyek mobile Flutter diberikan tampilan mockup smartphone sungguhan agar langsung kontras dengan proyek web full-stack?"*
