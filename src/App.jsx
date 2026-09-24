import { useEffect, useState, useMemo } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react'
import {
  Bell,
  Clock,
  Cpu,
  Layers,
  Activity,
  Sparkles,
  Smartphone,
  Sun,
  Moon,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Box,
  Monitor,
  Volume2,
  Menu,
  X,
  BookOpen,
  FileText,
  Search,
  Check,
  ChevronLeft,
  ChevronRight,
  Database,
  Cloud,
  Users,
  Lock,
  QrCode,
  Bot,
  Hospital,
  Radio,
  Pill,
} from 'lucide-react'

import { SpotlightCard } from './components/SpotlightCard'
import { TiltCard } from './components/TiltCard'
import { ExplodedViewer } from './components/ExplodedViewer'
import { ArchitectureDiagram } from './components/ArchitectureDiagram'
import { LiveSimulator } from './components/LiveSimulator'

// Complete Slide Map matching the 13 Slides in the PDF
const SLIDES = [
  { id: 'slide-1', num: 1, label: '01. Title', title: 'MediTrack — Cover' },
  { id: 'slide-2', num: 2, label: '02. Objectives', title: 'Objectives of MediTrack' },
  { id: 'slide-3', num: 3, label: '03. Problem', title: 'Problem Statement' },
  { id: 'slide-4', num: 4, label: '04. Abstract', title: 'Abstract' },
  { id: 'slide-5', num: 5, label: '05. Intro', title: 'Introduction' },
  { id: 'slide-6', num: 6, label: '06. Literature', title: 'Literature Survey' },
  { id: 'slide-hardware', num: 7, label: '07. Hardware', title: 'Hardware & Enclosure' },
  { id: 'slide-7', num: 8, label: '08. Principle', title: 'Working Principle' },
  { id: 'slide-simulator', num: 9, label: '09. Live Demo', title: 'Interactive Simulation' },
  { id: 'slide-8', num: 10, label: '10. Applications', title: 'Applications of MediTrack' },
  { id: 'slide-9', num: 11, label: '11. Results', title: 'Results & Discussion' },
  { id: 'slide-10', num: 12, label: '12. Conclusion', title: 'Conclusion & Future Scope' },
  { id: 'slide-11', num: 13, label: '13. References', title: 'References' },
  { id: 'slide-12', num: 14, label: '14. Team', title: 'Our Team & Presentation End' },
]

const TEAM_MEMBERS = [
  {
    name: 'MOHAMMED RILWAN M',
    reg: 'ATP24CS070',
    initials: 'MR',
    role: 'Embedded Firmware & BLE Logic',
  },
  {
    name: 'NATH.S',
    reg: 'ATP24CS077',
    initials: 'NS',
    role: 'System Architecture & Simulation',
  },
  {
    name: 'NAVANEETH KRISHNA S',
    reg: 'ATP24CS078',
    initials: 'NK',
    role: 'Hardware Interface & Sensor Setup',
  },
  {
    name: 'PRAGATHEESH.M',
    reg: 'ATP24CS088',
    initials: 'PM',
    role: 'Circuit Integration & Data Logging',
  },
]

const OBJECTIVES = [
  'Develop a smart medication management system using STM32WB55.',
  'Remind users to take medicines at the scheduled time.',
  'Detect and verify actual medicine removal from the strip.',
  'Record and track medication intake with date, time, and status.',
  'Manage medicine schedules, dosage, and treatment details through the system.',
  'Monitor medication adherence and identify missed or delayed doses.',
  'Provide medication history and adherence statistics for better monitoring.',
]

const PROBLEM_POINTS = [
  {
    num: '01',
    title: 'Forgetfulness & Adherence Lapses',
    desc: 'Many patients, especially elderly people and long-term medication users, forget to take their medicines on time.',
  },
  {
    num: '02',
    title: 'Lack of Intake Verification',
    desc: 'Existing medicine reminder systems mainly provide alarms or notifications but cannot confirm whether the medicine was actually taken.',
  },
  {
    num: '03',
    title: 'Duplicate Dose Hazards',
    desc: 'Users may accidentally miss a dose or take a duplicate dose because they cannot remember their medication history.',
  },
  {
    num: '04',
    title: 'Need for Removal Detection',
    desc: 'There is a need for a system that can detect actual medicine removal, record medication events, and monitor adherence.',
  },
  {
    num: '05',
    title: 'Unified Connected Ecosystem',
    desc: 'The system should provide real-time reminders, medication tracking, and easy management through a connected device and mobile application.',
  },
]

const ABSTRACT_POINTS = [
  'MediTrack is a smart system for medication adherence and medicine strip tracking.',
  'Uses STM32WB55 as the main controller.',
  'Provides scheduled medicine reminders using buzzer, LED, and OLED display.',
  'Detects actual medicine removal from the strip using sensors.',
  'Records medicine name, date, time, and intake status.',
  'Uses Bluetooth Low Energy (BLE) for communication with the mobile application.',
  'Allows users to manage medicines, dosage, schedules, and treatment details.',
  'Maintains medication history and adherence statistics.',
  'Helps identify missed, delayed, and completed doses.',
  'Aims to provide a more reliable medication management solution than conventional reminder systems.',
]

const INTRO_POINTS = [
  'Medication adherence is important for effective treatment and patient safety.',
  'Patients taking multiple or long-term medicines may forget doses or take medicines at the wrong time.',
  'Conventional medicine reminder systems mainly provide alarms but do not verify medicine intake.',
  'MediTrack combines an embedded system with medicine-removal detection to monitor actual medication usage.',
  'The system uses STM32WB55 to control reminders, sensors, display, timing, and data logging.',
  'Bluetooth Low Energy (BLE) connects the device with a mobile application for medicine management and data synchronization.',
  'The system maintains medication history and adherence information for better monitoring.',
  'MediTrack aims to make medication management smarter, more reliable, and easier to use.',
]

const LITERATURE_SURVEY = [
  {
    title: 'Medication Reminder Systems',
    desc: 'Existing systems provide scheduled alerts through alarms and mobile notifications to improve medication adherence.',
    icon: Bell,
    badge: 'CONVENTIONAL ALARMS',
  },
  {
    title: 'Smart Pill Dispenser Systems',
    desc: 'Automated dispensers control medication timing and quantity, but are generally designed for container-based medicines.',
    icon: Box,
    badge: 'CONTAINER BASED',
  },
  {
    title: 'IoT-Based Medication Monitoring',
    desc: 'IoT systems enable medication data collection and remote monitoring through connected devices.',
    icon: Radio,
    badge: 'REMOTE MONITORING',
  },
  {
    title: 'Sensor-Based Adherence Monitoring',
    desc: 'Sensors such as magnetic and pressure sensors can detect physical medicine removal, providing better verification of medication intake.',
    icon: Activity,
    badge: 'PHYSICAL DETECTION',
  },
  {
    title: 'Mobile-Based Medication Management',
    desc: 'Mobile applications provide medicine scheduling, reminders, history, and adherence tracking.',
    icon: Smartphone,
    badge: 'APP TRACKING',
  },
]

const WORKING_PRINCIPLE_STEPS = [
  {
    stage: 'Medicine Setup',
    desc: 'User adds medicine name, dosage, schedule, and treatment duration through the mobile application.',
  },
  {
    stage: 'Data Transfer & Storage',
    desc: 'The information is transferred to the STM32WB55 through Bluetooth Low Energy (BLE). STM32 stores the schedule for autonomous operation.',
  },
  {
    stage: 'Scheduled Reminder',
    desc: 'The RTC continuously maintains the current time. At the scheduled time, the STM32 activates the buzzer, LED, and OLED display.',
  },
  {
    stage: 'Medicine Removal Detection',
    desc: 'The user removes the scheduled medicine from the strip. A Hall-effect/magnetic sensor detects the change caused by medicine removal.',
  },
  {
    stage: 'Intake Verification & Logging',
    desc: 'STM32 processes sensor signals and determines whether the medicine was removed. The event is recorded with medicine, date, time, and status.',
  },
  {
    stage: 'Data Sync & Adherence Statistics',
    desc: 'Recorded data transfers to the mobile application via BLE. The app updates medication history, statistics, and identifies taken, delayed, and missed doses.',
  },
  {
    stage: 'Stock & Refill Alerts',
    desc: 'Medicine quantity is updated in real-time to provide automated low-stock and refill reminders.',
  },
]

const APPLICATIONS = [
  {
    emoji: '👴',
    title: 'Elderly Medication Management',
    desc: 'Helps elderly users remember and track scheduled medicines through clear audible and visual guidance.',
  },
  {
    emoji: '💊',
    title: 'Long-Term Medication Management',
    desc: 'Useful for patients requiring consistent therapy over extended periods (hypertension, diabetes, cardiac).',
  },
  {
    emoji: '🏥',
    title: 'Hospital & Clinical Use',
    desc: 'Can assist clinical staff in monitoring scheduled doses and adherence for in-patient protocols.',
  },
  {
    emoji: '🏠',
    title: 'Home Healthcare',
    desc: 'Supports structured medication routines for supported individuals taking prescribed medicines at home.',
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Caregiver Monitoring',
    desc: 'Medication history and compliance logs help caregivers oversee elderly relatives remotely.',
  },
  {
    emoji: '💉',
    title: 'Multiple-Medicine Management',
    desc: 'Helps users manage different medicines with distinct schedules, dosages, and treatment periods.',
  },
  {
    emoji: '📊',
    title: 'Medication Adherence Tracking',
    desc: 'Provides quantitative records and statistics to identify missed, delayed, or successful doses.',
  },
  {
    emoji: '📦',
    title: 'Medicine Stock & Refill Management',
    desc: 'Tracks remaining medicine strips and provides timely refill alerts before prescriptions run out.',
  },
]

const RESULTS = [
  'Successfully designed the MediTrack system architecture using STM32WB55.',
  'Implemented scheduled medication reminders using RTC, buzzer, LED, and OLED.',
  'Detected medicine removal from the strip using a magnetic/Hall-effect sensing mechanism.',
  'Recorded medication events with date, time, and status.',
  'Established BLE communication between the STM32WB55 and mobile application.',
  'Enabled medicine schedule and dosage updates through the mobile application.',
  'Maintained medication history and adherence data for monitoring.',
  'Implemented medicine quantity tracking for low-stock/refill indication.',
]

const DISCUSSION = [
  'Physical medicine detection provides better verification than reminder-only systems.',
  'BLE enables low-power, direct communication with a smartphone.',
  'RTC allows the device to provide reminders without depending on the mobile application.',
  'The modular design allows additional sensors and features to be integrated later.',
  'The system provides a low-cost and practical approach to medication adherence monitoring.',
]

const CONCLUSION_POINTS = [
  'MediTrack provides a smart solution for medication reminder and adherence monitoring.',
  'STM32WB55 integrates timing, sensing, display, alerts, data processing, and BLE communication.',
  'The system can detect actual medicine removal instead of relying only on reminders.',
  'Medication events can be recorded and synchronized with the mobile application.',
  'The system helps users reduce missed doses and improve medication management.',
  'The proposed system is low-cost, practical, and suitable for home healthcare applications.',
]

const FUTURE_SCOPE = [
  {
    icon: Cloud,
    title: 'Cloud Integration',
    desc: 'Remote storage and synchronization of medication data across authorized healthcare platforms.',
  },
  {
    icon: Users,
    title: 'Caregiver Alerts',
    desc: 'Automated SMS or push notifications alerting caregivers about missed or delayed medicines.',
  },
  {
    icon: Smartphone,
    title: 'Advanced Mobile App',
    desc: 'Detailed adherence reports, monthly analytics graphs, and multi-user profile support.',
  },
  {
    icon: Lock,
    title: 'Biometric Authentication',
    desc: 'Fingerprint sensor or secure PIN access to prevent unauthorized medicine access.',
  },
  {
    icon: QrCode,
    title: 'QR / Barcode / NFC',
    desc: 'Automatic medicine identification and prescription verification via optical or NFC scanning.',
  },
  {
    icon: Bot,
    title: 'AI-Based Analysis',
    desc: 'Machine learning algorithms to predict medication adherence patterns and risk of omission.',
  },
  {
    icon: Hospital,
    title: 'Healthcare Integration',
    desc: 'Direct interoperability with electronic health records (EHR) and hospital management systems.',
  },
  {
    icon: Radio,
    title: 'Mesh IoT Connectivity',
    desc: 'Zigbee/Thread networking linking multiple room dispensers and environmental sensors.',
  },
]

const REFERENCES = [
  {
    id: 1,
    title: 'STMicroelectronics',
    citation: '“STM32WB55xx STM32WB55xxE Datasheet,” STMicroelectronics.',
  },
  {
    id: 2,
    title: 'STMicroelectronics',
    citation: '“STM32WB Series – Bluetooth Low Energy and 802.15.4 Wireless MCUs,” STMicroelectronics.',
  },
  {
    id: 3,
    title: 'STMicroelectronics',
    citation: '“STM32CubeWB User Manual – STM32Cube MCU Package for STM32WB Series,” STMicroelectronics.',
  },
  {
    id: 4,
    title: 'Bluetooth SIG',
    citation: '“Bluetooth Core Specification,” Bluetooth Special Interest Group.',
  },
  {
    id: 5,
    title: 'M. J. Vrijens et al.',
    citation: '“A new taxonomy for describing and defining adherence to medications,” British Journal of Clinical Pharmacology, vol. 73, no. 5, pp. 691–705, 2012.',
  },
  {
    id: 6,
    title: 'World Health Organization',
    citation: '“Adherence to Long-Term Therapies: Evidence for Action,” WHO, 2003.',
  },
  {
    id: 7,
    title: 'Arduino / Adafruit',
    citation: '“SSD1306 OLED Display Library and Documentation,” Adafruit Industries.',
  },
  {
    id: 8,
    title: 'STMicroelectronics',
    citation: '“STM32 HAL and Low-Layer Drivers,” STM32Cube Documentation.',
  },
]

function App() {
  const [theme, setTheme] = useState('dark')
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll laser bar progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Scroll to slide
  const goToSlide = (index) => {
    const targetIndex = Math.max(0, Math.min(SLIDES.length - 1, index))
    setActiveSlideIndex(targetIndex)
    const targetId = SLIDES[targetIndex].id
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToSlide(activeSlideIndex + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToSlide(activeSlideIndex - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlideIndex])

  // Active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250
      for (let i = SLIDES.length - 1; i >= 0; i--) {
        const el = document.getElementById(SLIDES[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSlideIndex(i)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Laser Scroll Progress Bar */}
      <motion.div className="scroll-progress-laser" style={{ scaleX }} />

      {/* Ambient Glow Orbs */}
      <div className="ambient-bg-grid" aria-hidden="true" />
      <div className="ambient-glow-orb orb-1" aria-hidden="true" />
      <div className="ambient-glow-orb orb-2" aria-hidden="true" />

      {/* Floating Glass Island Navbar */}
      <header className="floating-header-wrap">
        <nav className="floating-navbar" aria-label="Main Navigation">
          <button
            type="button"
            className="brand-btn"
            onClick={() => goToSlide(0)}
          >
            <div className="brand-icon-box">+</div>
            <span>
              Medi<span className="brand-accent">Track</span>
            </span>
            <div className="brand-badge">
              <span className="pulse-dot" />
              <span>STM32WB55</span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="nav-links-track">
            {SLIDES.slice(0, 8).map((slide, idx) => {
              const isActive = activeSlideIndex === idx
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`nav-item-btn ${isActive ? 'is-active' : ''}`}
                >
                  {slide.label}
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="nav-sliding-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="icon-btn"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Jump to Simulator CTA */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const simIdx = SLIDES.findIndex((s) => s.id === 'slide-simulator')
                goToSlide(simIdx)
              }}
              className="cta-header-btn"
            >
              <Play size={13} fill="currentColor" />
              <span>Test Simulator</span>
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-drawer"
            style={{
              position: 'fixed',
              top: 80,
              left: 20,
              right: 20,
              background: 'var(--surface-solid)',
              border: '1px solid var(--card-border)',
              borderRadius: 20,
              padding: 20,
              zIndex: 99,
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              maxHeight: '75vh',
              overflowY: 'auto',
            }}
          >
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  goToSlide(idx)
                  setMobileMenuOpen(false)
                }}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: 0,
                  background: activeSlideIndex === idx ? 'var(--surface-hover)' : 'none',
                  color: activeSlideIndex === idx ? 'var(--blue)' : 'var(--ink)',
                  font: '600 13px Space Grotesk, sans-serif',
                }}
              >
                {slide.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">
        {/* SLIDE 01: TITLE / COVER */}
        <section className="hero-section" id="slide-1">
          <div className="section-shell hero-grid">
            <motion.div
              className="hero-copy-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="slide-number-badge">SLIDE 01 / TITLE</div>
              <div className="hero-pill-badge">
                <span className="pulse-dot" />
                <span>MICROCONTROLLER PROJECT · PBCST504</span>
              </div>

              <h1 className="hero-title" style={{ fontSize: 'clamp(54px, 7vw, 92px)' }}>
                Medi<span style={{ color: 'var(--blue)' }}>Track</span>
              </h1>
              <h2
                style={{
                  margin: '10px 0 20px',
                  font: "700 24px 'DM Mono', monospace",
                  letterSpacing: '0.08em',
                  color: 'var(--orange)',
                  textTransform: 'uppercase',
                }}
              >
                -RIGHT MEDICINE, RIGHT TIME
              </h2>

              <p className="hero-description">
                A smart medication adherence and medicine strip tracking system engineered using STM32WB55,
                integrating real-time scheduling, multi-sensory prompts, Hall-effect strip removal detection,
                and Bluetooth Low Energy (BLE) mobile connectivity.
              </p>

              <div className="hero-actions-group">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => goToSlide(SLIDES.findIndex((s) => s.id === 'slide-simulator'))}
                  className="btn-primary"
                >
                  <Play size={16} fill="currentColor" />
                  <span>Launch Live Simulator</span>
                </motion.button>

                <button
                  type="button"
                  onClick={() => goToSlide(1)}
                  className="btn-ghost"
                >
                  <span>Start Presentation</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="hero-meta-row" style={{ marginTop: 36 }}>
                <div className="meta-item">
                  <span>PRESENTED BY</span>
                  <strong>
                    MOHAMMED RILWAN M [ATP24CS070]<br />
                    NATH.S [ATP24CS077]<br />
                    NAVANEETH KRISHNA S [ATP24CS078]<br />
                    PRAGATHEESH.M [ATP24CS088]
                  </strong>
                </div>
                <div className="meta-item">
                  <span>INSTITUTION</span>
                  <strong>Ahalia School of Engineering &amp; Technology · CSE</strong>
                </div>
                <div className="meta-item">
                  <span>COURSE &amp; GUIDE</span>
                  <strong>PBCST504 Microcontrollers<br />Guide: Dr. Balamurugan V</strong>
                </div>
              </div>
            </motion.div>

            {/* Prototype 3D Visual */}
            <motion.div
              className="hero-visual-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <TiltCard maxTilt={10}>
                <div className="hero-image-container">
                  <div className="image-floating-badge">
                    <span>PROTOTYPE HARDWARE CHASSIS</span>
                  </div>
                  <img
                    src="/prototype.png"
                    alt="MediTrack hardware prototype box with OLED, buzzer, and LED indicator"
                  />
                  <div className="image-footer-caption">
                    <strong>MediTrack Physical Build</strong>
                    <small>Cardboard · Acrylic · STM32WB55 · OLED</small>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* SLIDE 02: OBJECTIVES OF MEDITRACK */}
        <section id="slide-2" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 02 / OBJECTIVES</div>
              <h2 className="section-title">
                Objectives of <em>MediTrack</em>
              </h2>
              <p className="section-desc">
                Core design goals established to solve medication non-adherence through verified physical sensing.
              </p>
            </motion.div>

            <div className="bento-grid-six" style={{ marginTop: 40 }}>
              {OBJECTIVES.map((objText, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <SpotlightCard className="objective-spotlight">
                    <div className="obj-card-top">
                      <span className="obj-num">0{idx + 1}</span>
                      <CheckCircle2 size={18} className="text-blue" />
                    </div>
                    <div className="obj-card-body" style={{ marginTop: 20 }}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{objText}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 03: PROBLEM STATEMENT */}
        <section id="slide-3" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 03 / PROBLEM STATEMENT</div>
              <h2 className="section-title">
                Problem <em>Statement</em>
              </h2>
              <p className="section-desc">
                Why passive reminders fail, and the critical clinical need for active physical verification.
              </p>
            </motion.div>

            <div className="problem-grid">
              <motion.div
                className="problem-orbit-container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="orbit-circle-outer" />
                <div className="orbit-circle-inner" />
                <div className="orbit-clock-hub">
                  <span className="hub-time">08:00</span>
                  <span className="hub-ampm">AM</span>
                  <span className="hub-status">Unverified Dose</span>
                </div>
                <div className="problem-orbit-pill" style={{ top: '12%', left: '8%' }}>
                  <AlertTriangle size={13} className="text-orange" />
                  <span>Elderly Lapse</span>
                </div>
                <div className="problem-orbit-pill" style={{ top: '48%', right: '2%' }}>
                  <RotateCcw size={13} className="text-red" />
                  <span>Duplicate Risk</span>
                </div>
                <div className="problem-orbit-pill" style={{ bottom: '10%', left: '16%' }}>
                  <Clock size={13} className="text-blue" />
                  <span>Unconfirmed Intake</span>
                </div>
              </motion.div>

              <div className="problem-cards-column">
                {PROBLEM_POINTS.map((pt) => (
                  <SpotlightCard key={pt.num} className="insight-spotlight">
                    <span className="card-num">{pt.num} / PROBLEM FACTOR</span>
                    <h3>{pt.title}</h3>
                    <p>{pt.desc}</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 04: ABSTRACT */}
        <section id="slide-4" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 04 / ABSTRACT</div>
              <h2 className="section-title">
                <em>Abstract</em>
              </h2>
              <p className="section-desc">
                Comprehensive summary of MediTrack's integrated architecture and operational methodology.
              </p>
            </motion.div>

            <div
              style={{
                marginTop: 40,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 16,
              }}
            >
              {ABSTRACT_POINTS.map((item, idx) => (
                <SpotlightCard key={idx} className="abstract-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'rgba(56, 189, 248, 0.12)',
                        color: 'var(--blue)',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 700,
                        fontSize: 12,
                        fontFamily: 'DM Mono, monospace',
                        flexShrink: 0,
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--ink)' }}>{item}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 05: INTRODUCTION */}
        <section id="slide-5" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 05 / INTRODUCTION</div>
              <h2 className="section-title">
                <em>Introduction</em>
              </h2>
              <p className="section-desc">
                Bridging embedded microcontrollers, physical sensors, and mobile software for proactive healthcare.
              </p>
            </motion.div>

            <div
              style={{
                marginTop: 40,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 16,
              }}
            >
              {INTRO_POINTS.map((pt, idx) => (
                <SpotlightCard key={idx} className="intro-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: 16 }}>•</span>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink)' }}>{pt}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 06: LITERATURE SURVEY */}
        <section id="slide-6" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 06 / LITERATURE SURVEY</div>
              <h2 className="section-title">
                Literature <em>Survey</em>
              </h2>
              <p className="section-desc">
                Review of existing medication adherence paradigms and technological approaches.
              </p>
            </motion.div>

            <div className="literature-grid">
              {LITERATURE_SURVEY.map((lit, idx) => {
                const Icon = lit.icon
                return (
                  <SpotlightCard key={lit.title} className="literature-card">
                    <div className="lit-card-header">
                      <div className="lit-icon-box">
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="badge-accent" style={{ fontSize: 9 }}>
                          {lit.badge}
                        </span>
                        <h3 className="lit-title" style={{ marginTop: 4 }}>
                          {lit.title}
                        </h3>
                      </div>
                    </div>
                    <p className="lit-body">{lit.desc}</p>
                  </SpotlightCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* HARDWARE ENCLOSURE & EXPLODED VIEW */}
        <section id="slide-hardware" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">HARDWARE &amp; ENCLOSURE DESIGN</div>
              <h2 className="section-title">
                Physical Assembly &amp; <em>Exploded View</em>
              </h2>
              <p className="section-desc">
                Interactive layer inspection of MediTrack's mechanical chassis, optical compartments, and electronics.
              </p>
            </motion.div>

            <ExplodedViewer />

            <div style={{ marginTop: 60 }}>
              <ArchitectureDiagram />
            </div>
          </div>
        </section>

        {/* SLIDE 07: WORKING PRINCIPLE */}
        <section id="slide-7" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 07 / WORKING PRINCIPLE</div>
              <h2 className="section-title">
                Working <em>Principle</em>
              </h2>
              <p className="section-desc">
                End-to-end operation from mobile schedule configuration to Hall-effect medicine strip removal detection.
              </p>
            </motion.div>

            <div
              style={{
                marginTop: 40,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 16,
              }}
            >
              {WORKING_PRINCIPLE_STEPS.map((step, idx) => (
                <SpotlightCard key={step.stage}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span className="obj-num">STAGE 0{idx + 1}</span>
                    <strong style={{ fontSize: 16, color: 'var(--blue)' }}>{step.stage}</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
                    {step.desc}
                  </p>
                </SpotlightCard>
              ))}
            </div>

            <div className="honesty-notice-banner" style={{ marginTop: 32 }}>
              <div className="notice-icon-box">
                <Activity size={20} />
              </div>
              <div>
                <p>
                  <strong>Magnetic / Hall-Effect Sensing Mechanism:</strong> The user removes the scheduled medicine
                  from the strip. A Hall-effect/magnetic sensor detects the magnetic flux change caused by removal,
                  enabling true verification rather than relying on unconfirmed alarms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE SIMULATOR */}
        <section id="slide-simulator" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">LIVE SIMULATOR / INTERACTIVE VIVA DEMO</div>
              <h2 className="section-title">
                Interactive <em>System Simulation</em>
              </h2>
              <p className="section-desc">
                Test alarm buzzer beeps, Hall-effect strip removal detection, stock &amp; refill alerts, and BLE sync in real time.
              </p>
            </motion.div>

            <LiveSimulator />
          </div>
        </section>

        {/* SLIDE 08: APPLICATIONS OF MEDITRACK */}
        <section id="slide-8" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 08 / APPLICATIONS</div>
              <h2 className="section-title">
                Applications of <em>MediTrack</em>
              </h2>
              <p className="section-desc">
                Broad therapeutic and monitoring applications across healthcare environments and patient demographics.
              </p>
            </motion.div>

            <div
              style={{
                marginTop: 40,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 18,
              }}
            >
              {APPLICATIONS.map((app) => (
                <SpotlightCard key={app.title}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{app.emoji}</div>
                  <h3 style={{ margin: '0 0 8px', font: "700 18px 'Space Grotesk', sans-serif", color: 'var(--ink)' }}>
                    {app.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
                    {app.desc}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 09: RESULTS AND DISCUSSION */}
        <section id="slide-9" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 09 / RESULTS &amp; DISCUSSION</div>
              <h2 className="section-title">
                Results and <em>Discussion</em>
              </h2>
              <p className="section-desc">
                Engineering achievements and critical analysis of MediTrack's sensor-based adherence paradigm.
              </p>
            </motion.div>

            <div className="results-disc-grid">
              {/* Results Panel */}
              <div className="results-card">
                <span className="panel-header-badge badge-results">
                  <CheckCircle2 size={13} />
                  <span>EXPERIMENTAL RESULTS</span>
                </span>
                <h3 className="panel-title">System Outcomes</h3>
                <div className="panel-list">
                  {RESULTS.map((res, i) => (
                    <div key={i} className="panel-list-item">
                      <span className="panel-bullet bullet-green">✓</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discussion Panel */}
              <div className="discussion-card">
                <span className="panel-header-badge badge-discussion">
                  <Sparkles size={13} />
                  <span>ENGINEERING DISCUSSION</span>
                </span>
                <h3 className="panel-title">Comparative Analysis</h3>
                <div className="panel-list">
                  {DISCUSSION.map((disc, i) => (
                    <div key={i} className="panel-list-item">
                      <span className="panel-bullet bullet-blue">✦</span>
                      <span>{disc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 10: CONCLUSION & FUTURE SCOPE */}
        <section id="slide-10" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 10 / CONCLUSION &amp; FUTURE SCOPE</div>
              <h2 className="section-title">
                Conclusion &amp; <em>Future Scope</em>
              </h2>
              <p className="section-desc">
                Project summary and future roadmap for commercialization and clinical connectivity.
              </p>
            </motion.div>

            {/* Conclusion Bullets */}
            <div
              style={{
                marginTop: 40,
                padding: 32,
                borderRadius: 24,
                background: 'var(--surface)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span className="badge-accent" style={{ marginBottom: 16, display: 'inline-block' }}>
                SUMMARY CONCLUSION
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
                {CONCLUSION_POINTS.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: 'var(--blue)', fontWeight: 800 }}>•</span>
                    <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink)' }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Scope 8 items */}
            <h3 style={{ margin: '48px 0 20px', font: "700 24px 'Space Grotesk', sans-serif" }}>
              Future Development Roadmap (8 Pillars)
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {FUTURE_SCOPE.map((fs) => {
                const Icon = fs.icon
                return (
                  <SpotlightCard key={fs.title}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: 'var(--green)',
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <strong style={{ fontSize: 16, color: 'var(--ink)' }}>{fs.title}</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
                      {fs.desc}
                    </p>
                  </SpotlightCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* SLIDE 11: REFERENCES */}
        <section id="slide-11" className="section">
          <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="slide-number-badge">SLIDE 11 / REFERENCES</div>
              <h2 className="section-title">
                Academic <em>References</em>
              </h2>
              <p className="section-desc">
                Peer-reviewed clinical literature, standards, and semiconductor datasheets cited in MediTrack.
              </p>
            </motion.div>

            <div className="references-grid">
              {REFERENCES.map((ref) => (
                <div key={ref.id} className="reference-item-card">
                  <span className="ref-index">[{ref.id}]</span>
                  <div className="ref-content">
                    <strong>{ref.title}</strong>
                    <p>{ref.citation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 12: TEAM & SLIDE 13: THANK YOU */}
        <section id="slide-12" className="conclusion-section">
          <div className="section-shell">
            <div className="slide-number-badge">SLIDE 12 &amp; 13 / OUR TEAM &amp; THANK YOU</div>

            <h2 className="conclusion-title" style={{ fontSize: 'clamp(44px, 6vw, 76px)' }}>
              THANK YOU
            </h2>

            <p className="conclusion-body">
              MediTrack - Right Medicine, Right Time. We are pleased to present our smart medication adherence
              and strip tracking system for PBCST504 Microcontrollers.
            </p>

            {/* Team Grid */}
            <h3 style={{ color: '#fff', margin: '40px 0 20px', font: "700 22px 'Space Grotesk', sans-serif" }}>
              Project Team Members
            </h3>
            <div className="team-deck-grid">
              {TEAM_MEMBERS.map((m) => (
                <SpotlightCard key={m.reg} className="team-member-card">
                  <div className="team-avatar-box">{m.initials}</div>
                  <h4 className="member-name">{m.name}</h4>
                  <span className="member-reg">{m.reg}</span>
                  <p className="member-role">{m.role}</p>
                </SpotlightCard>
              ))}
            </div>

            <div className="conclusion-btns" style={{ marginTop: 48 }}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToSlide(0)}
                className="btn-primary"
              >
                <RotateCcw size={16} />
                <span>Restart Presentation (Slide 01)</span>
              </motion.button>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-ghost"
              >
                <span>Back to Top</span>
                <ArrowRight size={15} style={{ transform: 'rotate(-90deg)' }} />
              </button>
            </div>

            <div className="conclusion-credits">
              <div>
                <strong>AHALIA SCHOOL OF ENGINEERING &amp; TECHNOLOGY</strong>
                <span>Department of Computer Science &amp; Engineering</span>
              </div>
              <div className="credits-team">
                <span>FACULTY GUIDE:</span> <strong>Dr. Balamurugan V</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Presentation Deck Mode Dock */}
      <div className="presentation-dock-wrap">
        <div className="presentation-dock" role="navigation" aria-label="Slide Deck Navigation">
          <div className="dock-title">
            <span className="dock-pulse" />
            <span>SLIDE {String(activeSlideIndex + 1).padStart(2, '0')}/{SLIDES.length}</span>
          </div>

          <button
            type="button"
            onClick={() => goToSlide(activeSlideIndex - 1)}
            disabled={activeSlideIndex === 0}
            className="dock-nav-btn"
            title="Previous Slide (Arrow Left)"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="dock-slide-chips">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`dock-chip-btn ${activeSlideIndex === idx ? 'is-active' : ''}`}
                title={s.title}
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToSlide(activeSlideIndex + 1)}
            disabled={activeSlideIndex === SLIDES.length - 1}
            className="dock-nav-btn"
            title="Next Slide (Arrow Right)"
            aria-label="Next Slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <footer className="site-footer" style={{ paddingBottom: 90 }}>
        <span>MEDITRACK — SMART MEDICINE REMINDER &amp; MONITORING SYSTEM</span>
        <span>Ahalia School of Engineering &amp; Technology · Dept. of CSE</span>
        <span>PRESENTATION &amp; SIMULATION SUITE · 2026</span>
      </footer>
    </div>
  )
}

export default App
