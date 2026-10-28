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

    // 2. CUCI.IN: Multi-Screen Slideshow & Lacak Status Cucian Publik
    // A. Switch slide by Dot Click
    const ciDot = target.closest<HTMLElement>('.ci-dot');
    if (ciDot) {
      e.preventDefault();
      const preview = ciDot.closest<HTMLElement>('.app-cuciin');
      if (!preview) return;

      const targetIndex = parseInt(ciDot.getAttribute('data-slide') || '0', 10);
      switchCuciinSlide(preview, targetIndex);
      return;
    }

    // B. Switch slide by Prev/Next Arrow Controls
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
      let nextIndex = 0;
      if (ciNavArrow.classList.contains('prev')) {
        nextIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      } else {
        nextIndex = (currentIndex + 1) % totalSlides;
      }

      switchCuciinSlide(preview, nextIndex);
      return;
    }

    // C. Quick Switch button (e.g. "Buka Dashboard" in Navbar)
    const ciQuick = target.closest<HTMLElement>('.ci-quick-switch');
    if (ciQuick) {
      e.preventDefault();
      const preview = ciQuick.closest<HTMLElement>('.app-cuciin');
      if (!preview) return;
      const targetIdx = parseInt(ciQuick.getAttribute('data-target') || '1', 10);
      switchCuciinSlide(preview, targetIdx);
      return;
    }

    // D. Lacak Status Cucian Publik & Reset
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
      // Geser ke Kiri -> Slide Berikutnya
      const nextIdx = (currentIndex + 1) % total;
      switchCuciinSlide(preview, nextIdx);
    } else {
      // Geser ke Kanan -> Slide Sebelumnya
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

