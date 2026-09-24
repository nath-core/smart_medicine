import { useEffect, useMemo, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'solution', label: 'Solution' },
  { id: 'exploded', label: 'Exploded view' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'demo', label: 'Live demo' },
  { id: 'mobile', label: 'Mobile concept' },
  { id: 'scope', label: 'Scope' },
]

const OBJECTIVES = [
  ['01', 'Timely reminders', 'Prompt a regular routine with a scheduled local alert.'],
  ['02', 'Clear display', 'Show medicine name, time, dose and status on a compact OLED.'],
  ['03', 'Multi-sensory alert', 'Pair a buzzer with a visible LED indicator for attention.'],
  ['04', 'Interaction tracking', 'Record box or strip interaction — not medicine swallowing.'],
  ['05', 'Simulated history', 'Keep a readable activity trail for the current demonstration.'],
  ['06', 'Proposed connectivity', 'Explore a future BLE link to a companion mobile application.'],
]

const HARDWARE = [
  ['RTC', 'Keeps the proposed schedule reference'],
  ['STM32WB55', 'Control logic + proposed BLE capability'],
  ['OLED display', 'Medicine, time and status at a glance'],
  ['Buzzer + LED', 'Audio and visual reminder outputs'],
  ['Interaction sensor', 'Conceptual box / strip event input'],
  ['Battery', 'Low-cost portable power concept'],
]

const COMPONENTS = [
  'Transparent cover',
  'Medicine box / strip holder',
  'Front panel',
  'OLED display',
  'Buzzer',
  'LED indicator',
  'STM32WB55 board',
  'Battery',
  'Bottom enclosure',
]

const WORKFLOW = [
  ['01', 'Schedule set', 'A medicine name and reminder time are entered.'],
  ['02', 'Time reached', 'The proposed RTC checks the scheduled reminder.'],
  ['03', 'Alert outputs', 'OLED, buzzer and LED communicate the reminder.'],
  ['04', 'User interaction', 'The box is opened or a medicine strip is moved.'],
  ['05', 'Interaction detected', 'A conceptual sensor event changes the status.'],
  ['06', 'Status updated', 'The simulated OLED and indicators settle.'],
  ['07', 'History recorded', 'A session event is added to the activity log.'],
]

const FEATURES = [
  ['◷', 'Medicine reminders', 'Scheduled prompts for a simple home routine.', 'blue'],
  ['▣', 'OLED display', 'Compact, readable medicine information.', 'cyan'],
  ['◉', 'Buzzer alerts', 'An audible simulated reminder state.', 'orange'],
  ['●', 'LED indication', 'A visual state cue beside the display.', 'green'],
  ['⌁', 'Interaction detection', 'Tracks a proposed box or strip event.', 'purple'],
  ['≡', 'Medication history', 'A local simulated activity trail.', 'blue'],
  ['⌁', 'BLE concept', 'Nearby phone connectivity for future work.', 'cyan'],
  ['□', 'Affordable enclosure', 'Cardboard, foam-board or plastic-box direction.', 'orange'],
]

const APPLICATIONS = [
  ['Personal routines', 'A focused reminder aid for everyday medication schedules.'],
  ['Elderly-care assistance', 'A simple visual and audio cue for supported home routines.'],
  ['Home healthcare', 'A concept for making scheduled care more visible.'],
  ['Schedule monitoring', 'A basic history view for simulated interaction events.'],
  ['Embedded education', 'A practical way to explain RTC, GPIO, display and sensing.'],
]

const LIMITATIONS = [
  'This site is a frontend simulation, not a measured hardware result.',
  'The physical prototype is still a proposed student build.',
  'Sensor arrangement and accuracy require future testing.',
  'Interaction detection cannot confirm that medicine was swallowed.',
  'BLE range depends on the environment and is not implemented here.',
  'The final PCB, power circuit and enclosure need development.',
]

const FUTURE = [
  'Physical hardware integration and bench testing',
  'Proposed mobile application development',
  'Improved interaction sensing and validation',
  'Durable medication history storage',
  'Remote notifications through an appropriate gateway',
  'PCB design, enclosure refinement and testing',
]

const DEFAULTS = {
  medicineName: 'Paracetamol',
  reminderTime: '08:00',
  dose: '1 Tablet',
  state: 'scheduled',
}

function formatTime(value) {
  if (!value) return '08:00 AM'
  const [hours, minutes] = value.split(':').map(Number)
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const twelveHour = hours % 12 || 12
  return `${String(twelveHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${suffix}`
}

function getTimeStamp() {
  return new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date())
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
}

function DemoBadge({ compact = false }) {
  return (
    <span className={`demo-badge ${compact ? 'demo-badge--compact' : ''}`}>
      <span className="pulse-dot" aria-hidden="true" />
      DEMO MODE <span>— SIMULATED PROTOTYPE</span>
    </span>
  )
}

function Button({ children, className = '', variant = 'primary', ...props }) {
  return <button className={`button button--${variant} ${className}`} {...props}>{children}</button>
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function Section({ id, number, children, className = '' }) {
  return <section id={id} className={`section ${className}`}><div className="section-shell"><div className="section-number">{number}</div>{children}</div></section>
}

function OLED({ medicineName, reminderTime, state, compact = false }) {
  const statusMap = {
    scheduled: 'Scheduled',
    active: 'Reminder Active',
    interaction: 'Interaction Detected',
    missed: 'Dose Missed — Simulation',
  }
  return (
    <div className={`oled ${compact ? 'oled--compact' : ''}`} aria-label="Simulated OLED display">
      <div className="oled-scanline" aria-hidden="true" />
      <div className="oled-title">MEDICINE REMINDER</div>
      <div className="oled-medicine">{medicineName}</div>
      <div className="oled-row"><span>TIME</span><strong>{formatTime(reminderTime)}</strong></div>
      <div className="oled-row"><span>DOSE</span><strong>1 TABLET</strong></div>
      <div className="oled-status">STATUS: {statusMap[state].toUpperCase()}</div>
    </div>
  )
}

function App() {
  const [medicineName, setMedicineName] = useState(DEFAULTS.medicineName)
  const [reminderTime, setReminderTime] = useState(DEFAULTS.reminderTime)
  const [state, setState] = useState(DEFAULTS.state)
  const [activityLog, setActivityLog] = useState([])
  const [draftMedicine, setDraftMedicine] = useState(DEFAULTS.medicineName)
  const [draftTime, setDraftTime] = useState(DEFAULTS.reminderTime)
  const [formMessage, setFormMessage] = useState('')
  const [activeSection, setActiveSection] = useState('problem')
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const demoRef = useRef(null)

  useEffect(() => {
    const updateScrollState = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0)
      const midpoint = window.scrollY + window.innerHeight * 0.35
      const visible = SECTIONS.reduce((current, section) => {
        const element = document.getElementById(section.id)
        if (element && element.offsetTop <= midpoint) return section.id
        return current
      }, 'problem')
      setActiveSection(visible)
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const statusLabel = useMemo(() => ({
    scheduled: 'Scheduled',
    active: 'Reminder Active',
    interaction: 'Interaction Detected',
    missed: 'Dose Missed — Simulation',
  }[state]), [state])

  const addEvent = (title, detail, tone = 'blue') => {
    setActivityLog((current) => [
      { id: `${Date.now()}-${Math.random()}`, title, detail, time: getTimeStamp(), tone },
      ...current,
    ].slice(0, 8))
  }

  const triggerReminder = () => {
    setState('active')
    addEvent('Reminder triggered', `${medicineName} · ${formatTime(reminderTime)}`, 'orange')
  }

  const simulateInteraction = () => {
    setState('interaction')
    addEvent('Interaction detected', 'Box / strip event simulated', 'green')
  }

  const simulateMissed = () => {
    setState('missed')
    addEvent('Dose missed', 'Simulation state recorded', 'red')
  }

  const updateMedicine = (event) => {
    event.preventDefault()
    const nextName = draftMedicine.trim()
    if (!nextName) {
      setFormMessage('Enter a medicine name before saving.')
      return
    }
    setMedicineName(nextName)
    setState('scheduled')
    setFormMessage('Medicine information updated.')
    addEvent('Medicine name changed', nextName, 'blue')
  }

  const updateTime = (event) => {
    event.preventDefault()
    if (!draftTime) {
      setFormMessage('Choose a reminder time before saving.')
      return
    }
    setReminderTime(draftTime)
    setState('scheduled')
    setFormMessage('Reminder time updated.')
    addEvent('Reminder time changed', formatTime(draftTime), 'blue')
  }

  const resetDemo = () => {
    setMedicineName(DEFAULTS.medicineName)
    setReminderTime(DEFAULTS.reminderTime)
    setDraftMedicine(DEFAULTS.medicineName)
    setDraftTime(DEFAULTS.reminderTime)
    setState(DEFAULTS.state)
    setActivityLog([])
    setFormMessage('Demo reset to the initial state.')
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="scroll-progress" aria-hidden="true"><span style={{ height: `${progress}%` }} /></div>
      <header className="topbar">
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <span className="brand-mark">+</span><span>MED<span className="brand-accent">/</span>SYNC</span>
        </button>
        <div className="topbar-context"><span className="status-led" /> <span>PROPOSED SYSTEM</span><span className="context-divider" /> <span>MICROCONTROLLERS / PBCST504</span></div>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Primary navigation">
          {SECTIONS.map((section) => <button key={section.id} className={activeSection === section.id ? 'is-active' : ''} onClick={() => scrollTo(section.id)}>{section.label}</button>)}
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid section-shell">
            <div className="hero-copy">
              <Reveal><DemoBadge /></Reveal>
              <Reveal><p className="hero-overline">Ahalia School of Engineering &amp; Technology <span>·</span> CSE</p></Reveal>
              <Reveal><h1>Right medicine,<br /><em>right time.</em></h1></Reveal>
              <Reveal><p className="hero-lede">A low-cost reminder concept that makes a daily medicine routine more visible, more audible and easier to explain.</p></Reveal>
              <Reveal className="hero-actions"><Button onClick={() => scrollTo('demo')}>Start demo <span aria-hidden="true">↗</span></Button><button className="text-link" onClick={() => scrollTo('solution')}>Explore the proposed system <span aria-hidden="true">→</span></button></Reveal>
              <Reveal className="hero-meta">
                <div><span>COURSE</span><strong>PBCST504<br />Microcontrollers</strong></div>
                <div><span>GUIDE</span><strong>Balamurugan</strong></div>
                <div><span>TEAM</span><strong>NATH.S · PRAGATHEESH M<br />RILWAN M · NAVANEETH KRISHNA S</strong></div>
              </Reveal>
            </div>
            <Reveal className="hero-visual">
              <div className="hero-image-wrap">
                <div className="image-note image-note--top"><span className="note-line" /> simple / affordable enclosure</div>
                <img src="/prototype.png" alt="Proposed cardboard medicine box with transparent cover, OLED display, buzzer and LED indicator" />
                <div className="hero-image-caption"><span>01</span><strong>Student-built direction</strong><small>Cardboard · OLED · STM32WB55 concept</small></div>
              </div>
              <div className="hero-stat"><span className="stat-number">04</span><span>output cues<br />in one view</span></div>
            </Reveal>
          </div>
          <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></div>
        </section>

        <Section id="problem" number="01" className="problem-section">
          <SectionHeading eyebrow="The starting point" title={<>A small missed moment<br /><em>can break a routine.</em></>} description="A normal medicine box stores doses. It does not always make a schedule visible, audible or easy to review." />
          <div className="problem-grid">
            <Reveal className="problem-visual">
              <div className="problem-orbit orbit-one" /><div className="problem-orbit orbit-two" />
              <div className="problem-center"><span className="problem-time">08:00</span><span className="problem-clock">AM</span><span className="problem-slash">—</span><span className="problem-message">schedule<br />not visible</span></div>
              <div className="problem-float problem-float--one"><span>01</span> Forgetfulness</div>
              <div className="problem-float problem-float--two"><span>02</span> Multiple medicines</div>
              <div className="problem-float problem-float--three"><span>03</span> No basic history</div>
            </Reveal>
            <div className="problem-points">
              <Reveal><article className="insight-card"><span className="card-index">01 / 03</span><h3>Reminders need context.</h3><p>A clear medicine name and time help a user understand what the prompt is for — not just that a prompt exists.</p></article></Reveal>
              <Reveal><article className="insight-card"><span className="card-index">02 / 03</span><h3>Care can be shared.</h3><p>Elderly users and people following strict schedules may benefit from a simple visual and audio cue at home.</p></article></Reveal>
              <Reveal><article className="insight-card"><span className="card-index">03 / 03</span><h3>Interaction is useful data.</h3><p>A proposed box or strip event can be recorded as an interaction — without pretending to confirm swallowing.</p></article></Reveal>
            </div>
          </div>
        </Section>

        <Section id="objectives" number="02" className="objectives-section">
          <SectionHeading eyebrow="What this project explores" title={<>Six simple goals,<br /><em>one practical direction.</em></>} description="The proposal keeps the focus on an affordable enclosure and understandable embedded-system building blocks." />
          <div className="card-grid card-grid--six">{OBJECTIVES.map(([number, title, text], index) => <Reveal key={title} className="objective-card" style={{ '--delay': `${index * 60}ms` }}><span className="number-chip">{number}</span><span className="card-arrow" aria-hidden="true">↗</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
        </Section>

        <Section id="solution" number="03" className="solution-section">
          <div className="solution-layout">
            <Reveal className="solution-visual"><div className="image-frame"><img src="/prototype.png" alt="Close view of the simple proposed medicine reminder prototype" /><span className="frame-tag">CONCEPT / FRONT + INTERNAL VIEWS</span></div><div className="zoom-label"><span /> proposed build direction</div></Reveal>
            <div className="solution-copy"><SectionHeading eyebrow="The proposed system" title={<>A helpful box,<br /><em>not a luxury device.</em></>} description="The physical direction is intentionally familiar: a cardboard or affordable-box enclosure with a few understandable interfaces." /><div className="component-list">{[['01', 'Compartments', 'Medicine strips stay visible under a transparent cover.'], ['02', 'OLED + alert', 'A small display pairs with a buzzer and LED.'], ['03', 'Control core', 'An STM32WB55, RTC and battery are proposed inside.'], ['04', 'Interaction event', 'A conceptual sensor records box or strip movement.']].map(([n, title, text], index) => <Reveal key={title} className="component-row"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">↗</b></Reveal>)}</div></div>
          </div>
        </Section>

        <Section id="exploded" number="04" className="exploded-section">
          <SectionHeading eyebrow="Read the object from outside in" title={<>A simple enclosure,<br /><em>layered with intent.</em></>} description="The supplied exploded-view reference remains the source of truth. Labels are revealed as a presentation aid, not a 3D reconstruction." />
          <div className="exploded-layout">
            <Reveal className="exploded-visual"><div className="exploded-image-wrap"><img src="/explorded_view.png" alt="Exploded view of the proposed medicine reminder box showing cover, compartments, front panel, electronics and enclosure" /><span className="scan-corner scan-corner--one" /><span className="scan-corner scan-corner--two" /><span className="scan-corner scan-corner--three" /><span className="scan-corner scan-corner--four" /></div><div className="exploded-foot"><span><i className="legend-dot legend-dot--blue" /> visible reference</span><span><i className="legend-dot legend-dot--orange" /> proposed component</span></div></Reveal>
            <div className="component-callouts">{COMPONENTS.map((component, index) => <Reveal key={component} className="callout"><span className="callout-marker">{String(index + 1).padStart(2, '0')}</span><span>{component}</span><i /></Reveal>)}</div>
          </div>
        </Section>

        <Section id="architecture" number="05" className="architecture-section">
          <div className="architecture-intro"><SectionHeading eyebrow="Inside the concept" title={<>One controller.<br /><em>Several clear signals.</em></>} description="The architecture is intentionally readable for a microcontroller project review. BLE is shown as a proposed future connection." /><div className="architecture-legend"><span><i className="legend-dot legend-dot--green" /> proposed hardware</span><span><i className="legend-dot legend-dot--orange" /> output</span><span><i className="legend-dot legend-dot--purple" /> future / conceptual</span></div></div>
          <Reveal className="architecture-map" aria-label="Proposed hardware architecture diagram">
            <div className="arch-node arch-node--rtc"><span className="node-icon">◷</span><strong>RTC</strong><small>schedule reference</small></div><div className="arch-connector arch-connector--a"><span>→</span></div><div className="arch-node arch-node--core"><span className="node-icon">✦</span><strong>STM32WB55</strong><small>control core</small></div><div className="arch-branch"><div /><span /></div><div className="arch-output arch-output--oled"><span>▣</span><strong>OLED display</strong><small>information</small></div><div className="arch-output arch-output--buzzer"><span>◉</span><strong>Buzzer + LED</strong><small>alert outputs</small></div><div className="arch-output arch-output--sensor"><span>⌁</span><strong>Interaction sensor</strong><small>conceptual input</small></div><div className="arch-output arch-output--mobile"><span>⌁</span><strong>Proposed BLE app</strong><small>future connection</small></div><p className="arch-footnote">The sensor represents box / medicine-strip interaction only. It does not confirm swallowing.</p>
          </Reveal>
        </Section>

        <Section id="workflow" number="06" className="workflow-section">
          <SectionHeading eyebrow="Working principle" title={<>From a scheduled time<br /><em>to a recorded event.</em></>} description="The proposed flow turns a reminder into a sequence that can be explained, tested and improved." />
          <div className="workflow-line" aria-hidden="true"><span /></div><div className="workflow-grid">{WORKFLOW.map(([number, title, text], index) => <Reveal key={title} className={`workflow-step workflow-step--${index + 1}`}><div className="workflow-marker">{number}</div><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
          <div className="honesty-note"><span className="note-symbol">!</span><p><strong>Important distinction:</strong> this workflow stops at <em>Interaction Detected</em> or <em>Removal Detected</em>. It never claims that a medicine was swallowed.</p></div>
        </Section>

        <Section id="demo" number="07" className="demo-section">
          <div className="demo-heading"><div><SectionHeading eyebrow="Try the concept" title={<>A working simulation<br /><em>for the proposed flow.</em></>} description="Use the controls to move through the states. Everything here runs locally in the browser and is clearly simulated." /></div><DemoBadge /></div>
          <div className="demo-panel" ref={demoRef}>
            <div className="demo-main">
              <div className="demo-panel-top"><div><span className="eyebrow">LIVE DEVICE VIEW</span><h3>{medicineName}</h3></div><span className={`state-pill state-pill--${state}`}><i />{statusLabel}</span></div>
              <div className="device-stage"><div className="device-shadow" /><div className={`device-box device-box--${state}`}><div className="device-cover"><span /><span /><span /><span /></div><div className="device-front"><OLED medicineName={medicineName} reminderTime={reminderTime} state={state} compact /><div className={`device-buzzer ${state === 'active' ? 'is-on' : ''}`}><span /><small>BUZZER</small></div><div className={`device-led device-led--${state}`}><span /><small>LED</small></div></div></div></div>
              <div className="signal-row"><div className={`signal ${state === 'active' ? 'is-active' : ''}`}><span className="signal-light" /><div><strong>LED indicator</strong><small>{state === 'active' ? 'Active' : state === 'interaction' ? 'Updated' : 'Ready'}</small></div></div><div className={`signal ${state === 'active' ? 'is-active' : ''}`}><span className="signal-light signal-light--orange" /><div><strong>Buzzer alert</strong><small>{state === 'active' ? 'Active' : 'Off'}</small></div></div><div className="signal"><span className="signal-light signal-light--green" /><div><strong>Sensor input</strong><small>{state === 'interaction' ? 'Interaction event' : 'Waiting'}</small></div></div></div>
            </div>
            <div className="demo-controls">
              <div className="controls-label"><span className="eyebrow">SIMULATION CONTROLS</span><span className="control-state">STATE / {state.toUpperCase()}</span></div>
              <div className="control-buttons"><Button onClick={triggerReminder}>Trigger reminder <span>↗</span></Button><Button variant="secondary" onClick={simulateInteraction}>Simulate interaction <span>↗</span></Button><Button variant="ghost" onClick={simulateMissed}>Simulate missed dose <span>↗</span></Button></div>
              <div className="edit-forms">
                <form onSubmit={updateMedicine}><label htmlFor="medicine-name">Medicine name</label><div className="input-row"><input id="medicine-name" value={draftMedicine} onChange={(event) => setDraftMedicine(event.target.value)} /><button type="submit" aria-label="Save medicine name">Save</button></div></form>
                <form onSubmit={updateTime}><label htmlFor="reminder-time">Reminder time</label><div className="input-row"><input id="reminder-time" type="time" value={draftTime} onChange={(event) => setDraftTime(event.target.value)} /><button type="submit" aria-label="Save reminder time">Save</button></div></form>
              </div>
              <div className="control-footer"><span aria-live="polite">{formMessage || 'Frontend-only session · no data leaves this page.'}</span><button className="reset-button" onClick={resetDemo}>Reset demo <span>↺</span></button></div>
            </div>
          </div>
          <div className="history-grid"><div className="history-display"><div className="history-heading"><div><span className="eyebrow">OLED DISPLAY</span><h3>What the user sees</h3></div><span className="oled-status-dot"><i /> LIVE SIMULATION</span></div><OLED medicineName={medicineName} reminderTime={reminderTime} state={state} /><div className="oled-caption"><span>128 × 64 px concept</span><span>I²C display / proposed</span></div></div><div className="activity-log"><div className="history-heading"><div><span className="eyebrow">ACTIVITY LOG</span><h3>Session history</h3></div><span className="history-count">{activityLog.length.toString().padStart(2, '0')} events</span></div>{activityLog.length === 0 ? <div className="empty-log"><span>⌁</span><p>Your simulated events<br />will appear here.</p></div> : <div className="log-list">{activityLog.map((item) => <div className="log-item" key={item.id}><span className={`log-dot log-dot--${item.tone}`} /><div><strong>{item.title}</strong><small>{item.detail}</small></div><time>{item.time}</time></div>)}</div>}</div></div>
        </Section>

        <Section id="mobile" number="08" className="mobile-section">
          <div className="mobile-layout"><div className="mobile-copy"><SectionHeading eyebrow="A future interface" title={<>A proposed mobile<br /><em>application concept.</em></>} description="The future phone view would make medicine information and history easier to review nearby. BLE is represented here as a proposal, not a completed connection." /><div className="mobile-points"><span><i className="legend-dot legend-dot--purple" /> Proposed BLE connection</span><span><i className="legend-dot legend-dot--green" /> Local device status</span><span><i className="legend-dot legend-dot--blue" /> History at a glance</span></div></div><Reveal className="phone-wrap"><div className="phone-glow" /><div className="phone"><div className="phone-notch" /><div className="phone-screen"><div className="phone-top"><span>9:41</span><span>•••</span></div><div className="phone-app-label"><span className="app-icon">+</span><div><strong>med/sync</strong><small>proposed mobile app</small></div></div><div className="phone-connection"><span className="connection-icon">⌁</span><div><strong>BLE connection</strong><small>Conceptual · nearby device</small></div><span className="connection-pill">PROPOSED</span></div><div className="phone-card"><span className="phone-card-label">NEXT REMINDER</span><strong>{medicineName}</strong><div><span>{formatTime(reminderTime)}</span><span>1 Tablet</span></div></div><div className="phone-section-label">DEVICE STATUS <span>VIEW ALL</span></div><div className="phone-status-card"><span className={`phone-status-icon phone-status-icon--${state}`}>●</span><div><strong>{statusLabel}</strong><small>Last update · just now</small></div><span>›</span></div><div className="phone-section-label">SIMULATED HISTORY</div><div className="phone-history-row"><span>08:00</span><div><strong>Reminder schedule</strong><small>Example event</small></div><span className="history-check">✓</span></div><div className="phone-history-row"><span>—</span><div><strong>Interaction event</strong><small>Waiting for simulation</small></div><span className="history-check history-check--muted">○</span></div><div className="phone-nav"><span>⌂<small>Home</small></span><span className="is-selected">≡<small>History</small></span><span>⚙<small>Settings</small></span></div></div></div></Reveal></div>
        </Section>

        <Section id="features" number="09" className="features-section">
          <SectionHeading eyebrow="What belongs in the proposal" title={<>Small features,<br /><em>clear signals.</em></>} description="Each feature is sized to the student prototype rather than an expensive commercial product." />
          <div className="feature-grid">{FEATURES.map(([icon, title, text, tone], index) => <Reveal key={title} className={`feature-card feature-card--${tone}`}><span className="feature-icon">{icon}</span><span className="feature-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
        </Section>

        <Section id="applications" number="10" className="applications-section">
          <div className="applications-layout"><div><SectionHeading eyebrow="Where it could help" title={<>Designed for<br /><em>everyday context.</em></>} description="This is an educational proposed system for routines and learning — not a certified medical device." /><div className="application-list">{APPLICATIONS.map(([title, text], index) => <Reveal key={title} className="application-row"><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div><b>↗</b></Reveal>)}</div></div><Reveal className="application-visual"><div className="application-circle"><span className="circle-label">ROUTINE<br />SUPPORT</span><div className="circle-ring circle-ring--one" /><div className="circle-ring circle-ring--two" /><div className="circle-orbit-dot dot-one" /><div className="circle-orbit-dot dot-two" /><div className="circle-orbit-dot dot-three" /></div><span className="visual-footnote">EDUCATIONAL / PROPOSED / LOCAL</span></Reveal></div>
        </Section>

        <Section id="scope" number="11" className="scope-section">
          <div className="scope-layout"><div><SectionHeading eyebrow="Be precise about today" title={<>A concept with<br /><em>room to grow.</em></>} description="The most useful demonstration is an honest one: it shows what the idea does now, and what still needs engineering." /><div className="scope-column"><h3><span className="scope-icon scope-icon--orange">!</span> Current limitations</h3>{LIMITATIONS.map((item) => <div className="scope-item" key={item}><span>×</span><p>{item}</p></div>)}</div></div><div className="scope-column scope-column--future"><h3><span className="scope-icon scope-icon--green">↗</span> Future scope</h3>{FUTURE.map((item, index) => <div className="scope-item" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}<div className="scope-quote">“Future implementation starts with a working, testable interaction — and a clear statement of what it cannot tell us yet.”</div></div></div>
        </Section>

        <section className="conclusion" id="conclusion"><div className="section-shell"><Reveal><DemoBadge /></Reveal><Reveal><p className="conclusion-kicker">A proposed system for a real routine</p></Reveal><Reveal><h2>Make the reminder<br /><em>easier to notice.</em></h2></Reveal><Reveal><p className="conclusion-text">The proposed Smart Medicine Reminder and Monitoring System aims to support timely medication routines through reminders, visual indication, and interaction tracking. The low-cost concept combines microcontroller-based control with a simple enclosure and proposed mobile connectivity.</p></Reveal><Reveal className="conclusion-actions"><Button onClick={() => { resetDemo(); scrollTo('demo') }}>Replay demo <span>↗</span></Button><button className="button button--light" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <span>↑</span></button></Reveal><div className="conclusion-foot"><div><strong>AHALIA SCHOOL OF ENGINEERING &amp; TECHNOLOGY</strong><span>Computer Science &amp; Engineering · PBCST504 Microcontrollers</span></div><div className="footer-team"><span>TEAM</span><strong>NATH.S · PRAGATHEESH M · MOHAMMED RILWAN M · NAVANEETH KRISHNA S</strong></div><DemoBadge compact /></div></div></section>
      </main>
      <footer className="site-footer"><span>SMART MEDICINE REMINDER AND MONITORING SYSTEM</span><span>DEMO / 2026</span><span>PROPOSED SYSTEM · NOT A MEDICAL DEVICE</span></footer>
    </div>
  )
}

export default App
