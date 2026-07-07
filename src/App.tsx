import './App.css'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { assetPath, workImages } from './workItems'

const tickerItems = [
  'FUSING DESIGN AND MOTION',
  'OPTIMIZING CREATIVE SYSTEMS',
  'RUNNING VISUAL STRATEGY',
  'BUILDING WORK THAT TRAVELS',
]

const creativeLetters = 'CREATIVE'.split('')
const directorLetters = 'DIRECTOR'.split('')
const workMantra = ['W', 'O', 'R', 'K']

const dividerSequences = [
  '11001110001001',
  '1001100101010001011010001100110110110101011110',
  '0011011011010011011011011000',
  '000001110110110010011',
]

const sinceRayCenter = { x: 50, y: 32 }
const sinceRayPath = [
  ...Array.from({ length: 17 }, (_, index) => {
    const x = (index * 100) / 16
    return `M ${sinceRayCenter.x} ${sinceRayCenter.y} L ${x} 0`
  }),
  ...Array.from({ length: 35 }, (_, index) => {
    const x = (index * 100) / 34
    return `M ${sinceRayCenter.x} ${sinceRayCenter.y} L ${x} 100`
  }),
].join(' ')

const achievements = [
  { value: '100+', label: 'Projects across brand films, ads and campaigns', tone: 'tall' },
  { value: '5.65M', label: 'Recent overseas ad impressions shaped by visual iteration', tone: 'wide' },
  { value: '244', label: 'Modular ad assets organized for Ulike global channels', tone: 'small' },
  { value: '$2M+', label: 'Monthly independent-site GMV supported by creative delivery', tone: 'medium' },
  { value: '1.8M', label: 'YouTube views from a low-budget viral film', tone: 'small' },
  { value: '84%', label: 'Brand search lift after viral campaign execution', tone: 'wide' },
  { value: 'AI', label: 'Filmmaking workflows explored across ideation, previsualization and production', tone: 'medium' },
]

const milestoneNotes = [
  'Still creating',
  'the next milestones.',
  'New projects, new systems,',
  'new visual stories.',
]

const workStartY = 220
const workStepY = 60
const workEndBuffer = 160
const workTravel = Math.max(1280, workStartY + workStepY * (workImages.length - 1) + workEndBuffer)
const workScroll = Math.max(2200, workTravel + 900)

const layoutPattern = [
  { x: '-12vw', z: '160px', rx: '0deg', ry: '8deg', rz: '-2deg', s: '0.98' },
  { x: '26vw', z: '-70px', rx: '0deg', ry: '-10deg', rz: '2deg', s: '0.82' },
  { x: '-2vw', z: '240px', rx: '0deg', ry: '0deg', rz: '-1deg', s: '1.04' },
  { x: '33vw', z: '40px', rx: '0deg', ry: '-14deg', rz: '2deg', s: '0.9' },
  { x: '-31vw', z: '-70px', rx: '0deg', ry: '12deg', rz: '-1.5deg', s: '0.88' },
  { x: '7vw', z: '220px', rx: '0deg', ry: '-4deg', rz: '1deg', s: '1' },
  { x: '30vw', z: '-40px', rx: '0deg', ry: '-12deg', rz: '-1deg', s: '0.88' },
  { x: '-22vw', z: '120px', rx: '0deg', ry: '10deg', rz: '2deg', s: '0.98' },
]

function getSpaceLayout(index: number) {
  const layout = layoutPattern[index % layoutPattern.length]

  return {
    ...layout,
    y: `${workStartY + index * workStepY}vh`,
  }
}

const portfolioUrl = 'https://www.xinpianchang.com/u11438230?from=navigator'

function BinaryDivider({ index }: { index: number }) {
  return (
    <div className="binary-divider" aria-hidden="true">
      <span className="binary-marker binary-marker-left" />
      <div className="binary-stream">
        {[...dividerSequences, ...dividerSequences].map((sequence, sequenceIndex) => (
          <span style={{ '--i': sequenceIndex } as CSSProperties} key={`${index}-${sequence}-${sequenceIndex}`}>
            {sequence} ////////////////////////////////
          </span>
        ))}
      </div>
      <span className="binary-marker binary-marker-right" />
    </div>
  )
}

function App() {
  const [isFinalActive, setFinalActive] = useState(false)
  const workRef = useRef<HTMLElement>(null)
  const sinceRef = useRef<HTMLElement>(null)
  const finalRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = [workRef.current, sinceRef.current, finalRef.current].filter(
      (section): section is HTMLElement => Boolean(section),
    )

    let frame = 0

    const update = () => {
      frame = 0
      const viewportHeight = window.innerHeight || 1
      const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
      const smooth = (value: number) => {
        const clamped = clamp01(value)
        return clamped * clamped * (3 - 2 * clamped)
      }

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const scrollable = Math.max(1, rect.height - viewportHeight)
        const progress = clamp01(-rect.top / scrollable)
        const view = clamp01((viewportHeight - rect.top) / (viewportHeight + rect.height))
        const entry = clamp01(progress / 0.28)
        const exit = clamp01((progress - 0.9) / 0.1)
        const stageIn = clamp01((progress - 0.12) / 0.16)
        const stage = stageIn * (1 - exit) * (1 - exit)
        const entrance = Math.min(1, Math.max(0, (progress - 0.05) / 0.18))
        const space = clamp01((progress - 0.23) / 0.58)
        const isWorkSection = section === workRef.current
        const workSpaceOffset = isWorkSection ? -space * workTravel : 0
        const workExitOffset = isWorkSection ? exit * 280 : 0
        const workDepthOffset = isWorkSection ? progress * 105 - exit * 760 : 0
        const workExitScale = isWorkSection ? 1 - exit * 0.22 : 1
        const redPlane = exit > 0 ? exit * 0.98 : 1 - smooth((progress - 0.2) / 0.18)
        const capsule = exit > 0 ? exit * 0.92 : 1 - smooth((progress - 0.24) / 0.11)
        const exitEase = exit * exit * (3 - 2 * exit)
        const redScale = exit > 0 ? 1 + (1 - exitEase) * 0.08 : 1 + entrance * 1.36
        const redZ = exit > 0 ? -exitEase * 80 : entrance * 780
        const capsuleScale = exit > 0 ? 1 + (1 - exitEase) * 0.14 : 1 + entrance * 2.65
        const capsuleZ = exit > 0 ? -exitEase * 110 : entrance * 880
        const perspectiveBoost = 1500 / (1500 - Math.max(0, capsuleZ))
        const capsuleWordScale = 1 / (capsuleScale * perspectiveBoost)
        const portalTurn = 1 - smooth(entrance)
        const sinceTextIn = smooth((progress - 0.18) / 0.16)
        const sinceSettle = smooth((progress - 0.2) / 0.58)
        const sinceSun = 1 - smooth((progress - 0.18) / 0.28)
        const sinceRays = 1
        const sinceGrid = smooth((progress - 0.76) / 0.18)
        const sinceGo = 0
        const sinceCopyY = 0
        const sinceCopyScale = 0.98 + sinceSettle * 0.015
        const sinceCopyOpacity = sinceTextIn
        const sinceGoY = 0
        const sinceRotate = 58 - sinceSettle * 48
        const sinceSkew = -1.2 + sinceSettle * 1.2
        const sinceDepth = 0.7 + sinceSettle * 0.28

        section.style.setProperty('--progress', progress.toFixed(4))
        section.style.setProperty('--view', view.toFixed(4))
        section.style.setProperty('--entry', entry.toFixed(4))
        section.style.setProperty('--exit', exit.toFixed(4))
        section.style.setProperty('--stage', stage.toFixed(4))
        section.style.setProperty('--red-plane', redPlane.toFixed(4))
        section.style.setProperty('--capsule', capsule.toFixed(4))
        section.style.setProperty('--red-scale', redScale.toFixed(4))
        section.style.setProperty('--red-z', `${redZ.toFixed(1)}px`)
        section.style.setProperty('--capsule-scale', capsuleScale.toFixed(4))
        section.style.setProperty('--capsule-word-scale', capsuleWordScale.toFixed(4))
        section.style.setProperty('--capsule-z', `${capsuleZ.toFixed(1)}px`)
        section.style.setProperty('--portal-yaw', '0deg')
        section.style.setProperty('--portal-roll', '0deg')
        section.style.setProperty('--portal-depth', `${(22 * portalTurn).toFixed(1)}px`)
        section.style.setProperty('--space-yaw', '0deg')
        section.style.setProperty('--space-slide', '0vw')
        section.style.setProperty('--entrance', entrance.toFixed(4))
        section.style.setProperty('--space', space.toFixed(4))
        section.style.setProperty('--work-space-offset', `${workSpaceOffset.toFixed(2)}vh`)
        section.style.setProperty('--work-exit-offset', `${workExitOffset.toFixed(2)}vh`)
        section.style.setProperty('--work-depth-offset', `${workDepthOffset.toFixed(2)}px`)
        section.style.setProperty('--work-exit-scale', workExitScale.toFixed(4))
        section.style.setProperty('--since-copy-y', `${sinceCopyY.toFixed(2)}vh`)
        section.style.setProperty('--since-copy-scale', sinceCopyScale.toFixed(4))
        section.style.setProperty('--since-copy-opacity', sinceCopyOpacity.toFixed(4))
        section.style.setProperty('--since-rotate', `${sinceRotate.toFixed(2)}deg`)
        section.style.setProperty('--since-skew', `${sinceSkew.toFixed(2)}deg`)
        section.style.setProperty('--since-depth', sinceDepth.toFixed(4))
        section.style.setProperty('--since-grid-opacity', sinceGrid.toFixed(4))
        section.style.setProperty('--since-sun-opacity', sinceSun.toFixed(4))
        section.style.setProperty('--since-rays-opacity', sinceRays.toFixed(4))
        section.style.setProperty('--since-go-opacity', sinceGo.toFixed(4))
        section.style.setProperty('--since-go-y', `${sinceGoY.toFixed(2)}vh`)
      })
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <main className="site-shell">
      <header className="system-nav" id="top">
        <a className="brand-glyph" href="#top" aria-label="返回首页">
          <span />
          <span />
          <span />
          <span />
        </a>

        <div className="status-ticker" aria-label="动态状态">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <nav className="nav-links" aria-label="主导航">
          <a href="#about">About</a>
          <a href="#results">Results</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-icons">
          <a
            className="linkedin-link"
            href="https://www.linkedin.com/in/alex-deng-4962633b0/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open LinkedIn profile"
          >
            in
          </a>
          <span>◐</span>
        </div>

        <div className="availability">
          <span>Based in Shenzhen.</span>
          <a href="mailto:932555229@qq.com">Available for visual direction → Email</a>
        </div>

        <a className="qr-card" href="tel:15361868248" aria-label="微信二维码和手机联系">
          <img src={assetPath('assets/wechat-qr.jpg')} alt="邓钰城微信二维码" />
        </a>
      </header>

      <section className="title-strip" aria-label="个人标题">
        <h1 className="hero-title">
          <span className="hero-word">
            {creativeLetters.map((letter, index) => (
              <span className="hero-letter" style={{ '--i': index } as CSSProperties} key={`${letter}-${index}`}>
                {letter}
              </span>
            ))}
          </span>
          <span className="hero-plus">+</span>
          <span className="hero-word">
            {directorLetters.map((letter, index) => (
              <span className="hero-letter" style={{ '--i': index + 7 } as CSSProperties} key={`${letter}-${index}`}>
                {letter}
              </span>
            ))}
          </span>
        </h1>
      </section>

      <BinaryDivider index={1} />

      <section className="intro-frame page-width">
        <div className="intro-image">
          <img src={assetPath('assets/creative-mind-avatar.jpg')} alt="邓钰城个人艺术形象" />
        </div>
        <div className="intro-copy">
          <p className="eyebrow">Alex Deng / Visual Direction</p>
          <h2>
            Clear stories,
            <br />
            built for every screen.
          </h2>
          <p>
            Visual director and creative manager shaping product films, overseas ads, social content and AI-assisted visual systems.
          </p>
        </div>
      </section>

      <BinaryDivider index={2} />

      <section className="about-section page-width" id="about">
        <div className="section-label reveal-label">About</div>
        <div className="about-grid">
          <div className="about-sidebar">
            <span>Guangdong University of F & E</span>
            <span>Université de Montréal</span>
            <span>Video / AI / Campaign</span>
          </div>
          <div className="about-copy">
            <h2>
              I turn products
              <br />
              into visual stories.
            </h2>
            <p className="about-lede">
              Films, ads and AI-assisted visuals
              <br />
              for brands built to grow.
            </p>
            <div className="about-body">
              <p>
                I started with directing, shooting and editing,
                <br />
                then moved through brand films, product launches,
                <br />
                social campaigns and overseas marketing.
              </p>
              <p>
                I’ve built <strong>content systems</strong> from scratch,
                <br />
                led video teams, shaped visual identities,
                <br />
                worked across <strong>100+ projects</strong>,
                <br />
                and I’m still chasing better ways
                <br />
                to make ideas move.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BinaryDivider index={3} />

      <section className="results-section page-width" id="results">
        <div className="section-label reveal-label">Results</div>
        <div className="results-grid">
          {achievements.map((item) => (
            <article className={`result-card ${item.tone}`} key={`${item.value}-${item.label}`}>
              <div className="trend-lines" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </article>
          ))}
          <article className="result-card milestone-card">
            <div>
              {milestoneNotes.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <BinaryDivider index={4} />

      <section
        className="work-section"
        id="work"
        ref={workRef}
        style={{ '--work-scroll-height': `${workScroll}vh` } as CSSProperties}
      >
        <div className="work-universe">
          <div className="work-red-plane" aria-hidden="true" />
          <div className="work-capsule" aria-hidden="true">
            <div className="capsule-word">
              {workMantra.map((letter) => (
                <span key={`capsule-${letter}`}>{letter}</span>
              ))}
            </div>
          </div>

          <div className="work-space-stage">
            <div className="space-backdrop" aria-hidden="true" />
            <div className="space-grid space-grid-back" aria-hidden="true" />
            <div className="space-grid space-grid-floor" aria-hidden="true" />
            <div className="space-grid space-grid-left" aria-hidden="true" />
            <div className="space-grid space-grid-right" aria-hidden="true" />
            <div className="space-word" aria-hidden="true">
              {workMantra.map((letter) => (
                <span key={`space-${letter}`}>{letter}</span>
              ))}
            </div>
            <div className="space-kicker" aria-hidden="true">
              <span>Selected work</span>
              <span>Infinite visual systems</span>
            </div>

            <div className="space-card-layer">
              {workImages.map((work, index) => {
                const layout = getSpaceLayout(index)

                return (
                  <figure
                    className="space-work-card"
                    key={work.src}
                    style={
                      {
                        '--x': layout.x,
                        '--y': layout.y,
                        '--z': layout.z,
                        '--rx': layout.rx,
                        '--ry': layout.ry,
                        '--rz': layout.rz,
                        '--s': layout.s,
                      } as CSSProperties
                    }
                  >
                    <img src={work.src} alt={work.title} />
                    <figcaption>{work.title}</figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <BinaryDivider index={5} />

      <section className="since-section" id="since" aria-label="Creating my way since 2020" ref={sinceRef}>
        <div className="since-stage">
          <svg className="since-rays" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={sinceRayPath} />
          </svg>
          <div className="since-sun" aria-hidden="true">
            <span />
          </div>
          <div className="since-flow" aria-hidden="true">
            <div className="since-perspective">
              <span>Creating</span>
              <span>my way</span>
              <span>Since</span>
            </div>
            <strong className="since-year">2020</strong>
          </div>
        </div>
      </section>

      <section className={`final-section ${isFinalActive ? 'is-active' : ''}`} id="contact" ref={finalRef}>
        <div className="gravity-grid" aria-hidden="true" />
        <div className="final-inner page-width">
          <div
            className={`final-cta ${isFinalActive ? 'is-active' : ''}`}
            onPointerLeave={() => setFinalActive(false)}
            onMouseLeave={() => setFinalActive(false)}
          >
            <a
              className="go-button"
              href={portfolioUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Xinpianchang portfolio"
              onPointerEnter={() => setFinalActive(true)}
              onPointerOver={() => setFinalActive(true)}
              onPointerMove={() => setFinalActive(true)}
              onMouseEnter={() => setFinalActive(true)}
              onMouseOver={() => setFinalActive(true)}
              onMouseMove={() => setFinalActive(true)}
              onFocus={() => setFinalActive(true)}
              onBlur={() => setFinalActive(false)}
            >
              <span className="go-idle">GO</span>
              <span className="go-lets">Let’s</span>
              <span className="go-rock">Rock</span>
            </a>
            <a
              className="circle-portfolio-link"
              href={portfolioUrl}
              target="_blank"
              rel="noreferrer"
            >
              Xinpianchang portfolio
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
