"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { ProjectRequest, ProjectStatus } from "@/lib/types";
const STATUSES: ProjectStatus[] = ["New","Confirmed","In Progress","Review","Revision","Completed"];
export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [projects, setProjects] = useState<ProjectRequest[]>([]);
  const [messages, setMessages] = useState<{id:string;name:string;email:string;message:string}[]>([]);
  const [selected, setSelected] = useState<ProjectRequest | null>(null);
  const [notes, setNotes] = useState("");
  const [tab, setTab] = useState<"projects"|"customers"|"messages">("projects");
  useEffect(() => { if (sessionStorage.getItem("lumina-admin")==="1") setAuth(true); }, []);
  useEffect(() => {
    if (!auth) return;
    void import("@/lib/clientStore").then(({ listProjects, listMessages }) => {
      setProjects(listProjects()); setMessages(listMessages());
    });
  }, [auth]);
  function login(e: FormEvent) { e.preventDefault(); if (pw==="lumina-admin") { sessionStorage.setItem("lumina-admin","1"); setAuth(true); } }
  async function update(id: string, patch: Partial<ProjectRequest>) {
    const { patchProject } = await import("@/lib/clientStore");
    const updated = patchProject(id, patch); if (!updated) return;
    setProjects((ps)=>ps.map((p)=>p.id===id?updated:p)); setSelected(updated);
  }
  if (!auth) return (<main className="grid-bg grid min-h-screen place-items-center px-5"><form onSubmit={login} className="glass w-full max-w-sm rounded-3xl p-8"><h1 className="text-3xl">Admin</h1><input type="password" value={pw} onChange={(e)=>setPw(e.target.value)} placeholder="Password" className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" /><button className="mt-4 w-full rounded-full bg-[#d4af77] py-2 text-sm font-semibold text-black">Enter</button><p className="mt-3 text-xs text-white/35">lumina-admin</p></form></main>);
  return (
    <main className="min-h-screen bg-[#05060a] text-[#f4f1ea]">
      <header className="flex items-center justify-between border-b border-white/8 px-6 py-4"><h1 className="text-xl">Studio OS</h1><div className="flex gap-2 text-sm">{(["projects","customers","messages"] as const).map(t=><button key={t} onClick={()=>setTab(t)} className={`rounded-full px-3 py-1 ${tab===t?"bg-white/15":"text-white/50"}`}>{t}</button>)}</div></header>
      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="p-6">
          {tab==="projects" && <table className="w-full text-left text-sm"><thead><tr><th>ID</th><th>Client</th><th>Status</th></tr></thead><tbody>{projects.map(p=><tr key={p.id} onClick={()=>{setSelected(p);setNotes(p.notes);}} className="cursor-pointer border-t border-white/6"><td className="py-3 font-mono text-xs">{p.id}</td><td>{p.name||"—"}</td><td>{p.status}</td></tr>)}</tbody></table>}
          {tab==="customers" && <ul className="space-y-3 text-sm">{projects.map(p=><li key={p.id} className="rounded-2xl border border-white/8 p-4"><strong>{p.name}</strong><p className="text-white/50">{p.email} · {p.whatsapp}</p></li>)}</ul>}
          {tab==="messages" && <ul className="space-y-3 text-sm">{messages.map(m=><li key={m.id} className="rounded-2xl border border-white/8 p-4"><strong>{m.name}</strong><p>{m.message}</p></li>)}</ul>}
        </div>
        <aside className="p-6">{selected ? <div><p className="font-mono text-xs">{selected.id}</p><h2 className="text-2xl">{selected.name||"Untitled"}</h2><p className="text-sm text-white/50">{selected.description}</p><select value={selected.status} onChange={(e)=>update(selected.id,{status:e.target.value as ProjectStatus})} className="mt-4 w-full rounded-xl border border-white/10 bg-[#0b0c12] px-3 py-2">{STATUSES.map(s=><option key={s}>{s}</option>)}</select><textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={4} className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" /><button onClick={()=>update(selected.id,{notes})} className="mt-3 rounded-full bg-[#d4af77] px-4 py-2 text-xs font-semibold text-black">Save notes</button></div> : <p className="text-white/40">Select a project</p>}</aside>
      </div>
    </main>
  );
}
