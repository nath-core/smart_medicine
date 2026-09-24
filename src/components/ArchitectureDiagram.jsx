import { useState } from 'react'
import { motion } from 'motion/react'
import { Clock, Cpu, Monitor, Volume2, Radio, Smartphone, Activity } from 'lucide-react'

const NODES = [
  {
    id: 'rtc',
    title: 'RTC Module',
    subtitle: 'Schedule Reference',
    protocol: 'I²C Bus (0x68)',
    desc: 'Maintains ultra-accurate timekeeping independent of system resets.',
    icon: Clock,
    type: 'input',
    color: '#38bdf8', // cyan
  },
  {
    id: 'mcu',
    title: 'STM32WB55 Core',
    subtitle: 'ARM Cortex-M4 + M0+',
    protocol: 'Core Logic & BLE Stack',
    desc: 'Executes schedule checks, handles GPIO/PWM events and BLE communication.',
    icon: Cpu,
    type: 'core',
    color: '#6366f1', // indigo
  },
  {
    id: 'oled',
    title: '0.96" OLED Display',
    subtitle: 'Visual Medicine Data',
    protocol: 'I²C Bus (0x3C)',
    desc: 'Displays medicine name, reminder time, dosage count and live system status.',
    icon: Monitor,
    type: 'output',
    color: '#06b6d4', // cyan-500
  },
  {
    id: 'buzzer',
    title: 'Buzzer + Alert LED',
    subtitle: 'Audio-Visual Prompts',
    protocol: 'PWM + GPIO Out',
    desc: 'Pairs acoustic alarm tones with visible flashing indicator cues.',
    icon: Volume2,
    type: 'output',
    color: '#f97316', // orange
  },
  {
    id: 'sensor',
    title: 'Magnetic / Hall Sensor',
    subtitle: 'Strip Removal Detection',
    protocol: 'EXTI GPIO Interrupt',
    desc: 'Detects the physical removal of the medicine from the strip using magnetic/Hall-effect sensing.',
    icon: Activity,
    type: 'input-sensor',
    color: '#10b981', // emerald
  },
  {
    id: 'ble',
    title: 'Proposed Mobile App',
    subtitle: 'Bluetooth 5.0 Link',
    protocol: 'BLE 2.4 GHz RF',
    desc: 'Future wireless sync to companion phone app for schedule setup and history logs.',
    icon: Smartphone,
    type: 'wireless',
    color: '#a855f7', // purple
  },
]

export function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState(NODES[1])

  return (
    <div className="architecture-interactive-wrap">
      {/* Visual Canvas Diagram */}
      <div className="arch-canvas">
        {/* Animated Background Circuit Grid */}
        <div className="arch-grid-bg" aria-hidden="true" />

        {/* Dynamic Connectors with Traveling Signal Pulses */}
        <svg className="arch-svg-lines" viewBox="0 0 900 480" fill="none">
          <defs>
            <linearGradient id="grad-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* RTC -> MCU Line */}
          <path d="M 180 180 L 380 240" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <motion.circle
            r="4"
            fill="#38bdf8"
            filter="url(#glow)"
            animate={{
              cx: [180, 380],
              cy: [180, 240],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Sensor -> MCU Line */}
          <path d="M 180 340 L 380 260" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <motion.circle
            r="4"
            fill="#10b981"
            filter="url(#glow)"
            animate={{
              cx: [180, 380],
              cy: [340, 260],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.5, ease: 'linear' }}
          />

          {/* MCU -> OLED Line */}
          <path d="M 520 230 L 720 110" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <motion.circle
            r="4"
            fill="#06b6d4"
            filter="url(#glow)"
            animate={{
              cx: [520, 720],
              cy: [230, 110],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2, ease: 'linear' }}
          />

          {/* MCU -> Buzzer Line */}
          <path d="M 520 250 L 720 240" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <motion.circle
            r="4"
            fill="#f97316"
            filter="url(#glow)"
            animate={{
              cx: [520, 720],
              cy: [250, 240],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.8, ease: 'linear' }}
          />

          {/* MCU -> BLE Line (Wireless Curved/dashed) */}
          <path d="M 520 270 Q 620 370 720 370" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="6 6" />
          <motion.circle
            r="4"
            fill="#a855f7"
            filter="url(#glow)"
            animate={{
              cx: [520, 620, 720],
              cy: [270, 340, 370],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 1.1, ease: 'linear' }}
          />
        </svg>

        {/* Nodes Layer */}
        <div className="arch-nodes-grid">
          {/* Left Column: Inputs */}
          <div className="arch-column arch-col-inputs">
            <span className="col-label">TIME &amp; SENSOR INPUTS</span>
            <NodeCard node={NODES[0]} active={activeNode.id === 'rtc'} onSelect={() => setActiveNode(NODES[0])} />
            <NodeCard node={NODES[4]} active={activeNode.id === 'sensor'} onSelect={() => setActiveNode(NODES[4])} />
          </div>

          {/* Center Column: Core Microcontroller */}
          <div className="arch-column arch-col-core">
            <span className="col-label">CENTRAL CONTROLLER</span>
            <NodeCard node={NODES[1]} active={activeNode.id === 'mcu'} onSelect={() => setActiveNode(NODES[1])} isCore />
          </div>

          {/* Right Column: Outputs & Wireless */}
          <div className="arch-column arch-col-outputs">
            <span className="col-label">OUTPUT SIGNALS &amp; CONNECTIVITY</span>
            <NodeCard node={NODES[2]} active={activeNode.id === 'oled'} onSelect={() => setActiveNode(NODES[2])} />
            <NodeCard node={NODES[3]} active={activeNode.id === 'buzzer'} onSelect={() => setActiveNode(NODES[3])} />
            <NodeCard node={NODES[5]} active={activeNode.id === 'ble'} onSelect={() => setActiveNode(NODES[5])} />
          </div>
        </div>
      </div>

      {/* Interactive Detail Inspector Box */}
      <div className="arch-inspector-bar">
        <div className="inspector-left">
          <div className="inspector-icon" style={{ color: activeNode.color, backgroundColor: `${activeNode.color}18` }}>
            <activeNode.icon size={22} />
          </div>
          <div>
            <div className="inspector-title-row">
              <strong>{activeNode.title}</strong>
              <span className="protocol-badge" style={{ borderColor: `${activeNode.color}40`, color: activeNode.color }}>
                {activeNode.protocol}
              </span>
            </div>
            <p className="inspector-desc">{activeNode.desc}</p>
          </div>
        </div>
        <div className="inspector-tip">
          <span>Click any block to inspect pinout &amp; protocol signals</span>
        </div>
      </div>
    </div>
  )
}

function NodeCard({ node, active, onSelect, isCore = false }) {
  const Icon = node.icon
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`arch-node-card ${active ? 'is-active' : ''} ${isCore ? 'is-core' : ''}`}
      style={{
        '--node-accent': node.color,
      }}
    >
      <div className="node-icon-box" style={{ color: node.color, backgroundColor: `${node.color}15` }}>
        <Icon size={isCore ? 24 : 18} />
      </div>
      <div className="node-text">
        <strong>{node.title}</strong>
        <small>{node.subtitle}</small>
      </div>
      {active && <span className="node-active-pulse" style={{ backgroundColor: node.color }} />}
    </motion.button>
  )
}
