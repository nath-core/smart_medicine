import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Layers, CheckCircle2, Cpu, Eye, Sparkles } from 'lucide-react'

const EXPLODED_ITEMS = [
  {
    id: 1,
    name: 'Transparent cover',
    role: 'Visual enclosure lid allowing strip inspection without opening',
    type: 'Mechanical',
    coord: { x: '52%', y: '16%' },
    tech: 'Acrylic / Clear PET sheet, hinged mechanism',
  },
  {
    id: 2,
    name: 'Medicine box / strip holder',
    role: 'Physical partitioned tray for multi-dose daily blister strips',
    type: 'Mechanical',
    coord: { x: '50%', y: '28%' },
    tech: 'Cardboard / 3D-printable PLA compartmentalized divider',
  },
  {
    id: 3,
    name: 'Front panel',
    role: 'Structural mounting surface for OLED screen, buzzer aperture and LED',
    type: 'Mechanical',
    coord: { x: '51%', y: '40%' },
    tech: 'Cardboard / acrylic faceplate with precision cutouts',
  },
  {
    id: 4,
    name: 'OLED display (0.96")',
    role: '128×64 graphical display showing medicine, time, dosage & status',
    type: 'Electronic',
    coord: { x: '42%', y: '50%' },
    tech: 'SSD1306 driver, I²C protocol (SCL, SDA) 3.3V',
  },
  {
    id: 5,
    name: 'Piezo buzzer',
    role: 'Acoustic alarm output emitting rhythmic audible reminder beeps',
    type: 'Electronic',
    coord: { x: '58%', y: '51%' },
    tech: 'Passive buzzer driven by STM32 PWM timer channel',
  },
  {
    id: 6,
    name: 'LED indicator',
    role: 'Visual multi-color status alert for low-light & hearing-impaired users',
    type: 'Electronic',
    coord: { x: '66%', y: '50%' },
    tech: 'GPIO controlled, active-high with 220Ω current-limiting resistor',
  },
  {
    id: 7,
    name: 'STM32WB55 MCU board',
    role: 'Dual-core ARM Cortex-M4/M0+ running schedule check & future BLE',
    type: 'Embedded',
    coord: { x: '48%', y: '64%' },
    tech: 'STM32WB55 Nucleo/Dongle, 64 MHz, Bluetooth 5.0 wireless stack',
  },
  {
    id: 8,
    name: 'Rechargeable battery',
    role: 'Portable power concept supporting standalone operation',
    type: 'Power',
    coord: { x: '63%', y: '73%' },
    tech: '3.7V Li-ion / 5V power bank with step-down regulator',
  },
  {
    id: 9,
    name: 'Bottom enclosure base',
    role: 'Protective chassis housing controller board, battery and wiring',
    type: 'Mechanical',
    coord: { x: '50%', y: '84%' },
    tech: 'Folded reinforced cardboard / lightweight foam-board construction',
  },
]

export function ExplodedViewer() {
  const [activeId, setActiveId] = useState(4) // default to OLED

  const selectedItem = EXPLODED_ITEMS.find((item) => item.id === activeId) || EXPLODED_ITEMS[0]

  return (
    <div className="exploded-interactive-grid">
      {/* Visual Canvas with interactive hotspot pins */}
      <div className="exploded-canvas-wrap">
        <div className="exploded-canvas">
          <img
            src="/explorded_view.png"
            alt="Exploded diagram of the proposed smart medicine box"
            className="exploded-canvas-img"
          />

          {/* Interactive Radar Pins */}
          {EXPLODED_ITEMS.map((item) => {
            const isSelected = item.id === activeId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`hotspot-pin ${isSelected ? 'is-active' : ''}`}
                style={{ left: item.coord.x, top: item.coord.y }}
                aria-label={`Inspect ${item.name}`}
              >
                <span className="hotspot-pulse" />
                <span className="hotspot-core">{item.id}</span>
                {isSelected && (
                  <motion.div
                    layoutId="hotspotLabel"
                    className="hotspot-floating-tag"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {item.name}
                  </motion.div>
                )}
              </button>
            )
          })}
        </div>

        {/* Dynamic Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="exploded-highlight-card"
          >
            <div className="highlight-card-header">
              <span className="badge badge-accent">
                LAYER {String(selectedItem.id).padStart(2, '0')} · {selectedItem.type.toUpperCase()}
              </span>
              <span className="highlight-tag">CLICK ANY NUMBER ON DIAGRAM</span>
            </div>
            <h4>{selectedItem.name}</h4>
            <p className="highlight-role">{selectedItem.role}</p>
            <div className="highlight-meta">
              <Cpu size={14} className="text-accent" />
              <span>{selectedItem.tech}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Callout List */}
      <div className="exploded-list">
        <div className="exploded-list-header">
          <span className="eyebrow">EXPLODED ASSEMBLY SEQUENCE</span>
          <span className="count-pill">{EXPLODED_ITEMS.length} LAYERS</span>
        </div>
        <div className="exploded-items-stack">
          {EXPLODED_ITEMS.map((item) => {
            const isSelected = item.id === activeId
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`exploded-row-btn ${isSelected ? 'is-selected' : ''}`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="row-num">{String(item.id).padStart(2, '0')}</span>
                <div className="row-info">
                  <div className="row-name">{item.name}</div>
                  <div className="row-sub">{item.type}</div>
                </div>
                {isSelected ? (
                  <span className="active-dot" />
                ) : (
                  <span className="row-arrow">→</span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
