"use client";
import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { translations, services, type Lang } from "@/lib/i18n";
import { defaults, estimatePrice, type BuilderState } from "@/lib/pricing";
import { Icon } from "./Icons";

const portfolio = [
  { id: "p1", title: "Aurelia Fragrance Film", category: "AI Videos", service: "AI Video Creation", description: "Cinematic 30s launch film." },
  { id: "p2", title: "Northline Edit Suite", category: "Video Editing", service: "Professional Video Editing", description: "Raw footage to brand story." },
  { id: "p3", title: "Volt Sneaker Drop", category: "Advertisements", service: "Advertising Content", description: "Product commercial in 4K." },
  { id: "p4", title: "Lumen Daily Reels", category: "Social Media", service: "Social Media Content", description: "12-reel social system." },
  { id: "p5", title: "Atelier Still Life", category: "AI Images", service: "AI Image Creation", description: "Luxury product stills." },
  { id: "p6", title: "Pulse Fitness Shorts", category: "Reels", service: "Social Media Content", description: "Energetic captioned shorts." },
  { id: "p7", title: "Maison Object Shots", category: "Product Content", service: "AI Image Creation", description: "Catalog-ready product content." },
  { id: "p8", title: "Harbor Cut Comparison", category: "Before / After", service: "Video & Image Enhancement", description: "Restored and captioned cut." },
];
const cats = ["All", "AI Videos", "Video Editing", "Advertisements", "Social Media", "AI Images", "Reels", "Product Content", "Before / After"];
const why = ["AI-powered creativity", "Professional editing", "High-quality output", "Fully customized projects", "Fast turnaround", "Social-media optimized content", "Multiple formats", "Multilingual content", "Creative solutions", "Personalized service"];
const grads = ["from-[#2b1d12] to-[#d4af77]", "from-[#12162b] to-[#7c6cff]", "from-[#0f241f] to-[#5eead4]", "from-[#1c1220] to-[#f0d9a8]"];

export default function Site() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [builder, setBuilder] = useState<BuilderState>(defaults);
  const [cat, setCat] = useState("All");
  const [modal, setModal] = useState<(typeof portfolio)[0] | null>(null);
  const [ba, setBa] = useState(50);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState("");
  const price = useMemo(() => estimatePrice(builder), [builder]);
  function set<K extends keyof BuilderState>(k: K, v: BuilderState[K]) { setBuilder((s) => ({ ...s, [k]: v })); }
  async function sendContact(e: FormEvent) {
    e.preventDefault();
    const { addMessage } = await import("@/lib/clientStore");
    addMessage(contact);
    setSent("Message received. We will reply shortly.");
    setContact({ name: "", email: "", message: "" });
  }
  const filtered = cat === "All" ? portfolio : portfolio.filter((p) => p.category === cat);
  return (
    <div dir={dir} className="grid-bg min-h-screen text-[#f4f1ea]">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#05060a]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#d4af77] to-[#7c6cff] text-xs font-bold text-black">L</span>
            <span className="text-sm tracking-[0.22em] uppercase text-[#f0d9a8]">{t.brand}</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
            <a href="#services">{t.navServices}</a><a href="#work">{t.navWork}</a><a href="#build">{t.navBuild}</a><a href="#pricing">{t.navPricing}</a><a href="#contact">{t.navContact}</a>
          </nav>
          <div className="flex items-center gap-2">
            {(["en", "fr", "ar"] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`rounded-full px-2.5 py-1 text-[11px] uppercase ${lang === l ? "bg-white/15 text-white" : "text-white/50"}`}>{l}</button>
            ))}
            <Link href="/request/" className="hidden rounded-full bg-gradient-to-r from-[#d4af77] to-[#f0d9a8] px-4 py-2 text-xs font-semibold text-black sm:inline-block">{t.startProject}</Link>
          </div>
        </div>
      </header>
      <section id="top" className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="mb-4 text-xs tracking-[0.28em] uppercase text-[#d4af77]">{t.tagline}</p>
          <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl">{t.heroTitle}</h1>
          <p className="mt-6 max-w-xl text-lg text-white/65">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request/" className="rounded-full bg-gradient-to-r from-[#d4af77] to-[#f0d9a8] px-6 py-3 text-sm font-semibold text-black">{t.startProject}</Link>
            <a href="#work" className="rounded-full border border-white/15 px-6 py-3 text-sm">{t.exploreWork}</a>
          </div>
        </div>
        <HeroVisual />
      </section>
      <section id="services" className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-5xl">{t.servicesTitle}</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.id} className="glass rounded-3xl p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-white/6 text-[#d4af77]"><Icon name={s.icon} /></div>
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/55">{s.desc}</p>
              <Link href={`/request/?service=${s.id}`} className="mt-4 inline-block text-xs text-[#d4af77]">{t.requestService}</Link>
            </article>
          ))}
        </div>
      </section>
      <section id="build" className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-semibold sm:text-5xl">{t.buildTitle}</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <Field label="Content Type"><Chips values={["Video","Image","Advertisement","Social Media Post","Reel","Short Video","Product Content","Custom Project"]} value={builder.contentType} onChange={(v) => set("contentType", v)} /></Field>
            <Field label="Duration"><Chips values={["15 seconds","30 seconds","60 seconds","90 seconds","Custom"]} value={builder.duration} onChange={(v) => set("duration", v)} /></Field>
            <Field label="Format"><Chips values={["9:16","16:9","1:1","4:5","Custom"]} value={builder.format} onChange={(v) => set("format", v)} /></Field>
            <Field label="Quality"><Chips values={["HD","Full HD","4K"]} value={builder.quality} onChange={(v) => set("quality", v)} /></Field>
            <Field label="Captions"><Chips values={["None","Basic Captions","Animated Captions","Premium Captions"]} value={builder.captions} onChange={(v) => set("captions", v)} /></Field>
            <Field label="Voice Over"><Chips values={["No Voice Over","AI Voice","Human Voice","Client-provided Voice"]} value={builder.voiceOver} onChange={(v) => set("voiceOver", v)} /></Field>
            <Field label="Music"><Chips values={["No Music","Background Music","Cinematic","Energetic","Corporate","Custom"]} value={builder.music} onChange={(v) => set("music", v)} /></Field>
            <Field label="Style"><Chips values={["Cinematic","Luxury","Corporate","Futuristic","Minimal","Social Media","Viral / Trendy","Product Commercial","Custom Style"]} value={builder.visualStyle} onChange={(v) => set("visualStyle", v)} /></Field>
            <Field label="Language"><Chips values={["English","French","Arabic","Other"]} value={builder.language} onChange={(v) => set("language", v)} /></Field>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-white/60">Deliverables<input type="number" min={1} value={builder.deliverables} onChange={(e) => set("deliverables", Number(e.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" /></label>
              <label className="text-sm text-white/60">Revisions<input type="number" min={0} value={builder.revisions} onChange={(e) => set("revisions", Number(e.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" /></label>
            </div>
          </div>
          <aside className="glass glow-gold h-fit rounded-3xl p-6 lg:sticky lg:top-24">
            <p className="text-xs tracking-[0.2em] uppercase text-[#d4af77]">{t.yourProject}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>{builder.contentType}</li><li>{builder.duration}</li><li>{builder.format} · {builder.quality}</li>
              <li>{builder.captions}</li><li>{builder.voiceOver}</li><li>{builder.visualStyle}</li>
              <li>{builder.deliverables} deliverables · {builder.revisions} revisions</li>
            </ul>
            <p className="gold-text mt-6 text-4xl font-semibold">${price}</p>
            <Link href={`/request/?${new URLSearchParams({ ...Object.fromEntries(Object.entries(builder).map(([k,v]) => [k, String(v)])), estimate: String(price) }).toString()}`} className="mt-6 block rounded-full bg-gradient-to-r from-[#d4af77] to-[#f0d9a8] py-3 text-center text-sm font-semibold text-black">{t.submitProject}</Link>
          </aside>
        </div>
      </section>
      <section id="work" className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-semibold sm:text-5xl">{t.portfolioTitle}</h2>
        <div className="mt-6 flex flex-wrap gap-2">{cats.map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1.5 text-xs ${cat===c?"bg-white text-black":"bg-white/6 text-white/70"}`}>{c}</button>)}</div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p,i) => (
            <button key={p.id} onClick={() => setModal(p)} className="glass overflow-hidden rounded-3xl text-left">
              <div className={`h-44 bg-gradient-to-br ${grads[i%grads.length]}`} />
              <div className="p-4"><p className="text-[11px] uppercase text-[#d4af77]">{p.category}</p><h3 className="mt-1 font-medium">{p.title}</h3></div>
            </button>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl font-semibold sm:text-5xl">{t.beforeAfter}</h2>
        <div className="glass relative mt-8 h-[320px] overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />
          <div className="absolute inset-0 overflow-hidden" style={{width:`${ba}%`}}><div className="h-full w-[100vw] bg-gradient-to-br from-[#2a1f12] via-[#7c6cff] to-[#d4af77]" /></div>
          <input type="range" min={2} max={98} value={ba} onChange={(e)=>setBa(Number(e.target.value))} className="absolute bottom-6 left-1/2 w-2/3 -translate-x-1/2" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-semibold sm:text-5xl">{t.howTitle}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">{[["01","Tell Us Your Idea","Send concept, files or reference."],["02","Customize Your Project","Choose style, format, duration."],["03","We Create It","Editing plus AI technology."],["04","Receive Your Content","Ready to publish."]].map(([n,title,d]) => <div key={n} className="glass rounded-3xl p-6"><p className="gold-text text-3xl">{n}</p><h3 className="mt-3 font-medium">{title}</h3><p className="mt-2 text-sm text-white/55">{d}</p></div>)}</div>
      </section>
      <section id="pricing" className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-semibold sm:text-5xl">{t.pricingTitle}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">{[["STARTER","For simple content needs.","290"],["PROFESSIONAL","For creators and brands.","790"],["PREMIUM","Advertising and commercial.","1,900"],["CUSTOM",t.customOffer,"—"]].map(([name,desc,from],i) => <div key={name} className={`glass rounded-3xl p-6 ${i===2?"glow-gold": ""}`}><p className="text-xs tracking-[0.2em] text-[#d4af77]">{name}</p><p className="mt-3 text-sm text-white/60">{desc}</p><p className="mt-6 text-3xl font-semibold">{from==="—"?"Bespoke":`$${from}`}</p><Link href="/request/" className="mt-6 inline-block text-sm text-[#d4af77]">{t.startMy}</Link></div>)}</div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl font-semibold sm:text-5xl">{t.whyTitle}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{why.map((w) => <div key={w} className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm">✓ {w}</div>)}</div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl font-semibold sm:text-5xl">{t.testimonialsTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[["Amelia Chen","Product Advertisement","The final video looked completely different from the original."],["Karim El Fassi","Reels Package","Captions and pacing were on point."],["Sofia Laurent","Brand Film","Felt like a high-end agency, but faster."],["Noah Brooks","AI Image Campaign","Luxury-grade visuals and precise revisions."]].map(([name,type,review]) => <blockquote key={name} className="glass rounded-3xl p-5"><p className="text-[#d4af77]">★★★★★</p><p className="mt-3 text-sm text-white/70">“{review}”</p><footer className="mt-4 text-sm"><strong>{name}</strong><span className="block text-xs text-white/40">{type}</span></footer></blockquote>)}</div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="glass glow-gold rounded-[2rem] px-8 py-16 text-center">
          <h2 className="text-3xl font-semibold sm:text-5xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{t.ctaSub}</p>
          <Link href="/request/" className="mt-8 inline-block rounded-full bg-gradient-to-r from-[#d4af77] to-[#f0d9a8] px-6 py-3 text-sm font-semibold text-black">{t.startMy}</Link>
        </div>
      </section>
      <section id="contact" className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-semibold">{t.contactTitle}</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-3 text-sm text-white/70">
            <a href="https://wa.me/15551234567">WhatsApp</a>
            <a href="mailto:hello@lumina.studio" className="block">hello@lumina.studio</a>
          </div>
          <form onSubmit={sendContact} className="glass space-y-3 rounded-3xl p-6">
            <input required placeholder="Name" value={contact.name} onChange={(e)=>setContact({...contact,name:e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
            <input required type="email" placeholder="Email" value={contact.email} onChange={(e)=>setContact({...contact,email:e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
            <textarea required rows={4} placeholder="Message" value={contact.message} onChange={(e)=>setContact({...contact,message:e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
            <button className="rounded-full bg-[#d4af77] px-5 py-2 text-sm font-semibold text-black">Send</button>
            {sent && <p className="text-sm text-[#5eead4]">{sent}</p>}
          </form>
        </div>
      </section>
      <footer className="border-t border-white/8 px-5 py-10 text-center text-xs text-white/35">© {new Date().getFullYear()} Lumina Studio · <Link href="/admin/">Admin</Link></footer>
      <a href="https://wa.me/15551234567" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white" aria-label="WhatsApp">WA</a>
      {modal && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4" onClick={()=>setModal(null)}><div className="glass max-w-lg rounded-3xl p-6" onClick={(e)=>e.stopPropagation()}><div className="h-40 rounded-2xl bg-gradient-to-br from-[#7c6cff] to-[#d4af77]" /><p className="mt-4 text-xs uppercase text-[#d4af77]">{modal.service}</p><h3 className="mt-1 text-2xl">{modal.title}</h3><p className="mt-2 text-sm text-white/65">{modal.description}</p></div></div>}
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className="mb-5"><p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/45">{label}</p>{children}</div>;
}
function Chips({ values, value, onChange }: { values: string[]; value: string; onChange: (v: string) => void }) {
  return <div className="flex flex-wrap gap-2">{values.map((v) => <button key={v} type="button" onClick={() => onChange(v)} className={`rounded-full px-3 py-1.5 text-xs ${value===v?"bg-[#d4af77] text-black":"bg-white/6 text-white/70"}`}>{v}</button>)}</div>;
}
function HeroVisual() {
  return (
    <div className="relative h-[420px]">
      <div className="float glass absolute right-0 top-0 h-56 w-64 overflow-hidden rounded-3xl p-3"><div className="h-full rounded-2xl bg-gradient-to-br from-[#1a1430] to-[#7c6cff]"><div className="mt-28 rounded-lg bg-black/40 px-3 py-2 text-[10px]">AI SCENE · 4K</div></div></div>
      <div className="float-delay glass absolute bottom-8 left-0 w-72 rounded-3xl p-4"><p className="text-[10px] uppercase text-white/40">Timeline</p><div className="mt-3 space-y-2"><div className="h-2 w-2/3 rounded-full bg-[#d4af77]" /><div className="h-2 w-1/2 rounded-full bg-[#7c6cff]" /><div className="h-2 w-4/5 rounded-full bg-[#5eead4]" /></div></div>
    </div>
  );
}
