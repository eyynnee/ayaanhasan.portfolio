/**
 * AYAN HASAN : PERSONAL ENGINEERING PORTFOLIO
 * Project : Traffic Conflict & Pedestrian Safety Study (Maskan Chowrangi)
 * Schematic Intersection Canvas Animation (Traffic Conflict Technique Vectors)
 */

(function () {
  'use strict';

  const canvas = document.getElementById('intersection-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.clientWidth || 800;
  let height = canvas.clientHeight || 480;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let isVisible = false;
  let animationId = null;

  function resize() {
    if (!canvas.parentElement) return;
    width = canvas.parentElement.clientWidth;
    height = Math.min(Math.max(width * 0.54, 340), 500);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
  }

  // Moving modal interaction particles
  const particles = [
    { t: 0, speed: 0.005, color: '#526B78', path: 'thru' },
    { t: 0.35, speed: 0.006, color: '#526B78', path: 'thru' },
    { t: 0.15, speed: 0.004, color: '#B4863A', path: 'weave' },
    { t: 0.65, speed: 0.004, color: '#B4863A', path: 'weave' },
    { t: 0.45, speed: 0.0035, color: '#b84a44', path: 'right' }
  ];

  function drawFrame() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;
    const rIsland = Math.min(width, height) * 0.14;

    ctx.save();

    // 1. Drafting Grid Background
    ctx.strokeStyle = 'rgba(241, 236, 227, 0.025)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Central Roundabout Island
    ctx.beginPath();
    ctx.arc(cx, cy, rIsland, 0, Math.PI * 2);
    ctx.fillStyle = '#1e1e1d';
    ctx.fill();
    ctx.strokeStyle = '#B4863A';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, rIsland * 1.5, 0, Math.PI * 2);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(241, 236, 227, 0.15)';
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Central Island Label
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#B4863A';
    ctx.textAlign = 'center';
    ctx.fillText('MASKAN CHOWRANGI HUB', cx, cy - 3);
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = '#A8A196';
    ctx.fillText('DIAMETER: 32.0m', cx, cy + 11);

    // 4. Ingress / Egress Road Centerlines & Curbs
    ctx.strokeStyle = 'rgba(241, 236, 227, 0.12)';
    ctx.lineWidth = 1.2;

    // North
    ctx.beginPath();
    ctx.moveTo(cx - 45, 0);
    ctx.lineTo(cx - 45, cy - rIsland * 1.4);
    ctx.moveTo(cx + 45, 0);
    ctx.lineTo(cx + 45, cy - rIsland * 1.4);
    ctx.stroke();

    // South
    ctx.beginPath();
    ctx.moveTo(cx - 45, height);
    ctx.lineTo(cx - 45, cy + rIsland * 1.4);
    ctx.moveTo(cx + 45, height);
    ctx.lineTo(cx + 45, cy + rIsland * 1.4);
    ctx.stroke();

    // West
    ctx.beginPath();
    ctx.moveTo(0, cy - 45);
    ctx.lineTo(cx - rIsland * 1.4, cy - 45);
    ctx.moveTo(0, cy + 45);
    ctx.lineTo(cx - rIsland * 1.4, cy + 45);
    ctx.stroke();

    // East
    ctx.beginPath();
    ctx.moveTo(width, cy - 45);
    ctx.lineTo(cx + rIsland * 1.4, cy - 45);
    ctx.moveTo(width, cy + 45);
    ctx.lineTo(cx + rIsland * 1.4, cy + 45);
    ctx.stroke();

    // 5. Directional Flow Lines
    // Thru movement
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(82, 107, 120, 0.35)';
    ctx.lineWidth = 1.8;
    ctx.moveTo(cx - 22, 0);
    ctx.arcTo(cx - 22, cy - 22, 0, cy - 22, 50);
    ctx.lineTo(0, cy - 22);
    ctx.stroke();

    // Weave movement
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(180, 134, 58, 0.35)';
    ctx.lineWidth = 1.8;
    ctx.moveTo(cx + 22, 0);
    ctx.bezierCurveTo(cx + 35, cy - 35, cx + rIsland * 1.6, cy - 10, width, cy + 22);
    ctx.stroke();

    // Conflicting right turn
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(184, 74, 68, 0.4)';
    ctx.lineWidth = 1.8;
    ctx.moveTo(width, cy - 22);
    ctx.bezierCurveTo(cx + 35, cy - 22, cx + 22, cy + 35, cx + 22, height);
    ctx.stroke();

    // 6. Animate Flow Markers
    particles.forEach(p => {
      p.t = (p.t + p.speed) % 1;
      let px = 0, py = 0;

      if (p.path === 'thru') {
        if (p.t < 0.5) {
          px = cx - 22;
          py = (p.t / 0.5) * (cy - 22);
        } else {
          const u = (p.t - 0.5) / 0.5;
          px = (cx - 22) * (1 - u);
          py = cy - 22;
        }
      } else if (p.path === 'weave') {
        px = (cx + 22) + p.t * (width - (cx + 22));
        py = p.t * (cy + 22);
      } else if (p.path === 'right') {
        px = width - p.t * (width - (cx + 22));
        py = (cy - 22) + p.t * (height - (cy - 22));
      }

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    // 7. Conflict Technique Point Marker (TCT Point)
    const conflictX = cx + 34;
    const conflictY = cy - 16;
    const pulse = (Math.sin(Date.now() * 0.004) + 1) * 0.5;

    ctx.beginPath();
    ctx.arc(conflictX, conflictY, 10 + pulse * 5, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(184, 74, 68, ${0.6 - pulse * 0.35})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(conflictX, conflictY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#b84a44';
    ctx.fill();

    // Annotation
    ctx.strokeStyle = '#b84a44';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(conflictX, conflictY);
    ctx.lineTo(conflictX + 35, conflictY - 26);
    ctx.lineTo(conflictX + 160, conflictY - 26);
    ctx.stroke();

    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = '#b84a44';
    ctx.textAlign = 'left';
    ctx.fillText('TCT CONFLICT POINT : WEAVING', conflictX + 40, conflictY - 31);
    ctx.fillStyle = '#A8A196';
    ctx.fillText('Auto Rickshaw vs Circulating Stream', conflictX + 40, conflictY - 17);

    ctx.restore();

    animationId = requestAnimationFrame(drawFrame);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible = true;
        resize();
        if (!animationId) drawFrame();
      } else {
        isVisible = false;
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    });
  }, { threshold: 0.1 });

  document.addEventListener('DOMContentLoaded', () => {
    if (canvas) {
      observer.observe(canvas);
      window.addEventListener('resize', resize, { passive: true });
    }
  });
})();
