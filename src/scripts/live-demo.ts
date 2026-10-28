/**
 * ==========================================================================
 * LIVE DEMO TERBATAS UNTUK PRATINJAU APLIKASI (live-demo.ts)
 * Menjadikan miniatur UI 4 proyek interaktif langsung di kartu & modal dialog.
 * ==========================================================================
 */

export function initLiveDemo(): void {
  // 1. LAPANGKU: Subtle Active Chip & Tab Toggles
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // A. Kategori Chip Click
    const chip = target.closest<HTMLElement>('.lk-cat-chip');
    if (chip) {
      e.preventDefault();
      const catRow = chip.closest<HTMLElement>('.lk-cat-row');
      if (catRow) {
        catRow.querySelectorAll('.lk-cat-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      }
      return;
    }

    // B. Bottom Navigation Tab Click
    const tab = target.closest<HTMLElement>('.lk-nav-tab');
    if (tab) {
      e.preventDefault();
      const nav = tab.closest<HTMLElement>('.lk-bottom-nav');
      if (nav) {
        nav.querySelectorAll('.lk-nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
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

