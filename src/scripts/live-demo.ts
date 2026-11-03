/**
 * ==========================================================================
 * LIVE DEMO & DYNAMIC RESPONSIVE SCALING UNTUK PRATINJAU APLIKASI (live-demo.ts)
 * Menjadikan miniatur UI 4 proyek tetap tampil utuh, proporsional, dan
 * interaktif secara dinamis di layar Desktop maupun Mobile (Kartu & Modal).
 * ==========================================================================
 */

interface LapangkuVenueItem {
  cat: string;
  type: string;
  venue: string;
  court: string;
  price: string;
  dist: string;
  rating: string;
  photo: string;
  time: string;
  code: string;
  pin: string;
}

const LAPANGKU_VENUES: Record<string, LapangkuVenueItem[]> = {
  Semua: [
    {
      cat: 'FUTSAL',
      type: 'INDOOR',
      venue: 'CHAMPIONS ARENA MALANG',
      court: 'Lapangan Futsal Vinyl A',
      price: 'Rp 120.000',
      dist: '1.2 km',
      rating: '4.9 (128)',
      photo: './projects/futsal.jpg',
      time: 'Rabu, 28 Okt 2026 • 19:00 - 20:00 WIB',
      code: 'LPK-20261028-009',
      pin: '4829'
    },
    {
      cat: 'MINI SOCCER',
      type: 'OUTDOOR',
      venue: 'STADION GAJAYANA',
      court: 'Mini Soccer Rumput Sintetis',
      price: 'Rp 350.000',
      dist: '2.4 km',
      rating: '4.8 (94)',
      photo: './projects/minisoccer.jpg',
      time: 'Kamis, 29 Okt 2026 • 20:00 - 21:00 WIB',
      code: 'LPK-20261029-014',
      pin: '7315'
    }
  ],
  Futsal: [
    {
      cat: 'FUTSAL',
      type: 'INDOOR',
      venue: 'CHAMPIONS ARENA MALANG',
      court: 'Lapangan Futsal Vinyl A',
      price: 'Rp 120.000',
      dist: '1.2 km',
      rating: '4.9 (128)',
      photo: './projects/futsal.jpg',
      time: 'Rabu, 28 Okt 2026 • 19:00 - 20:00 WIB',
      code: 'LPK-20261028-009',
      pin: '4829'
    },
    {
      cat: 'FUTSAL',
      type: 'INDOOR',
      venue: 'ZONA SM FUTSAL SOEHAT',
      court: 'Court Interlock FIFA B',
      price: 'Rp 110.000',
      dist: '1.8 km',
      rating: '4.8 (86)',
      photo: './projects/futsal.jpg',
      time: 'Jumat, 30 Okt 2026 • 18:00 - 19:00 WIB',
      code: 'LPK-20261030-021',
      pin: '5912'
    }
  ],
  'Mini Soccer': [
    {
      cat: 'MINI SOCCER',
      type: 'OUTDOOR',
      venue: 'STADION GAJAYANA',
      court: 'Mini Soccer Rumput Sintetis',
      price: 'Rp 350.000',
      dist: '2.4 km',
      rating: '4.8 (94)',
      photo: './projects/minisoccer.jpg',
      time: 'Kamis, 29 Okt 2026 • 20:00 - 21:00 WIB',
      code: 'LPK-20261029-014',
      pin: '7315'
    },
    {
      cat: 'MINI SOCCER',
      type: 'OUTDOOR',
      venue: 'UNGGUL SPORTS CENTER',
      court: 'Pitch Monofilament 7v7',
      price: 'Rp 380.000',
      dist: '3.6 km',
      rating: '4.9 (112)',
      photo: './projects/minisoccer.jpg',
      time: 'Sabtu, 31 Okt 2026 • 16:00 - 17:00 WIB',
      code: 'LPK-20261031-033',
      pin: '8402'
    }
  ],
  Badminton: [
    {
      cat: 'BADMINTON',
      type: 'INDOOR',
      venue: 'PLATINUM ARENA MALANG',
      court: 'Karpet BWF Pro Line 1',
      price: 'Rp 45.000',
      dist: '1.5 km',
      rating: '4.9 (142)',
      photo: './projects/futsal.jpg',
      time: 'Sabtu, 31 Okt 2026 • 19:00 - 21:00 WIB',
      code: 'LPK-20261031-045',
      pin: '3190'
    },
    {
      cat: 'BADMINTON',
      type: 'INDOOR',
      venue: 'CAHAYA BADMINTON HALL',
      court: 'Lapangan Parket Kayu B',
      price: 'Rp 50.000',
      dist: '2.1 km',
      rating: '4.7 (76)',
      photo: './projects/futsal.jpg',
      time: 'Minggu, 01 Nov 2026 • 09:00 - 11:00 WIB',
      code: 'LPK-20261101-004',
      pin: '6208'
    }
  ],
  Basket: [
    {
      cat: 'BASKET',
      type: 'INDOOR',
      venue: 'BIMASAKTI HOOPS ARENA',
      court: 'FIBA Hardwood Full Court',
      price: 'Rp 175.000',
      dist: '2.0 km',
      rating: '4.9 (68)',
      photo: './projects/minisoccer.jpg',
      time: 'Sabtu, 31 Okt 2026 • 18:00 - 20:00 WIB',
      code: 'LPK-20261031-052',
      pin: '9041'
    },
    {
      cat: 'BASKET',
      type: 'OUTDOOR',
      venue: 'ROOFTOP 3X3 COURT SOEHAT',
      court: 'Half Court Acrylic Pro',
      price: 'Rp 135.000',
      dist: '1.4 km',
      rating: '4.8 (53)',
      photo: './projects/minisoccer.jpg',
      time: 'Minggu, 01 Nov 2026 • 16:00 - 18:00 WIB',
      code: 'LPK-20261101-019',
      pin: '2754'
    }
  ]
};

const BAWANGHUB_SECTIONS: Record<string, {
  badge: string;
  titleHtml: string;
  desc: string;
}> = {
  Dashboard: {
    badge: 'Google Juara Vibe Coding',
    titleHtml: 'Halo, <strong>Petani Bawang!</strong>',
    desc: 'PWA asisten AI Gemini, prediksi harga & cuaca lokal.'
  },
  Tanya: {
    badge: '✦ GEMINI AI • SERVER-SECURED PROXY',
    titleHtml: 'Konsultasi Budidaya<br /><strong>Bersama Gemini AI.</strong>',
    desc: 'Tanyakan penanganan hama, pemupukan, atau anomali cuaca melalui backend Express (server.ts).'
  },
  Statistik: {
    badge: '✦ RECHARTS & REGRESI LINIER',
    titleHtml: 'Statistik &amp; Prediksi<br /><strong>Harga Komoditas.</strong>',
    desc: 'Visualisasi grafik tren harga bawang merah dilengkapi perhitungan simple linear regression.'
  },
  Buku: {
    badge: '✦ BUKU TANI & ARUS KAS',
    titleHtml: 'Catatan Operasional<br /><strong>&amp; Buku Kas Tani.</strong>',
    desc: 'Rekap pengeluaran benih, pupuk, dan hasil panen tersinkronisasi dengan Firestore caching.'
  },
  Forum: {
    badge: '✦ FORUM & KOMUNITAS PETANI',
    titleHtml: 'Diskusi Komunitas<br /><strong>Petani Bawang.</strong>',
    desc: 'Berbagi pengalaman budidaya, informasi harga pasar daerah, dan solusi lapangan antar petani.'
  },
  Galeri: {
    badge: '✦ GALERI & DOKUMENTASI LAHAN',
    titleHtml: 'Galeri Komoditas<br /><strong>&amp; Aktivitas Tani.</strong>',
    desc: 'Dokumentasi visual perkembangan tanaman bawang merah, panen raya, dan kegiatan komunitas.'
  }
};

const BAWANGHUB_WEATHER = [
  {
    loc: 'Nganjuk',
    temp: '29°C',
    stat: 'Cerah Berawan',
    tipHtml: '<span>Saran AI:</span> Optimal untuk pemupukan.'
  },
  {
    loc: 'Brebes',
    temp: '32°C',
    stat: 'Terik • Lembap 62%',
    tipHtml: '<span>Saran AI:</span> Siram sore hari, jaga kelembapan.'
  },
  {
    loc: 'Malang',
    temp: '24°C',
    stat: 'Berawan • Lembap 84%',
    tipHtml: '<span>Saran AI:</span> Waspadai jamur trotol daun.'
  }
];

const IVSS_MODULES: Record<string, {
  kicker: string;
  titleHtml: string;
  desc: string;
}> = {
  Tentang: {
    kicker: 'LABORATORIUM RISET • POLITEKNIK NEGERI MALANG',
    titleHtml: 'INTELLIGENT VISION AND<br /><span>SMART SYSTEM (IVSS)</span>',
    desc: 'Berfokus pada penelitian dan pengembangan di bidang Computer Vision serta Smart System untuk menciptakan solusi cerdas di era transformasi digital.'
  },
  Visi: {
    kicker: 'ROADMAP RISET • COMPUTER VISION & EDGE AI',
    titleHtml: 'VISI & MISI INOVASI<br /><span>SISTEM CERDAS TERAPAN</span>',
    desc: 'Menjadi pusat unggulan riset visi komputer, deep learning, dan otomasi IoT industri yang berdampak langsung bagi mitra akademik dan masyarakat.'
  },
  Profil: {
    kicker: 'TIM PENELITI • DOSEN & MAHASISWA RISET',
    titleHtml: 'KOLABORASI MULTIDISIPLIN<br /><span>AI & EMBEDDED SYSTEM</span>',
    desc: 'Mengintegrasikan keahlian pengolahan citra digital, arsitektur jaringan saraf tiruan, serta instrumentasi perangkat keras cerdas.'
  },
  Publikasi: {
    kicker: 'ARSIP ILMIAH • JURNAL & PROSIDING INTERNASIONAL',
    titleHtml: 'PUBLIKASI RISET &<br /><span>REKAM JEJAK INOVASI</span>',
    desc: 'Dokumentasi paper IEEE, dataset eksperimen deteksi objek real-time, serta prototipe smart surveillance terindeks.'
  }
};

const AIAAS_NLP_SAMPLES = [
  {
    raw: '"Beli kopi susu 25rb kemarin"',
    json: '{ "type": "EXPENSE", "amount": 25000, "category": "Makanan & Minuman", "date": "2026-10-30" }',
    consultant: 'Pengeluaran kopi susu Rp 25.000 tercatat di kategori Makanan & Minuman. Anggaran bulanan aman.'
  },
  {
    raw: '"Gajian masuk 5 juta hari ini"',
    json: '{ "type": "INCOME", "amount": 5000000, "category": "Pendapatan", "date": "2026-11-01" }',
    consultant: 'Pemasukan gaji Rp 5.000.000 berhasil dicatat! Saldo kas meningkat menjadi Rp 10.420.000.'
  },
  {
    raw: '"Bayar internet 350k tanggal 10"',
    json: '{ "type": "EXPENSE", "amount": 350000, "category": "Tagihan", "date": "2026-10-10" }',
    consultant: 'Tagihan bulanan internet Rp 350.000 telah dialokasikan sesuai batas Anggaran Bulanan.'
  }
];

const AIAAS_PERIODS: Record<string, { balance: string; income: string; expense: string }> = {
  Bulanan: {
    balance: 'Rp 5.420.000',
    income: '+Rp 8.500.000',
    expense: '-Rp 3.080.000'
  },
  Mingguan: {
    balance: 'Rp 1.640.000',
    income: '+Rp 2.250.000',
    expense: '-Rp 610.000'
  },
  Semua: {
    balance: 'Rp 18.950.000',
    income: '+Rp 29.400.000',
    expense: '-Rp 10.450.000'
  }
};

/**
 * Memperbarui informasi E-Ticket pada Phone 2 (Lapangku) secara real-time
 * saat pengguna memilih kategori atau mengetuk salah satu kartu lapangan di Phone 1.
 */
function updateLapangkuTicket(wrap: HTMLElement, item: LapangkuVenueItem): void {
  const ticketPhone = wrap.querySelector<HTMLElement>('.phone-screen-ticket');
  if (!ticketPhone) return;

  const matchVenue = ticketPhone.querySelector<HTMLElement>('.lk-match-venue');
  const matchCourt = ticketPhone.querySelector<HTMLElement>('.lk-match-court');
  const matchTime = ticketPhone.querySelector<HTMLElement>('.lk-match-time');
  const qrCode = ticketPhone.querySelector<HTMLElement>('.lk-qr-code');
  const footBold = ticketPhone.querySelectorAll<HTMLElement>('.lk-pass-foot b');
  const ticketPass = ticketPhone.querySelector<HTMLElement>('.lk-ticket-pass');

  if (matchVenue) matchVenue.textContent = item.venue;
  if (matchCourt) matchCourt.textContent = item.court;
  if (matchTime) matchTime.textContent = item.time;
  if (qrCode) qrCode.textContent = item.code;
  if (footBold[0]) footBold[0].textContent = item.price;
  if (footBold[1]) footBold[1].textContent = item.pin;

  if (ticketPass) {
    ticketPass.classList.remove('pulse-ticket');
    void ticketPass.offsetWidth;
    ticketPass.classList.add('pulse-ticket');
    window.setTimeout(() => {
      ticketPass.classList.remove('pulse-ticket');
    }, 360);
  }
}

/**
 * Menghitung skala proporsional secara dinamis agar miniatur aplikasi web/mobile
 * tetap tampil utuh seperti wujud aslinya meskipun dibuka di layar smartphone sempit.
 */
export function fitProjectPreviews(): void {
  const artContainers = document.querySelectorAll<HTMLElement>('.project-art');
  const isMobileViewport = window.innerWidth <= 768;

  artContainers.forEach(artEl => {
    const isInsideModal = Boolean(artEl.closest('.dialog-preview'));
    const computedStyle = window.getComputedStyle(artEl);
    const padLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const padRight = parseFloat(computedStyle.paddingRight) || 0;
    const availW = artEl.clientWidth - padLeft - padRight;
    if (availW <= 0) return;

    // 1. Web Desktop Mockups (BawangHub, PBL-IVSS, CUCI.IN, AIaaS Keuangan)
    const webApp = artEl.querySelector<HTMLElement>('.app-bawanghub, .app-ivss, .app-cuciin, .app-aiaas');
    if (webApp) {
      if (isInsideModal && !isMobileViewport) {
        resetPreviewScale(webApp);
        return;
      }

      const baseW = 470;
      if (availW < baseW - 2) {
        webApp.style.transform = 'none';
        webApp.style.marginTop = '0px';
        webApp.style.marginBottom = '0px';
        webApp.style.marginLeft = '0px';
        webApp.style.marginRight = '0px';
        webApp.style.width = `${baseW}px`;
        webApp.style.maxWidth = 'none';
        webApp.style.flexShrink = '0';

        const naturalH = webApp.offsetHeight || 270;
        const scale = Math.max(0.45, Math.min(1, availW / baseW));
        const hShrink = naturalH * (1 - scale);
        const wShrink = baseW * (1 - scale);

        webApp.style.transformOrigin = 'center center';
        webApp.style.transform = `scale(${scale.toFixed(4)})`;
        webApp.style.marginTop = `${(-hShrink / 2).toFixed(1)}px`;
        webApp.style.marginBottom = `${(-hShrink / 2).toFixed(1)}px`;
        webApp.style.marginLeft = `${(-wShrink / 2).toFixed(1)}px`;
        webApp.style.marginRight = `${(-wShrink / 2).toFixed(1)}px`;
      } else {
        resetPreviewScale(webApp);
      }
      return;
    }

    // 2. Mobile Dual-Phone Mockup (Lapangku: Phone 1 Beranda + Phone 2 E-Ticket QR)
    const phoneWrap = artEl.querySelector<HTMLElement>('.phone-mockup-wrap');
    if (phoneWrap) {
      // Di modal desktop (>768px), gunakan aturan CSS native .dialog-preview
      if (isInsideModal && !isMobileViewport) {
        resetPreviewScale(phoneWrap);
        return;
      }

      // Lebar natural 2 HP berdampingan (172px + 14px gap + 172px + tombol fisik = 368px, tinggi = 358px)
      const baseW = 368;
      const naturalH = 358;
      // Pada kartu proyek, batasi skala maksimum 0.85 agar 2 HP memiliki jarak aman dari badge atas/bawah
      const maxScale = isInsideModal ? 0.96 : 0.85;
      const scale = Math.max(0.48, Math.min(maxScale, availW / baseW));

      phoneWrap.style.width = `${baseW}px`;
      phoneWrap.style.maxWidth = 'none';
      phoneWrap.style.flexShrink = '0';

      const hShrink = naturalH * (1 - scale);
      const wShrink = baseW * (1 - scale);

      phoneWrap.style.transformOrigin = 'center center';
      phoneWrap.style.transform = `scale(${scale.toFixed(4)})`;
      phoneWrap.style.marginTop = `${(-hShrink / 2).toFixed(1)}px`;
      phoneWrap.style.marginBottom = `${(-hShrink / 2).toFixed(1)}px`;
      phoneWrap.style.marginLeft = `${(-wShrink / 2).toFixed(1)}px`;
      phoneWrap.style.marginRight = `${(-wShrink / 2).toFixed(1)}px`;
    }
  });
}

function resetPreviewScale(el: HTMLElement): void {
  el.style.width = '';
  el.style.maxWidth = '';
  el.style.flexShrink = '';
  el.style.transform = '';
  el.style.transformOrigin = '';
  el.style.marginTop = '';
  el.style.marginBottom = '';
  el.style.marginLeft = '';
  el.style.marginRight = '';
}

export function initLiveDemo(): void {
  fitProjectPreviews();
  window.addEventListener('resize', () => {
    requestAnimationFrame(fitProjectPreviews);
  });

  if (typeof ResizeObserver !== 'undefined') {
    const lastWidths = new WeakMap<HTMLElement, number>();
    const ro = new ResizeObserver(entries => {
      let widthChanged = false;
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const w = Math.round(el.clientWidth);
        if (lastWidths.get(el) !== w) {
          lastWidths.set(el, w);
          widthChanged = true;
        }
      }
      if (widthChanged) {
        requestAnimationFrame(fitProjectPreviews);
      }
    });
    document.querySelectorAll<HTMLElement>('.project-art').forEach(el => ro.observe(el));
  }

  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // ========================================================================
    // 1. LAPANGKU: Filter Kategori Dinamis & Sinkronisasi E-Ticket QR
    // ========================================================================
    const chip = target.closest<HTMLElement>('.lk-cat-chip');
    if (chip) {
      e.preventDefault();
      const wrap = chip.closest<HTMLElement>('.phone-mockup-wrap');
      const phone = chip.closest<HTMLElement>('.phone-screen-main');
      const catRow = chip.closest<HTMLElement>('.lk-cat-row');
      if (catRow) {
        catRow.querySelectorAll('.lk-cat-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      }

      const catName = (chip.textContent || 'Semua').trim();
      const venues = LAPANGKU_VENUES[catName] || LAPANGKU_VENUES.Semua;
      if (phone && venues) {
        const cards = phone.querySelectorAll<HTMLElement>('.lk-field-card');
        cards.forEach((card, idx) => {
          const data = venues[idx] || venues[0];
          card.setAttribute('data-cat', catName);
          card.setAttribute('data-idx', String(idx));
          card.classList.toggle('active-field', idx === 0);

          const badgeCat = card.querySelector<HTMLElement>('.lk-badge-cat');
          const badgeType = card.querySelector<HTMLElement>('.lk-badge-type');
          const venueName = card.querySelector<HTMLElement>('.lk-venue-name');
          const courtName = card.querySelector<HTMLElement>('.lk-court-name');
          const priceStrong = card.querySelector<HTMLElement>('.lk-price-row strong');
          const bannerPhoto = card.querySelector<HTMLImageElement>('.lk-banner-photo');

          if (badgeCat) badgeCat.textContent = data.cat;
          if (badgeType) badgeType.textContent = data.type;
          if (venueName) venueName.textContent = data.venue;
          if (courtName) courtName.textContent = data.court;
          if (priceStrong) priceStrong.textContent = data.price;
          if (bannerPhoto && bannerPhoto.getAttribute('src') !== data.photo) {
            bannerPhoto.setAttribute('src', data.photo);
          }
        });

        if (wrap && venues[0]) {
          updateLapangkuTicket(wrap, venues[0]);
        }
      }
      return;
    }

    // Klik Kartu Lapangan di Phone 1 -> Update E-Ticket di Phone 2 secara live
    const fieldCard = target.closest<HTMLElement>('.lk-field-card');
    if (fieldCard) {
      e.preventDefault();
      const wrap = fieldCard.closest<HTMLElement>('.phone-mockup-wrap');
      const phone = fieldCard.closest<HTMLElement>('.phone-screen-main');
      if (!wrap || !phone) return;

      const allCards = Array.from(phone.querySelectorAll<HTMLElement>('.lk-field-card'));
      allCards.forEach(c => c.classList.remove('active-field'));
      fieldCard.classList.add('active-field');

      const activeChip = phone.querySelector<HTMLElement>('.lk-cat-chip.active');
      const catName = (activeChip?.textContent || fieldCard.getAttribute('data-cat') || 'Semua').trim();
      const idx = allCards.indexOf(fieldCard);
      const venues = LAPANGKU_VENUES[catName] || LAPANGKU_VENUES.Semua;
      const selectedVenue = venues[idx] || venues[0];

      if (selectedVenue) {
        updateLapangkuTicket(wrap, selectedVenue);
      }
      return;
    }

    // Klik Tombol / Header di E-Ticket Phone 2 -> Efek Pulse Validasi QR
    const ticketAction = target.closest<HTMLElement>('.lk-ticket-header-title, .lk-ticket-btn, .lk-qr-frame');
    if (ticketAction) {
      e.preventDefault();
      const ticketPass = ticketAction.closest<HTMLElement>('.phone-screen-ticket')?.querySelector<HTMLElement>('.lk-ticket-pass');
      if (ticketPass) {
        ticketPass.classList.remove('pulse-ticket');
        void ticketPass.offsetWidth;
        ticketPass.classList.add('pulse-ticket');
        window.setTimeout(() => {
          ticketPass.classList.remove('pulse-ticket');
        }, 360);
      }
      return;
    }

    // Klik Bottom Navigation Tab Lapangku
    const tab = target.closest<HTMLElement>('.lk-nav-tab');
    if (tab) {
      e.preventDefault();
      const nav = tab.closest<HTMLElement>('.lk-bottom-nav');
      const phone = tab.closest<HTMLElement>('.phone-screen-main');
      const wrap = tab.closest<HTMLElement>('.phone-mockup-wrap');
      if (nav) {
        nav.querySelectorAll('.lk-nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }

      const label = (tab.textContent || '').trim();
      const sectionTitles = phone?.querySelectorAll<HTMLElement>('.lk-section-title');
      const recTitle = sectionTitles && sectionTitles.length > 1 ? sectionTitles[1] : null;

      if (recTitle) {
        if (label.includes('Pesanan')) {
          recTitle.textContent = 'Jadwal Aktif Anda (2)';
          const ticketPass = wrap?.querySelector<HTMLElement>('.lk-ticket-pass');
          if (ticketPass) {
            ticketPass.classList.add('pulse-ticket');
            window.setTimeout(() => ticketPass.classList.remove('pulse-ticket'), 360);
          }
        } else if (label.includes('Favorit')) {
          recTitle.textContent = 'Venue Favorit Tersimpan';
        } else if (label.includes('Profil')) {
          recTitle.textContent = 'Langganan Venue Member';
        } else {
          recTitle.textContent = 'Rekomendasi Terdekat';
        }
      }
      return;
    }

    // ========================================================================
    // 2. CUCI.IN: Multi-Screen Slideshow & Lacak Status Cucian Publik
    // ========================================================================
    const ciDot = target.closest<HTMLElement>('.ci-dot');
    if (ciDot) {
      e.preventDefault();
      const preview = ciDot.closest<HTMLElement>('.app-cuciin');
      if (!preview) return;

      const targetIndex = parseInt(ciDot.getAttribute('data-slide') || '0', 10);
      switchCuciinSlide(preview, targetIndex);
      return;
    }

    const ciNavArrow = target.closest<HTMLElement>('.ci-nav-arrow');
    if (ciNavArrow) {
      e.preventDefault();
      const preview = ciNavArrow.closest<HTMLElement>('.app-cuciin');
      if (!preview) return;

      const panes = preview.querySelectorAll<HTMLElement>('.ci-slide-pane');
      let currentIndex = 0;
      panes.forEach((p, idx) => {
        if (p.classList.contains('active')) currentIndex = idx;
      });

      const totalSlides = panes.length || 3;
      const nextIndex = ciNavArrow.classList.contains('prev')
        ? (currentIndex - 1 + totalSlides) % totalSlides
        : (currentIndex + 1) % totalSlides;

      switchCuciinSlide(preview, nextIndex);
      return;
    }

    const ciQuick = target.closest<HTMLElement>('.ci-quick-switch');
    if (ciQuick) {
      e.preventDefault();
      const preview = ciQuick.closest<HTMLElement>('.app-cuciin');
      if (!preview) return;
      const targetIdx = parseInt(ciQuick.getAttribute('data-target') || '1', 10);
      switchCuciinSlide(preview, targetIdx);
      return;
    }

    const ciNavItem = target.closest<HTMLElement>('.ci-nav-item');
    if (ciNavItem) {
      e.preventDefault();
      const sidebar = ciNavItem.closest<HTMLElement>('.ci-sidebar');
      if (sidebar) {
        sidebar.querySelectorAll('.ci-nav-item').forEach(item => item.classList.remove('active'));
        ciNavItem.classList.add('active');
      }
      return;
    }

    const trackBtn = target.closest<HTMLElement>('.ci-tracking-btn');
    if (trackBtn) {
      e.preventDefault();
      const preview = trackBtn.closest<HTMLElement>('.app-cuciin');
      if (!preview) return;

      const input = preview.querySelector<HTMLInputElement>('.ci-tracking-input');
      const notaCode = input && input.value.trim() ? input.value.trim().toUpperCase() : 'TRX-20261024-0001';

      const searchBox = preview.querySelector<HTMLElement>('.ci-search-stage');
      const resultBox = preview.querySelector<HTMLElement>('.ci-result-stage');
      const notaDisplay = preview.querySelector<HTMLElement>('.ci-result-nota');

      if (searchBox) searchBox.style.display = 'none';
      if (resultBox) {
        resultBox.style.display = 'flex';
        if (notaDisplay) notaDisplay.textContent = notaCode;
      }
      return;
    }

    const resetBtn = target.closest<HTMLElement>('.ci-reset-btn');
    if (resetBtn) {
      e.preventDefault();
      const preview = resetBtn.closest<HTMLElement>('.app-cuciin');
      if (!preview) return;

      const searchBox = preview.querySelector<HTMLElement>('.ci-search-stage');
      const resultBox = preview.querySelector<HTMLElement>('.ci-result-stage');

      if (resultBox) resultBox.style.display = 'none';
      if (searchBox) searchBox.style.display = 'flex';
      return;
    }

    // ========================================================================
    // 3. BAWANGHUB: Navigasi Menu, Kartu Fitur, & Siklus Cuaca Lokal
    // ========================================================================
    const bhWeather = target.closest<HTMLElement>('.bh-weather-box');
    if (bhWeather) {
      e.preventDefault();
      const currentIdx = parseInt(bhWeather.getAttribute('data-weather-idx') || '0', 10);
      const nextIdx = (currentIdx + 1) % BAWANGHUB_WEATHER.length;
      bhWeather.setAttribute('data-weather-idx', String(nextIdx));

      const data = BAWANGHUB_WEATHER[nextIdx];
      const locTag = bhWeather.querySelector<HTMLElement>('.bh-loc-tag');
      const tempEl = bhWeather.querySelector<HTMLElement>('.bh-weather-temp');
      const statEl = bhWeather.querySelector<HTMLElement>('.bh-weather-stat');
      const tipEl = bhWeather.querySelector<HTMLElement>('.bh-weather-ai-tip');

      if (locTag) locTag.textContent = data.loc;
      if (tempEl) tempEl.textContent = data.temp;
      if (statEl) statEl.textContent = data.stat;
      if (tipEl) tipEl.innerHTML = data.tipHtml;
      return;
    }

    const bhInteractive = target.closest<HTMLElement>('.bh-link, .bh-card, .bh-btn-green, .bh-btn-outline');
    if (bhInteractive) {
      e.preventDefault();
      const preview = bhInteractive.closest<HTMLElement>('.app-bawanghub');
      if (!preview) return;

      const text = (bhInteractive.textContent || '').trim();
      let key = 'Dashboard';
      if (text.includes('Tanya')) key = 'Tanya';
      else if (text.includes('Statistik') || text.includes('Tren')) key = 'Statistik';
      else if (text.includes('Buku')) key = 'Buku';
      else if (text.includes('Forum')) key = 'Forum';
      else if (text.includes('Galeri')) key = 'Galeri';

      const sectionData = BAWANGHUB_SECTIONS[key] || BAWANGHUB_SECTIONS.Dashboard;
      const badgeEl = preview.querySelector<HTMLElement>('.bh-hero-badge');
      const titleEl = preview.querySelector<HTMLElement>('.bh-hero-title');
      const descEl = preview.querySelector<HTMLElement>('.bh-hero-desc');

      if (badgeEl) badgeEl.textContent = sectionData.badge;
      if (titleEl) titleEl.innerHTML = sectionData.titleHtml;
      if (descEl) descEl.textContent = sectionData.desc;

      preview.querySelectorAll<HTMLElement>('.bh-link').forEach(link => {
        const lText = (link.textContent || '').trim();
        const isMatch =
          (key === 'Dashboard' && lText.includes('Dashboard')) ||
          (key === 'Tanya' && lText.includes('Tanya')) ||
          (key === 'Statistik' && lText.includes('Statistik')) ||
          (key === 'Buku' && lText.includes('Buku')) ||
          (key === 'Forum' && lText.includes('Forum')) ||
          (key === 'Galeri' && lText.includes('Galeri'));
        link.classList.toggle('active', isMatch);
      });

      preview.querySelectorAll<HTMLElement>('.bh-card').forEach(card => {
        const cText = (card.textContent || '').trim();
        const isMatch =
          (key === 'Tanya' && cText.includes('Tanya')) ||
          (key === 'Statistik' && cText.includes('Statistik')) ||
          (key === 'Buku' && cText.includes('Buku')) ||
          (key === 'Forum' && cText.includes('Forum'));
        card.classList.toggle('active-card', isMatch);
      });
      return;
    }

    // ========================================================================
    // 4. PBL-IVSS: Modul Portal Laboratorium Interaktif
    // ========================================================================
    const ivssTrigger = target.closest<HTMLElement>('.ivss-menu span, .ivss-pill, .ivss-learn-more');
    if (ivssTrigger) {
      e.preventDefault();
      const preview = ivssTrigger.closest<HTMLElement>('.app-ivss');
      if (!preview) return;

      const text = (ivssTrigger.textContent || '').trim();
      let key = 'Tentang';
      if (text.includes('Visi') || text.includes('Vision')) key = 'Visi';
      else if (text.includes('Profil') || text.includes('Smart')) key = 'Profil';
      else if (text.includes('Publikasi') || text.includes('Riset') || text.includes('Pelajari')) key = 'Publikasi';

      const mod = IVSS_MODULES[key] || IVSS_MODULES.Tentang;
      const kickerEl = preview.querySelector<HTMLElement>('.ivss-kicker');
      const titleEl = preview.querySelector<HTMLElement>('.ivss-h1');
      const descEl = preview.querySelector<HTMLElement>('.ivss-tagline');

      if (kickerEl) kickerEl.textContent = mod.kicker;
      if (titleEl) titleEl.innerHTML = mod.titleHtml;
      if (descEl) descEl.textContent = mod.desc;

      preview.querySelectorAll<HTMLElement>('.ivss-menu span').forEach(span => {
        const sText = (span.textContent || '').trim();
        const isMatch =
          (key === 'Tentang' && sText.includes('Tentang')) ||
          (key === 'Visi' && sText.includes('Visi')) ||
          (key === 'Profil' && sText.includes('Profil')) ||
          (key === 'Publikasi' && sText.includes('Publikasi'));
        span.classList.toggle('active', isMatch);
      });

      preview.querySelectorAll<HTMLElement>('.ivss-pill').forEach(pill => {
        const pText = (pill.textContent || '').trim();
        const isMatch =
          (key === 'Visi' && pText.includes('Vision')) ||
          (key === 'Profil' && pText.includes('Smart')) ||
          (key === 'Publikasi' && pText.includes('Riset'));
        pill.classList.toggle('active-pill', isMatch);
      });
      return;
    }

    // ========================================================================
    // 5. AIAAS KEUANGAN: Parse AI Simulation & Period Filters
    // ========================================================================
    const chipBtn = target.closest<HTMLElement>('.ai-chip-btn');
    if (chipBtn) {
      e.preventDefault();
      const aiaas = chipBtn.closest<HTMLElement>('.app-aiaas');
      if (aiaas) {
        const sampleText = chipBtn.getAttribute('data-sample') || chipBtn.textContent?.replace(/"/g, '').trim() || '';
        const foundIdx = AIAAS_NLP_SAMPLES.findIndex(s => s.raw.includes(sampleText) || sampleText.includes(s.raw.replace(/"/g, '')));
        const sampleIdx = foundIdx >= 0 ? foundIdx : 0;
        const currentData = AIAAS_NLP_SAMPLES[sampleIdx];

        aiaas.querySelectorAll('.ai-chip-btn').forEach(b => b.classList.remove('active'));
        chipBtn.classList.add('active');

        const sampleEl = aiaas.querySelector<HTMLElement>('.ai-nlp-sample');
        const jsonEl = aiaas.querySelector<HTMLElement>('.ai-json-code');
        const consultEl = aiaas.querySelector<HTMLElement>('.ai-consultant-msg');
        const jsonBox = aiaas.querySelector<HTMLElement>('.ai-json-output');

        if (sampleEl) {
          sampleEl.setAttribute('data-nlp-idx', sampleIdx.toString());
          sampleEl.textContent = currentData.raw;
        }
        if (jsonEl) {
          jsonEl.textContent = currentData.json;
        }
        if (consultEl) {
          consultEl.textContent = currentData.consultant;
        }
        if (jsonBox) {
          jsonBox.classList.remove('ai-parsed-pulse');
          void jsonBox.offsetWidth;
          jsonBox.classList.add('ai-parsed-pulse');
        }
      }
      return;
    }

    const parseBtn = target.closest<HTMLElement>('.ai-parse-btn');
    if (parseBtn) {
      e.preventDefault();
      const aiaas = parseBtn.closest<HTMLElement>('.app-aiaas');
      if (aiaas) {
        const sampleEl = aiaas.querySelector<HTMLElement>('.ai-nlp-sample');
        const jsonEl = aiaas.querySelector<HTMLElement>('.ai-json-code');
        const consultEl = aiaas.querySelector<HTMLElement>('.ai-consultant-msg');
        const jsonBox = aiaas.querySelector<HTMLElement>('.ai-json-output');

        let currentIdx = parseInt(sampleEl?.getAttribute('data-nlp-idx') || '0', 10);
        currentIdx = (currentIdx + 1) % AIAAS_NLP_SAMPLES.length;
        const nextSample = AIAAS_NLP_SAMPLES[currentIdx];

        if (sampleEl) {
          sampleEl.setAttribute('data-nlp-idx', currentIdx.toString());
          sampleEl.textContent = nextSample.raw;
        }
        if (jsonEl) {
          jsonEl.textContent = nextSample.json;
        }
        if (consultEl) {
          consultEl.textContent = nextSample.consultant;
        }

        // Update active chip
        const chips = aiaas.querySelectorAll('.ai-chip-btn');
        chips.forEach((c, idx) => {
          if (idx === currentIdx) c.classList.add('active');
          else c.classList.remove('active');
        });

        if (jsonBox) {
          jsonBox.classList.remove('ai-parsed-pulse');
          void jsonBox.offsetWidth; // trigger reflow
          jsonBox.classList.add('ai-parsed-pulse');
        }
      }
      return;
    }

    const periodBtn = target.closest<HTMLElement>('.ai-period-btn');
    if (periodBtn) {
      e.preventDefault();
      const aiaas = periodBtn.closest<HTMLElement>('.app-aiaas');
      const tabs = periodBtn.closest<HTMLElement>('.ai-period-tabs');
      if (aiaas && tabs) {
        tabs.querySelectorAll('.ai-period-btn').forEach(b => b.classList.remove('active'));
        periodBtn.classList.add('active');

        const periodKey = (periodBtn.getAttribute('data-period') || 'Bulanan') as keyof typeof AIAAS_PERIODS;
        const data = AIAAS_PERIODS[periodKey] || AIAAS_PERIODS.Bulanan;

        const valBalance = aiaas.querySelector<HTMLElement>('.ai-val-balance');
        const valIncome = aiaas.querySelector<HTMLElement>('.ai-val-income');
        const valExpense = aiaas.querySelector<HTMLElement>('.ai-val-expense');
        const valIncomeSoft = aiaas.querySelector<HTMLElement>('.ai-val-income-soft');
        const valExpenseSoft = aiaas.querySelector<HTMLElement>('.ai-val-expense-soft');

        if (valBalance) valBalance.textContent = data.balance;
        if (valIncome) valIncome.textContent = data.income;
        if (valExpense) valExpense.textContent = data.expense;
        if (valIncomeSoft) valIncomeSoft.textContent = data.income;
        if (valExpenseSoft) valExpenseSoft.textContent = data.expense;
      }
      return;
    }

    const txFilterBtn = target.closest<HTMLElement>('.ai-tx-filter-btn');
    if (txFilterBtn) {
      e.preventDefault();
      const aiaas = txFilterBtn.closest<HTMLElement>('.app-aiaas');
      const filterWrap = txFilterBtn.closest<HTMLElement>('.ai-tx-filter-chips');
      if (aiaas && filterWrap) {
        filterWrap.querySelectorAll('.ai-tx-filter-btn').forEach(b => b.classList.remove('active'));
        txFilterBtn.classList.add('active');

        const filterMode = txFilterBtn.textContent?.trim().toLowerCase() || 'semua';
        const rows = aiaas.querySelectorAll<HTMLElement>('.ai-tx-row');
        rows.forEach(row => {
          if (filterMode === 'semua') {
            row.style.display = 'grid';
          } else if (filterMode === 'pemasukan') {
            const isIncome = row.querySelector('.ai-tx-badge.income') !== null;
            row.style.display = isIncome ? 'grid' : 'none';
          } else if (filterMode === 'pengeluaran') {
            const isExpense = row.querySelector('.ai-tx-badge.food, .ai-tx-badge.bill') !== null;
            row.style.display = isExpense ? 'grid' : 'none';
          }
        });
      }
      return;
    }

    const aiNavLink = target.closest<HTMLElement>('.ai-nav-link');
    if (aiNavLink) {
      e.preventDefault();
      const aiaas = aiNavLink.closest<HTMLElement>('.app-aiaas');
      if (aiaas) {
        aiaas.querySelectorAll('.ai-nav-link').forEach(l => {
          l.classList.remove('active');
          const indicator = l.querySelector('.ai-nav-indicator');
          if (indicator) indicator.remove();
        });
        aiNavLink.classList.add('active');
        if (!aiNavLink.querySelector('.ai-nav-indicator')) {
          const indicator = document.createElement('span');
          indicator.className = 'ai-nav-indicator';
          indicator.setAttribute('aria-hidden', 'true');
          aiNavLink.appendChild(indicator);
        }
      }
      return;
    }
  });

  // Handle Enter key on CUCI.IN tracking input
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement | null;
      if (target && target.classList.contains('ci-tracking-input')) {
        e.preventDefault();
        const preview = target.closest<HTMLElement>('.app-cuciin');
        const trackBtn = preview?.querySelector<HTMLElement>('.ci-tracking-btn');
        trackBtn?.click();
      }
    }
  });

  // Swipe / Drag Gesture Support for CUCI.IN Multi-Screen Carousel ("bisa digeser-geser")
  let startX = 0;
  let startY = 0;
  let activeViewport: HTMLElement | null = null;
  let isDragging = false;

  document.addEventListener('touchstart', (e: TouchEvent) => {
    const vp = (e.target as HTMLElement | null)?.closest<HTMLElement>('.ci-slides-viewport');
    if (!vp) return;
    activeViewport = vp;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e: TouchEvent) => {
    if (!activeViewport) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    handleSwipe(activeViewport, endX - startX, endY - startY);
    activeViewport = null;
  }, { passive: true });

  document.addEventListener('mousedown', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('button, input, select, a')) return;
    const vp = target?.closest<HTMLElement>('.ci-slides-viewport');
    if (!vp) return;
    activeViewport = vp;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener('mouseup', (e: MouseEvent) => {
    if (!isDragging || !activeViewport) {
      isDragging = false;
      activeViewport = null;
      return;
    }
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    handleSwipe(activeViewport, deltaX, deltaY);
    isDragging = false;
    activeViewport = null;
  });

  function handleSwipe(viewport: HTMLElement, diffX: number, diffY: number): void {
    if (Math.abs(diffX) < 30 || Math.abs(diffX) < Math.abs(diffY)) return;
    const preview = viewport.closest<HTMLElement>('.app-cuciin');
    if (!preview) return;

    const panes = preview.querySelectorAll<HTMLElement>('.ci-slide-pane');
    let currentIndex = 0;
    panes.forEach((p, idx) => {
      if (p.classList.contains('active')) currentIndex = idx;
    });

    const total = panes.length || 3;
    if (diffX < 0) {
      const nextIdx = (currentIndex + 1) % total;
      switchCuciinSlide(preview, nextIdx);
    } else {
      const prevIdx = (currentIndex - 1 + total) % total;
      switchCuciinSlide(preview, prevIdx);
    }
  }
}

/**
 * Switch active slide pane and update track transform, dots, and URL bar for CUCI.IN
 */
export function switchCuciinSlide(preview: HTMLElement, index: number): void {
  const dots = preview.querySelectorAll<HTMLElement>('.ci-dot');
  const panes = preview.querySelectorAll<HTMLElement>('.ci-slide-pane');
  const track = preview.querySelector<HTMLElement>('.ci-slides-track');
  const urlText = preview.querySelector<HTMLElement>('.ci-window-url-text');

  const totalPanes = panes.length || 3;
  const safeIndex = Math.max(0, Math.min(index, totalPanes - 1));

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === safeIndex);
  });

  panes.forEach((pane, i) => {
    pane.classList.toggle('active', i === safeIndex);
  });

  if (track) {
    track.style.transform = `translateX(-${safeIndex * (100 / totalPanes)}%)`;
  }

  if (urlText) {
    if (safeIndex === 0) urlText.textContent = 'cuciin.app';
    else if (safeIndex === 1) urlText.textContent = 'cuciin.app/admin/dashboard';
    else if (safeIndex === 2) urlText.textContent = 'cuciin.app/customer/dashboard';
  }
}
