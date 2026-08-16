import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import heroImage from './assets/hero-hospitality.png'
import luizaFariaImage from './assets/luiza-faria.png'

const feelingItems = [
  ['O ambiente recebe', 'O espaço deixa de ser apenas bonito e passa a orientar, acolher e criar ritmo.'],
  ['O serviço ganha presença', 'O atendimento deixa de parecer um protocolo e passa a expressar a personalidade da marca.'],
  ['A equipe representa', 'Uniforme, postura, linguagem e gestos passam a formar uma presença coerente.'],
  ['Os sentidos permanecem', 'Som, aroma, luz e textura ajudam a transformar uma visita em memória.'],
  ['A marca se torna reconhecível', 'O cliente percebe uma identidade própria em cada ponto de contato.'],
  ['A experiência se sustenta', 'O cuidado deixa de depender apenas de improviso ou de uma pessoa específica.'],
]

const places = ['Hotéis e pousadas', 'Restaurantes e bares', 'Lojas e varejo premium', 'Spas e wellness', 'Clubes e espaços privados', 'Novos conceitos de hospitalidade']
const approach = [
  ['01', 'Diagnóstico', 'Leitura do espaço, da marca, do público e dos pontos de contato que já contam uma história.'],
  ['02', 'Direção criativa', 'Conceito de ambientação, sentidos e linguagem para orientar as decisões do projeto.'],
  ['03', 'Caderno de experiência', 'Diretrizes práticas para luz, som, aroma, materiais, serviço, uniformes e rituais.'],
  ['04', 'Implementação', 'Prioridades, especificações e acompanhamento para transformar a direção em uma experiência real.'],
]

gsap.registerPlugin(ScrollTrigger)

function Reveal({ children, className = '', delay = 0 }) {
  const reducedMotion = useReducedMotion()
  return <motion.div
    className={`reveal ${className}`}
    initial={reducedMotion ? false : { opacity: 0, y: 38, filter: 'blur(8px)' }}
    whileInView={reducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: .16 }}
    transition={{ duration: reducedMotion ? 0 : .9, delay, ease: [0.16, 1, 0.3, 1] }}
  >{children}</motion.div>
}

function ManifestoStory() {
  const storyRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion || !storyRef.current) return undefined
    const story = storyRef.current
    const media = gsap.matchMedia()
    media.add('(min-width: 721px)', () => {
      const steps = gsap.utils.toArray('.story-step', story)
      const progress = story.querySelector('.story-progress span')
      const ornament = story.querySelector('.story-ornament')
      gsap.set(steps, { autoAlpha: 0, y: 42 })
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: .8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      timeline
        .to(steps[0], { autoAlpha: 1, y: 0, duration: 1 })
        .to(steps[0], { autoAlpha: 0, y: -30, duration: .45 }, '+=.6')
        .set(steps[1], { autoAlpha: 1, y: 42 })
        .to(steps[1], { y: 0, duration: .85 })
        .to(steps[1], { autoAlpha: 0, y: -30, duration: .45 }, '+=.72')
        .set(steps[2], { autoAlpha: 1, y: 42 })
        .to(steps[2], { y: 0, duration: .85 })
      gsap.to(progress, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: story, start: 'top top', end: '+=260%', scrub: true },
      })
      gsap.to(ornament, {
        rotate: 9,
        xPercent: 7,
        yPercent: -5,
        ease: 'none',
        scrollTrigger: { trigger: story, start: 'top top', end: '+=260%', scrub: true },
      })
    })
    media.add('(max-width: 720px)', () => {
      const steps = gsap.utils.toArray('.story-step-inner', story)
      const progress = story.querySelector('.story-progress span')
      const ornament = story.querySelector('.story-ornament')

      gsap.set(steps, { autoAlpha: 0, y: 30 })
      gsap.set(progress, { scaleY: 0 })

      steps.forEach((step) => {
        gsap.to(step, {
          autoAlpha: 1,
          y: 0,
          duration: .82,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.to(progress, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: story, start: 'top 72%', end: 'bottom 56%', scrub: true },
      })
      gsap.to(ornament, {
        yPercent: -7,
        rotate: 6,
        ease: 'none',
        scrollTrigger: { trigger: story, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
    return () => media.revert()
  }, [reducedMotion])

  return <section ref={storyRef} id="manifesto" className="manifesto-story section-dark" aria-label="Manifesto">
    <div className="story-rail" aria-hidden="true"><span>luz</span><span>som</span><span>gesto</span></div>
    <div className="story-progress" aria-hidden="true"><span /></div>
    <div className="story-counter" aria-hidden="true">01 / 03</div>
    <svg className="story-ornament" aria-hidden="true" viewBox="0 0 300 640" fill="none"><path d="M55 628c59-140 69-284 49-427C94 129 53 65 0 18m103 183c75-19 136-54 181-108M91 299c75-16 145 5 209 58M78 401c78 6 147 51 190 119M47 512c38-8 93 7 145 42" /><path d="M95 162c-36 23-54 56-55 100M105 234c39-30 64-67 74-111M94 340c-44 20-69 52-76 94M95 448c40 12 72 35 95 68" /></svg>
    <div className="story-stage">
      <article className="story-step story-title"><div className="story-step-inner"><span>01 — Manifesto</span><h2>A experiência começa antes do <em>primeiro contato.</em></h2></div></article>
      <article className="story-step story-sensory"><div className="story-step-inner"><span>02 — Atmosfera</span><p>Começa na luz que recebe.<br />No som que envolve.<br /><em>No aroma que permanece.</em></p></div></article>
      <article className="story-step story-sensory story-last"><div className="story-step-inner"><span>03 — Presença</span><p>Na textura que convida.<br /><em>No gesto que acolhe.</em></p></div></article>
    </div>
  </section>
}

function useSmoothScroll() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.55,
      wheelMultiplier: .72,
      touchMultiplier: .9,
      smoothWheel: true,
      syncTouch: false,
      anchors: { duration: 1.55, offset: 0 },
    })
    const updateLenis = (time) => lenis.raf(time * 1000)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [reducedMotion])
}

function WindLeaf({ leaf, index, pointerX, pointerY }) {
  const x = useSpring(pointerX, { stiffness: 58 - index * 5, damping: 15 + index * 2, mass: .95 + index * .18 })
  const y = useSpring(pointerY, { stiffness: 52 - index * 4, damping: 17 + index * 2, mass: 1.05 + index * .15 })

  return <motion.span
    className="wind-leaf"
    style={{ left: leaf.x, top: leaf.y, x, y }}
    animate={{ rotate: [leaf.r - 7, leaf.r + 9, leaf.r - 4], scale: [leaf.s, leaf.s * 1.06, leaf.s] }}
    transition={{
      rotate: { duration: 2.3 + index * .26, delay: index * -.24, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
      scale: { duration: 1.9 + index * .18, delay: index * -.16, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
    }}
  >
    <svg viewBox="0 0 40 64" fill="none"><path d="M20 62C7 48 2 35 4 22 6 10 13 3 20 2c7 1 14 8 16 20 2 13-3 26-16 40Z" /><path d="M20 59V8" /></svg>
  </motion.span>
}

function WindLeaves() {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(-140)
  const pointerY = useMotionValue(-140)
  const [isActive, setIsActive] = useState(false)
  const leaves = [
    { x: -45, y: -38, r: -28, s: .62 },
    { x: 34, y: -22, r: 31, s: .82 },
    { x: -18, y: 28, r: 48, s: .55 },
    { x: 49, y: 36, r: -45, s: .72 },
    { x: 5, y: 2, r: 14, s: .42 },
  ]

  useEffect(() => {
    if (reducedMotion) return undefined
    const moveLeaves = (event) => {
      if (event.pointerType === 'touch') return
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      setIsActive(true)
    }
    const restLeaves = () => setIsActive(false)
    window.addEventListener('pointermove', moveLeaves, { passive: true })
    window.addEventListener('blur', restLeaves)
    document.documentElement.addEventListener('pointerleave', restLeaves)
    return () => {
      window.removeEventListener('pointermove', moveLeaves)
      window.removeEventListener('blur', restLeaves)
      document.documentElement.removeEventListener('pointerleave', restLeaves)
    }
  }, [pointerX, pointerY, reducedMotion])

  if (reducedMotion) return null
  return <motion.div className="wind-leaves" aria-hidden="true" animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: .35, ease: 'easeOut' }}>
    {leaves.map((leaf, index) => <WindLeaf key={index} leaf={leaf} index={index} pointerX={pointerX} pointerY={pointerY} />)}
  </motion.div>
}

function ScrollZoomHero() {
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.22])
  const imageOpacity = useTransform(scrollYProgress, [0, .78, 1], [1, .92, .08])
  const imageBlur = useTransform(scrollYProgress, [0, 1], [0, 8])
  const imageFilter = useMotionTemplate`blur(${imageBlur}px)`
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -84])
  const contentOpacity = useTransform(scrollYProgress, [0, .54, .86], [1, 1, 0])

  return <section id="inicio" ref={heroRef} className="hero-zoom">
    <div className="hero-sticky">
      <motion.div className="hero-image" style={reducedMotion ? {} : { scale: imageScale, opacity: imageOpacity, filter: imageFilter }}>
        <img src={heroImage} alt="Mão preparando uma mesa com linho em ambiente de hospitalidade" />
      </motion.div>
      <motion.div className="hero-copy" style={reducedMotion ? {} : { y: contentY, opacity: contentOpacity }}>
        <h1>Tudo<br /><em>conversa.</em></h1>
        <p className="hero-intro">Espaço, serviço, presença e sentidos. Uma abordagem para lugares que desejam ser percebidos por inteiro.</p>
        <motion.a className="scroll-cue" href="#manifesto" aria-label="Conheça o manifesto" whileHover={{ x: 5 }} whileTap={{ scale: .98 }}><span>Desça para sentir</span><ArrowDownRight size={19} strokeWidth={1.4} /></motion.a>
      </motion.div>
      <div className="leaf-shape leaf-one" aria-hidden="true" />
      <div className="leaf-shape leaf-two" aria-hidden="true" />
    </div>
  </section>
}

const keywordLines = [
  ['Ambientação', 'Iluminação', 'Música', 'Aroma'],
  ['Uniformes', 'Linguagem', 'Postura', 'Rituais'],
  ['Jornada', 'Ritmo', 'Texturas', 'Presença'],
]

function KeywordLine({ words, line }) {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], line % 2 ? ['-28%', '0%'] : ['0%', '-28%'])
  const repeatedWords = [...words, ...words]

  return <div ref={sectionRef} className="keyword-line" aria-label={words.join(', ')}>
    <motion.div className="keyword-track" style={reducedMotion ? {} : { x }}>
      {repeatedWords.map((word, index) => <span key={`${word}-${index}`} aria-hidden="true">{word}<i>✦</i></span>)}
    </motion.div>
  </div>
}

function ServiceKeywords() {
  return <section className="service-keywords section-dark" aria-label="Elementos da experiência">
    <Reveal className="keywords-heading"><div className="section-label">03 — Elementos</div><h2>Uma linguagem feita de <em>camadas.</em></h2></Reveal>
    <div className="keyword-lines">{keywordLines.map((words, index) => <KeywordLine key={words[0]} words={words} line={index} />)}</div>
  </section>
}

function FooterReveal({ revealRef }) {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: revealRef, offset: ['start end', 'end end'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [42, 0])

  return <motion.footer className="footer-reveal" style={reducedMotion ? {} : { opacity, y }}>
    <div className="footer-top"><div className="footer-brand-block"><a className="brand" href="#inicio"><span>LF</span><small>Hospitality<br />Design</small></a><div className="footer-message"><p>Experiências de hospitalidade com intenção.</p><span>Luiza Faria</span></div></div><figure className="footer-portrait"><img src={luizaFariaImage} alt="Luiza Faria" /></figure></div>
    <div className="footer-bottom"><span>Espaço · serviço · presença · sentidos</span><a href="#inicio">Voltar ao início <ArrowUpRight size={15} /></a></div>
  </motion.footer>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const footerRevealRef = useRef(null)
  const closeMenu = () => setMenuOpen(false)
  useSmoothScroll()

  useEffect(() => {
    const root = document.documentElement
    let animationFrame
    const updateScroll = () => {
      const scrollY = window.scrollY
      root.style.setProperty('--hero-parallax', `${(scrollY * .035).toFixed(2)}px`)
      root.style.setProperty('--photo-parallax', `${(scrollY * -.025).toFixed(2)}px`)
      root.style.setProperty('--orbit-parallax', `${(scrollY * -.025).toFixed(2)}px`)
      root.style.setProperty('--orbit-turn', `${(scrollY * .006).toFixed(2)}deg`)
      root.style.setProperty('--lower-parallax', `${(scrollY * .018).toFixed(2)}px`)
      root.style.setProperty('--lower-turn', `${(scrollY * -.006).toFixed(2)}deg`)
      animationFrame = undefined
    }
    const requestScrollUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateScroll)
    }
    updateScroll()
    window.addEventListener('scroll', requestScrollUpdate, { passive: true })
    return () => {
      window.removeEventListener('scroll', requestScrollUpdate)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <>
  <main className="site-page">
    <div className="grain" aria-hidden="true" />
    <WindLeaves />
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="LF Hospitality Design - início"><span>LF</span><small>Hospitality<br />Design</small></a>
      <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Navegação principal">
        <a href="#manifesto" onClick={closeMenu}>Manifesto</a>
        <a href="#contato" onClick={closeMenu}>Contato <ArrowUpRight size={15} strokeWidth={1.5} /></a>
      </nav>
      <button className="menu-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <ScrollZoomHero />

    <ManifestoStory />

    <section className="manifesto section-dark" aria-label="Continuação do manifesto">
      <div className="manifesto-body">
        <Reveal><p>Um lugar não é feito apenas de paredes, móveis ou objetos. É feito de ritmo. De presença. De cuidado. De pequenas decisões que, juntas, dizem ao cliente como ele deve se sentir.</p></Reveal>
        <Reveal delay={.08}><p>Acreditamos que o uniforme também é arquitetura. Que uma música pode conduzir uma jornada. Que um aroma pode construir uma memória. Que a forma de cumprimentar alguém revela tanto sobre uma marca quanto seu logotipo.</p></Reveal>
      </div>
      <div className="manifesto-quote"><Reveal><p>O espaço conversa com o serviço.<br />O serviço conversa com a linguagem.<br />A linguagem conversa com o comportamento.</p></Reveal><Reveal delay={.08}><strong>Tudo precisa fazer sentido.</strong></Reveal></div>
      <div className="manifesto-ending"><Reveal><p>Criamos ambientes que têm personalidade. Serviços que têm intenção. Rituais que parecem naturais. Marcas que são percebidas antes de serem explicadas.</p></Reveal><Reveal delay={.06}><p>Porque sofisticação não está no excesso.</p></Reveal><Reveal delay={.12}><h3>Está na coerência.</h3></Reveal><Reveal delay={.18}><p>E quando tudo conversa, o cliente não apenas visita um espaço. <em>Ele entra em um universo.</em></p></Reveal></div>
    </section>

    <section className="feelings section-light">
      <div className="section-label">02 — Coerência</div>
      <Reveal className="feelings-heading"><h2>Quando tudo encontra <em>o seu lugar.</em></h2><p>A coerência não chama atenção para si. Ela cria uma sensação de naturalidade. O cliente não precisa saber explicar o que aconteceu. Apenas percebe que existe algo especial ali.</p></Reveal>
      <div className="feelings-list">
        {feelingItems.map(([title, text], index) => <Reveal className={`feeling-${index}`} key={title}><article className="feeling"><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article></Reveal>)}
      </div>
    </section>

    <ServiceKeywords />

    <section className="places section-olive">
      <div className="section-label">04 — Lugares</div>
      <Reveal className="places-heading"><h2>Cada lugar tem uma forma própria de <em>receber.</em></h2><p>Hotéis, restaurantes, lojas, clubes e espaços de bem-estar não precisam parecer iguais para serem sofisticados.</p><p>Precisam compreender o que os torna únicos — e fazer essa singularidade aparecer em todos os detalhes.</p></Reveal>
      <div className="place-list">{places.map((place, i) => <Reveal className={`place-${i}`} key={place}><div className="place"><span>{String(i + 1).padStart(2, '0')}</span><p>{place}</p><ArrowUpRight size={20} strokeWidth={1.2} /></div></Reveal>)}</div>
    </section>

    <section className="approach section-light">
      <div className="section-label">05 — Como é feito</div>
      <Reveal className="approach-heading"><h2>Do conceito à experiência que o cliente <em>percebe.</em></h2></Reveal>
      <div className="approach-grid">{approach.map(([num, title, text]) => <Reveal key={title} className={`approach-${num}`}><article><span>{num}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
      <Reveal className="approach-ending"><p>Você recebe uma direção clara e aplicável — para que cada detalhe trabalhe em favor da sua marca.</p></Reveal>
    </section>

    <section id="contato" className="contact section-dark">
      <div className="contact-intro"><div className="section-label">06 — Conversa</div><Reveal className="contact-heading"><h2>Há lugares que se explicam. <em>Outros se sentem.</em></h2><p>Para marcas que entendem que a experiência não está em um único detalhe, mas na relação entre todos eles.</p></Reveal></div>
      <div className="contact-form-wrap"><h3>Existe um lugar que você deseja transformar?</h3>{sent ? <div className="form-success"><p>Obrigado por compartilhar.</p><span>Vamos olhar para essa possibilidade com atenção.</span></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}><label>Nome<input required name="name" autoComplete="name" /></label><label>E-mail<input required type="email" name="email" autoComplete="email" /></label><label>Empresa ou projeto<input name="company" /></label><label>Tipo de espaço<select name="space" defaultValue=""><option value="" disabled>Selecione</option><option>Hotel ou pousada</option><option>Restaurante ou bar</option><option>Loja ou varejo</option><option>Spa ou wellness</option><option>Clube ou espaço privado</option><option>Outro</option></select></label><label>Cidade<input name="city" /></label><label className="full">O que você imagina para esse lugar?<textarea name="message" rows="3" /></label><button type="submit">Iniciar conversa <ArrowUpRight size={18} /></button></form>}</div>
    </section>
    <div ref={footerRevealRef} className="footer-sentinel" aria-hidden="true" />
  </main>
  <FooterReveal revealRef={footerRevealRef} />
  </>
}

export default App
