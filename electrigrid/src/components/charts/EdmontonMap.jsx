import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// â”€â”€ Real Edmonton communities with approximate centre coordinates â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// [name, centLat, centLng, demand, blackout]
// demand & blackout = 0â€“100 (grid load %, blackout probability %)
const COMMUNITIES = [
  // â”€â”€ Downtown / Inner City â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ['Downtown',            53.5461, -113.5005, 96, 89],
  ['Oliver',              53.5448, -113.5278, 85, 76],
  ['Central McDougall',   53.5562, -113.5055, 91, 83],
  ['Queen Mary Park',     53.5618, -113.5108, 88, 79],
  ['McCauley',            53.5518, -113.4898, 94, 88],
  ['Boyle Street',        53.5432, -113.4840, 92, 85],
  ['Riverdale',           53.5275, -113.4775, 64, 50],
  ['Cloverdale',          53.5210, -113.4815, 58, 45],
  ['Rossdale',            53.5355, -113.4938, 72, 60],
  ['Glenora',             53.5385, -113.5482, 55, 41],
  // â”€â”€ North of River / Mid-North â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ['Westmount',           53.5682, -113.5282, 72, 61],
  ['Inglewood',           53.5735, -113.5005, 78, 67],
  ['Kensington',          53.5793, -113.5052, 65, 52],
  ['Calder',              53.5865, -113.5108, 69, 56],
  ['Griesbach',           53.5981, -113.5102, 61, 48],
  ['Beaumaris',           53.6075, -113.5262, 54, 40],
  ['Baturyn',             53.6195, -113.5305, 47, 33],
  ['Carlton',             53.6152, -113.5102, 45, 31],
  ['Crystallina Nera W',  53.6252, -113.4852, 44, 31],
  ['Albany',              53.6352, -113.5052, 39, 24],
  ['Starling',            53.6435, -113.4952, 35, 19],
  ['Rapperswill',         53.6295, -113.5452, 38, 23],
  ['Hudson',              53.6195, -113.5652, 39, 24],
  // â”€â”€ West Edmonton â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ['Glenwood',            53.5442, -113.6052, 67, 54],
  ['West Jasper Place',   53.5322, -113.6252, 73, 62],
  ['Elmwood Park',        53.5452, -113.5852, 69, 57],
  ['Jasper Park',         53.5382, -113.6052, 58, 46],
  ['Sherwood',            53.5622, -113.6052, 62, 49],
  ['Brookside',           53.5522, -113.6252, 55, 42],
  ['Ormsby Place',        53.5482, -113.6452, 48, 35],
  ['Lymburn',             53.5502, -113.6452, 45, 31],
  ['Callaghan',           53.5422, -113.6552, 37, 21],
  ['Glastonbury',         53.5582, -113.6502, 41, 27],
  ['The Uplands',         53.5432, -113.5652, 43, 29],
  ['Secord',              53.5842, -113.6102, 42, 28],
  ['Rosenthal',           53.5872, -113.5852, 40, 25],
  ['Chambery',            53.6022, -113.5952, 37, 21],
  ['The Hamptons',        53.6252, -113.5602, 52, 38],
  // â”€â”€ East Edmonton â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ['Eastwood',            53.5452, -113.4402, 83, 74],
  ['Beacon Heights',      53.5522, -113.4302, 68, 55],
  ['Beverly Heights',     53.5582, -113.4252, 76, 64],
  ['Bergman',             53.5652, -113.4252, 71, 59],
  ['Homesteader',         53.5722, -113.4252, 66, 53],
  ['Brintnell',           53.5952, -113.4102, 59, 46],
  ['Kernohan',            53.5852, -113.4302, 55, 42],
  ['Casselman',           53.5782, -113.4452, 62, 49],
  ['Fraser',              53.6035, -113.4352, 56, 43],
  // â”€â”€ South / Southeast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ['Argyll',              53.5205, -113.4602, 66, 52],
  ['Avonmore',            53.5155, -113.4702, 62, 49],
  ['Mill Creek',          53.5082, -113.4652, 57, 44],
  ['Ritchie',             53.5072, -113.4902, 59, 46],
  ['Strathearn',          53.5152, -113.4552, 53, 40],
  ['Belgravia',           53.5022, -113.5352, 48, 35],
  ['Pleasantview',        53.4952, -113.5202, 51, 38],
  ['Malmo Plains',        53.4872, -113.5282, 45, 32],
  ['Allendale',           53.4952, -113.5452, 56, 43],
  ['Lendrum Place',       53.4882, -113.5452, 53, 40],
  ['Duggan',              53.4822, -113.5252, 48, 35],
  ['Keheewin',            53.4722, -113.5302, 40, 26],
  ['Sweet Grass',         53.4652, -113.5202, 44, 31],
  ['Leger',               53.4552, -113.5202, 38, 22],
  ['Ellerslie',           53.4452, -113.5002, 36, 20],
  ['Hays Ridge',          53.4322, -113.4852, 35, 18],
  ['Twin Brooks',         53.4722, -113.5202, 42, 28],
  // â”€â”€ Southwest â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ['Terwillegar Towne',   53.4782, -113.5752, 50, 37],
  ['Windermere',          53.4482, -113.5902, 49, 36],
  ['Ambleside',           53.4582, -113.5852, 38, 23],
  ['Rutherford',          53.4402, -113.5552, 44, 30],
  ['Allard',              53.4352, -113.5752, 40, 26],
  ['Cavanagh',            53.4322, -113.5902, 36, 20],
  ['Magrath Heights',     53.4422, -113.5352, 42, 28],
  ['MacEwan',             53.4252, -113.5552, 33, 16],
  ['Desrochers',          53.4182, -113.5752, 34, 17],
  ['Jagare Ridge',        53.4552, -113.5802, 39, 24],
  ['Running Deer',        53.4632, -113.5552, 46, 32],
  // â”€â”€ Southeast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ['Summerside',          53.4682, -113.4102, 47, 33],
  ['Tamarack',            53.4782, -113.4202, 43, 30],
  ['Laurel',              53.4882, -113.4202, 40, 26],
  ['Silver Berry',        53.4852, -113.4352, 56, 43],
  ['Charlesworth',        53.4682, -113.4402, 46, 33],
  ['Maple',               53.4982, -113.4102, 60, 47],
  ['Bown Crossing',       53.4582, -113.4302, 43, 29],
  ['South Terwillegar',   53.4682, -113.5652, 49, 35],
]

// Half-sizes of each community cell (degrees). ~1.1km Ã— 0.9km
const LAT_HALF = 0.009
const LNG_HALF = 0.013

// Build a simple rectangular polygon centred on (lat, lng)
function makeRect(lat, lng) {
  const n = lat + LAT_HALF, s = lat - LAT_HALF
  const e = lng + LNG_HALF, w = lng - LNG_HALF
  // GeoJSON rings are [lng, lat]
  return [[[w, s], [e, s], [e, n], [w, n], [w, s]]]
}

// Stable local GeoJSON â€” built once, no network
function buildEdmontonGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: COMMUNITIES.map(([name, lat, lng, demand, blackout]) => ({
      type: 'Feature',
      properties: { name, demand, blackout },
      geometry: { type: 'Polygon', coordinates: makeRect(lat, lng) },
    })),
  }
}

// Colour ramp: green â†’ amber â†’ red based on demand %
function demandColor(demand) {
  if (demand >= 85) return '#D0021B'
  if (demand >= 70) return '#E05C1A'
  if (demand >= 55) return '#F5A623'
  if (demand >= 40) return '#C8B400'
  return '#2EBA7E'
}

function styleFeature(feature) {
  const { demand } = feature.properties
  return {
    fillColor:   demandColor(demand),
    fillOpacity: 0.55,
    color:       '#003153',
    weight:      0.8,
    opacity:     0.6,
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function EdmontonMap() {
  const [selected, setSelected] = useState(null)

  const geoData = useMemo(() => buildEdmontonGeoJSON(), [])

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover(e) {
        e.target.setStyle({ weight: 2, fillOpacity: 0.78, color: '#ffffff' })
        e.target.bringToFront()
      },
      mouseout(e) {
        e.target.setStyle(styleFeature(feature))
      },
      click() {
        setSelected(feature.properties)
      },
    })
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-prussian/10" style={{ height: 480 }}>
      <MapContainer
        center={[53.5461, -113.4938]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.35}
        />
        <GeoJSON
          data={geoData}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur rounded-xl
                      border border-prussian/10 shadow-card px-3.5 py-3 text-xs">
        <p className="font-semibold text-charcoal mb-2">Grid Demand</p>
        {[
          { label: 'Critical (85%+)',    color: '#D0021B' },
          { label: 'High (70â€“84%)',      color: '#E05C1A' },
          { label: 'Moderate (55â€“69%)', color: '#F5A623' },
          { label: 'Elevated (40â€“54%)', color: '#C8B400' },
          { label: 'Normal (<40%)',      color: '#2EBA7E' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2 mb-1 last:mb-0">
            <div className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: l.color, opacity: 0.8 }} />
            <span className="text-slate">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Selected community panel */}
      {selected && (
        <div className="absolute bottom-3 right-3 z-[1000] bg-prussian text-white rounded-xl
                        shadow-xl px-4 py-3.5 min-w-[190px] text-xs">
          <div className="flex items-start justify-between gap-3 mb-3">
            <p className="font-semibold leading-snug">{selected.name}</p>
            <button
              onClick={() => setSelected(null)}
              className="text-white/50 hover:text-white shrink-0"
            >âœ•</button>
          </div>
          {[
            { label: 'Grid Demand',    value: selected.demand,   color: demandColor(selected.demand) },
            { label: 'Blackout Risk',  value: selected.blackout, color: '#D0021B' },
          ].map(({ label, value, color }) => (
            <div key={label} className="mb-2 last:mb-0">
              <div className="flex justify-between mb-1">
                <span className="text-white/60">{label}</span>
                <span className="font-bold" style={{ color }}>{value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20">
                <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
