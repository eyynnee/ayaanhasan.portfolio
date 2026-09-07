/**
 * AYAN HASAN : PERSONAL ENGINEERING PORTFOLIO
 * Continuous 2D Technical Scroll Motion Artwork Engine
 * 
 * Evolution along scroll progress:
 * LANDING (0.00 - 0.20): Architectural / structural geometry grid constructing itself
 * EXPERIENCE (0.20 - 0.45): Roadway alignment and surveying chainage geometry (STA 0+000, STA 0+213...)
 * PROJECTS (0.45 - 0.70): Topographic & GIS contour geometry
 * TSUNAMI (0.70 - 0.85): Coastal wave / bathymetric depth elevation geometry
 * CONTACT (0.85 - 1.00): Resolves into a minimal structural datum line
 */

(function () {
  'use strict';

  const canvas = document.getElementById('scroll-art-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const hudStageEl = document.getElementById('hud-stage-name');
  const hudStationEl = document.getElementById('hud-station-code');
  const hudFillEl = document.getElementById('hud-bar-fill');

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let currentScrollProgress = 0;
  let targetScrollProgress = 0;
  let animTime = 0;
  let animationFrameId = null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  function getScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return 0;
    return Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
  }

  function updateHUD(progress) {
    if (hudFillEl) {
      hudFillEl.style.height = `${(progress * 100).toFixed(1)}%`;
    }

    // Roadway stationing chainage calculation (0+000 to 3+200)
    const totalMeters = Math.floor(progress * 3200);
    const kmPart = Math.floor(totalMeters / 1000);
    const mPart = (totalMeters % 1000).toString().padStart(3, '0');
    const stationCode = `STA ${kmPart}+${mPart}`;

    if (hudStationEl) {
      hudStationEl.textContent = stationCode;
    }

    if (hudStageEl) {
      let stageName = '01 STRUCTURE';
      if (progress > 0.20 && progress <= 0.42) stageName = '02 CHAINAGE';
      else if (progress > 0.42 && progress <= 0.68) stageName = '03 TOPOGRAPHY';
      else if (progress > 0.68 && progress <= 0.86) stageName = '04 COASTAL DEM';
      else if (progress > 0.86) stageName = '05 DATUM LINE';
      hudStageEl.textContent = stageName;
    }
  }

  function drawLinework(progress) {
    ctx.clearRect(0, 0, width, height);

    // Position artwork primarily on the right perimeter to prevent visual clutter across text
    const edgeX = width > 900 ? width * 0.82 : width * 0.88;
    const centerY = height * 0.5;

    ctx.save();

    // ------------------------------------------------------------
    // 1. LANDING: Structural / Architectural Grid Construction (0.00 -> 0.22)
    // ------------------------------------------------------------
    if (progress <= 0.25) {
      const alpha = Math.max(0, 1 - (progress / 0.25) * 0.4);
      const gridW = Math.min(width * 0.32, 340);
      const gridH = 260;
      const originX = edgeX - gridW * 0.7;
      const originY = centerY - gridH * 0.5;

      ctx.strokeStyle = `rgba(180, 134, 58, ${0.45 * alpha})`;
      ctx.lineWidth = 1;

      // Architectural Column Bays
      ctx.strokeRect(originX, originY, gridW, gridH);

      // Modular Beam Ticks
      ctx.beginPath();
      ctx.setLineDash([3, 3]);
      for (let i = 1; i < 4; i++) {
        const x = originX + (gridW / 4) * i;
        ctx.moveTo(x, originY);
        ctx.lineTo(x, originY + gridH);
      }
      for (let j = 1; j < 4; j++) {
        const y = originY + (gridH / 4) * j;
        ctx.moveTo(originX, y);
        ctx.lineTo(originX + gridW, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Datum survey marker
      const crossY = originY + (animTime * 15) % gridH;
      ctx.strokeStyle = `rgba(180, 134, 58, ${0.8 * alpha})`;
      ctx.beginPath();
      ctx.arc(originX + gridW * 0.5, crossY, 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // ------------------------------------------------------------
    // 2. EXPERIENCE: Road Alignment & Chainage Geometry (0.18 -> 0.48)
    // ------------------------------------------------------------
    if (progress >= 0.16 && progress <= 0.50) {
      const localProg = (progress - 0.16) / 0.34;
      const alpha = Math.sin(localProg * Math.PI) * 0.55;

      ctx.strokeStyle = `rgba(221, 213, 200, ${alpha * 0.4})`;
      ctx.lineWidth = 1;

      const trackStartX = edgeX - 160;
      const trackEndX = width;

      // Corridor Carriageway Lines
      for (let lane = 0; lane < 3; lane++) {
        const laneY = centerY - 60 + lane * 45;
        ctx.beginPath();
        ctx.setLineDash([6, 5]);
        ctx.moveTo(trackStartX, laneY);
        ctx.lineTo(trackEndX, laneY);
        ctx.stroke();
      }

      // Stationing Cross Ticks
      ctx.strokeStyle = `rgba(180, 134, 58, ${alpha * 0.8})`;
      ctx.setLineDash([]);
      for (let s = 0; s < 5; s++) {
        const sx = trackStartX + s * 45;
        ctx.beginPath();
        ctx.moveTo(sx, centerY - 75);
        ctx.lineTo(sx, centerY + 45);
        ctx.stroke();
      }
    }

    // ------------------------------------------------------------
    // 3. PROJECTS: Topographic & GIS Contours (0.44 -> 0.74)
    // ------------------------------------------------------------
    if (progress >= 0.42 && progress <= 0.76) {
      const localProg = (progress - 0.42) / 0.34;
      const alpha = Math.sin(localProg * Math.PI) * 0.6;

      ctx.strokeStyle = `rgba(180, 134, 58, ${alpha * 0.7})`;
      ctx.lineWidth = 1;

      for (let i = 0; i < 5; i++) {
        const baseY = centerY - 90 + i * 40;
        const amp = 18 + i * 6;
        const freq = 0.005 + i * 0.001;

        ctx.beginPath();
        ctx.setLineDash(i % 2 === 0 ? [] : [4, 4]);
        for (let x = edgeX - 220; x <= width; x += 12) {
          const y = baseY + Math.sin(x * freq + localProg * 3 + i) * amp;
          if (x === edgeX - 220) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // ------------------------------------------------------------
    // 4. TSUNAMI PROJECT: Wave & Bathymetric Coastal Mesh (0.68 -> 0.88)
    // ------------------------------------------------------------
    if (progress >= 0.66 && progress <= 0.90) {
      const localProg = (progress - 0.66) / 0.24;
      const alpha = Math.sin(localProg * Math.PI) * 0.65;

      const cols = 8;
      const rows = 6;
      const cellW = 32;
      const cellH = 20;
      const originX = edgeX - 180;
      const originY = centerY - 50;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.strokeStyle = r < 2
          ? `rgba(82, 107, 120, ${alpha * 0.85})` // Coastal blue grey
          : `rgba(180, 134, 58, ${alpha * 0.75})`; // Topo ochre

        for (let c = 0; c < cols; c++) {
          const x = originX + c * cellW + r * 10;
          const zWave = Math.sin(c * 0.6 + animTime * 2) * (r * 4);
          const y = originY + r * cellH - zWave;

          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // ------------------------------------------------------------
    // 5. CONTACT: Resolves into a Minimal Datum Line (0.85 -> 1.00)
    // ------------------------------------------------------------
    if (progress >= 0.84) {
      const localProg = (progress - 0.84) / 0.16;
      const alpha = Math.min(1, localProg * 1.4) * 0.5;

      ctx.strokeStyle = `rgba(180, 134, 58, ${alpha})`;
      ctx.lineWidth = 1.5;

      const datumY = height * 0.78;
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(edgeX - 180, datumY);
      ctx.lineTo(width, datumY);
      ctx.stroke();

      // Earth footing hatch
      ctx.strokeStyle = `rgba(221, 213, 200, ${alpha * 0.3})`;
      ctx.lineWidth = 0.8;
      for (let hx = edgeX - 180; hx < width; hx += 16) {
        ctx.beginPath();
        ctx.moveTo(hx, datumY);
        ctx.lineTo(hx - 10, datumY + 14);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  function loop() {
    targetScrollProgress = getScrollProgress();
    animTime += 0.015;

    // Smooth linear interpolation (lerp)
    const diff = targetScrollProgress - currentScrollProgress;
    currentScrollProgress += diff * 0.12;

    updateHUD(currentScrollProgress);
    drawLinework(currentScrollProgress);

    animationFrameId = requestAnimationFrame(loop);
  }

  // Event Listeners
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', () => {
    targetScrollProgress = getScrollProgress();
  }, { passive: true });

  // Init
  resize();
  if (!prefersReducedMotion) {
    loop();
  } else {
    drawLinework(0.5);
  }
})();
