export function Icon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const p = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.5, viewBox: "0 0 24 24" };
  if (name === "film") return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 5v14M17 5v14M3 9h18M3 15h18" /></svg>);
  if (name === "scissors") return (<svg {...p}><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8.5 7.5 20 18M8.5 16.5 20 6" /></svg>);
  return (<svg {...p}><path d="M12 3l2.2 6.4L21 12l-6.8 2.6L12 21l-2.2-6.4L3 12l6.8-2.6L12 3z" /></svg>);
}
