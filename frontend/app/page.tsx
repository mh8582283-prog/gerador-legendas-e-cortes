"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, Loader2, Scissors, Type, Sparkles, Film, Languages, Clock3, ShieldCheck, ArrowRight, Zap, Settings2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { uploadVideo, deleteJob, getHealth, getMe, listJobs, type JobState, type MeProfile } from "@/lib/api";
import { isMultiTenant } from "@/lib/hosted";
import HintBanner from "@/components/ui/HintBanner";
import AppTopNav from "@/components/AppTopNav";
import RecentJobsPanel from "@/components/RecentJobsPanel";
import Field from "@/components/ui/Field";
import { inputClass } from "@/components/ui/inputClass";
import { useI18n } from "@/lib/i18n/context";

const ACCEPTED = [".mp4", ".mov", ".mkv", ".avi", ".webm", ".m4v"];
type AppMode = "legendas" | "cortes";

export default function HomePage() {
  const router = useRouter();
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [recentJobs, setRecentJobs] = useState<JobState[]>([]);
  const [language, setLanguage] = useState("auto");
  const [mode, setMode] = useState<AppMode>("legendas");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [needsConfig, setNeedsConfig] = useState(false);
  const [me, setMe] = useState<MeProfile | null>(null);
  const [hosted, setHosted] = useState(false);
  const languageRef = useRef("auto");
  const modeRef = useRef<AppMode>("legendas");
  languageRef.current = language;
  modeRef.current = mode;

  const audioLanguages = [
    { value: "auto", label: t("home.languages.auto") }, { value: "pt", label: t("home.languages.pt") },
    { value: "en", label: t("home.languages.en") }, { value: "es", label: t("home.languages.es") },
    { value: "fr", label: t("home.languages.fr") }, { value: "it", label: t("home.languages.it") },
    { value: "de", label: t("home.languages.de") },
  ];

  const loadJobs = useCallback(async () => {
    setJobsLoading(true);
    try { const d = await listJobs(); setRecentJobs(d.jobs ?? []); } catch { /* ignore */ } finally { setJobsLoading(false); }
  }, []);

  useEffect(() => { loadJobs(); const onFocus = () => loadJobs(); window.addEventListener("focus", onFocus); return () => window.removeEventListener("focus", onFocus); }, [loadJobs]);
  useEffect(() => {
    const mt = isMultiTenant(); setHosted(mt);
    getHealth().then((h) => {
      if (h.multi_tenant) { setHosted(true); return getMe().then((profile) => { setMe(profile); setNeedsConfig(!profile.openai_configured); }).catch(() => setNeedsConfig(true)); }
      setNeedsConfig(!h.openai_configured);
    }).catch(() => setNeedsConfig(false));
  }, []);

  const handleDelete = useCallback(async (jobId: string) => {
    if (!confirm(t("home.deleteConfirm"))) return;
    setDeletingId(jobId);
    try { await deleteJob(jobId); setRecentJobs((jobs) => jobs.filter((j) => j.id !== jobId)); }
    catch (err) { alert("Erro no frontend ao apagar: " + String(err)); await loadJobs(); }
    finally { setDeletingId(null); }
  }, [loadJobs, t]);

  const uploadBlocked = (hosted && me && !me.access_active) || needsConfig;
  const handleFile = useCallback(async (file: File) => {
    if (uploadBlocked) { setError(hosted && me && !me.access_active ? t("home.errorPlanInactive") : t("home.errorConfigureOpenAi")); return; }
    setError(null);
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ACCEPTED.includes(ext)) { setError(t("home.errorUnsupportedFormat", { ext, formats: ACCEPTED.join(", ") })); return; }
    setUploading(true); setProgress(0);
    try { const job = await uploadVideo(file, languageRef.current, modeRef.current, (pct) => setProgress(pct)); setProgress(100); router.push(modeRef.current === "cortes" ? `/cortes/${job.id}` : `/editor/${job.id}`); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : t("home.errorUploadFailed")); }
    finally { setUploading(false); }
  }, [router, uploadBlocked, hosted, me, t]);

  return (
    <main className="min-h-screen bg-[#07070a] text-white">
      <div className="hero-glow pointer-events-none fixed inset-0 -z-0" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
        <AppTopNav maxWidth="max-w-none" />
        {hosted && me && !me.access_active && <Link href="/plano-inativo" className="mb-5 block rounded-2xl border border-red-400/25 bg-red-500/10 px-5 py-3 text-sm text-red-100 backdrop-blur">{t("home.planInactiveBanner")}</Link>}
        {hosted && <HintBanner className="mb-5 w-full">{t("home.hostedRetentionHint", { hours: me?.job_max_age_hours ?? 24 })}</HintBanner>}
        {needsConfig && <div className="mb-6 grid gap-3 sm:grid-cols-2"><Link href="/configuracoes" className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100 transition hover:bg-amber-400/15"><Settings2 className="mb-2 h-5 w-5" />{t("home.configureOpenAiBanner")}</Link>{hosted && <Link href="/aulas" className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4 text-sm text-violet-100 transition hover:bg-violet-400/15"><Sparkles className="mb-2 h-5 w-5" />{t("home.lessonsHintBanner")}</Link>}</div>}

        <section className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-200"><Sparkles className="h-3.5 w-3.5" /> CRIE MAIS. EDITE MENOS.</div><h1 className="max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">{t("home.title")}</h1><p className="mt-4 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">{t("home.subtitle")}</p><div className="mt-6 flex flex-wrap gap-3 text-xs text-zinc-400"><span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2"><Zap className="h-3.5 w-3.5 text-violet-300" /> Automação inteligente</span><span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2"><ShieldCheck className="h-3.5 w-3.5 text-emerald-300" /> Fluxo simples</span></div></div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">{[[Film,"Cortes","Encontre trechos prontos para publicar"],[Languages,"Legendas","Transforme fala em texto"],[Clock3,"Mais rápido","Menos tempo no trabalho manual"],[Sparkles,"Profissional","Resultado pronto para seu conteúdo"]].map(([Icon,title,desc],i)=>{const C=Icon as typeof Film;return <div key={String(title)} className={`rounded-2xl border border-white/10 bg-black/20 p-4 ${i===0?"ring-1 ring-violet-500/20":""}`}><C className="mb-4 h-5 w-5 text-violet-300"/><div className="text-sm font-bold">{title as string}</div><div className="mt-1 text-xs leading-5 text-zinc-500">{desc as string}</div></div>})}</div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-6"><div className="mb-5 flex items-center justify-between"><div><div className="text-xs font-semibold uppercase tracking-[.18em] text-violet-300">01 / Configuração</div><h2 className="mt-1 text-xl font-bold">Escolha seu fluxo</h2></div><div className="rounded-xl bg-violet-500/10 p-2 text-violet-300"><Settings2 className="h-5 w-5" /></div></div>
            <Field label={t("home.modeLabel")}><div className="space-y-3"><button type="button" onClick={()=>setMode("legendas")} disabled={uploading} className={`mode-card ${mode==="legendas"?"mode-card-active":""}`}><Type className="h-5 w-5"/><div><div className="text-sm font-bold">{t("home.modeSubtitlesTitle")}</div><p className="mt-1 text-xs text-zinc-500">{t("home.modeSubtitlesDesc")}</p></div></button><button type="button" onClick={()=>setMode("cortes")} disabled={uploading} className={`mode-card ${mode==="cortes"?"mode-card-active":""}`}><Scissors className="h-5 w-5"/><div><div className="text-sm font-bold">{t("home.modeClipsTitle")}</div><p className="mt-1 text-xs text-zinc-500">{t("home.modeClipsDesc")}</p></div></button></div></Field>
            <div className="mt-5"><Field label={t("home.audioLanguageLabel")} hint={mode === "cortes" ? t("home.audioLanguageHintClips") : undefined}><select value={language} onChange={(e)=>setLanguage(e.target.value)} disabled={uploading} className={inputClass}>{audioLanguages.map((l)=><option key={l.value} value={l.value}>{l.label}</option>)}</select></Field></div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.035] to-fuchsia-500/[0.06] p-5 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-6"><div className="mb-5"><div className="text-xs font-semibold uppercase tracking-[.18em] text-violet-300">02 / Seu vídeo</div><h2 className="mt-1 text-xl font-bold">Envie e deixe o trabalho pesado com a ferramenta.</h2></div>
            <div onDragOver={(e)=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={(e)=>{e.preventDefault();setDragging(false);const f=e.dataTransfer.files?.[0];if(f)handleFile(f)}} className={`upload-zone ${uploadBlocked?"upload-disabled":""} ${dragging?"upload-dragging":""}`}>
              <input ref={inputRef} type="file" accept={ACCEPTED.join(",")} className="hidden" onChange={(e)=>{const f=e.target.files?.[0];if(f)handleFile(f)}}/>
              {uploading?<div className="flex w-full flex-col items-center gap-4"><div className="rounded-full bg-violet-500/15 p-4"><Loader2 className="h-8 w-8 animate-spin text-violet-300"/></div><div className="text-sm font-semibold">{progress!==null?t("home.uploadSendingProgress",{progress}):t("home.uploadSending")}</div>{progress!==null&&<div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all" style={{width:`${progress}%`}}/></div>}</div>:<button type="button" onClick={()=>!uploadBlocked&&inputRef.current?.click()} disabled={uploadBlocked} className="flex w-full flex-col items-center gap-4 disabled:cursor-not-allowed"><div className="upload-icon"><Upload className="h-7 w-7"/></div><div className="text-center"><div className="text-base font-bold sm:text-lg">{t("home.uploadDrag")}</div><div className="mt-1 text-xs text-zinc-500">MP4, MOV, MKV, AVI, WEBM ou M4V</div></div><span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black shadow-lg transition hover:scale-[1.02]"><Upload className="h-4 w-4"/> Selecionar vídeo <ArrowRight className="h-4 w-4"/></span></button>}
            </div>{error&&<div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
          </div>
        </section>
        {recentJobs.length>0&&<div className="mt-8"><RecentJobsPanel jobs={recentJobs} deletingId={deletingId} onDelete={handleDelete} onRefresh={loadJobs} loading={jobsLoading}/></div>}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-zinc-600"><ShieldCheck className="h-4 w-4"/> Seus arquivos seguem o fluxo configurado no aplicativo.</div>
      </div>
    </main>
  );
}
