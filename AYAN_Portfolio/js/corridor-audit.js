/**
 * AYAN HASAN : PERSONAL ENGINEERING PORTFOLIO
 * Project : Urban Infrastructure Audit (Allama Shabbir Ahmed Usmani Road)
 * Interactive 16-Segment Chainage Inspector (0+000 to 3+200)
 * Note: Zero dash characters in visible copy (Rule 22)
 */

(function () {
  'use strict';

  // 16 Real Survey Segments across the 3.2 km corridor (200m chainage intervals)
  const corridorSegments = [
    {
      id: 'SEG 01',
      start: '0+000',
      end: '0+200',
      landmark: 'Corridor Origin : Western Roundabout Approach',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.5m, Median: 1.2m)',
      encroachments: 'None Observed (Clear ROW)',
      defects: 'Minor surface hairline cracking',
      parking: 'Regulated curb parking',
      priority: 'Low',
      sheetRef: 'DWG UE 01'
    },
    {
      id: 'SEG 02',
      start: '0+200',
      end: '0+400',
      landmark: 'Commercial Sector North Facing Block',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.5m, Shoulder: 1.5m)',
      encroachments: 'Temporary signage on pedestrian sidewalk (2 instances)',
      defects: 'Edge raveling (12m longitudinal length)',
      parking: 'Angular unauthorized vehicle parking',
      priority: 'Medium',
      sheetRef: 'DWG UE 02'
    },
    {
      id: 'SEG 03',
      start: '0+400',
      end: '0+600',
      landmark: 'Mid Block Mixed Residential Commercial Zone',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.2m, Median: 1.0m)',
      encroachments: 'Extended shop front awnings encroaching 0.8m into sidewalk',
      defects: 'Satisfactory pavement condition index (PCI: 82)',
      parking: 'Parallel street parking',
      priority: 'Low',
      sheetRef: 'DWG UE 03'
    },
    {
      id: 'SEG 04',
      start: '0+600',
      end: '0+800',
      landmark: 'Major Commercial Plaza & Bank Node',
      geometry: 'Dual 3 Lane Divided with Service Lane Integration',
      encroachments: 'Permanent concrete ramps encroaching road drainage gutter',
      defects: 'Transverse thermal cracks at 35m spacing',
      parking: 'Double row illegal parking reducing effective width by 3.2m',
      priority: 'High',
      sheetRef: 'DWG UE 04'
    },
    {
      id: 'SEG 05',
      start: '0+800',
      end: '1+000',
      landmark: 'Educational Institute Pedestrian Access Zone',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.5m, Sidewalk: 2.4m)',
      encroachments: 'Informal vendor stalls adjacent to school gate',
      defects: 'Minor rutting in outer wheel path (depth: 8mm)',
      parking: 'School van queueing during peak hours (07:30 to 08:30)',
      priority: 'Medium',
      sheetRef: 'DWG UE 05'
    },
    {
      id: 'SEG 06',
      start: '1+000',
      end: '1+200',
      landmark: 'Institutional Campus Boundary : Green Belt',
      geometry: 'Dual 3 Lane Divided (Carriageway: 11.0m, Wide Median: 2.0m)',
      encroachments: 'None Observed',
      defects: 'Good structural condition (PCI: 88)',
      parking: 'No parking zone maintained',
      priority: 'Low',
      sheetRef: 'DWG UE 06'
    },
    {
      id: 'SEG 07',
      start: '1+200',
      end: '1+400',
      landmark: 'Hospital & Emergency Access Approach',
      geometry: 'Dual 3 Lane Divided with Dedicated Ambulance Ingress',
      encroachments: 'Unauthorized taxi rickshaw staging stand (6 to 8 units)',
      defects: 'Pothole patch deterioration at chainage 1+310',
      parking: 'Drop off congestion at hospital gate',
      priority: 'High',
      sheetRef: 'DWG UE 07'
    },
    {
      id: 'SEG 08',
      start: '1+400',
      end: '1+600',
      landmark: 'Maskan Chowrangi Intersection Approach (Major Hub)',
      geometry: 'Flared 4 Lane Approach with 80m Weaving Section',
      encroachments: 'Informal commercial kiosks blocking pedestrian sightlines',
      defects: 'Severe corrugation & shoving in deceleration lane (depth: 18mm)',
      parking: 'Illegal multi modal staging (rickshaws, pickups, buses)',
      priority: 'High',
      sheetRef: 'DWG UE 08'
    },
    {
      id: 'SEG 09',
      start: '1+600',
      end: '1+800',
      landmark: 'Eastbound Egress from Maskan Intersection',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.5m)',
      encroachments: 'Vegetation overgrown into lateral clearance zone (0.6m)',
      defects: 'Alligator cracking localized in outer wheel track (18 sq.m)',
      parking: 'Intermittent curb parking',
      priority: 'Medium',
      sheetRef: 'DWG UE 09'
    },
    {
      id: 'SEG 10',
      start: '1+800',
      end: '2+000',
      landmark: 'Residential High Density Apartment Strip',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.5m, Median: 1.5m)',
      encroachments: 'Resident vehicle shade canopies extending past property line',
      defects: 'Minor longitudinal joint separation',
      parking: 'Overnight resident vehicle spillover onto road shoulder',
      priority: 'Medium',
      sheetRef: 'DWG UE 10'
    },
    {
      id: 'SEG 11',
      start: '2+000',
      end: '2+200',
      landmark: 'Auto Workshop & Commercial Service Cluster',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.0m, Encroached Shoulder)',
      encroachments: 'Hydraulic jacks, discarded tires & repair work on active lane',
      defects: 'Oil spill saturation causing binder stripping & surface raveling',
      parking: 'Derelict vehicles parked long term on pedestrian footpath',
      priority: 'High',
      sheetRef: 'DWG UE 11'
    },
    {
      id: 'SEG 12',
      start: '2+200',
      end: '2+400',
      landmark: 'Fuel Station & Convenience Retail Hub',
      geometry: 'Dual 3 Lane Divided with 2 Curb Cuts (Width: 12m each)',
      encroachments: 'Commercial promotional boards in clear sightline',
      defects: 'Depression at fuel tanker ingress point (depth: 22mm)',
      parking: 'Queue spillback during peak fuel refill periods',
      priority: 'Medium',
      sheetRef: 'DWG UE 12'
    },
    {
      id: 'SEG 13',
      start: '2+400',
      end: '2+600',
      landmark: 'Public Park & Recreational Footpath Corridor',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.8m, Sidewalk: 3.0m)',
      encroachments: 'None Observed',
      defects: 'Satisfactory condition (PCI: 79)',
      parking: 'Evening visitor parking along outer lane',
      priority: 'Low',
      sheetRef: 'DWG UE 13'
    },
    {
      id: 'SEG 14',
      start: '2+600',
      end: '2+800',
      landmark: 'Secondary Intersection & Signalized Crossing',
      geometry: 'Dual 3 Lane Divided with Left Turn Storage Pocket',
      encroachments: 'Vendor pushcarts positioned at pedestrian curb ramps',
      defects: 'Pavement rutting along heavy vehicle stop line',
      parking: 'Restricted 50m approach parking zone mostly observed',
      priority: 'Medium',
      sheetRef: 'DWG UE 14'
    },
    {
      id: 'SEG 15',
      start: '2+800',
      end: '3+000',
      landmark: 'Low Density Residential Perimeter',
      geometry: 'Dual 3 Lane Divided (Carriageway: 10.5m, Median: 1.2m)',
      encroachments: 'Boundary wall setback compliance: 100%',
      defects: 'Minor surface weathering, no structural fatigue',
      parking: 'Minimal parking demand',
      priority: 'Low',
      sheetRef: 'DWG UE 15'
    },
    {
      id: 'SEG 16',
      start: '3+000',
      end: '3+200',
      landmark: 'Corridor Eastern Terminus & Arterial Merge',
      geometry: 'Tapered Merge into Primary Urban Arterial (4 Lane Split)',
      encroachments: 'Unauthorized billboard foundations at corner radius',
      defects: 'Pavement edge breakdown due to lack of concrete curb support',
      parking: 'Heavy goods vehicle informal rest staging',
      priority: 'High',
      sheetRef: 'DWG UE 16'
    }
  ];

  function initCorridorInspector() {
    const trackEl = document.getElementById('corridor-track');
    const panelEl = document.getElementById('segment-inspector');
    if (!trackEl || !panelEl) return;

    trackEl.innerHTML = '';
    corridorSegments.forEach((seg, index) => {
      const node = document.createElement('button');
      node.className = `chainage-node-btn ${seg.priority === 'High' ? 'has-severe-defect' : ''} ${index === 7 ? 'active' : ''}`;
      node.setAttribute('type', 'button');
      node.setAttribute('aria-label', `Inspect ${seg.id} chainage ${seg.start} to ${seg.end}`);
      node.dataset.index = index;

      node.innerHTML = `
        <span class="node-code-text">${seg.id}</span>
        <span class="node-meter-text">${seg.start}</span>
      `;

      node.addEventListener('click', () => selectSegment(index));
      node.addEventListener('mouseenter', () => selectSegment(index));

      trackEl.appendChild(node);
    });

    renderSegmentDetails(corridorSegments[7]);
  }

  function selectSegment(index) {
    const allNodes = document.querySelectorAll('.chainage-node-btn');
    allNodes.forEach((n, i) => {
      if (i === index) n.classList.add('active');
      else n.classList.remove('active');
    });

    renderSegmentDetails(corridorSegments[index]);
  }

  function renderSegmentDetails(seg) {
    const panelEl = document.getElementById('segment-inspector');
    if (!panelEl) return;

    const priorityClass = seg.priority === 'High' ? 'val-danger' : (seg.priority === 'Medium' ? 'val-warning' : 'val-success');

    panelEl.innerHTML = `
      <div class="dash-col-left">
        <h5>SEGMENT AUDIT SPECIFICATION : ${seg.sheetRef}</h5>
        <div class="dash-chainage-heading">${seg.id} [ ${seg.start} to ${seg.end} ]</div>
        <p class="dash-location-text"><strong>Location:</strong> ${seg.landmark}</p>
        <p class="dash-location-text" style="margin-top: 0.35rem; color: #A8A196;"><strong>Cross Section:</strong> ${seg.geometry}</p>
      </div>

      <div class="dash-grid-metrics">
        <div class="dash-stat-cell">
          <span class="dash-stat-label">Land Use Encroachments</span>
          <span class="dash-stat-val">${seg.encroachments}</span>
        </div>

        <div class="dash-stat-cell">
          <span class="dash-stat-label">Pavement Distress / Defects</span>
          <span class="dash-stat-val">${seg.defects}</span>
        </div>

        <div class="dash-stat-cell">
          <span class="dash-stat-label">Parking &amp; Obstructions</span>
          <span class="dash-stat-val">${seg.parking}</span>
        </div>

        <div class="dash-stat-cell">
          <span class="dash-stat-label">Maintenance Prioritisation</span>
          <span class="dash-stat-val ${priorityClass}">● ${seg.priority.toUpperCase()} ACTION REQUIRED</span>
        </div>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', initCorridorInspector);
})();
