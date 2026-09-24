import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import confetti from 'canvas-confetti'
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Smartphone,
  Radio,
  Clock,
  Pill,
  Send,
} from 'lucide-react'
import { buzzerAudio } from '../utils/audio'

const PRESETS = [
  { name: 'Paracetamol', time: '08:00', dose: '1 Tablet' },
  { name: 'Metformin', time: '13:00', dose: '500mg' },
  { name: 'Atorvastatin', time: '20:00', dose: '10mg' },
]

export function LiveSimulator() {
  const [medicineName, setMedicineName] = useState('Paracetamol')
  const [reminderTime, setReminderTime] = useState('08:00')
  const [dose, setDose] = useState('1 Tablet')
  const [state, setState] = useState('scheduled') // 'scheduled' | 'active' | 'interaction' | 'missed'
  const [isMuted, setIsMuted] = useState(false)
  const [activityLog, setActivityLog] = useState([
    { id: '1', title: 'System initialized', detail: 'RTC calibrated to 08:00', time: '07:55 AM', tone: 'blue' },
    { id: '2', title: 'Schedule loaded', detail: 'Paracetamol · 1 Tablet', time: '07:56 AM', tone: 'cyan' },
  ])
  const [draftMedicine, setDraftMedicine] = useState('Paracetamol')
  const [draftTime, setDraftTime] = useState('08:00')
  const [remainingStock, setRemainingStock] = useState(6)
  const [phoneNotification, setPhoneNotification] = useState(null)
  const [lidOpen, setLidOpen] = useState(false)

  // Handle alarm sound effects
  useEffect(() => {
    if (state === 'active') {
      buzzerAudio.startAlarm()
      setPhoneNotification({
        title: 'MEDICINE TIME',
        body: `Time for ${medicineName} (${dose})`,
        time: 'Just now',
      })
    } else {
      buzzerAudio.stopAlarm()
      if (state === 'interaction') {
        buzzerAudio.successTone()
      }
    }
    return () => buzzerAudio.stopAlarm()
  }, [state, medicineName, dose])

  const addLog = (title, detail, tone = 'blue') => {
    const timeStr = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date())
    setActivityLog((prev) => [
      { id: `${Date.now()}-${Math.random()}`, title, detail, time: timeStr, tone },
      ...prev.slice(0, 7),
    ])
  }

  const triggerReminder = () => {
    setState('active')
    setLidOpen(false)
    addLog('Reminder triggered', `${medicineName} · ${formatTime(reminderTime)}`, 'orange')
  }

  const simulateInteraction = () => {
    setState('interaction')
    setLidOpen(true)
    const nextStock = Math.max(0, remainingStock - 1)
    setRemainingStock(nextStock)

    addLog('Removal detected', `Magnetic/Hall-effect sensor: 1 tablet removed (${nextStock} left)`, 'green')

    if (nextStock <= 2) {
      setPhoneNotification({
        title: 'LOW STOCK REFILL ALERT',
        body: `Only ${nextStock} doses left for ${medicineName}. Please refill strip.`,
        time: 'Just now',
        type: 'warning',
      })
      addLog('Stock Alert', `Low stock detected (${nextStock} remaining) · Refill reminder sent`, 'red')
    } else {
      setPhoneNotification({
        title: 'INTAKE VERIFIED',
        body: `Strip removal verified for ${medicineName} · Stock: ${nextStock}`,
        time: 'Just now',
        type: 'success',
      })
    }

    // Confetti celebration burst
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#34d399', '#818cf8', '#f59e0b'],
      })
    } catch {
      // Confetti fallback
    }

    // Auto-close lid after 3 seconds
    setTimeout(() => {
      setLidOpen(false)
    }, 3500)
  }

  const simulateMissed = () => {
    setState('missed')
    setLidOpen(false)
    addLog('Reminder timeout', 'Simulated missed dose event recorded', 'red')
    setPhoneNotification({
      title: 'MISSED REMINDER',
      body: `No strip removal detected for ${medicineName}`,
      time: 'Just now',
      type: 'warning',
    })
  }

  const refillStock = () => {
    setRemainingStock(10)
    addLog('Stock Refilled', `Strip capacity restored to 10 tablets`, 'cyan')
    setPhoneNotification({
      title: 'STRIP REFILLED',
      body: `10 tablets loaded into ${medicineName} compartment`,
      time: 'Just now',
      type: 'success',
    })
    buzzerAudio.clickTone()
  }

  const resetSimulation = () => {
    setState('scheduled')
    setLidOpen(false)
    setMedicineName('Paracetamol')
    setReminderTime('08:00')
    setDraftMedicine('Paracetamol')
    setDraftTime('08:00')
    setRemainingStock(6)
    setPhoneNotification(null)
    buzzerAudio.stopAlarm()
    addLog('Simulation reset', 'Default parameters restored', 'blue')
  }

  const toggleSound = () => {
    const nextMuted = buzzerAudio.toggleMute()
    setIsMuted(nextMuted)
  }

  const handleUpdateMedicine = (e) => {
    e.preventDefault()
    if (!draftMedicine.trim()) return
    setMedicineName(draftMedicine.trim())
    setState('scheduled')
    addLog('Schedule updated', `New medicine: ${draftMedicine.trim()}`, 'cyan')
    buzzerAudio.clickTone()
  }

  const handleUpdateTime = (e) => {
    e.preventDefault()
    if (!draftTime) return
    setReminderTime(draftTime)
    setState('scheduled')
    addLog('Schedule updated', `New reminder time: ${formatTime(draftTime)}`, 'cyan')
    buzzerAudio.clickTone()
  }

  const applyPreset = (preset) => {
    setMedicineName(preset.name)
    setReminderTime(preset.time)
    setDose(preset.dose)
    setDraftMedicine(preset.name)
    setDraftTime(preset.time)
    setState('scheduled')
    addLog('Preset applied', `${preset.name} (${preset.dose})`, 'cyan')
    buzzerAudio.clickTone()
  }

  return (
    <div className="simulator-grid">
      {/* LEFT: 3D Hardware Prototype Chamber */}
      <div className="simulator-hardware-card">
        <div className="sim-card-topbar">
          <div className="sim-status-chip">
            <span className={`sim-indicator-dot dot--${state}`} />
            <span>STATE: {state.toUpperCase()}</span>
          </div>

          <div className="sim-audio-toggle">
            <button
              type="button"
              onClick={toggleSound}
              className={`sound-btn ${isMuted ? 'is-muted' : ''}`}
              title={isMuted ? 'Unmute buzzer sound' : 'Mute buzzer sound'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{isMuted ? 'MUTED' : 'BUZZER SOUND ON'}</span>
            </button>
          </div>
        </div>

        {/* 3D Device Stage */}
        <div className="sim-device-stage">
          {/* Ambient Glow */}
          <div className={`sim-device-glow glow--${state}`} />

          {/* Physical Box */}
          <motion.div
            className="sim-physical-box"
            animate={{
              y: state === 'active' ? [0, -3, 0, 3, 0] : 0,
            }}
            transition={{
              duration: 0.25,
              repeat: state === 'active' ? Infinity : 0,
            }}
          >
            {/* Transparent Acrylic Top Lid */}
            <div
              className={`sim-box-lid ${lidOpen ? 'is-opened' : ''}`}
              style={{
                transform: lidOpen ? 'rotateX(-75deg)' : 'rotateX(-12deg)',
              }}
            >
              <div className="lid-glass-sheen" />
              <div className="lid-compartment-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="lid-pill-mockup">
                <span className="mock-strip" />
              </div>
            </div>

            {/* Front Bezel with Embedded Hardware */}
            <div className="sim-box-front">
              {/* 0.96" OLED Graphic Display */}
              <div className="sim-oled-screen">
                <div className="oled-scanlines" />
                <div className="oled-header-line">
                  <span>MEDITRACK OLED</span>
                  <span className="oled-clock">{formatTime(reminderTime)}</span>
                </div>
                <div className="oled-body">
                  <div className="oled-med-title">{medicineName.toUpperCase()}</div>
                  <div className="oled-med-dose">{dose} · REM: {remainingStock} TABS</div>
                </div>
                <div className="oled-footer-line">
                  <span className={`oled-badge badge--${state}`}>
                    ● {state === 'active' ? 'ALERTING' : state === 'interaction' ? 'REMOVAL DETECTED' : 'STANDBY'}
                  </span>
                </div>
              </div>

              {/* Piezo Buzzer Hole with Animated Sound Waves */}
              <div className="sim-buzzer-wrap">
                <div className={`sim-buzzer-vent ${state === 'active' ? 'is-buzzing' : ''}`}>
                  <span className="vent-hole" />
                </div>
                <span className="comp-label">BUZZER</span>
                {state === 'active' && (
                  <motion.div
                    className="sound-waves-aura"
                    animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                )}
              </div>

              {/* Alert Status LED Indicator */}
              <div className="sim-led-wrap">
                <div className={`sim-led-diode diode--${state}`}>
                  <span className="diode-core" />
                </div>
                <span className="comp-label">LED</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Signals & Sensor Strip */}
        <div className="sim-signal-indicators">
          <div className={`sig-item ${state === 'active' ? 'is-active-sig' : ''}`}>
            <span className="sig-light sig-orange" />
            <div>
              <strong>Acoustic Buzzer</strong>
              <small>{state === 'active' ? 'Pulsing 1.4 kHz' : 'Silent'}</small>
            </div>
          </div>
          <div className={`sig-item ${state === 'active' ? 'is-active-sig' : state === 'interaction' ? 'is-ok-sig' : ''}`}>
            <span className={`sig-light ${state === 'interaction' ? 'sig-green' : 'sig-orange'}`} />
            <div>
              <strong>Status LED</strong>
              <small>{state === 'active' ? 'Flashing Amber' : state === 'interaction' ? 'Solid Green' : 'Idle'}</small>
            </div>
          </div>
          <div className={`sig-item ${state === 'interaction' ? 'is-ok-sig' : ''}`}>
            <span className="sig-light sig-green" />
            <div>
              <strong>Magnetic / Hall Sensor</strong>
              <small>{state === 'interaction' ? 'Removal Event' : 'Strip Monitored'}</small>
            </div>
          </div>
          <div className="sig-item">
            <span className={`sig-light ${remainingStock <= 2 ? 'sig-orange' : 'sig-green'}`} />
            <div>
              <strong>Strip Stock Tracker</strong>
              <small>{remainingStock} of 10 Tablets left</small>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="sim-action-buttons">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={triggerReminder}
            className="sim-btn sim-btn-primary"
          >
            <Bell size={15} />
            <span>1. Trigger Scheduled Alarm</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={simulateInteraction}
            className="sim-btn sim-btn-success"
          >
            <CheckCircle2 size={15} />
            <span>2. Detect Medicine Removal</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={simulateMissed}
            className="sim-btn sim-btn-warning"
          >
            <AlertCircle size={15} />
            <span>Simulate Missed Dose</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={refillStock}
            className="sim-btn"
            style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--blue)', border: '1px solid rgba(56, 189, 248, 0.3)' }}
          >
            <Pill size={14} />
            <span>Refill Strip (+10)</span>
          </motion.button>

          <button type="button" onClick={resetSimulation} className="sim-btn-reset">
            <RotateCcw size={13} />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Presets and Custom Inputs */}
        <div className="sim-presets-bar">
          <span className="presets-label">QUICK PRESETS:</span>
          <div className="preset-chips">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className={`preset-chip ${medicineName === p.name ? 'is-active' : ''}`}
              >
                <Pill size={11} />
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Form */}
        <div className="sim-edit-row">
          <form onSubmit={handleUpdateMedicine} className="inline-form">
            <label htmlFor="sim-med-input">MEDICINE</label>
            <div className="input-group">
              <input
                id="sim-med-input"
                type="text"
                value={draftMedicine}
                onChange={(e) => setDraftMedicine(e.target.value)}
                placeholder="Medicine name"
              />
              <button type="submit" aria-label="Save medicine name">
                Save
              </button>
            </div>
          </form>

          <form onSubmit={handleUpdateTime} className="inline-form">
            <label htmlFor="sim-time-input">TIME</label>
            <div className="input-group">
              <input
                id="sim-time-input"
                type="time"
                value={draftTime}
                onChange={(e) => setDraftTime(e.target.value)}
              />
              <button type="submit" aria-label="Save reminder time">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT: Live Synced Mobile Companion App */}
      <div className="simulator-phone-card">
        <div className="phone-card-header">
          <span className="eyebrow">LIVE COMPANION APP</span>
          <span className="ble-connected-chip">
            <span className="pulse-ping" />
            <span>BLE 5.0 CONNECTED</span>
          </span>
        </div>

        {/* Smartphone Shell */}
        <div className="sim-phone-wrapper">
          <div className="sim-phone-bezel">
            {/* Dynamic Island / Speaker Notch */}
            <div className="sim-phone-island">
              <span className="island-camera" />
            </div>

            {/* Screen Content */}
            <div className="sim-phone-display">
              {/* Status Bar */}
              <div className="phone-status-bar">
                <span>9:41</span>
                <div className="phone-status-icons">
                  <Radio size={11} className="text-purple-400" />
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Animated BLE Notification Banner */}
              <AnimatePresence>
                {phoneNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    className={`phone-push-notification ${
                      phoneNotification.type === 'success'
                        ? 'is-success-push'
                        : phoneNotification.type === 'warning'
                          ? 'is-warn-push'
                          : 'is-alert-push'
                    }`}
                  >
                    <div className="push-icon-box">
                      <Bell size={13} />
                    </div>
                    <div className="push-text">
                      <div className="push-title">{phoneNotification.title}</div>
                      <div className="push-body">{phoneNotification.body}</div>
                    </div>
                    <span className="push-time">{phoneNotification.time}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* App Brand Header */}
              <div className="phone-app-banner">
                <div className="app-badge-icon">+</div>
                <div>
                  <strong>MediTrack Mobile</strong>
                  <small>STM32WB55 Companion</small>
                </div>
              </div>

              {/* Current Medicine Card */}
              <div className="phone-dose-card">
                <div className="dose-card-sub">NEXT SCHEDULED DOSE</div>
                <div className="dose-card-name">{medicineName}</div>
                <div className="dose-card-meta">
                  <span>
                    <Clock size={12} /> {formatTime(reminderTime)}
                  </span>
                  <span>
                    <Pill size={12} /> {dose}
                  </span>
                </div>
                <div style={{ marginTop: 8, fontSize: 10, opacity: 0.9, fontFamily: 'DM Mono, monospace' }}>
                  📦 Strip Stock: {remainingStock} tablets remaining
                </div>
              </div>

              {/* Synced Device Status */}
              <div className="phone-status-block">
                <div className="block-label">DEVICE STATUS</div>
                <div className="device-status-pill">
                  <span className={`status-indicator-dot dot--${state}`} />
                  <div>
                    <strong>
                      {state === 'scheduled'
                        ? 'Monitoring Schedule'
                        : state === 'active'
                          ? 'Reminder In Progress'
                          : state === 'interaction'
                            ? 'Interaction Recorded'
                            : 'Dose Missed'}
                    </strong>
                    <small>Sync via STM32WB55</small>
                  </div>
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="phone-feed-block">
                <div className="block-label">RECENT LOGS</div>
                <div className="phone-feed-list">
                  {activityLog.slice(0, 3).map((item) => (
                    <div key={item.id} className="feed-item">
                      <span className={`feed-dot dot--${item.tone}`} />
                      <div className="feed-info">
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </div>
                      <span className="feed-time">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(val) {
  if (!val) return '08:00 AM'
  const [h, m] = val.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const twelveHour = h % 12 || 12
  return `${String(twelveHour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`
}
