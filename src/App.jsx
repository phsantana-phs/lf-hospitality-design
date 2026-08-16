import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import heroImage from './assets/hero-hospitality.png'
import ritualImage from './assets/ritual-hospitality.png'

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
  ['01', 'Observar', 'Entender o lugar, as pessoas, os ritmos, os gestos e as expectativas.'],
  ['02', 'Interpretar', 'Encontrar a essência da marca e o que ela deve fazer o cliente sentir.'],
  ['03', 'Alinhar', 'Conectar ambiente, sentidos, presença, serviço e linguagem.'],
  ['04', 'Fazer existir', 'Transformar intenção em detalhes reais, comportamentos e experiências consistentes.'],
]

function Reveal({ children, className = '' }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: .12 })
    const el = document.querySelector(`[data-reveal-id="${className}"]`)
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [className])
  return <div data-reveal-id={className} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <main>
    <div className="grain" aria-hidden="true" />
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="LF Hospitality Design - início"><span>LF</span><small>Hospitality<br />Design</small></a>
      <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Navegação principal">
        <a href="#manifesto" onClick={closeMenu}>Manifesto</a>
        <a href="#contato" onClick={closeMenu}>Contato <ArrowUpRight size={15} strokeWidth={1.5} /></a>
      </nav>
      <button className="menu-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <section id="inicio" className="hero">
      <div className="hero-image"><img src={heroImage} alt="Mão preparando uma mesa com linho em ambiente de hospitalidade" /></div>
      <div className="hero-copy">
        <p className="eyebrow">LF Hospitality Design</p>
        <h1>Tudo<br /><em>conversa.</em></h1>
        <p className="hero-intro">Espaço, serviço, presença e sentidos. Uma abordagem para lugares que desejam ser percebidos por inteiro.</p>
        <a className="scroll-cue" href="#manifesto" aria-label="Conheça o manifesto"><span>Desça para sentir</span><ArrowDownRight size={19} strokeWidth={1.4} /></a>
      </div>
      <div className="leaf-shape leaf-one" aria-hidden="true" />
      <div className="leaf-shape leaf-two" aria-hidden="true" />
    </section>

    <section id="manifesto" className="manifesto section-dark">
      <div className="section-label">01 — Manifesto</div>
      <Reveal className="manifesto-title"><h2>A experiência começa antes do <em>primeiro contato.</em></h2></Reveal>
      <div className="manifesto-lines">
        {['Começa na luz que recebe.', 'No som que envolve.', 'No aroma que permanece.', 'Na textura que convida.', 'No gesto que acolhe.'].map((line, i) => <Reveal key={line} className={`line-${i}`}><p>{line}</p></Reveal>)}
      </div>
      <Reveal className="manifesto-body">
        <p>Um lugar não é feito apenas de paredes, móveis ou objetos. É feito de ritmo. De presença. De cuidado. De pequenas decisões que, juntas, dizem ao cliente como ele deve se sentir.</p>
        <p>Acreditamos que o uniforme também é arquitetura. Que uma música pode conduzir uma jornada. Que um aroma pode construir uma memória. Que a forma de cumprimentar alguém revela tanto sobre uma marca quanto seu logotipo.</p>
      </Reveal>
      <Reveal className="manifesto-quote"><p>O espaço conversa com o serviço.<br />O serviço conversa com a linguagem.<br />A linguagem conversa com o comportamento.<br />O comportamento conversa com a atmosfera.</p><strong>Tudo precisa fazer sentido.</strong></Reveal>
      <Reveal className="manifesto-ending"><p>Criamos ambientes que têm personalidade. Serviços que têm intenção. Rituais que parecem naturais. Marcas que são percebidas antes de serem explicadas.</p><p>Porque sofisticação não está no excesso.</p><h3>Está na coerência.</h3><p>E quando tudo conversa, o cliente não apenas visita um espaço. <em>Ele entra em um universo.</em></p></Reveal>
    </section>

    <section className="feelings section-light">
      <div className="section-label">02 — Coerência</div>
      <Reveal className="feelings-heading"><h2>Quando tudo encontra <em>o seu lugar.</em></h2><p>A coerência não chama atenção para si. Ela cria uma sensação de naturalidade. O cliente não precisa saber explicar o que aconteceu. Apenas percebe que existe algo especial ali.</p></Reveal>
      <div className="feelings-list">
        {feelingItems.map(([title, text], index) => <Reveal className={`feeling-${index}`} key={title}><article className="feeling"><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article></Reveal>)}
      </div>
    </section>

    <section className="invisible section-sand">
      <div className="invisible-photo"><img src={ritualImage} alt="Gestos de cuidado na preparação de um ambiente de hospitalidade" /></div>
      <div className="invisible-copy"><div className="section-label">03 — A camada invisível</div><Reveal className="invisible-text"><h2>O que não aparece na planta também constrói a <em>experiência.</em></h2><p>Existe uma camada invisível em todo lugar bem resolvido.</p><p>Ela está no tempo de uma recepção, na distância entre duas mesas, na escolha de uma textura, no tom de voz de quem atende, na música de uma tarde, no perfume que permanece depois que alguém vai embora.</p></Reveal><div className="word-cloud" aria-label="Elementos da experiência">{['Ambientação', 'Iluminação', 'Música', 'Aroma', 'Uniformes', 'Linguagem', 'Postura', 'Rituais', 'Jornada', 'Ritmo'].map(word => <span key={word}>{word}</span>)}</div><p className="closing-line">Não são detalhes isolados. São partes de uma mesma linguagem.</p></div>
    </section>

    <section className="places section-olive">
      <div className="section-label">04 — Lugares</div>
      <Reveal className="places-heading"><h2>Cada lugar tem uma forma própria de <em>receber.</em></h2><p>Hotéis, restaurantes, lojas, clubes e espaços de bem-estar não precisam parecer iguais para serem sofisticados.</p><p>Precisam compreender o que os torna únicos — e fazer essa singularidade aparecer em todos os detalhes.</p></Reveal>
      <div className="place-list">{places.map((place, i) => <Reveal className={`place-${i}`} key={place}><div className="place"><span>{String(i + 1).padStart(2, '0')}</span><p>{place}</p><ArrowUpRight size={20} strokeWidth={1.2} /></div></Reveal>)}</div>
    </section>

    <section className="approach section-light">
      <div className="section-label">05 — Abordagem</div>
      <Reveal className="approach-heading"><h2>Antes de transformar, é preciso <em>perceber.</em></h2></Reveal>
      <div className="approach-grid">{approach.map(([num, title, text]) => <Reveal key={title} className={`approach-${num}`}><article><span>{num}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
      <Reveal className="approach-ending"><p>O resultado não é uma fórmula. É uma linguagem própria, capaz de ser reconhecida, vivida e lembrada.</p></Reveal>
    </section>

    <section id="contato" className="contact section-dark">
      <div className="contact-intro"><div className="section-label">06 — Conversa</div><Reveal className="contact-heading"><h2>Há lugares que se explicam. <em>Outros se sentem.</em></h2><p>Para marcas que entendem que a experiência não está em um único detalhe, mas na relação entre todos eles.</p></Reveal></div>
      <div className="contact-form-wrap"><h3>Existe um lugar que você deseja transformar?</h3>{sent ? <div className="form-success"><p>Obrigado por compartilhar.</p><span>Vamos olhar para essa possibilidade com atenção.</span></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}><label>Nome<input required name="name" autoComplete="name" /></label><label>E-mail<input required type="email" name="email" autoComplete="email" /></label><label>Empresa ou projeto<input name="company" /></label><label>Tipo de espaço<select name="space" defaultValue=""><option value="" disabled>Selecione</option><option>Hotel ou pousada</option><option>Restaurante ou bar</option><option>Loja ou varejo</option><option>Spa ou wellness</option><option>Clube ou espaço privado</option><option>Outro</option></select></label><label>Cidade<input name="city" /></label><label className="full">O que você imagina para esse lugar?<textarea name="message" rows="3" /></label><button type="submit">Iniciar conversa <ArrowUpRight size={18} /></button></form>}</div>
    </section>
    <footer><a className="brand" href="#inicio"><span>LF</span><small>Hospitality<br />Design</small></a><p>Experiências de hospitalidade com intenção.</p><a href="#inicio">Voltar ao início <ArrowUpRight size={15} /></a></footer>
  </main>
}

export default App
