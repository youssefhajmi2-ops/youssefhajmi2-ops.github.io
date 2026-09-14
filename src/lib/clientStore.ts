import type { ProjectRequest } from "./types";

const PKEY = "lumina-projects";
const MKEY = "lumina-messages";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(localStorage.getItem(key) || "") as T; } catch { return fallback; }
}
function write(key: string, value: unknown) { localStorage.setItem(key, JSON.stringify(value)); }

export function listProjects(): ProjectRequest[] { return read<ProjectRequest[]>(PKEY, []); }

export function addProject(body: Partial<ProjectRequest>): ProjectRequest {
  const project: ProjectRequest = {
    id: `PRJ-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(), status: "New", notes: "",
    files: body.files ?? [], name: body.name ?? "", email: body.email ?? "",
    whatsapp: body.whatsapp ?? "", company: body.company ?? "", service: body.service ?? "",
    projectType: body.projectType ?? body.contentType ?? "", contentType: body.contentType ?? "",
    duration: body.duration ?? "", format: body.format ?? "", quality: body.quality ?? "",
    captions: body.captions ?? "", voiceOver: body.voiceOver ?? "", music: body.music ?? "",
    visualStyle: body.visualStyle ?? "", language: body.language ?? "English",
    deliverables: Number(body.deliverables ?? 1), revisions: Number(body.revisions ?? 1),
    platform: body.platform ?? "", deadline: body.deadline ?? "", budget: body.budget ?? "",
    references: body.references ?? "", description: body.description ?? "",
    estimate: Number(body.estimate ?? 0),
  };
  const all = listProjects(); all.unshift(project); write(PKEY, all); return project;
}

export function patchProject(id: string, patch: Partial<ProjectRequest>) {
  const all = listProjects();
  const idx = all.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch }; write(PKEY, all); return all[idx];
}

export function listMessages() {
  return read<{ id: string; name: string; email: string; message: string; createdAt: string }[]>(MKEY, []);
}
export function addMessage(body: { name: string; email: string; message: string }) {
  const all = listMessages();
  all.unshift({ ...body, id: `MSG-${Date.now().toString(36).toUpperCase()}`, createdAt: new Date().toISOString() });
  write(MKEY, all);
}
