/**
 * ==========================================================================
 * LIVE DEMO TERBATAS UNTUK PRATINJAU APLIKASI (live-demo.ts)
 * Menjadikan miniatur UI 4 proyek interaktif langsung di kartu & modal dialog.
 * ==========================================================================
 */

export function initLiveDemo(): void {
  // 1. LAPANGKU: Filter Kategori Lapangan & Bottom Navigation Tabs
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // A. Kategori Chip Click
    const chip = target.closest<HTMLElement>('[data-lk-cat]');
    if (chip) {
      e.preventDefault();
      const container = chip.closest<HTMLElement>('.app-lapangku');
      if (!container) return;

      container.querySelectorAll('[data-lk-cat]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const cat = chip.dataset.lkCat || 'all';
      const cards = container.querySelectorAll<HTMLElement>('.lk-field-card');
      cards.forEach(card => {
        const cardCat = card.dataset.fieldCat || 'all';
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      return;
    }

    // B. Bottom Navigation Tab Click
    const tab = target.closest<HTMLElement>('[data-lk-tab]');
    if (tab) {
      e.preventDefault();
      const container = tab.closest<HTMLElement>('.app-lapangku');
      if (!container) return;

      container.querySelectorAll('[data-lk-tab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabName = tab.dataset.lkTab || 'beranda';
      const views = container.querySelectorAll<HTMLElement>('.lk-tab-view');
      views.forEach(v => {
        if (v.dataset.viewName === tabName) {
          v.style.display = 'flex';
        } else {
          v.style.display = 'none';
        }
      });
      return;
    }

    // C. Field Card Click -> Mini Toast di Ponsel
    const fieldCard = target.closest<HTMLElement>('.lk-field-card');
    if (fieldCard) {
      e.preventDefault();
      const container = fieldCard.closest<HTMLElement>('.app-lapangku');
      if (!container) return;

      const venueName = fieldCard.querySelector('.lk-venue-name')?.textContent || 'Lapangan';
      showMiniPhoneToast(container, `✓ ${venueName} (Slot 19:00) dipilih!`);
      return;
    }

    // 2. CUCI.IN: Lacak Status Cucian Publik & Reset
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

    // 3. BAWANGHUB: Tanya AI Panel Toggle & Weather Toggle
    const bhAiTrigger = target.closest<HTMLElement>('.bh-ai-trigger');
    if (bhAiTrigger) {
      e.preventDefault();
      const preview = bhAiTrigger.closest<HTMLElement>('.app-bawanghub');
      if (!preview) return;

      const mainGrid = preview.querySelector<HTMLElement>('.bh-main-content');
      const aiPanel = preview.querySelector<HTMLElement>('.bh-ai-demo-panel');
      if (mainGrid) mainGrid.style.display = 'none';
      if (aiPanel) aiPanel.style.display = 'flex';
      return;
    }

    const bhAiClose = target.closest<HTMLElement>('.bh-ai-close');
    if (bhAiClose) {
      e.preventDefault();
      const preview = bhAiClose.closest<HTMLElement>('.app-bawanghub');
      if (!preview) return;

      const mainGrid = preview.querySelector<HTMLElement>('.bh-main-content');
      const aiPanel = preview.querySelector<HTMLElement>('.bh-ai-demo-panel');
      if (aiPanel) aiPanel.style.display = 'none';
      if (mainGrid) mainGrid.style.display = 'flex';
      return;
    }

    const weatherCard = target.closest<HTMLElement>('.bh-weather-card');
    if (weatherCard) {
      e.preventDefault();
      const locPill = weatherCard.querySelector('.bh-loc-name');
      const temp = weatherCard.querySelector('.bh-temp');
      const cond = weatherCard.querySelector('.bh-cond');

      if (locPill && temp && cond) {
        if (locPill.textContent?.includes('Brebes')) {
          locPill.textContent = 'Larangan';
          temp.textContent = '31°C';
          cond.textContent = 'Lembap Berawan';
        } else {
          locPill.textContent = 'Brebes';
          temp.textContent = '29°C';
          cond.textContent = 'Cerah';
        }
      }
      return;
    }

    // 4. PBL-IVSS: Toggle Mode Web vs Live CCTV AI Camera Feed
    const ivssModeBtn = target.closest<HTMLElement>('.ivss-mode-btn');
    if (ivssModeBtn) {
      e.preventDefault();
      const preview = ivssModeBtn.closest<HTMLElement>('.app-ivss');
      if (!preview) return;

      const mode = ivssModeBtn.dataset.ivssMode || 'portal';
      preview.querySelectorAll('.ivss-mode-btn').forEach(b => b.classList.remove('active'));
      ivssModeBtn.classList.add('active');

      const portalHero = preview.querySelector<HTMLElement>('.ivss-hero');
      const cctvDeck = preview.querySelector<HTMLElement>('.ivss-cctv-deck');

      if (mode === 'cctv') {
        if (portalHero) portalHero.style.display = 'none';
        if (cctvDeck) cctvDeck.style.display = 'flex';
      } else {
        if (cctvDeck) cctvDeck.style.display = 'none';
        if (portalHero) portalHero.style.display = 'flex';
      }
      return;
    }

    // IVSS CCTV Camera Switcher (CAM 01 vs CAM 02)
    const camBtn = target.closest<HTMLElement>('.ivss-cam-tab');
    if (camBtn) {
      e.preventDefault();
      const deck = camBtn.closest<HTMLElement>('.ivss-cctv-deck');
      if (!deck) return;

      deck.querySelectorAll('.ivss-cam-tab').forEach(b => b.classList.remove('active'));
      camBtn.classList.add('active');

      const camId = camBtn.dataset.camId || '1';
      const feeds = deck.querySelectorAll<HTMLElement>('.ivss-cam-feed');
      feeds.forEach(f => {
        if (f.dataset.feedId === camId) {
          f.style.display = 'flex';
        } else {
          f.style.display = 'none';
        }
      });
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
}

function showMiniPhoneToast(container: HTMLElement, message: string): void {
  let toast = container.querySelector<HTMLElement>('.lk-phone-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'lk-phone-toast mono';
    container.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast?.classList.remove('show');
  }, 1800);
}

