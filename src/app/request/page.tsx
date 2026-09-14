"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { defaults, estimatePrice } from "@/lib/pricing";
import { services } from "@/lib/i18n";

function RequestInner() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [ok, setOk] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "", email: "", whatsapp: "", company: "",
    service: params.get("service") || services[0].id,
    projectType: params.get("contentType") || "Video",
    contentType: params.get("contentType") || defaults.contentType,
    duration: params.get("duration") || defaults.duration,
    format: params.get("format") || defaults.format,
    quality: params.get("quality") || defaults.quality,
    captions: params.get("captions") || defaults.captions,
    voiceOver: params.get("voiceOver") || defaults.voiceOver,
    music: params.get("music") || defaults.music,
    visualStyle: params.get("visualStyle") || defaults.visualStyle,
    language: params.get("language") || "English",
    deliverables: Number(params.get("deliverables") || 1),
    revisions: Number(params.get("revisions") || 2),
    platform: "", deadline: "", budget: "", references: "", description: "",
  });
  const estimate = useMemo(() => estimatePrice({
    contentType: form.contentType, duration: form.duration, format: form.format, quality: form.quality,
    captions: form.captions, voiceOver: form.voiceOver, music: form.music, visualStyle: form.visualStyle,
    language: form.language, deliverables: form.deliverables, revisions: form.revisions,
  }), [form]);
  function upd<K extends keyof typeof form>(k: K, v: (typeof form)[K]) { setForm((s) => ({ ...s, [k]: v })); }
  async function submit() {
    const { addProject } = await import("@/lib/clientStore");
    const data = addProject({ ...form, files, estimate });
    setOk(data.id);
  }
  if (ok) return (<main className="grid-bg min-h-screen px-5 py-24 text-center"><h1 className="text-4xl">Thank you. Reference {ok}</h1><Link href="/" className="mt-8 inline-block text-[#d4af77]">Back</Link></main>);
  return (
    <main className="grid-bg min-h-screen px-5 py-12 text-[#f4f1ea]">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs uppercase text-white/40">Lumina</Link>
        <h1 className="mt-4 text-4xl font-semibold">Custom project request</h1>
        <div className="mt-6 flex gap-2">{[1,2,3,4,5].map((n)=><div key={n} className={`h-1 flex-1 rounded-full ${n<=step?"bg-[#d4af77]":"bg-white/10"}`} />)}</div>
        {step===1 && <section className="glass mt-8 space-y-3 rounded-3xl p-6"><h2 className="text-2xl">What do you need?</h2>
          <select value={form.service} onChange={(e)=>upd("service", e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b0c12] px-3 py-2">{services.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}</select>
          <select value={form.contentType} onChange={(e)=>{upd("contentType", e.target.value); upd("projectType", e.target.value);}} className="w-full rounded-xl border border-white/10 bg-[#0b0c12] px-3 py-2">{["Video","Image","Advertisement","Social Media Post","Reel","Short Video","Product Content","Custom Project"].map(v=><option key={v}>{v}</option>)}</select>
          <input value={form.platform} onChange={(e)=>upd("platform", e.target.value)} placeholder="Platform" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        </section>}
        {step===2 && <section className="glass mt-8 space-y-3 rounded-3xl p-6"><h2 className="text-2xl">Style and options</h2>
          {[["duration","Duration",["15 seconds","30 seconds","60 seconds","90 seconds","Custom"]],["format","Format",["9:16","16:9","1:1","4:5","Custom"]],["quality","Quality",["HD","Full HD","4K"]],["captions","Captions",["None","Basic Captions","Animated Captions","Premium Captions"]],["voiceOver","Voice-over",["No Voice Over","AI Voice","Human Voice","Client-provided Voice"]],["visualStyle","Style",["Cinematic","Luxury","Corporate","Futuristic","Minimal","Social Media","Custom Style"]],["language","Language",["English","French","Arabic","Other"]]].map(([key,label,opts]) => (
            <label key={String(key)} className="block text-sm text-white/50">{label as string}
              <select value={(form as Record<string, unknown>)[key as string] as string} onChange={(e)=>upd(key as keyof typeof form, e.target.value as never)} className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b0c12] px-3 py-2">{(opts as string[]).map(o=><option key={o}>{o}</option>)}</select>
            </label>
          ))}
        </section>}
        {step===3 && <section className="glass mt-8 space-y-3 rounded-3xl p-6"><h2 className="text-2xl">Tell us about your project</h2>
          <input placeholder="Full name" value={form.name} onChange={(e)=>upd("name", e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <input type="email" placeholder="Email" value={form.email} onChange={(e)=>upd("email", e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <input placeholder="WhatsApp" value={form.whatsapp} onChange={(e)=>upd("whatsapp", e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <textarea rows={5} placeholder="Describe exactly what you want." value={form.description} onChange={(e)=>upd("description", e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        </section>}
        {step===4 && <section className="glass mt-8 space-y-3 rounded-3xl p-6"><h2 className="text-2xl">Upload / references</h2>
          <input type="file" multiple onChange={(e)=>setFiles(Array.from(e.target.files||[]).map(f=>f.name))} />
          <input placeholder="Reference links" value={form.references} onChange={(e)=>upd("references", e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        </section>}
        {step===5 && <section className="glass mt-8 rounded-3xl p-6"><h2 className="text-2xl">Review</h2>
          <p className="mt-3 text-sm">{form.name} · {form.contentType} · {form.duration} · {form.format}</p>
          <p className="gold-text mt-6 text-4xl">${estimate}</p>
          <button onClick={submit} className="mt-6 rounded-full bg-gradient-to-r from-[#d4af77] to-[#f0d9a8] px-6 py-3 text-sm font-semibold text-black">Submit My Project</button>
        </section>}
        <div className="mt-6 flex justify-between">
          <button disabled={step===1} onClick={()=>setStep(s=>s-1)} className="text-sm text-white/50">Back</button>
          {step<5 && <button onClick={()=>setStep(s=>s+1)} className="rounded-full bg-white/10 px-5 py-2 text-sm">Continue</button>}
        </div>
      </div>
    </main>
  );
}
export default function RequestPage() {
  return <Suspense fallback={<div className="grid-bg min-h-screen" />}><RequestInner /></Suspense>;
}
