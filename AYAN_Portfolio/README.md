# Ayan Hasan : Personal Engineering Portfolio

A production-quality personal engineering portfolio website for **Ayan Hasan**, Civil Engineer (B.E. Civil Engineering, NED University of Engineering & Technology, Karachi).

---

## 🏛️ Design & Engineering Direction

- **Writing Style**: Professional report / CV language for experience, project technical contributions, and leadership (active verbs, zero first-person pronouns in technical sections). Personal narrative retained in the About section. Zero third-person pronouns.
- **Section Contrast & Visual Rhythm**: A controlled alternation of:
  - Deep Charcoal (`#171716` / `#121211`) for Hero, Experience, Leadership, and Contact
  - Warm Editorial Cream (`#F8F4EC`) for About, Projects / Flagship, Technical Toolkit, and Registration
  - Embedded Dark Technical Instrument for the **Interactive 16-Segment Chainage Inspector** (`#141413`)
  - Restrained Ochre (`#B4863A` / `#8F6522`) and Soft Lavender (`#A79AAE`) accents
- **Interactive Maskan Field Observation Visual**:
  - The schematic intersection CAD canvas acts as a visual navigation index for real field survey evidence (`SCHEMATIC VISUAL → FIELD OBSERVATION → ACTUAL SURVEY FOOTAGE`).
  - Pulsing beacon hotspot at the primary conflict point (`FIELD OBS. 01`).
  - Desktop hover reveals a compact muted video preview of the push cart vendor occupying the active carriageway lane.
  - Clicking the hotspot or preview opens a full-screen focused media player with technical field survey notes. Mobile supports tap-to-inspect.
- **Header Lockup**: Upper sticky navigation displays cleanly as `AYAN HASAN`. The hero cover establishes `AYAN HASAN` + `Civil Engineer`.
- **Persistent Left Navigation Rail**: Subtle desktop action rail with LinkedIn, Direct Email Compose action (`mailto:ayanhasan.nn@gmail.com`), Back to Top, and coordinate datum `24°48'N 67°03'E`.
- **Balanced Contact Section**: Compact, visually balanced 2-column layout aligning the left direct contact info and right enquiry form.
- **Continuous 2D Motion Graphic**: Refined 2D technical drawing system evolving from structural grids $\rightarrow$ roadway alignment & chainage (`STA 0+000`, `STA 0+213`...) $\rightarrow$ topographic contours $\rightarrow$ coastal DEM mesh $\rightarrow$ baseline.
- **Authenticity**: 100% verified academic and field records from NED University. Real GIS maps, DEM profiles, GeoClaw steps, corridor sheets, field observation video, and CAD cross-sections. Zero dash characters in visible copy.

---

## 📁 Repository Structure

```
AYAN_Portfolio/
├── index.html                     # Semantic, accessible HTML5 single-page structure
├── README.md                      # Documentation & deployment instructions
├── css/
│   ├── main.css                   # Alternating section themes, editorial typography, resets
│   ├── layout.css                 # Persistent left rail, adaptive header, hero cover, responsive grids
│   ├── components.css             # Editorial buttons, figure captions, lightbox viewer, toast notices
│   ├── projects.css               # Flagship case study, 1-row figure selector, hotspot & corridor inspector
│   └── scroll-art.css             # 2D continuous technical drawing canvas & surveying HUD
├── js/
│   ├── main.js                    # Navigation, adaptive header theme spy, lightbox & video media modal
│   ├── scroll-art.js              # Continuous 2D engineering drawing canvas & chainage HUD engine
│   ├── corridor-audit.js          # Interactive 16-segment Maskan corridor chainage inspector
│   ├── intersection-canvas.js     # Animated schematic traffic conflict diagram
│   └── contact-form.js            # Compact mailto encoder, email compose actions
└── assets/
    ├── profile/
    │   └── Ayan_proifle_pic.PNG   # Editorial profile photograph with lavender/mauve hijab
    ├── certificates/
    │   └── pec-logo.png           # Pakistan Engineering Council official logo mark
    └── projects/
        ├── fyp/
        │   ├── tsunami-study-area.png   # Karachi coastal belt study area map
        │   ├── dem-profile.png          # Topographic-bathymetric DEM profile transect
        │   ├── geoclaw-steps.png        # Hydrodynamic simulation methodology workflow
        │   └── rmse-graph.png           # GNSS validation error chart (RMSE ±2.98 m)
        ├── infrastructure/
        │   ├── usmani-corridor-1.png    # Usmani Road corridor audit sheet 01
        │   └── usmani-corridor-2.png    # Usmani Road corridor audit sheet 02
        ├── traffic/
        │   ├── disco-conflict.png       # Disco Bakery spatial traffic conflict mapping
        │   ├── Pedestrain count.jpeg    # Disaggregated 15-min pedestrian survey sheet
        │   ├── Push Cart Vendor.mov     # Original field survey video footage
        │   └── push-cart-vendor.mp4     # Web-optimized field survey video footage
        └── Shah rah-e Faisal/
            ├── existing cross section.png # Existing roadway geometric cross-section
            └── cross section.png          # Proposed geometric redesign
```

---

## 🚀 How to Run Locally

Because the project is built with standard HTML5, modern CSS3, and ES6 JavaScript, **no build step or package installation is required**.

### Option 1: Direct File Opening
Double-click `index.html` or open in any browser.

### Option 2: Local HTTP Server (Python)
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000`.

---

## 🌐 Deploying to GitHub Pages

1. Push this folder to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Add interactive Maskan field observation visual and video evidence"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Enable GitHub Pages under **Settings** $\rightarrow$ **Pages** on your repository.

---

## 📬 Contact Information

- **Name**: Ayan Hasan
- **Designation**: Civil Engineer
- **Location**: DHA, Karachi, Pakistan
- **Email**: [ayanhasan.nn@gmail.com](mailto:ayanhasan.nn@gmail.com)
- **Phone**: +92 301 2875400
- **LinkedIn**: [linkedin.com/in/ayan-hasan](https://www.linkedin.com/in/ayan-hasan)
