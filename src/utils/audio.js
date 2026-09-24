// Microcontroller buzzer sound synthesizer using Web Audio API

class BuzzerSound {
  constructor() {
    this.ctx = null
    this.intervalId = null
    this.isMuted = false
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  beep(freq = 1200, duration = 0.12, type = 'square') {
    if (this.isMuted) return
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      // gentle ramp to prevent clicking
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.15, this.ctx.currentTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch {
      // Audio context might be restricted before user interaction
    }
  }

  startAlarm() {
    this.stopAlarm()
    // Pattern: 3 short beeps, then a short pause, repeating
    let count = 0
    this.intervalId = setInterval(() => {
      const phase = count % 8
      if (phase === 0 || phase === 2 || phase === 4) {
        this.beep(1400, 0.1, 'square')
      }
      count++
    }, 150)
  }

  stopAlarm() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  successTone() {
    this.stopAlarm()
    if (this.isMuted) return
    this.beep(880, 0.09, 'sine')
    setTimeout(() => this.beep(1320, 0.16, 'sine'), 100)
  }

  clickTone() {
    if (this.isMuted) return
    this.beep(600, 0.04, 'sine')
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    if (this.isMuted) {
      this.stopAlarm()
    }
    return this.isMuted
  }
}

export const buzzerAudio = new BuzzerSound()
