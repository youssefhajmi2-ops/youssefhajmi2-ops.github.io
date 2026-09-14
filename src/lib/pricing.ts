export type BuilderState = {
  contentType: string; duration: string; format: string; quality: string;
  captions: string; voiceOver: string; music: string; visualStyle: string;
  language: string; deliverables: number; revisions: number;
};

export const defaults: BuilderState = {
  contentType: "Video", duration: "30 seconds", format: "9:16", quality: "Full HD",
  captions: "Animated Captions", voiceOver: "AI Voice", music: "Cinematic",
  visualStyle: "Cinematic", language: "English", deliverables: 1, revisions: 2,
};

export function estimatePrice(s: BuilderState): number {
  const typeMap: Record<string, number> = { Video: 180, Image: 79, Advertisement: 320, "Social Media Post": 99, Reel: 160, "Short Video": 160, "Product Content": 210, "Custom Project": 400 };
  let base = typeMap[s.contentType] ?? 180;
  const durMap: Record<string, number> = { "15 seconds": 0, "30 seconds": 40, "60 seconds": 110, "90 seconds": 180, Custom: 140 };
  base += durMap[s.duration] ?? 0;
  if (s.quality === "4K") base += 90;
  if (s.quality === "Full HD") base += 30;
  const capMap: Record<string, number> = { None: 0, "Basic Captions": 25, "Animated Captions": 55, "Premium Captions": 95 };
  base += capMap[s.captions] ?? 0;
  const voMap: Record<string, number> = { "No Voice Over": 0, "AI Voice": 45, "Human Voice": 160, "Client-provided Voice": 20 };
  base += voMap[s.voiceOver] ?? 0;
  if (s.music !== "No Music") base += 25;
  if (s.visualStyle === "Luxury" || s.visualStyle === "Cinematic") base += 40;
  base += Math.max(0, s.deliverables - 1) * Math.round(base * 0.7);
  base += Math.max(0, s.revisions - 1) * 35;
  return base;
}
