import { useMemo, useState } from 'react'
import HERO from '../img/Principal.jpg'
import BRAND_LOGO from '../img/logo super churros .jfif'
import imgArequipe from '../img/Arequipe-Photoroom.png'
import imgGuayaba from '../img/guayaba.jpg'
import imgHawaiano from '../img/hawaiano-Photoroom.png'
import imgChampinon from '../img/pollo con champiñon-Photoroom.png'
import imgTocineta from '../img/pollo con tocineta-Photoroom.png'
import imgPollo from '../img/pollo-Photoroom.png'
import imgPrecocidos from '../img/precocidos-Photoroom.png'
import imgQueso from '../img/queso.jpg'
import imgPanzerottiRanchero from '../img/pacerotti ranchero.jfif'
import imgPanzerottiPollo from '../img/pancerotti de pollo.jpg'
import imgPanzerottiHawaiano from '../img/pancerotti hawaiano.jfif'

const WHATSAPP_NUMBER = '573153637645'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quisiera información sobre el menú de Super Churros.')}`

type Cat = 'Salados' | 'Dulces' | 'Adicionales' | 'Combos'
type Item = { id: string; name: string; desc?: string; price?: number; cat: Cat; tag?: string; image?: string }

const promos: Item[] = [
  { id: 'c-fam', name: 'Combo Familiar', desc: '10 churros + 2 salsas a elección', price: 25000, cat: 'Combos', tag: '20% OFF' },
  { id: 'c-dul', name: 'Combo Dulce', desc: '5 churros de arequipe + bebida', price: 18000, cat: 'Combos', tag: '15% OFF' },
  { id: 'c-mix', name: 'Combo Mix', desc: '3 salados + 3 dulces', price: 20000, cat: 'Combos', tag: '25% OFF' },
]

const products: Item[] = [
  { id: 'queso', name: 'Churros de Queso', price: 1500, cat: 'Salados', image: imgQueso },
  { id: 'pollo', name: 'Churros de Pollo', price: 3500, cat: 'Salados', image: imgPollo },
  { id: 'toci', name: 'Churros de Pollo con Tocineta', price: 3800, cat: 'Salados', image: imgTocineta },
  { id: 'champ', name: 'Churros de Pollo con Champiñón', price: 3800, cat: 'Salados', image: imgChampinon },
  { id: 'hawa', name: 'Churros Hawaiano', price: 3000, cat: 'Salados', image: imgHawaiano },
  { id: 'areq', name: 'Churros de Arequipe', price: 1500, cat: 'Dulces', image: imgArequipe },
  { id: 'guay', name: 'Churros de Guayaba', price: 1500, cat: 'Dulces', image: imgGuayaba },
  { id: 'preco', name: 'Churros Precocidos', desc: 'Bandeja x 10 unidades', price: 13000, cat: 'Adicionales', image: imgPrecocidos },
  { id: 'p-ran', name: 'Panzerotti Ranchero', price: 3500, cat: 'Adicionales', image: imgPanzerottiRanchero },
  { id: 'p-pol', name: 'Panzerotti de Pollo', price: 4000, cat: 'Adicionales', image: imgPanzerottiPollo },
  { id: 'p-haw', name: 'Panzerotti Hawaiano', price: 3500, cat: 'Adicionales', image: imgPanzerottiHawaiano },
]
const all = [...promos, ...products]
const filters = ['Todos', 'Salados', 'Dulces'] as const
const fmt = (n: number) => '$' + n.toLocaleString('es-CO')

function Icon({ d, className = 'size-5' }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={d} />
    </svg>
  )
}
const I = {
  bag: 'M6 7h12l-1 13H7L6 7Zm3 0a3 3 0 0 1 6 0',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  x: 'M6 6l12 12M18 6 6 18',
  chat: 'M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12Z',
  img: 'M4 5h16v14H4zM4 15l4-4 5 5 3-3 4 4M15 9h.01',
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,#F4EBDF_0_12px,#F8F1E7_12px_24px)] text-warm">
      <Icon d={I.img} className="size-7 opacity-60" />
      <span className="text-xs font-semibold uppercase tracking-wider">Foto pendiente</span>
      <span className="sr-only">{label}</span>
    </div>
  )
}

function Qty({ q, onInc, onDec, size = 'md' }: { q: number; onInc: () => void; onDec: () => void; size?: 'md' | 'sm' }) {
  const b = size === 'md' ? 'size-11' : 'size-9'
  return (
    <div className="flex items-center gap-1 rounded-2xl border border-choco/10 bg-cream p-1">
      <button aria-label="Quitar" onClick={onDec} className={`${b} grid place-items-center rounded-xl bg-white transition hover:bg-gold/40 active:scale-95`}>
        <Icon d={I.minus} className="size-4" />
      </button>
      <span className="w-7 text-center font-bold tabular-nums">{q}</span>
      <button aria-label="Añadir" onClick={onInc} className={`${b} grid place-items-center rounded-xl bg-gold transition hover:bg-[#F5B93A] active:scale-95`}>
        <Icon d={I.plus} className="size-4" />
      </button>
    </div>
  )
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex h-12 items-center gap-2 rounded-2xl bg-gold px-5 text-sm font-semibold text-choco transition hover:bg-[#F5B93A] active:scale-[0.97]">
      <Icon d={I.plus} className="size-4" /> Añadir
    </button>
  )
}

function Price({ p }: { p?: number }) {
  return p ? (
    <span className="text-lg font-bold">{fmt(p)}</span>
  ) : (
    <span className="rounded-lg border border-dashed border-caramel/50 px-2 py-1 text-xs font-semibold text-caramel">Precio por confirmar</span>
  )
}

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todos')
  const [open, setOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const set = (id: string, d: number) =>
    setCart((c) => {
      const n = { ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }
      if (!n[id]) delete n[id]
      return n
    })

  const lines = all.filter((i) => cart[i.id]).map((i) => ({ ...i, q: cart[i.id] }))
  const count = lines.reduce((s, l) => s + l.q, 0)
  const total = lines.reduce((s, l) => s + (l.price ?? 0) * l.q, 0)
  const pending = lines.some((l) => !l.price)
  const shown = useMemo(() => (filter === 'Todos' ? products : products.filter((p) => p.cat === filter)), [filter])
  const orderMessage = [
    '*CONFIRMACIÓN DE PEDIDO | SUPER CHURROS*',
    '----------------------------------------',
    '',
    '*INFORMACIÓN DEL CLIENTE*',
    `Nombre: ${customerName.trim()}`,
    `Teléfono: ${customerPhone.trim()}`,
    '',
    '*DETALLE DEL PEDIDO*',
    ...lines.map((line) => `• ${line.q} × ${line.name} — ${line.price ? fmt(line.price * line.q) : 'Precio por confirmar'}`),
    '',
    '*RESUMEN DEL PAGO*',
    `${pending ? 'Subtotal parcial' : 'Subtotal'}: ${fmt(total)}${pending ? ' (pendiente de confirmar precios finales)' : ''}`,
    'Costo de envío: Gratis',
    `Total a pagar: ${fmt(total)}${pending ? ' (sin incluir productos con precio pendiente)' : ''}`,
    '',
    pending
      ? 'Los productos con precio pendiente se confirmarán por WhatsApp antes de preparar el pedido.'
      : 'Quedo atento a la confirmación del pedido para proceder con su preparación y despacho.',
    'Muchas gracias por elegir Super Churros.',
  ].join('\n')
  const orderLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`

  return (
    <div className="min-h-screen pb-28 lg:pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-choco/5 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 lg:px-10">
          <div className="flex items-center gap-3">
            <img src={BRAND_LOGO} alt="Logo Super Churros" className="size-14 shrink-0 rounded-full object-cover lg:size-11" />
            <div className="leading-tight">
              <p className="font-display text-lg font-bold tracking-wide">SUPER CHURROS</p>
              <p className="text-sm font-medium text-caramel">¡Sabor que enamora!</p>
            </div>
          </div>
          <button onClick={() => setOpen(true)} aria-label="Ver carrito" className="relative grid size-12 place-items-center rounded-2xl border border-choco/10 bg-white transition hover:border-caramel/40">
            <Icon d={I.bag} />
            {count > 0 && <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-choco text-xs font-bold text-white">{count}</span>}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Intro */}
        <section className="grid items-center gap-6 pt-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pt-12">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-caramel">Menú digital</p>
            <h1 className="font-display text-[40px] font-bold leading-[1.05] lg:text-7xl">¡Los mejores churros!</h1>
            <p className="mt-4 max-w-md text-base text-warm lg:text-lg">Sabor único, frescura garantizada y la mejor calidad en cada bocado.</p>
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded-[20px] bg-white lg:aspect-[4/3]">
            <img src={HERO} alt="Fritos dorados con salsa (foto de referencia)" className="h-full w-full object-cover" />
          </div>
        </section>

        {/* Menu */}
        <section className="pt-12">
          <div className="sticky top-[72px] z-20 -mx-5 bg-cream/95 px-5 py-3 backdrop-blur lg:mx-0 lg:px-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="font-display text-2xl font-semibold lg:text-3xl">Nuestro menú</h2>
              <div className="no-scrollbar flex gap-2 overflow-x-auto">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition active:scale-95 ${filter === f ? 'bg-choco text-white' : 'border border-choco/10 bg-white text-choco hover:border-caramel/50'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((p) => (
              <article key={p.id} className="flex overflow-hidden rounded-[20px] border border-choco/5 bg-white shadow-[0_1px_2px_rgba(48,32,25,0.04)] sm:flex-col">
                <div className="h-28 w-28 shrink-0 sm:aspect-[4/3] sm:h-auto sm:w-auto">
                  {p.image ? <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" /> : <Placeholder label={p.name} />}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:gap-4 sm:p-5">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-caramel">{p.cat}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold leading-snug">{p.name}</h3>
                    {p.desc && <p className="mt-1 text-sm text-warm">{p.desc}</p>}
                  </div>
                  <div className="flex min-h-12 flex-wrap items-center justify-between gap-2">
                    <Price p={p.price} />
                    {cart[p.id] ? <Qty q={cart[p.id]} onInc={() => set(p.id, 1)} onDec={() => set(p.id, -1)} /> : <AddButton onClick={() => set(p.id, 1)} />}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-16 flex flex-col gap-2 border-t border-choco/10 py-8 text-sm text-warm lg:flex-row lg:justify-between">
          <span>© 2024 Super Churros. Todos los derechos reservados.</span>
        </footer>
      </main>

      {/* Floating WhatsApp */}
      {!open && (
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label="Escríbenos por WhatsApp"
          className={`wa-fab fixed right-5 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition hover:scale-105 active:scale-95 lg:bottom-8 lg:right-8 ${count > 0 ? 'bottom-24' : 'bottom-5'}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="relative size-7"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41-.08-.12-.28-.2-.57-.35M12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.41Z"/></svg>
        </a>
      )}

      {/* Mobile bottom bar */}
      {count > 0 && !open && (
        <div className="fixed inset-x-0 bottom-0 z-30 p-4 lg:hidden">
          <button onClick={() => setOpen(true)} className="flex h-16 w-full items-center justify-between rounded-2xl bg-choco px-5 text-white shadow-[0_8px_24px_rgba(48,32,25,0.18)]">
            <span className="text-sm font-medium">{count} {count === 1 ? 'producto' : 'productos'} · <b className="font-bold">{fmt(total)}</b></span>
            <span className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-choco">Ver pedido</span>
          </button>
        </div>
      )}

      {/* Cart panel */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-end bg-choco/30 lg:items-stretch" onClick={() => setOpen(false)}>
          <aside onClick={(e) => e.stopPropagation()} className="flex max-h-[88vh] w-full flex-col rounded-t-[24px] bg-cream lg:max-h-none lg:w-[440px] lg:rounded-none lg:rounded-l-[24px]">
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="font-display text-2xl font-bold">Tu pedido</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="grid size-11 place-items-center rounded-xl border border-choco/10 bg-white">
                <Icon d={I.x} />
              </button>
            </div>
            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <div className="grid size-16 place-items-center rounded-full bg-white text-caramel"><Icon d={I.bag} className="size-7" /></div>
                <p className="font-display text-xl font-semibold">Tu carrito está vacío</p>
                <p className="max-w-60 text-sm text-warm">Añade churros o un combo para empezar tu pedido.</p>
                <button onClick={() => setOpen(false)} className="mt-2 h-12 rounded-2xl border border-choco/15 bg-white px-5 text-sm font-semibold hover:border-caramel/50">Explorar menú</button>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-6">
                  {lines.map((l) => (
                    <li key={l.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4">
                      <div className="min-w-0">
                        <p className="font-semibold leading-snug">{l.name}</p>
                        <p className="text-sm text-warm">{l.price ? fmt(l.price * l.q) : 'Precio por confirmar'}</p>
                      </div>
                      <Qty size="sm" q={l.q} onInc={() => set(l.id, 1)} onDec={() => set(l.id, -1)} />
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 border-t border-choco/10 p-6">
                  <div className="flex justify-between text-warm"><span>Subtotal</span><span className="font-semibold">{fmt(total)}</span></div>
                  {pending && <p className="text-xs text-caramel">Algunos precios se confirman por WhatsApp.</p>}
                  <div className="flex justify-between pb-3 text-lg"><span className="font-display font-semibold">Total</span><span className="font-bold">{fmt(total)}</span></div>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      window.open(orderLink, '_blank', 'noopener,noreferrer')
                    }}
                    className="space-y-4 border-t border-choco/10 pt-5"
                  >
                    <div>
                      <p className="font-display text-lg font-bold">Finaliza tu pedido</p>
                      <p className="mt-1 text-sm text-warm">Completa tus datos para preparar la orden.</p>
                    </div>
                    <label className="block space-y-2 text-sm font-semibold">
                      <span>Nombre completo</span>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Ej. María Pérez"
                        required
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        className="h-12 w-full rounded-xl border border-choco/15 bg-white px-4 font-normal outline-none transition placeholder:text-warm/60 focus:border-caramel focus:ring-2 focus:ring-caramel/10"
                      />
                    </label>
                    <label className="block space-y-2 text-sm font-semibold">
                      <span>Celular de contacto</span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="Ej. +57 300 000 0000"
                        required
                        value={customerPhone}
                        onChange={(event) => setCustomerPhone(event.target.value)}
                        className="h-12 w-full rounded-xl border border-choco/15 bg-white px-4 font-normal outline-none transition placeholder:text-warm/60 focus:border-caramel focus:ring-2 focus:ring-caramel/10"
                      />
                    </label>
                    <button type="submit" className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] font-semibold text-white transition hover:bg-[#20BD5A] active:scale-[0.98]">
                      <Icon d={I.chat} /> Enviar pedido
                    </button>
                    <p className="text-center text-xs text-warm">Se abrirá WhatsApp con el pedido listo para confirmar.</p>
                  </form>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}
