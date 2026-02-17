import React, { useState, useEffect } from 'react';

// ==========================================
// 1. BESPOKE GROUND-UP STYLESHEET
// ==========================================
const customStyles = `
  :root {
    --primary: #FF5D00;
    --primary-hover: #cc4a00;
    --bg-dark: #0a0a0a;
    --bg-card: #141414;
    --bg-input: #111111;
    --border: #2a2a2a;
    --border-light: #333333;
    --text-main: #ffffff;
    --text-muted: #888888;
    --text-label: #a3a3a3;
    --success: #22c55e;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
  
  .ph-wrapper { min-height: 100dvh; width: 100%; background-color: var(--bg-dark); color: var(--text-main); display: flex; align-items: flex-start; justify-content: center; padding: clamp(1rem, 3vw, 2rem); position: relative; overflow-x: hidden; }
  .ph-glow { position: fixed; top: 0; left: 25%; width: 24rem; height: 24rem; background-color: var(--primary); border-radius: 50%; mix-blend-mode: screen; filter: blur(150px); opacity: 0.1; pointer-events: none; }
  
  .ph-main-container { width: min(100%, 64rem); min-height: auto; position: relative; z-index: 10; display: flex; flex-direction: column; }

  .ph-header-area { padding: 2rem 2rem 1.5rem; border-bottom: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; }
  .ph-logo-wrap { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
  .ph-logo-box { width: 2.5rem; height: 2.5rem; background-color: #111111; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(255,93,0,0.3); overflow: hidden; }
  .ph-logo-image { width: 100%; height: 100%; object-fit: cover; }
  .ph-logo-text { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.025em; }
  .ph-logo-char { color: white; font-weight: bold; font-size: 1.25rem; }

  .ph-progress-bar { width: 100%; max-width: 28rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; position: relative; }
  .ph-progress-line-bg { position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 100%; height: 4px; background-color: var(--border); z-index: -1; border-radius: 2px; }
  .ph-progress-line-fill { position: absolute; left: 0; top: 50%; transform: translateY(-50%); height: 4px; background-color: var(--primary); z-index: -1; border-radius: 2px; transition: width 0.65s ease; }
  .ph-progress-dot { width: 1.5rem; height: 1.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold; transition: all 0.3s; background-color: var(--bg-input); border: 1px solid var(--border-light); color: var(--text-muted); }
  .ph-progress-dot.active { background-color: var(--primary); color: white; box-shadow: 0 0 10px rgba(255,93,0,0.8); border-color: var(--primary); }
  .ph-progress-dot.passed { background-color: var(--primary); color: white; border-color: var(--primary); }

  .ph-card { background-color: var(--bg-card); border: 1px solid var(--border); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); overflow: hidden; position: relative; min-height: 0; flex: 1; display: flex; flex-direction: column; }
  .ph-card-content { padding: 2rem; flex: 1; }
  .ph-card-footer { padding: 1.25rem 2rem; border-top: 1px solid var(--border); background-color: #0f0f0f; display: flex; justify-content: space-between; align-items: center; }
  .ph-error-log-wrap { padding: 0 2rem 1.25rem; }

  .ph-btn { display: inline-flex; items-center; justify-content: center; gap: 0.5rem; padding: 0.625rem 1.5rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease; border: none; outline: none; }
  .ph-btn:focus, .ph-btn:focus-visible { outline: none; }
  .ph-btn:focus-visible { box-shadow: 0 0 0 2px rgba(255, 93, 0, 0.45); }
  .ph-btn:active:not(:disabled) { transform: translateY(1px) scale(0.99); }
  .ph-btn-primary { background-color: var(--primary); color: white; box-shadow: 0 4px 15px rgba(255,93,0,0.3); }
  .ph-btn-primary:hover:not(:disabled) { background-color: var(--primary-hover); box-shadow: 0 6px 20px rgba(255,93,0,0.5); }
  .ph-btn-primary:disabled { background-color: #333; color: #888; cursor: not-allowed; box-shadow: none; }
  .ph-btn-ghost { background: transparent; color: var(--text-muted); padding: 0.5rem 1rem; }
  .ph-btn-ghost:hover:not(:disabled) { color: white; }
  .ph-btn-ghost:disabled { color: transparent; cursor: default; }
  .ph-btn-outline { background-color: var(--bg-input); border: 1px solid var(--primary); color: var(--primary); width: 100%; padding: 0.75rem; }
  .ph-btn-outline:hover { background-color: #222; }

  .ph-title-wrap { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
  .ph-title { font-size: 1.25rem; font-weight: 600; }
  .ph-title-icon { color: var(--primary); width: 1.5rem; height: 1.5rem; }

  .ph-input-group { margin-bottom: 1.25rem; }
  .ph-label { display: block; font-size: 0.7rem; font-weight: 600; color: var(--text-label); margin-bottom: 0.375rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .ph-input, .ph-select, .ph-textarea { width: 100%; background-color: var(--bg-input); border: 1px solid var(--border-light); border-radius: 0.5rem; padding: 0.75rem 1rem; color: white; font-size: 0.875rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
  .ph-input:focus, .ph-select:focus, .ph-textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary); }
  .ph-input:disabled { opacity: 0.5; cursor: not-allowed; border-color: #222; }
  .ph-select { appearance: none; cursor: pointer; }
  .ph-select-wrap { position: relative; }
  .ph-select-arrow { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); pointer-events: none; width: 1rem; height: 1rem; fill: var(--text-muted); }
  
  .ph-textarea { min-height: 16rem; font-family: monospace; font-size: 0.8rem; color: #4ade80; resize: none; }

  .ph-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }

  .ph-checkbox-label { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; padding: 0.75rem; background-color: var(--bg-input); border: 1px solid var(--border-light); border-radius: 0.5rem; transition: border-color 0.2s; margin-bottom: 0.75rem; }
  .ph-checkbox-label:hover { border-color: var(--primary); }
  .ph-checkbox-box { width: 1.25rem; height: 1.25rem; border-radius: 0.25rem; border: 1px solid #555; display: flex; align-items: center; justify-content: center; }
  .ph-checkbox-box.checked { background-color: var(--primary); border-color: var(--primary); }
  .ph-checkbox-input { display: none; }
  .ph-checkbox-text { font-size: 0.875rem; font-weight: 500; color: #e5e5e5; }

  .ph-loader-overlay { position: absolute; inset: 0; background-color: rgba(10,10,10,0.8); backdrop-filter: blur(4px); z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: fadeIn 0.3s; }
  .ph-spinner { width: 3rem; height: 3rem; border: 4px solid var(--border-light); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem; }
  .ph-loader-text { color: var(--primary); font-weight: 500; letter-spacing: 0.025em; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  .ph-auth-section { background-color: #101010; border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem; }
  .ph-auth-section-title { font-size: 0.85rem; font-weight: 700; margin-bottom: 0.75rem; color: #e5e5e5; letter-spacing: 0.02em; }
  .ph-auth-help { margin-top: -0.5rem; margin-bottom: 1rem; font-size: 0.8rem; color: var(--text-muted); }
  .ph-auth-error { margin-top: 0.5rem; color: #f87171; font-size: 0.8rem; }
  .ph-auth-overlay-card { width: min(90%, 30rem); background-color: #111; border: 1px solid var(--border-light); border-radius: 0.85rem; padding: 1.25rem; }
  .ph-auth-overlay-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.85rem; }
  .ph-auth-progress-track { width: 100%; height: 0.4rem; border-radius: 999px; background-color: #1f1f1f; overflow: hidden; margin-bottom: 1rem; }
  .ph-auth-progress-fill { width: 40%; height: 100%; background: linear-gradient(90deg, transparent, var(--primary), transparent); animation: authLoad 1.2s ease-in-out infinite; }
  .ph-auth-status-list { display: flex; flex-direction: column; gap: 0.65rem; }
  .ph-auth-status-item { display: flex; align-items: center; justify-content: space-between; background-color: #161616; border: 1px solid #2b2b2b; border-radius: 0.6rem; padding: 0.625rem 0.75rem; }
  .ph-auth-status-left { display: flex; align-items: center; gap: 0.6rem; color: #f3f3f3; }
  .ph-auth-status-note { font-size: 0.75rem; color: var(--text-muted); }
  .ph-auth-badge { width: 1.35rem; height: 1.35rem; border-radius: 999px; border: 1px solid #3b3b3b; display: flex; align-items: center; justify-content: center; }
  .ph-auth-badge.pending { background-color: #101010; }
  .ph-auth-badge.inprogress { border-top-color: var(--primary); animation: spin 0.85s linear infinite; }
  .ph-auth-badge.success { border-color: var(--success); background-color: rgba(34,197,94,0.2); color: var(--success); }
  .ph-auth-badge.error { border-color: #ef4444; background-color: rgba(239,68,68,0.2); color: #ef4444; }
  .ph-provision-overlay-card { width: min(92%, 34rem); background: linear-gradient(180deg, #141414, #0f0f0f); border: 1px solid var(--border-light); border-radius: 1rem; padding: 1.25rem; box-shadow: 0 20px 45px rgba(0,0,0,0.45); }
  .ph-provision-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem; }
  .ph-provision-subtitle { color: var(--text-muted); font-size: 0.78rem; margin-bottom: 1rem; }
  .ph-provision-list { display: flex; flex-direction: column; gap: 0.6rem; }
  .ph-provision-item { display: flex; align-items: center; justify-content: space-between; border: 1px solid #2d2d2d; border-radius: 0.65rem; background-color: #151515; padding: 0.65rem 0.75rem; }
  .ph-provision-item-title { font-size: 0.84rem; color: #f4f4f4; }
  .ph-provision-item-note { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; }
  .ph-provision-error { margin-top: 0.85rem; color: #fca5a5; font-size: 0.78rem; border: 1px solid rgba(239,68,68,0.4); background-color: rgba(239,68,68,0.12); border-radius: 0.5rem; padding: 0.55rem 0.65rem; }
  .ph-error-log-panel { margin-top: 1rem; border: 1px solid #3a1f1f; border-radius: 0.75rem; background-color: rgba(60, 8, 8, 0.28); overflow: hidden; }
  .ph-error-log-header { display: flex; align-items: center; justify-content: space-between; padding: 0.7rem 0.8rem; border-bottom: 1px solid #4a2626; }
  .ph-error-log-title { display: inline-flex; gap: 0.45rem; align-items: center; color: #fca5a5; font-weight: 600; font-size: 0.82rem; }
  .ph-error-log-count { color: #fca5a5; border: 1px solid rgba(248,113,113,0.5); border-radius: 999px; padding: 0.15rem 0.5rem; font-size: 0.72rem; }
  .ph-error-log-list { max-height: 16rem; overflow-y: auto; }
  .ph-error-log-empty { padding: 0.8rem; font-size: 0.78rem; color: #fca5a5; }
  .ph-error-log-item { padding: 0.75rem 0.8rem; border-top: 1px solid rgba(255, 255, 255, 0.08); }
  .ph-error-log-item:first-child { border-top: none; }
  .ph-error-log-item-top { display: flex; justify-content: space-between; gap: 0.75rem; font-size: 0.74rem; }
  .ph-error-log-item-source { color: #fecaca; font-weight: 600; }
  .ph-error-log-item-step { color: #fca5a5; }
  .ph-error-log-item-time { color: #fda4af; white-space: nowrap; }
  .ph-error-log-message { margin-top: 0.4rem; color: #ffe4e6; font-size: 0.78rem; line-height: 1.4; }
  .ph-error-log-meta { margin-top: 0.45rem; padding: 0.45rem; background: rgba(15,15,15,0.7); border: 1px solid #3f3f3f; border-radius: 0.4rem; color: #d4d4d4; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.7rem; white-space: pre-wrap; word-break: break-word; }

  .ph-node-tree { flex: 1; background-color: #0f0f0f; border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; items-center; position: relative; min-height: 300px; align-items: center; }
  .ph-node { background-color: #1a1a1a; border: 1px solid rgba(255,93,0,0.5); border-radius: 0.75rem; padding: 1rem; width: 100%; max-width: 24rem; position: relative; z-index: 10; box-shadow: 0 0 15px rgba(255,93,0,0.1); }
  .ph-node-start { background-color: #222; border: 1px solid #444; border-radius: 0.5rem; padding: 0.75rem 1.5rem; z-index: 10; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
  .ph-node-end { background-color: #1a1a1a; border: 1px dashed #333; border-radius: 0.5rem; padding: 0.75rem 1.5rem; z-index: 10; opacity: 0.6; }
  .ph-line { width: 2px; height: 2rem; background-color: #333; position: relative; }
  .ph-add-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 1.5rem; height: 1.5rem; background-color: black; border: 1px solid #444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; z-index: 20; transition: all 0.2s; }
  .ph-add-btn:hover { border-color: var(--primary); color: var(--primary); }

  .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
  @keyframes authLoad { 0% { transform: translateX(-130%); } 100% { transform: translateX(260%); } }
`;

// ==========================================
// 2. RAW INLINE SVG ICONS (Zero CDN dependency)
// ==========================================
const Icon = ({ viewBox = "0 0 24 24", d, fill = "none", stroke = "currentColor", size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const Icons = {
  ChevronRight: (p) => <Icon {...p} d="m9 18 6-6-6-6" />,
  ChevronLeft: (p) => <Icon {...p} d="m15 18-6-6 6-6" />,
  Upload: (p) => <Icon {...p} d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m17 8-5-5-5 5", "M12 3v12"]} />,
  Check: (p) => <Icon {...p} d="M20 6 9 17l-5-5" />,
  Copy: (p) => <Icon {...p} d={["rect width=14 height=14 x=8 y=8 rx=2 ry=2", "path d=M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"]} />, // Adjusted simplified path
  User: (p) => <Icon {...p} d={["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "circle cx=12 cy=7 r=4"]} />,
  Phone: (p) => <Icon {...p} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  Server: (p) => <Icon {...p} d={["rect width=20 height=8 x=2 y=2 rx=2 ry=2", "rect width=20 height=8 x=2 y=14 rx=2 ry=2", "line x1=6 x2=6.01 y1=6 y2=6", "line x1=6 x2=6.01 y1=18 y2=18"]} />,
  KeyRound: (p) => <Icon {...p} d={["path d=M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z", "circle cx=16.5 cy=7.5 r=.5"]} />,
  Briefcase: (p) => <Icon {...p} d={["rect width=20 height=14 x=2 y=7 rx=2 ry=2", "path d=M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"]} />,
  Plus: (p) => <Icon {...p} d={["M5 12h14", "M12 5v14"]} />,
  GitMerge: (p) => <Icon {...p} d={["circle cx=18 cy=18 r=3", "circle cx=6 cy=6 r=3", "path d=M6 21V9a9 9 0 0 0 9 9"]} />,
  Settings: (p) => <Icon {...p} d={["path d=M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z", "circle cx=12 cy=12 r=3"]} />,
  UserPlus: (p) => <Icon {...p} d={["path d=M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "circle cx=9 cy=7 r=4", "line x1=19 x2=19 y1=8 y2=14", "line x1=22 x2=16 y1=11 y2=11"]} />,
  PhoneCall: (p) => <Icon {...p} d={["path d=M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", "path d=M14.05 2a9 9 0 0 1 8 7.94", "path d=M14.05 6A5 5 0 0 1 18 10"]} />,
  MonitorPlay: (p) => <Icon {...p} d={["rect width=20 height=14 x=2 y=3 rx=2", "path d=M8 21h8", "path d=M12 17v4", "path d=m10 10 5 3-5 3v-6z"]} />,
  AlertCircle: (p) => <Icon {...p} d={["circle cx=12 cy=12 r=10", "line x1=12 x2=12 y1=8 y2=12", "line x1=12 x2=12.01 y1=16 y2=16"]} />,
  X: (p) => <Icon {...p} d={["line x1=18 x2=6 y1=6 y2=18", "line x1=6 x2=18 y1=6 y2=18"]} />,
  LoaderCircle: (p) => <Icon {...p} d={["path d=M21 12a9 9 0 1 1-3.2-6.9"]} />,
  Building2: (p) => <Icon {...p} d={["rect width=16 height=20 x=4 y=2 rx=2", "path d=M9 22v-4h6v4", "path d=M8 6h.01", "path d=M16 6h.01", "path d=M12 6h.01", "path d=M8 10h.01", "path d=M16 10h.01", "path d=M12 10h.01", "path d=M8 14h.01", "path d=M16 14h.01", "path d=M12 14h.01"]} />,
};


// ==========================================
// 3. MOCK DATA 
// ==========================================
const DEFAULT_AIRCALL_ROLES = [
  { id: 'agent', name: 'Agent' },
  { id: 'supervisor', name: 'Supervisor' },
  { id: 'admin', name: 'Admin' }
];

const IMPORT_NUMBERS = [
  { id: 'n1', number: '+61 400 000 000', name: 'Main Sales Line' },
  { id: 'n2', number: '+61 411 111 111', name: 'Support Hotline' }
];

const AIRCALL_PROXY_BASE = '/api/aircall';
const getAircallUrl = (path) => `${AIRCALL_PROXY_BASE}${path}`;

const Input = ({ label, value, onChange, placeholder, disabled, type = "text" }) => (
  <div className="ph-input-group">
    <label className="ph-label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="ph-input"
    />
  </div>
);

const Textarea = ({ label, value, onChange, placeholder, rows = 6 }) => (
  <div className="ph-input-group">
    <label className="ph-label">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="ph-textarea"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div className="ph-input-group">
    <label className="ph-label">{label}</label>
    <div className="ph-select-wrap">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="ph-select">
        <option value="" disabled>Select {label}</option>
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <Icons.ChevronRight className="ph-select-arrow" style={{ transform: 'translateY(-50%) rotate(90deg)' }} />
    </div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="ph-checkbox-label">
    <div className={`ph-checkbox-box ${checked ? 'checked' : ''}`}>
      {checked && <Icons.Check size={14} color="white" />}
    </div>
    <span className="ph-checkbox-text">{label}</span>
    <input type="checkbox" className="ph-checkbox-input" checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </label>
);

const normalizeRecoveryEmail = (email) => {
  const normalized = (email || '').trim().toLowerCase();
  if (!normalized) return '';

  const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmailPattern.test(normalized)) {
    throw new Error('Recovery email is invalid. Please provide a valid email address.');
  }

  return normalized;
};

const normalizeRecoveryPhone = (phone, defaultCountryCode = '+61') => {
  const rawValue = (phone || '').trim();
  if (!rawValue) return '';

  const withoutExtension = rawValue.replace(/(?:ext\.?|extension|x)\s*\d+$/i, '').trim();
  const sanitized = withoutExtension.replace(/[\s().-]/g, '');

  let normalized = sanitized;

  if (normalized.startsWith('00')) {
    normalized = `+${normalized.slice(2)}`;
  }

  if (normalized.startsWith('+')) {
    normalized = `+${normalized.slice(1).replace(/\D/g, '')}`;
  } else {
    const digitsOnly = normalized.replace(/\D/g, '');
    if (!digitsOnly) {
      throw new Error('Recovery phone is invalid. Enter digits with an optional leading + and country code.');
    }

    if (digitsOnly.startsWith('0')) {
      const defaultDigits = defaultCountryCode.replace(/\D/g, '');
      normalized = `+${defaultDigits}${digitsOnly.replace(/^0+/, '')}`;
    } else {
      normalized = `+${digitsOnly}`;
    }
  }

  const e164Pattern = /^\+[1-9]\d{7,14}$/;
  if (!e164Pattern.test(normalized)) {
    throw new Error('Recovery phone is invalid. Use E.164 format like +61400000000.');
  }

  return normalized;
};

const buildNormalizedRecoveryInfo = ({ recoveryEmail, recoveryPhone }) => ({
  recoveryEmail: normalizeRecoveryEmail(recoveryEmail),
  recoveryPhone: normalizeRecoveryPhone(recoveryPhone)
});

const AIRCALL_ROLE_MAP = {
  agent: 'agent',
  supervisor: 'supervisor',
  admin: 'admin'
};

const normalizeAircallRole = (role) => {
  const normalizedRole = String(role || '').trim().toLowerCase();
  const mappedRole = AIRCALL_ROLE_MAP[normalizedRole];
  if (!mappedRole) {
    throw new Error(`Unsupported Aircall role selected: ${role}`);
  }

  return mappedRole;
};

const isGoogleUserPendingCreation = (status, responseText = '') => {
  if (status !== 412) return false;
  return /user creation is not complete/i.test(responseText) || /condition not met/i.test(responseText);
};

// ==========================================
// 4. MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  const PURGEHUB_LOGO_URL = 'https://i.imgur.com/QjjDjuU.png';
  const HARDCODED_PROFILE_PHOTO_URL = 'https://i.imgur.com/QjjDjuU.png';
  const AIRCALL_PROFILE_PICTURE_URL = 'https://i.imgur.com/QjjDjuU.png';
  const HARDCODED_GOOGLE_CUSTOMER_ID = 'C038susp4';
  const HARDCODED_GOOGLE_OAUTH_CLIENT_ID = '45672278509-7to6940dlojlb3i6rcj7dust2fs5re5h.apps.googleusercontent.com';
  const HARDCODED_AIRCALL_API_ID = '5340c75d84bdc8b4f77ab39755392772';

  const [step, setStep] = useState(0);
  const [flowView, setFlowView] = useState('import');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [credentialBundle, setCredentialBundle] = useState('');
  const [parsedKeys, setParsedKeys] = useState({});
  const [authError, setAuthError] = useState('');
  const [passwordResetStatus, setPasswordResetStatus] = useState('');
  const [googleUserKey, setGoogleUserKey] = useState('');
  const [authStatus, setAuthStatus] = useState([
    { key: 'google', label: 'admin.google.com', state: 'pending', note: 'Waiting to authenticate' },
    { key: 'aircall', label: 'Aircall', state: 'pending', note: 'Waiting to authenticate' }
  ]);
  const [provisionStatus, setProvisionStatus] = useState([]);
  const [provisionError, setProvisionError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [errorLogs, setErrorLogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [countrySearch, setCountrySearch] = useState('Australia');
  const [aircallRoles, setAircallRoles] = useState(DEFAULT_AIRCALL_ROLES);
  const [aircallTeams, setAircallTeams] = useState([]);
  const [aircallCatalogStatus, setAircallCatalogStatus] = useState('Waiting for Aircall authentication to load roles and teams.');
  const progressSteps = 5;
  const activeProgressStep = Math.min(Math.max(step, 1), progressSteps);
  const progressFill = ((activeProgressStep - 1) / (progressSteps - 1)) * 100;

  // Master State
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', photoUrl: HARDCODED_PROFILE_PHOTO_URL, googleEmail: '', googlePassword: '',
    recoveryEmail: '', recoveryPhone: '',
    aircallRole: 'agent', aircallTeam: '',
    acCountry: 'Australia', acType: 'Mobile', acRegion: '4', acName: '',
    flowImportTarget: '', flowAdjustSteps: false, flowUseSimilar: false, flowNodes: [],
    xeroJobTitle: '', xeroSalary: '', xeroPayrollCalendar: 'Fortnightly'
  });

  // Auto-gen email
  useEffect(() => {
    const firstNameSlug = formData.firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const email = firstNameSlug ? `${firstNameSlug}@purgedigital.com.au` : '';
    setFormData(prev => ({ ...prev, googleEmail: email }));
  }, [formData.firstName]);

  useEffect(() => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    setFormData(prev => ({ ...prev, acName: fullName }));
  }, [formData.firstName, formData.lastName]);

  useEffect(() => {
    setAuthError('');
  }, [credentialBundle]);

  const getStepLabel = (stepNumber = step) => {
    const labels = {
      0: 'Integration authentication',
      1: 'Google admin setup',
      2: 'Aircall user provisioning',
      3: 'Aircall number setup',
      4: 'Aircall call flow setup',
      5: 'Xero payroll setup'
    };

    return labels[stepNumber] || `Step ${stepNumber}`;
  };

  const formatErrorForDisplay = async (response) => {
    let details = '';
    try {
      details = await response.text();
    } catch {
      details = '';
    }

    return `${response.status} ${response.statusText}${details ? ` | ${details}` : ''}`.trim();
  };

  const formatFetchFailure = ({ provider, method = 'GET', url, error }) => {
    const rawMessage = error instanceof Error ? error.message : String(error);
    const runtimeOrigin = typeof window !== 'undefined' ? window.location.origin : 'unknown-origin';
    const endpointOrigin = (() => {
      try {
        return new URL(url).origin;
      } catch {
        return 'unknown-endpoint-origin';
      }
    })();

    const isCorsLikely = /failed to fetch|networkerror|load failed/i.test(rawMessage);
    const hints = [
      'The request did not reach an HTTP response, so this is not an API validation error.',
      `Browser origin: ${runtimeOrigin}`,
      `API origin: ${endpointOrigin}`,
      endpointOrigin !== runtimeOrigin
        ? 'Cross-origin request detected. Check CORS policy, browser privacy extensions, and corporate proxy filtering.'
        : 'Same-origin request failed. Check network reachability or server availability.',
      'Verify internet/DNS access to the API host and confirm TLS inspection/firewall rules allow the destination.'
    ];

    if (isCorsLikely) {
      hints.unshift('Likely CORS/network block in browser (common with third-party APIs called directly from frontend code).');
    }

    return [
      `${provider} ${method.toUpperCase()} ${url} failed before receiving a response.`,
      `Browser error: ${rawMessage}`,
      ...hints.map((hint) => `- ${hint}`)
    ].join('\n');
  };

  const fetchWithDiagnostics = async ({ provider, method = 'GET', url, options = {} }) => {
    try {
      return await fetch(url, { method, ...options });
    } catch (error) {
      throw new Error(formatFetchFailure({ provider, method, url, error }));
    }
  };

  const pushErrorLog = ({ source, action, message, meta = {}, stepNumber = step }) => {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      source,
      action,
      step: getStepLabel(stepNumber),
      message,
      meta
    };

    setErrorLogs((prev) => [entry, ...prev].slice(0, 100));
    return entry;
  };

  const executeWithErrorLogging = async ({ source, action, stepNumber = step, meta = {}, task }) => {
    try {
      return await task();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      pushErrorLog({ source, action, message, meta, stepNumber });
      throw error;
    }
  };

  // ==========================================
  // 5. DIRECT API INTERACTION LAYER 
  // ==========================================
  const api = {
    fetchPhotoAsBase64: async (photoUrl) => {
      const photoResponse = await fetchWithDiagnostics({
        provider: 'Photo URL',
        method: 'GET',
        url: photoUrl
      });
      if (!photoResponse.ok) throw new Error(`Unable to fetch profile photo: ${await formatErrorForDisplay(photoResponse)}`);

      const photoBlob = await photoResponse.blob();
      const photoBuffer = await photoBlob.arrayBuffer();
      const bytes = new Uint8Array(photoBuffer);
      const chunkSize = 0x8000;
      let binary = '';

      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
      }

      return btoa(binary);
    },

    // 1. Google Workspace Admin API (Directory API)
    createGoogleUser: async (data, keys) => {
      console.log("EXECUTING POST TO GOOGLE ADMIN API...");

      const createBody = {
        primaryEmail: data.googleEmail,
        name: { givenName: data.firstName, familyName: data.lastName },
        password: data.googlePassword,
        changePasswordAtNextLogin: true
      };

      const response = await fetch("https://admin.googleapis.com/admin/directory/v1/users", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${keys.GOOGLE_ADMIN_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(createBody)
      });

      if (!response.ok) throw new Error(await formatErrorForDisplay(response));
      const result = await response.json();

      // Attach profile photo in Google Workspace Admin
      if (data.photoUrl && result?.id) {
        const photoData = await api.fetchPhotoAsBase64(data.photoUrl);
        const photoUploadResponse = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(result.id)}/photos/thumbnail`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${keys.GOOGLE_ADMIN_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ photoData })
        });

        if (!photoUploadResponse.ok) throw new Error(`Google profile photo upload failed: ${await formatErrorForDisplay(photoUploadResponse)}`);
      }

      return result;
    },

    waitForGoogleUserReady: async ({ userKey, fallbackUserKey }, keys) => {
      const candidateUserKeys = [userKey, fallbackUserKey].filter(Boolean);
      if (!candidateUserKeys.length) return;

      let lastErrorText = '';

      for (const candidateKey of candidateUserKeys) {
        for (let attempt = 1; attempt <= 6; attempt += 1) {
          const response = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(candidateKey)}?projection=basic`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${keys.GOOGLE_ADMIN_TOKEN}`
            }
          });

          if (response.ok) return;

          const responseText = await formatErrorForDisplay(response);
          lastErrorText = responseText;
          if ((response.status === 404 || isGoogleUserPendingCreation(response.status, responseText)) && attempt < 6) {
            await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
            continue;
          }

          break;
        }
      }

      throw new Error(lastErrorText || 'Google user record is not ready yet.');
    },

    updateGoogleRecoveryInfo: async ({ userKey, fallbackUserKey, recoveryEmail, recoveryPhone }, keys) => {
      const normalizedRecoveryInfo = buildNormalizedRecoveryInfo({ recoveryEmail, recoveryPhone });
      if ((!userKey && !fallbackUserKey) || (!normalizedRecoveryInfo.recoveryEmail && !normalizedRecoveryInfo.recoveryPhone)) return;

      const body = {};
      if (normalizedRecoveryInfo.recoveryEmail) body.recoveryEmail = normalizedRecoveryInfo.recoveryEmail;
      if (normalizedRecoveryInfo.recoveryPhone) body.recoveryPhone = normalizedRecoveryInfo.recoveryPhone;

      const candidateUserKeys = [userKey, fallbackUserKey].filter(Boolean);
      let lastErrorText = '';

      for (const candidateKey of candidateUserKeys) {
        for (let attempt = 1; attempt <= 4; attempt += 1) {
          const patchResponse = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(candidateKey)}`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${keys.GOOGLE_ADMIN_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });

          if (!patchResponse.ok) {
            const responseText = await formatErrorForDisplay(patchResponse);
            lastErrorText = responseText;
            if ((patchResponse.status === 404 || isGoogleUserPendingCreation(patchResponse.status, responseText)) && attempt < 4) {
              await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
              continue;
            }
            break;
          }

          const verifyResponse = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(candidateKey)}?projection=full`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${keys.GOOGLE_ADMIN_TOKEN}`
            }
          });

          if (!verifyResponse.ok) {
            const responseText = await formatErrorForDisplay(verifyResponse);
            lastErrorText = responseText;
            if ((verifyResponse.status === 404 || isGoogleUserPendingCreation(verifyResponse.status, responseText)) && attempt < 4) {
              await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
              continue;
            }
            break;
          }

          const updatedUser = await verifyResponse.json();
          const emailSaved = !normalizedRecoveryInfo.recoveryEmail || updatedUser?.recoveryEmail === normalizedRecoveryInfo.recoveryEmail;
          const phoneSaved = !normalizedRecoveryInfo.recoveryPhone || updatedUser?.recoveryPhone === normalizedRecoveryInfo.recoveryPhone;

          if (emailSaved && phoneSaved) return;

          lastErrorText = 'Google recovery information did not persist. Ensure API scopes allow writing user recovery fields.';
          break;
        }
      }

      throw new Error(lastErrorText || 'Unable to save Google recovery information.');
    },

    resetGooglePassword: async ({ userKey, password }, keys) => {
      const response = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(userKey)}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${keys.GOOGLE_ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          changePasswordAtNextLogin: true
        })
      });

      if (!response.ok) throw new Error(await formatErrorForDisplay(response));
      return response.json();
    },

    // 2. Aircall API (Users, Numbers)
    createAircallUser: async (data, keys) => {
      console.log("EXECUTING POST TO AIRCALL API...");
      const authHeader = btoa(`${keys.AIRCALL_API_ID}:${keys.AIRCALL_API_TOKEN}`);
      const body = new URLSearchParams();
      body.set('first_name', data.firstName || '');
      body.set('last_name', data.lastName || '');
      body.set('email', data.googleEmail || '');

      const response = await fetchWithDiagnostics({
        provider: 'Aircall',
        method: 'POST',
        url: getAircallUrl('/v1/users'),
        options: {
          headers: {
            "Authorization": `Basic ${authHeader}`,
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: body.toString()
        }
      });

      if (!response.ok) throw new Error(await formatErrorForDisplay(response));
      const result = await response.json();
      const createdUserId = String(result?.user?.id || '').trim();
      if (!createdUserId) {
        throw new Error('Aircall user was created but no user ID was returned.');
      }

      return {
        ...result,
        createdUserId
      };
    },

    getAircallUserById: async ({ userId }, keys) => {
      const authHeader = btoa(`${keys.AIRCALL_API_ID}:${keys.AIRCALL_API_TOKEN}`);
      const normalizedUserId = String(userId || '').trim();

      if (!normalizedUserId) {
        throw new Error('Cannot verify Aircall user: missing user ID.');
      }

      const response = await fetchWithDiagnostics({
        provider: 'Aircall',
        method: 'GET',
        url: getAircallUrl(`/v1/users/${encodeURIComponent(normalizedUserId)}`),
        options: {
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json'
          }
        }
      });

      if (!response.ok) {
        throw new Error(await formatErrorForDisplay(response));
      }

      return response.json();
    },

    updateAircallUserRole: async ({ userId, role }, keys) => {
      const authHeader = btoa(`${keys.AIRCALL_API_ID}:${keys.AIRCALL_API_TOKEN}`);
      const normalizedUserId = String(userId || '').trim();
      const normalizedRole = normalizeAircallRole(role);

      if (!normalizedUserId) {
        throw new Error('Cannot assign Aircall role: missing user ID.');
      }

      const rolePayload = { role: normalizedRole };
      console.info('Aircall role assignment payload:', rolePayload);

      const attempts = [
        {
          method: 'PUT',
          path: `/v1/users/${encodeURIComponent(normalizedUserId)}`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: (() => {
            const form = new URLSearchParams();
            form.set('role', normalizedRole);
            return form.toString();
          })()
        },
        {
          method: 'PATCH',
          path: `/v1/users/${encodeURIComponent(normalizedUserId)}`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: (() => {
            const form = new URLSearchParams();
            form.set('role', normalizedRole);
            return form.toString();
          })()
        },
        {
          method: 'PUT',
          path: `/v1/users/${encodeURIComponent(normalizedUserId)}`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role: normalizedRole })
        }
      ];

      let lastError = 'Unable to assign Aircall role.';

      for (const attempt of attempts) {
        const response = await fetchWithDiagnostics({
          provider: 'Aircall',
          method: attempt.method,
          url: getAircallUrl(attempt.path),
          options: {
            headers: attempt.headers,
            body: attempt.body
          }
        });

        if (response.ok) {
          try {
            return await response.json();
          } catch {
            return { success: true };
          }
        }

        const details = await formatErrorForDisplay(response);
        lastError = `${attempt.method} ${attempt.path}: ${details}`;

        if ([401, 403].includes(response.status)) {
          throw new Error(lastError);
        }
      }

      throw new Error(lastError);
    },

    updateAircallUserPicture: async ({ userId, pictureUrl }, keys) => {
      const authHeader = btoa(`${keys.AIRCALL_API_ID}:${keys.AIRCALL_API_TOKEN}`);
      const normalizedUserId = String(userId || '').trim();
      const normalizedPictureUrl = String(pictureUrl || '').trim();

      if (!normalizedUserId) {
        throw new Error('Cannot append Aircall profile logo: missing user ID.');
      }

      if (!normalizedPictureUrl) {
        throw new Error('Cannot append Aircall profile logo: missing picture URL.');
      }

      const imageResponse = await fetchWithDiagnostics({
        provider: 'Aircall Avatar URL',
        method: 'GET',
        url: normalizedPictureUrl
      });

      if (!imageResponse.ok) {
        throw new Error(await formatErrorForDisplay(imageResponse));
      }

      const imageArrayBuffer = await imageResponse.arrayBuffer();
      const imageBlob = new Blob([imageArrayBuffer], { type: imageResponse.headers.get('content-type') || 'image/png' });
      const formData = new FormData();
      formData.append('picture', imageBlob, 'profile.png');

      const response = await fetchWithDiagnostics({
        provider: 'Aircall',
        method: 'PUT',
        url: getAircallUrl(`/v1/users/${encodeURIComponent(normalizedUserId)}`),
        options: {
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          body: formData
        }
      });

      if (!response.ok) {
        throw new Error(`PUT /v1/users/${encodeURIComponent(normalizedUserId)}: ${await formatErrorForDisplay(response)}`);
      }

      try {
        return await response.json();
      } catch {
        return { success: true };
      }
    },

    addAircallUserToTeam: async ({ userId, teamId }, keys) => {
      const authHeader = btoa(`${keys.AIRCALL_API_ID}:${keys.AIRCALL_API_TOKEN}`);
      const normalizedUserId = String(userId || '').trim();
      const normalizedTeamId = String(teamId || '').trim();

      if (!normalizedUserId) {
        throw new Error('Cannot assign Aircall team: missing user ID.');
      }

      if (!normalizedTeamId) {
        throw new Error('Cannot assign Aircall team: missing team ID.');
      }

      if (!/^\d+$/.test(normalizedTeamId)) {
        throw new Error(`Cannot assign Aircall team: invalid team ID "${teamId}".`);
      }
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const parseAircallResponse = async (response) => {
        const raw = await response.text();
        if (!raw) return { success: true };

        try {
          return JSON.parse(raw);
        } catch {
          return { success: true, raw };
        }
      };
      const attempts = [
        {
          method: 'POST',
          path: `/v1/teams/${encodeURIComponent(normalizedTeamId)}/users`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_ids: [normalizedUserId] })
        },
        {
          method: 'POST',
          path: `/v1/teams/${encodeURIComponent(normalizedTeamId)}/users/add`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: (() => {
            const form = new URLSearchParams();
            form.append('user_ids[]', normalizedUserId);
            return form.toString();
          })()
        },
        {
          method: 'POST',
          path: `/v1/teams/${encodeURIComponent(normalizedTeamId)}/users/add`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: (() => {
            const form = new URLSearchParams();
            form.append('users[]', normalizedUserId);
            return form.toString();
          })()
        },
        {
          method: 'POST',
          path: `/v1/teams/${encodeURIComponent(normalizedTeamId)}/users/add`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_ids: [normalizedUserId] })
        },
        {
          method: 'POST',
          path: `/v1/users/${encodeURIComponent(normalizedUserId)}/teams`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: (() => {
            const form = new URLSearchParams();
            form.append('team_id', normalizedTeamId);
            return form.toString();
          })()
        },
        {
          method: 'PUT',
          path: `/v1/users/${encodeURIComponent(normalizedUserId)}/teams/${encodeURIComponent(normalizedTeamId)}`,
          headers: {
            Authorization: `Basic ${authHeader}`,
            Accept: 'application/json'
          }
        }
      ];

      let lastError = 'Unknown Aircall team assignment failure.';

      for (let retry = 1; retry <= 4; retry += 1) {
        for (const attempt of attempts) {
          const response = await fetchWithDiagnostics({
            provider: 'Aircall',
            method: attempt.method,
            url: getAircallUrl(attempt.path),
            options: {
              headers: attempt.headers,
              body: attempt.body
            }
          });

          if (response.ok) return parseAircallResponse(response);

          const details = await formatErrorForDisplay(response);
          lastError = `${attempt.method} ${attempt.path}: ${details}`;

          if ([401, 403].includes(response.status)) {
            throw new Error(lastError);
          }
        }

        if (retry < 4) {
          await wait(800 * retry);
        }
      }

      throw new Error(lastError);
    },

    createAircallNumber: async (data, keys) => {
      console.log("EXECUTING POST TO AIRCALL NUMBERS API...");
      const authHeader = btoa(`${keys.AIRCALL_API_ID}:${keys.AIRCALL_API_TOKEN}`);
      const response = await fetchWithDiagnostics({
        provider: 'Aircall',
        method: 'POST',
        url: getAircallUrl('/v1/numbers'),
        options: {
          headers: {
            "Authorization": `Basic ${authHeader}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: data.acName,
            country: "AU",
            type: data.acType.toLowerCase()
          })
        }
      });

      if (!response.ok) throw new Error(`Aircall number provisioning failed: ${await formatErrorForDisplay(response)}`);
      return await response.json();
    },

    publishAircallFlow: async (data) => {
       console.log("EXECUTING PUT TO AIRCALL ROUTING API...");
       console.log("Payload configuration:", data.flowNodes);
       // Complex nested JSON structure for routing endpoints
       await new Promise(res => setTimeout(res, 2000));
    },

    // 3. Xero API (Payroll / Employees)
    createXeroEmployee: async (data, keys) => {
      console.log("EXECUTING POST TO XERO PAYROLL API...");
      if (!keys.ZERO_ACCESS_TOKEN || !keys.ZERO_TENANT_ID) {
        throw new Error('Xero credentials missing. Provide ZERO_ACCESS_TOKEN and ZERO_TENANT_ID in the credential bundle.');
      }

      const response = await fetch("https://api.xero.com/payroll.xro/1.0/Employees", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${keys.ZERO_ACCESS_TOKEN}`,
          "xero-tenant-id": keys.ZERO_TENANT_ID,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify([{
          FirstName: data.firstName,
          LastName: data.lastName,
          JobTitle: data.xeroJobTitle,
          SalaryAndWages: [{ 
            SalaryWagesType: "SALARY",
            AnnualSalary: parseFloat(data.xeroSalary.replace(/[^0-9.]/g, '') || 0)
          }]
        }])
      });

      if (!response.ok) throw new Error(`Xero employee provisioning failed: ${await formatErrorForDisplay(response)}`);
      return await response.json();
    }
  };

  // ==========================================
  // HANDLERS
  // ==========================================
  const updateData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const moveFlowNode = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= formData.flowNodes.length) return;
    const nextNodes = [...formData.flowNodes];
    [nextNodes[index], nextNodes[targetIndex]] = [nextNodes[targetIndex], nextNodes[index]];
    updateData('flowNodes', nextNodes);
  };

  const addFlowNode = () => {
    const nextId = Date.now();
    updateData('flowNodes', [...formData.flowNodes, { id: nextId, type: 'ringTo', duration: 20 }]);
  };

  const removeFlowNode = (index) => {
    const nextNodes = formData.flowNodes.filter((_, idx) => idx !== index);
    updateData('flowNodes', nextNodes);
  };

  const requiredAuthFields = [
    'GOOGLE_ADMIN_TOKEN',
    'GOOGLE_OAUTH_CLIENT_SECRET',
    'GOOGLE_OAUTH_REFRESH_TOKEN',
    'AIRCALL_API_TOKEN'
  ];

  const getAircallCredentials = (keys) => {
    const apiId = (keys.AIRCALL_API_ID || '').trim();
    const apiToken = (keys.AIRCALL_API_TOKEN || '').trim();

    return {
      apiId,
      apiToken,
      authHeader: btoa(`${apiId}:${apiToken}`)
    };
  };

  const parseAuthForm = () => {
    const lines = credentialBundle
      .split(/\r?\n/)
      .map((line) => line.trim());

    return {
      GOOGLE_ADMIN_TOKEN: lines[0] || '',
      GOOGLE_CUSTOMER_ID: HARDCODED_GOOGLE_CUSTOMER_ID,
      GOOGLE_OAUTH_CLIENT_ID: HARDCODED_GOOGLE_OAUTH_CLIENT_ID,
      GOOGLE_OAUTH_CLIENT_SECRET: lines[1] || '',
      GOOGLE_OAUTH_REFRESH_TOKEN: lines[2] || '',
      AIRCALL_API_ID: HARDCODED_AIRCALL_API_ID,
      AIRCALL_API_TOKEN: lines[3] || '',
      ZERO_ACCESS_TOKEN: lines[4] || '',
      ZERO_TENANT_ID: lines[5] || ''
    };
  };

  const updateAuthStatus = (key, nextState, note) => {
    setAuthStatus((prev) => prev.map((entry) => (
      entry.key === key ? { ...entry, state: nextState, note } : entry
    )));
  };

  const fetchGoogleOAuthAccessToken = async (keys) => {
    const params = new URLSearchParams({
      client_id: keys.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: keys.GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: keys.GOOGLE_OAUTH_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    if (!response.ok) {
      const details = await formatErrorForDisplay(response);
      throw new Error(`Google OAuth token refresh failed${details ? `: ${details}` : '.'}`);
    }

    const payload = await response.json();
    return payload.access_token;
  };

  const validateGoogleAuth = async (keys) => {
    const customers = [keys.GOOGLE_CUSTOMER_ID, 'my_customer'].filter(Boolean);
    const attemptedTokens = [keys.GOOGLE_ADMIN_TOKEN].filter(Boolean);
    let lastError = '';

    for (const token of attemptedTokens) {
      for (const customer of customers) {
        const response = await fetch(`https://admin.googleapis.com/admin/directory/v1/users?customer=${encodeURIComponent(customer)}&maxResults=1`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) return token;

        const details = await formatErrorForDisplay(response);
        lastError = `users.list (${customer}) responded ${response.status}${details ? `: ${details}` : ''}`;
      }
    }

    if (keys.GOOGLE_OAUTH_CLIENT_SECRET && keys.GOOGLE_OAUTH_REFRESH_TOKEN) {
      const refreshedAccessToken = await fetchGoogleOAuthAccessToken(keys);

      for (const customer of customers) {
        const response = await fetch(`https://admin.googleapis.com/admin/directory/v1/users?customer=${encodeURIComponent(customer)}&maxResults=1`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${refreshedAccessToken}` }
        });

        if (response.ok) return refreshedAccessToken;

        const details = await formatErrorForDisplay(response);
        lastError = `users.list (${customer}) responded ${response.status}${details ? `: ${details}` : ''}`;
      }
    }

    throw new Error(`Google Admin authentication failed. ${lastError}`.trim());
  };

  const validateAircallAuth = async (keys) => {
    const { authHeader } = getAircallCredentials(keys);
    const headers = { Authorization: `Basic ${authHeader}` };
    const authChecks = [
      { label: '/v1/users/me', url: getAircallUrl('/v1/users/me') },
      { label: '/v1/users', url: getAircallUrl('/v1/users?page=1&per_page=1') }
    ];

    let lastError = '';

    for (const check of authChecks) {
      const response = await fetchWithDiagnostics({
        provider: 'Aircall',
        method: 'GET',
        url: check.url,
        options: { headers }
      });
      if (response.ok) return;

      const details = await formatErrorForDisplay(response);
      lastError = `${check.label} responded ${response.status}${details ? `: ${details}` : ''}`;
    }

    throw new Error(`Aircall authentication failed. Confirm the Aircall API token is valid. ${lastError}`);
  };

  const fetchAllAircallPages = async ({ path, collectionKey, headers }) => {
    let page = 1;
    const perPage = 50;
    let hasMore = true;
    const allItems = [];

    while (hasMore && page <= 100) {
      const separator = path.includes('?') ? '&' : '?';
      const response = await fetchWithDiagnostics({
        provider: 'Aircall',
        method: 'GET',
        url: `${getAircallUrl(path)}${separator}page=${page}&per_page=${perPage}`,
        options: { headers }
      });

      if (!response.ok) throw new Error(await formatErrorForDisplay(response));

      const payload = await response.json();
      const batch = Array.isArray(payload?.[collectionKey]) ? payload[collectionKey] : [];
      allItems.push(...batch);

      const nextPage = payload?.meta?.next_page;
      const totalPages = payload?.meta?.total_pages;
      const hasNextLink = Boolean(payload?.meta?.next_page_link);

      if (hasNextLink || (Number.isFinite(nextPage) && nextPage > page) || (Number.isFinite(totalPages) && page < totalPages)) {
        page += 1;
      } else {
        hasMore = false;
      }
    }

    return allItems.filter((item, index, arr) => arr.findIndex((candidate) => candidate?.id === item?.id) === index);
  };

  const fetchAircallCatalog = async (keys) => {
    const { authHeader } = getAircallCredentials(keys);
    const headers = { Authorization: `Basic ${authHeader}` };

    const [teams, users] = await Promise.all([
      fetchAllAircallPages({ path: '/v1/teams', collectionKey: 'teams', headers }),
      fetchAllAircallPages({ path: '/v1/users', collectionKey: 'users', headers })
    ]);

    const roleMap = new Map(DEFAULT_AIRCALL_ROLES.map((role) => [String(role.id), role]));
    for (const user of users) {
      if (user?.role) {
        const roleId = String(user.role).toLowerCase();
        if (!roleMap.has(roleId)) {
          const normalizedLabel = roleId.charAt(0).toUpperCase() + roleId.slice(1);
          roleMap.set(roleId, { id: roleId, name: normalizedLabel });
        }
      }
    }

    return {
      roles: Array.from(roleMap.values()),
      teams: teams
        .filter((team) => team?.id && team?.name)
        .map((team) => ({ id: String(team.id), name: team.name }))
    };
  };


  const startProvision = (items) => {
    setProvisionError('');
    setProvisionStatus(items.map((item) => ({ ...item, state: 'pending', note: item.note || 'Queued' })));
  };

  const updateProvisionStatus = (key, state, note) => {
    setProvisionStatus((prev) => prev.map((entry) => (
      entry.key === key ? { ...entry, state, note } : entry
    )));
  };

  const authenticateIntegrations = async () => {
    const keys = parseAuthForm();
    const missing = requiredAuthFields.filter((field) => !keys[field]);

    if (missing.length > 0) {
      throw new Error(`Please complete all required credentials before authenticating: ${missing.join(', ')}`);
    }

    setAuthStatus([
      { key: 'google', label: 'admin.google.com', state: 'pending', note: 'Queued for authentication' },
      { key: 'aircall', label: 'Aircall', state: 'pending', note: 'Queued for authentication' }
    ]);

    updateAuthStatus('google', 'inprogress', 'Authenticating read/write access...');
    const verifiedGoogleToken = await validateGoogleAuth(keys);
    updateAuthStatus('google', 'success', 'Read/write access verified');

    updateAuthStatus('aircall', 'inprogress', 'Authenticating API credentials...');
    await validateAircallAuth(keys);

    updateAuthStatus('aircall', 'inprogress', 'Fetching all Aircall roles and teams...');
    const aircallCatalog = await fetchAircallCatalog(keys);
    setAircallRoles(aircallCatalog.roles);
    setAircallTeams(aircallCatalog.teams);
    setAircallCatalogStatus(`Loaded ${aircallCatalog.roles.length} roles and ${aircallCatalog.teams.length} teams from Aircall.`);

    setFormData((prev) => {
      const roleExists = aircallCatalog.roles.some((role) => role.id === prev.aircallRole);
      const teamExists = aircallCatalog.teams.some((team) => team.id === prev.aircallTeam);

      return {
        ...prev,
        aircallRole: roleExists ? prev.aircallRole : (aircallCatalog.roles[0]?.id || ''),
        aircallTeam: teamExists ? prev.aircallTeam : ''
      };
    });

    updateAuthStatus('aircall', 'success', 'Access verified and Aircall catalog synced');

    setParsedKeys({ ...keys, GOOGLE_ADMIN_TOKEN: verifiedGoogleToken || keys.GOOGLE_ADMIN_TOKEN });
  };

  const isCurrentStepValid = () => {
    if (step === 2) {
      return Boolean(formData.aircallRole && formData.aircallTeam);
    }

    return true;
  };

  const handleNext = async () => {
    setGlobalError('');

    if (step === 0) {
      setIsLoading(true);
      setLoadingText('Authenticating integrations...');
      setAuthError('');
      try {
        await executeWithErrorLogging({
          source: 'Authentication',
          action: 'Authenticate integration credentials',
          stepNumber: 0,
          meta: { hasGoogleToken: !!parsedKeys.GOOGLE_ADMIN_TOKEN },
          task: authenticateIntegrations
        });
        setStep((prev) => prev + 1);
      } catch (error) {
        setAuthStatus((prev) => prev.map((entry) => entry.state === 'success' ? entry : { ...entry, state: 'error', note: 'Authentication failed' }));
        const message = error instanceof Error ? error.message : 'Authentication failed. Please review credentials.';
        setAuthError(message);
        setGlobalError(message);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (step === 1) {
      setIsLoading(true);
      let normalizedRecoveryInfo;

      try {
        normalizedRecoveryInfo = buildNormalizedRecoveryInfo({
          recoveryEmail: formData.recoveryEmail,
          recoveryPhone: formData.recoveryPhone
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Invalid recovery information.';
        setProvisionError(message);
        setGlobalError(message);
        setIsLoading(false);
        return;
      }

      startProvision([
        { key: 'google-user', label: 'Create Google user', note: 'Preparing account creation request...' },
        { key: 'google-recovery', label: 'Write recovery security info', note: 'Waiting for user to be created...' }
      ]);

      try {
        updateProvisionStatus('google-user', 'inprogress', 'Creating user in admin.google.com...');
        const tempPass = 'PD-' + Math.random().toString(36).slice(-8) + '!';
        setFormData(prev => ({ ...prev, googlePassword: tempPass }));

        const googleResult = await executeWithErrorLogging({
          source: 'Google Admin',
          action: 'Create user in admin.google.com',
          stepNumber: 1,
          meta: { email: formData.googleEmail },
          task: () => api.createGoogleUser({ ...formData, ...normalizedRecoveryInfo, googlePassword: tempPass }, parsedKeys)
        });

        const userKey = googleResult?.id || googleResult?.primaryEmail || formData.googleEmail;
        setGoogleUserKey(userKey);
        updateProvisionStatus('google-user', 'success', 'Google account created successfully.');

        await executeWithErrorLogging({
          source: 'Google Admin',
          action: 'Wait for Google user propagation',
          stepNumber: 1,
          meta: { userKey, fallbackUserKey: formData.googleEmail },
          task: () => api.waitForGoogleUserReady({
            userKey,
            fallbackUserKey: formData.googleEmail
          }, parsedKeys)
        });

        updateProvisionStatus('google-recovery', 'inprogress', `Updating security info (${normalizedRecoveryInfo.recoveryEmail} / ${normalizedRecoveryInfo.recoveryPhone})...`);
        await executeWithErrorLogging({
          source: 'Google Admin',
          action: 'Write Google recovery fields',
          stepNumber: 1,
          meta: { userKey, recoveryEmail: normalizedRecoveryInfo.recoveryEmail, recoveryPhone: normalizedRecoveryInfo.recoveryPhone },
          task: () => api.updateGoogleRecoveryInfo({
            userKey,
            fallbackUserKey: formData.googleEmail,
            recoveryEmail: normalizedRecoveryInfo.recoveryEmail,
            recoveryPhone: normalizedRecoveryInfo.recoveryPhone
          }, parsedKeys)
        });

        updateProvisionStatus('google-recovery', 'success', 'Recovery security info saved and verified.');

        await new Promise((resolve) => setTimeout(resolve, 1200));
        setStep(prev => prev + 1);
      } catch (error) {
        setProvisionStatus((prev) => prev.map((entry) => (
          entry.state === 'success' ? entry : { ...entry, state: 'error', note: 'Failed. Check credentials and API scopes.' }
        )));
        const message = error instanceof Error ? error.message : 'Google provisioning failed.';
        setProvisionError(message);
        setGlobalError(message);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      setIsLoading(true);

      if (step === 2) {
        startProvision([
          { key: 'aircall-user', label: 'Create Aircall user', note: 'Preparing Aircall user creation request...' },
          { key: 'aircall-role', label: 'Assign role', note: 'Waiting for Aircall user to be created...' },
          { key: 'aircall-team', label: 'Assign specific team', note: 'Waiting for role assignment...' },
          { key: 'aircall-logo', label: 'Append logo to user profile', note: 'Waiting for team assignment...' }
        ]);

        updateProvisionStatus('aircall-user', 'inprogress', 'Creating Aircall user...');
        const aircallResult = await executeWithErrorLogging({
          source: 'Aircall',
          action: 'Create Aircall user',
          stepNumber: 2,
          meta: { email: formData.googleEmail, role: formData.aircallRole },
          task: () => api.createAircallUser(formData, parsedKeys)
        });

        const aircallUserId = aircallResult?.createdUserId || aircallResult?.user?.id;
        if (!aircallUserId) throw new Error('Aircall user was created but no user ID was returned.');

        updateProvisionStatus('aircall-user', 'success', 'Aircall user created successfully.');

        updateProvisionStatus('aircall-role', 'inprogress', `Assigning selected role: ${formData.aircallRole}...`);
        await executeWithErrorLogging({
          source: 'Aircall',
          action: 'Assign selected Aircall role',
          stepNumber: 2,
          meta: { userId: aircallUserId, role: formData.aircallRole },
          task: () => api.updateAircallUserRole({
            userId: aircallUserId,
            role: formData.aircallRole
          }, parsedKeys)
        });
        updateProvisionStatus('aircall-role', 'success', `Role assignment confirmed (${normalizeAircallRole(formData.aircallRole)}).`);

        updateProvisionStatus('aircall-team', 'inprogress', 'Assigning Aircall user to selected team...');
        await executeWithErrorLogging({
          source: 'Aircall',
          action: 'Verify Aircall user before team assignment',
          stepNumber: 2,
          meta: { userId: aircallUserId },
          task: () => api.getAircallUserById({ userId: aircallUserId }, parsedKeys)
        });
        await executeWithErrorLogging({
          source: 'Aircall',
          action: 'Assign Aircall user to team',
          stepNumber: 2,
          meta: { userId: aircallUserId, teamId: formData.aircallTeam },
          task: () => api.addAircallUserToTeam({ userId: aircallUserId, teamId: formData.aircallTeam }, parsedKeys)
        });

        updateProvisionStatus('aircall-team', 'success', 'Aircall user added to selected team.');

        updateProvisionStatus('aircall-logo', 'inprogress', 'Appending profile logo to Aircall user...');
        await executeWithErrorLogging({
          source: 'Aircall',
          action: 'Append logo to Aircall user profile',
          stepNumber: 2,
          meta: { userId: aircallUserId, pictureUrl: formData.photoUrl || AIRCALL_PROFILE_PICTURE_URL },
          task: () => api.updateAircallUserPicture({
            userId: aircallUserId,
            pictureUrl: formData.photoUrl || AIRCALL_PROFILE_PICTURE_URL
          }, parsedKeys)
        });
        updateProvisionStatus('aircall-logo', 'success', 'Profile logo appended successfully.');

        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      if (step === 3) {
        setLoadingText('Securing Australian Mobile Number...');
        await executeWithErrorLogging({
          source: 'Aircall',
          action: 'Create Aircall number',
          stepNumber: 3,
          meta: { country: formData.acCountry, type: formData.acType, name: formData.acName },
          task: () => api.createAircallNumber(formData, parsedKeys)
        });
      }

      if (step === 4) {
        setLoadingText('Publishing Smart Call Flow...');
        await executeWithErrorLogging({
          source: 'Aircall',
          action: 'Publish Aircall flow',
          stepNumber: 4,
          meta: { nodeCount: formData.flowNodes.length },
          task: () => api.publishAircallFlow(formData, parsedKeys)
        });
      }

      if (step === 5) {
        setLoadingText('Registering in Xero Payroll...');
        await executeWithErrorLogging({
          source: 'Xero',
          action: 'Create payroll employee',
          stepNumber: 5,
          meta: { jobTitle: formData.xeroJobTitle },
          task: () => api.createXeroEmployee(formData, parsedKeys)
        });
      }

      setStep(prev => prev + 1);
    } catch (error) {
      if (step === 2) {
        setProvisionStatus((prev) => prev.map((entry) => (
          entry.state === 'success' ? entry : { ...entry, state: 'error', note: 'Failed. Check credentials and Aircall permissions.' }
        )));
      }
      const message = error instanceof Error ? error.message : 'Step failed unexpectedly.';
      setProvisionError(message);
      setGlobalError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => setStep(prev => Math.max(0, prev - 1));

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetPassword = async () => {
    if (!googleUserKey) {
      setPasswordResetStatus('No Google user found to reset.');
      return;
    }

    try {
      setIsLoading(true);
      setLoadingText('Resetting Google Workspace password...');
      setPasswordResetStatus('');
      const tempPass = 'PD-' + Math.random().toString(36).slice(-8) + '!';
      await executeWithErrorLogging({
        source: 'Google Admin',
        action: 'Reset Google user password',
        stepNumber: 6,
        meta: { userKey: googleUserKey },
        task: () => api.resetGooglePassword({ userKey: googleUserKey, password: tempPass }, parsedKeys)
      });
      setFormData((prev) => ({ ...prev, googlePassword: tempPass }));
      setPasswordResetStatus('Password reset complete. New temporary password generated.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to reset password.';
      setPasswordResetStatus(message);
      setGlobalError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrorPanel = () => (
    <div className="ph-error-log-panel">
      <div className="ph-error-log-header">
        <div className="ph-error-log-title">
          <Icons.AlertCircle size={14} />
          <span>Runtime Error Logs</span>
        </div>
        <span className="ph-error-log-count">{errorLogs.length}</span>
      </div>
      <div className="ph-error-log-list">
        {errorLogs.length === 0 ? (
          <div className="ph-error-log-empty">No errors recorded yet.</div>
        ) : (
          errorLogs.map((entry) => (
            <div key={entry.id} className="ph-error-log-item">
              <div className="ph-error-log-item-top">
                <div>
                  <span className="ph-error-log-item-source">{entry.source}</span>
                  <span className="ph-error-log-item-step"> · {entry.step}</span>
                </div>
                <span className="ph-error-log-item-time">{new Date(entry.timestamp).toLocaleString()}</span>
              </div>
              <div className="ph-error-log-message"><strong>{entry.action}</strong>: {entry.message}</div>
              {entry.meta && Object.keys(entry.meta).length > 0 && (
                <pre className="ph-error-log-meta">{JSON.stringify(entry.meta, null, 2)}</pre>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  // ==========================================
  // STEP RENDERERS
  // ==========================================
  const renderLogin = () => {
    return (
      <div className="animate-fade-in">
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '0.5rem' }}>System Authentication</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>Authenticate admin.google.com and Aircall before you can begin onboarding.</p>

        <div className="ph-auth-section">
          <h3 className="ph-auth-section-title">Integration Credentials</h3>
          <p className="ph-auth-help">Paste credentials line-by-line in this exact order.</p>
          <Textarea
            label="Credential Bundle"
            value={credentialBundle}
            onChange={setCredentialBundle}
            placeholder={`Line 1: Google Admin Access Token
Line 2: Google OAuth Client Secret
Line 3: Google OAuth Refresh Token
Line 4: Aircall API Token
Line 5: Xero Access Token (optional)
Line 6: Xero Tenant ID (optional)`}
            rows={8}
          />
        </div>

        {authError && <p className="ph-auth-error">{authError}</p>}
      </div>
    );
  };

  const renderGoogle = () => (
    <div className="animate-fade-in">
      <div className="ph-title-wrap">
        <Icons.MonitorPlay className="ph-title-icon" />
        <h2 className="ph-title">admin.google.com Setup</h2>
      </div>
      <div className="ph-grid-2">
        <Input label="First Name" value={formData.firstName} onChange={(v) => updateData('firstName', v)} placeholder="John" />
        <Input label="Last Name" value={formData.lastName} onChange={(v) => updateData('lastName', v)} placeholder="Doe" />
      </div>
      <Input label="Primary Email (Auto-Generated)" value={formData.googleEmail} onChange={() => {}} disabled={true} />

      <div className="ph-auth-section" style={{ marginTop: '0.5rem' }}>
        <h3 className="ph-auth-section-title">Recovery Information</h3>
        <div className="ph-grid-2">
          <Input label="Recovery Email" value={formData.recoveryEmail} onChange={(v) => updateData('recoveryEmail', v)} placeholder="name@backupmail.com" />
          <Input label="Recovery Phone" value={formData.recoveryPhone} onChange={(v) => updateData('recoveryPhone', v)} placeholder="+61400000000" />
        </div>
      </div>
      
      <div className="ph-input-group">
        <label className="ph-label">Profile Photo URL (Imgur)</label>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666' }}>
            <Icons.Upload size={16} />
          </div>
          <input type="text" value={formData.photoUrl} readOnly disabled className="ph-input" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} />
          <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--success)' }}>
            <Icons.Check size={16} />
          </div>
        </div>
        {formData.photoUrl && (
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <img src={formData.photoUrl} alt="Preview" style={{ width: '5rem', height: '5rem', borderRadius: '50%', border: '2px solid var(--primary)', objectFit: 'cover' }} onError={(e) => e.target.style.display='none'} />
          </div>
        )}
      </div>
    </div>
  );

  const renderAircallUser = () => (
    <div className="animate-fade-in">
      <div className="ph-title-wrap">
        <Icons.UserPlus className="ph-title-icon" />
        <h2 className="ph-title">Aircall: Create User</h2>
      </div>
      <Input label="First Name" value={formData.firstName} disabled={true} onChange={()=>{}} />
      <Input label="Last Name" value={formData.lastName} disabled={true} onChange={()=>{}} />
      <Input label="Email (Synced)" value={formData.googleEmail} disabled={true} onChange={()=>{}} />
      <Select
        label="Role"
        value={formData.aircallRole}
        onChange={(v) => updateData('aircallRole', v)}
        options={aircallRoles.map((role) => ({ value: role.id, label: role.name }))}
      />
      <Select
        label="Assign Specific Team"
        value={formData.aircallTeam}
        onChange={(v) => updateData('aircallTeam', v)}
        options={aircallTeams.map((team) => ({ value: team.id, label: team.name }))}
      />
      <p className="ph-auth-help">{aircallCatalogStatus}</p>
      {aircallTeams.length === 0 && (
        <p className="ph-auth-error">No Aircall teams were returned. Create a team in Aircall, then authenticate again.</p>
      )}
    </div>
  );

  const renderAircallNumber = () => (
    <div className="animate-fade-in">
      <div className="ph-title-wrap">
        <Icons.Phone className="ph-title-icon" />
        <h2 className="ph-title">Aircall: Create Number</h2>
      </div>
      <Input label="Search Country" value={countrySearch} onChange={setCountrySearch} placeholder="Search countries" />
      <Select label="Country" value={formData.acCountry} onChange={(v) => updateData('acCountry', v)} options={[{ value: 'Australia', label: '🇦🇺 Australia' }, { value: 'United States', label: '🇺🇸 United States' }, { value: 'United Kingdom', label: '🇬🇧 United Kingdom' }].filter((country) => country.value.toLowerCase().includes(countrySearch.toLowerCase()))} />
      <div className="ph-grid-2">
        <Select label="Type" value={formData.acType} onChange={(v) => updateData('acType', v)} options={[ { value: 'Local', label: 'Local' }, { value: 'Mobile', label: 'Mobile' } ]} />
        <Select label="Region" value={formData.acRegion} onChange={(v) => updateData('acRegion', v)} options={[ { value: '4', label: 'Mobile (4)' } ]} />
      </div>
      <Input label="Name the Number (Synced)" value={formData.acName} onChange={() => {}} disabled={true} />
    </div>
  );

  const renderAircallFlow = () => {
    if (flowView === 'import') {
      return (
        <div className="animate-fade-in">
           <div className="ph-title-wrap">
            <Icons.GitMerge className="ph-title-icon" />
            <h2 className="ph-title">Aircall: Build Call Flow</h2>
          </div>
          <Select label="Import setup from existing number" value={formData.flowImportTarget} onChange={(v) => updateData('flowImportTarget', v)} options={IMPORT_NUMBERS.map(n => ({ value: n.id, label: `${n.name} (${n.number})` }))} />
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 className="ph-label">Configuration</h3>
            <div className="ph-grid-2">
               <Checkbox label="Adjust the steps" checked={formData.flowAdjustSteps} onChange={(v) => {updateData('flowAdjustSteps', v); updateData('flowUseSimilar', !v)}} />
               <Checkbox label="Fully configured steps" checked={!formData.flowAdjustSteps} onChange={(v) => {updateData('flowAdjustSteps', !v); updateData('flowUseSimilar', v)}} />
            </div>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 className="ph-label">Settings & Integrations</h3>
            <div className="ph-grid-2">
               <Checkbox label="Use similar number settings" checked={formData.flowUseSimilar} onChange={(v) => updateData('flowUseSimilar', v)} />
               <Checkbox label="Set same integrations" checked={formData.flowUseSimilar} onChange={(v) => updateData('flowUseSimilar', v)} />
            </div>
          </div>
          <button onClick={() => { setIsLoading(true); setLoadingText("Importing Flow Data..."); setTimeout(() => { setIsLoading(false); setFlowView('success'); }, 1000); }} className="ph-btn ph-btn-outline">
            <Icons.Upload size={16} /> <span>Import Setup</span>
          </button>
        </div>
      );
    }

    if (flowView === 'success') {
      return (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2.5rem 0' }}>
          <div style={{ width: '5rem', height: '5rem', backgroundColor: 'rgba(255,93,0,0.2)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Icons.Check size={40} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Import Successful</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Call distribution rules and integrations have been synced.</p>
          <button onClick={() => { if(formData.flowNodes.length === 0) updateData('flowNodes', [{ id: 1, type: 'ringTo', duration: 20 }]); setFlowView('editor'); }} className="ph-btn ph-btn-primary">
            <Icons.GitMerge size={16} /> <span>See Call Distribution</span>
          </button>
        </div>
      );
    }

    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="ph-title-wrap" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Icons.GitMerge className="ph-title-icon" />
            <h2 className="ph-title">Smart Flow Editor</h2>
          </div>
          <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255,93,0,0.2)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid rgba(255,93,0,0.3)' }}>Live Editing</span>
        </div>

        <div className="ph-node-tree">
          <div className="ph-node-start">
            <span style={{ fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.PhoneCall size={16} color="var(--success)" /> Call comes in
            </span>
          </div>
          <div className="ph-line"></div>

          {formData.flowNodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div className="ph-node">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase' }}>{node.type}</span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button className="ph-btn ph-btn-ghost" style={{ padding: '0.2rem 0.4rem' }} onClick={() => moveFlowNode(idx, -1)} disabled={idx === 0}>
                      ↑
                    </button>
                    <button className="ph-btn ph-btn-ghost" style={{ padding: '0.2rem 0.4rem' }} onClick={() => moveFlowNode(idx, 1)} disabled={idx === formData.flowNodes.length - 1}>
                      ↓
                    </button>
                    <button className="ph-btn ph-btn-ghost" style={{ padding: '0.2rem 0.4rem', color: '#ef4444' }} onClick={() => removeFlowNode(idx)}>
                      ✕
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Select
                    label="Step Type"
                    value={node.type}
                    onChange={(value) => {
                      const nextNodes = [...formData.flowNodes];
                      nextNodes[idx].type = value;
                      updateData('flowNodes', nextNodes);
                    }}
                    options={[
                      { value: 'dateRule', label: 'Date Rule' },
                      { value: 'timeRule', label: 'Time Rule' },
                      { value: 'audioMessage', label: 'Audio Message' },
                      { value: 'standardIVR', label: 'Standard IVR' },
                      { value: 'inputIVR', label: 'Input IVR' },
                      { value: 'waitingExperience', label: 'Waiting Experience' },
                      { value: 'ringTo', label: 'Ring To' },
                      { value: 'voicemail', label: 'Voicemail' }
                    ]}
                  />
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Selected User</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'black', border: '1px solid var(--border-light)', padding: '0.5rem', borderRadius: '0.25rem' }}>
                      {formData.photoUrl ? <img src={formData.photoUrl} style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', objectFit: 'cover' }} alt="user" onError={(e)=>e.target.style.display='none'}/> : <Icons.User size={16} color="var(--text-muted)" />}
                      <span style={{ fontSize: '0.875rem' }}>{formData.firstName} {formData.lastName}</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Ring Duration (seconds)</label>
                    <input type="number" value={node.duration} onChange={(e) => { const newNodes = [...formData.flowNodes]; newNodes[idx].duration = e.target.value; updateData('flowNodes', newNodes); }} className="ph-input" style={{ padding: '0.5rem' }} />
                  </div>
                </div>
              </div>
              <div className="ph-line">
                 <button className="ph-add-btn" onClick={addFlowNode}><Icons.Plus size={12} /></button>
              </div>
            </React.Fragment>
          ))}
          {formData.flowNodes.length === 0 && (
            <button className="ph-btn ph-btn-outline" style={{ width: 'auto' }} onClick={addFlowNode}>
              <Icons.Plus size={16} /> <span>Add First Step</span>
            </button>
          )}
           <div className="ph-node-end">
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.AlertCircle size={16} /> Voicemail / End Call
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderXero = () => (
    <div className="animate-fade-in">
       <div className="ph-title-wrap">
        <Icons.Briefcase className="ph-title-icon" />
        <h2 className="ph-title">Xero Setup</h2>
      </div>
      <div style={{ backgroundColor: 'rgba(255,93,0,0.1)', border: '1px solid rgba(255,93,0,0.3)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--primary)', display: 'flex', gap: '0.75rem' }}>
         <Icons.Server size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
         <p>Establishing secure connection to Xero Payroll API. Employee profile will be linked to <strong>{formData.firstName} {formData.lastName}</strong>.</p>
      </div>
      <Input label="Job Title" value={formData.xeroJobTitle} onChange={(v) => updateData('xeroJobTitle', v)} placeholder="e.g. Sales Executive" />
      <div className="ph-grid-2">
        <Input label="Base Salary / Rate" value={formData.xeroSalary} onChange={(v) => updateData('xeroSalary', v)} placeholder="$80,000" type="text" />
        <Select label="Payroll Calendar" value={formData.xeroPayrollCalendar} onChange={(v) => updateData('xeroPayrollCalendar', v)} options={[ { value: 'Weekly', label: 'Weekly' }, { value: 'Fortnightly', label: 'Fortnightly' }, { value: 'Monthly', label: 'Monthly' } ]} />
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="animate-fade-in">
       <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '5rem', height: '5rem', borderRadius: '50%', backgroundColor: 'rgba(34,197,94,0.2)', marginBottom: '1rem', border: '1px solid rgba(34,197,94,0.5)', boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}>
          <Icons.Check size={40} color="var(--success)" />
        </div>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Employee Onboarded</h2>
        <p style={{ color: 'var(--text-muted)' }}>All systems have been successfully provisioned.</p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#1a1a1a', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#e5e5e5' }}>Credentials (Require Action)</span>
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
             <label className="ph-label">Google Workspace Email</label>
             <div style={{ fontWeight: '500' }}>{formData.googleEmail}</div>
          </div>
          <div>
             <label className="ph-label" style={{ color: 'var(--primary)' }}>Generated Temporary Password</label>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <code style={{ backgroundColor: 'black', color: '#4ade80', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', border: '1px solid var(--border-light)', fontSize: '1.125rem', letterSpacing: '0.1em', flex: 1 }}>{formData.googlePassword}</code>
               <button onClick={() => copyToClipboard(formData.googlePassword)} style={{ padding: '0.75rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                 {copied ? <Icons.Check size={20} color="var(--success)" /> : <Icons.Copy size={20} color="white" />}
               </button>
             </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={handleResetPassword} className="ph-btn ph-btn-outline">
          Reset Password Again
        </button>
        {passwordResetStatus && (
          <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{passwordResetStatus}</p>
        )}
      </div>

      <div className="ph-grid-2">
        <div style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            <Icons.Phone size={16} /> <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Aircall</span>
          </div>
          <ul style={{ fontSize: '0.875rem', color: 'var(--text-muted)', listStyle: 'none', lineHeight: '1.5' }}>
            <li>• User Created ({formData.aircallRole})</li>
            <li>• Number Active ({formData.acName})</li>
            <li>• Call Flow Deployed</li>
          </ul>
        </div>
        <div style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', marginBottom: '0.5rem' }}>
            <Icons.Briefcase size={16} /> <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Xero Payroll</span>
          </div>
          <ul style={{ fontSize: '0.875rem', color: 'var(--text-muted)', listStyle: 'none', lineHeight: '1.5' }}>
            <li>• Profile Synced</li>
            <li>• Title: {formData.xeroJobTitle}</li>
            <li>• Cycle: {formData.xeroPayrollCalendar}</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const STEPS = [
    { title: "Auth", content: renderLogin },
    { title: "Google", content: renderGoogle },
    { title: "AC User", content: renderAircallUser },
    { title: "AC Number", content: renderAircallNumber },
    { title: "AC Flow", content: renderAircallFlow },
    { title: "Xero", content: renderXero },
    { title: "Done", content: renderSummary }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="ph-wrapper">
        <div className="ph-glow"></div>
        <div className="ph-main-container">
          <div className="ph-card">
            {isLoading && (
              <div className="ph-loader-overlay">
                {step === 0 ? (
                  <div className="ph-auth-overlay-card">
                    <h3 className="ph-auth-overlay-title">Authenticating Platform Access</h3>
                    <div className="ph-auth-progress-track">
                      <div className="ph-auth-progress-fill"></div>
                    </div>
                    <div className="ph-auth-status-list">
                      {authStatus.map((status) => (
                        <div key={status.key} className="ph-auth-status-item">
                          <div className="ph-auth-status-left">
                            {status.key === 'google' ? <Icons.Building2 size={16} /> : <Icons.PhoneCall size={16} />}
                            <div>
                              <div>{status.label}</div>
                              <div className="ph-auth-status-note">{status.note}</div>
                            </div>
                          </div>
                          <div className={`ph-auth-badge ${status.state}`}>
                            {status.state === 'success' && <Icons.Check size={12} strokeWidth={3} />}
                            {status.state === 'error' && <Icons.X size={12} strokeWidth={3} />}
                            {status.state === 'pending' && <Icons.LoaderCircle size={12} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : step === 1 || step === 2 ? (
                  <div className="ph-provision-overlay-card">
                    <h3 className="ph-provision-title">{step === 1 ? 'Provisioning admin.google.com' : 'Provisioning Aircall User'}</h3>
                    <p className="ph-provision-subtitle">We only move forward when every task is complete.</p>
                    <div className="ph-provision-list">
                      {provisionStatus.map((status) => (
                        <div key={status.key} className="ph-provision-item">
                          <div>
                            <div className="ph-provision-item-title">{status.label}</div>
                            <div className="ph-provision-item-note">{status.note}</div>
                          </div>
                          <div className={`ph-auth-badge ${status.state}`}>
                            {status.state === 'success' && <Icons.Check size={12} strokeWidth={3} />}
                            {status.state === 'error' && <Icons.X size={12} strokeWidth={3} />}
                            {(status.state === 'pending' || status.state === 'inprogress') && <Icons.LoaderCircle size={12} />}
                          </div>
                        </div>
                      ))}
                    </div>
                    {provisionError && <p className="ph-provision-error">{provisionError}</p>}
                  </div>
                ) : (
                  <>
                    <div className="ph-spinner"></div>
                    <p className="ph-loader-text">{loadingText}</p>
                  </>
                )}
              </div>
            )}

            <div className="ph-header-area">
              <div className="ph-logo-wrap">
                <div className="ph-logo-box">
                  <img src={PURGEHUB_LOGO_URL} alt="PurgeHub logo" className="ph-logo-image" />
                </div>
                <h1 className="ph-logo-text">Onboarding Form</h1>
              </div>

              {step > 0 && step < STEPS.length - 1 && (
                <div className="ph-progress-bar">
                  <div className="ph-progress-line-bg"></div>
                  <div className="ph-progress-line-fill" style={{ width: `${progressFill}%` }}></div>
                  {STEPS.slice(1, -1).map((s, idx) => {
                    const stepNum = idx + 1;
                    const isActive = step === stepNum;
                    const isPassed = step > stepNum;
                    return (
                      <div key={idx} className={`ph-progress-dot ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}>
                        {isPassed ? <Icons.Check size={12} strokeWidth={3} /> : stepNum}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="ph-card-content">
              {STEPS[step].content()}
              {globalError && <p className="ph-provision-error">{globalError}</p>}
            </div>

            {step < STEPS.length - 1 && (
              <div className="ph-card-footer">
                <button onClick={handleBack} disabled={step === 0 || isLoading} className="ph-btn ph-btn-ghost">
                  <Icons.ChevronLeft size={16} /> <span>Back</span>
                </button>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  {step > 0 && step < STEPS.length - 1 && (
                    <button onClick={() => setStep((prev) => Math.min(prev + 1, STEPS.length - 1))} disabled={isLoading} className="ph-btn ph-btn-ghost">
                      <span>Skip Step</span>
                    </button>
                  )}
                  <button onClick={handleNext} disabled={isLoading || !isCurrentStepValid()} className="ph-btn ph-btn-primary">
                    <span>{step === 0 ? 'Authenticate & Begin' : step === STEPS.length - 2 ? 'Finalize Onboarding' : 'Next Step'}</span> <Icons.ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className="ph-error-log-wrap">{renderErrorPanel()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
