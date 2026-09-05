import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  HeartHandshake,
  Info,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

const levels = [
  {
    level: "Nível 1",
    title: "Requer suporte",
    description:
      "A pessoa pode precisar de apoio para lidar com mudanças, organização, comunicação social, planejamento e situações sociais mais complexas.",
    examples: [
      "Pode ter dificuldade para iniciar ou manter interações sociais.",
      "Mudanças de rotina podem gerar desconforto e exigir preparação.",
      "Pode precisar de estratégias para organização, autonomia ou regulação sensorial.",
    ],
    tone: "from-violet-500/20 to-indigo-500/5",
    border: "border-violet-400/30",
    badge: "text-violet-200 bg-violet-400/10",
  },
  {
    level: "Nível 2",
    title: "Requer suporte substancial",
    description:
      "As diferenças na comunicação social e a inflexibilidade comportamental são mais evidentes e podem interferir em diferentes ambientes sem suporte consistente.",
    examples: [
      "Pode apresentar dificuldades marcantes na comunicação social, inclusive em interações simples.",
      "Mudanças e transições podem provocar sofrimento significativo.",
      "Frequentemente se beneficia de apoio estruturado e estratégias individualizadas.",
    ],
    tone: "from-fuchsia-500/20 to-purple-500/5",
    border: "border-fuchsia-400/30",
    badge: "text-fuchsia-200 bg-fuchsia-400/10",
  },
  {
    level: "Nível 3",
    title: "Requer suporte muito substancial",
    description:
      "A pessoa apresenta necessidades de suporte muito significativas, com impacto importante na comunicação social, flexibilidade e funcionamento cotidiano.",
    examples: [
      "Pode haver grande dificuldade para comunicação social e expressão de necessidades.",
      "Mudanças inesperadas podem causar sofrimento intenso e exigir preparação e suporte.",
      "Pode precisar de apoio frequente em atividades do cotidiano e em diferentes contextos.",
    ],
    tone: "from-purple-600/25 to-violet-600/5",
    border: "border-purple-300/30",
    badge: "text-purple-100 bg-purple-300/10",
  },
];

const topics = [
  {
    icon: Brain,
    title: "O que é o autismo?",
    text: "O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento. Ele pode envolver diferenças na comunicação e interação social, além de padrões restritos ou repetitivos de comportamento, interesses ou atividades.",
  },
  {
    icon: Sparkles,
    title: "Por que é chamado de espectro?",
    text: "Porque o autismo se manifesta de maneiras muito diferentes entre as pessoas. Duas pessoas autistas podem ter perfis, habilidades, desafios e necessidades de suporte bastante distintos.",
  },
  {
    icon: Users,
    title: "Cada pessoa é única",
    text: "Os níveis de suporte não resumem a pessoa e não funcionam como uma escala simples de inteligência, personalidade ou valor. Necessidades podem variar conforme o ambiente e ao longo da vida.",
  },
];

const faq = [
  ["Autismo é doença?", "Não. O TEA é uma condição do neurodesenvolvimento. O acompanhamento deve considerar necessidades individuais, saúde, participação social, autonomia e qualidade de vida."],
  ["Nível 3 significa que a pessoa é menos inteligente?", "Não. O nível de suporte não mede inteligência. Uma pessoa autista pode ter diferentes habilidades cognitivas, acadêmicas, comunicativas e práticas."],
  ["Toda pessoa autista tem os mesmos sinais?", "Não. Existe grande diversidade no espectro. Algumas características podem ser muito aparentes e outras mais sutis."],
  ["Quem pode diagnosticar?", "O diagnóstico é clínico e deve ser realizado por profissionais qualificados, considerando história do desenvolvimento, comportamento e funcionamento em diferentes contextos."],
  ["Existe cura para o autismo?", "Não existe uma cura comprovada para o TEA. O foco do cuidado é oferecer suporte adequado, desenvolver habilidades, reduzir sofrimento e promover participação e qualidade de vida."],
  ["A pessoa autista pode estudar e trabalhar?", "Sim. Pessoas autistas podem estudar, trabalhar, formar relacionamentos e desenvolver autonomia. Os apoios necessários variam de pessoa para pessoa."],
];

export default function AutismoPage() {
  return (
    <main className="min-h-screen bg-[#08070d] text-zinc-100 selection:bg-violet-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-15%] top-[-10%] h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-[130px]" />
        <div className="absolute right-[-15%] top-[20%] h-[520px] w-[520px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[480px] w-[480px] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/autismo" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-900/30">
              <HeartHandshake className="h-5 w-5 text-white" />
            </span>
            <div>
              <div className="font-bold tracking-tight">Entenda o Autismo</div>
              <div className="text-[10px] uppercase tracking-[.24em] text-zinc-500">informação e inclusão</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
            <a href="#o-que-e" className="transition hover:text-white">O que é</a>
            <a href="#niveis" className="transition hover:text-white">Níveis 1, 2 e 3</a>
            <a href="#diagnostico" className="transition hover:text-white">Diagnóstico</a>
            <a href="#faq" className="transition hover:text-white">Dúvidas</a>
          </nav>
          <a href="#niveis" className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-100 transition hover:bg-violet-500/20">Explorar níveis</a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-violet-200">
            <Sparkles className="h-4 w-4" /> Informação que aproxima
          </div>
          <h1 className="text-5xl font-bold leading-[1.02] tracking-[-.04em] sm:text-6xl lg:text-8xl">
            Autismo não é uma única forma de ser.
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">É um espectro.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
            Um guia institucional, acolhedor e acessível para entender o Transtorno do Espectro Autista, os níveis de suporte 1, 2 e 3, diagnóstico, características, apoio e inclusão.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#niveis" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-zinc-950 transition hover:-translate-y-0.5">Entender os níveis <ArrowRight className="h-5 w-5" /></a>
            <a href="#o-que-e" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10">Começar pelo básico</a>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {topics.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[.035] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[.055]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300"><Icon className="h-5 w-5" /></div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="o-que-e" className="border-y border-white/10 bg-white/[.018]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[.2em] text-violet-300">01 · Fundamentos</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">O que é o TEA?</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-zinc-400">
            <p>O Transtorno do Espectro Autista é uma condição do neurodesenvolvimento que começa no período do desenvolvimento e pode acompanhar a pessoa ao longo da vida.</p>
            <p>As características centrais envolvem diferenças persistentes na comunicação e interação social e padrões restritos ou repetitivos de comportamento, interesses ou atividades. Também podem existir diferenças sensoriais, como maior ou menor sensibilidade a sons, luzes, cheiros, texturas ou estímulos corporais.</p>
            <p>Autismo não define sozinho a capacidade, a personalidade ou o futuro de ninguém. O perfil de cada pessoa deve ser compreendido de forma individual, levando em conta habilidades, dificuldades, contexto, comunicação, autonomia e necessidades de suporte.</p>
          </div>
        </div>
      </section>

      <section id="niveis" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[.2em] text-fuchsia-300">02 · Níveis de suporte</div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Autismo nível 1, 2 e 3</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">Os níveis descrevem a quantidade de suporte necessária em relação às características do TEA. Eles não são uma classificação de valor, inteligência ou personalidade.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {levels.map((item) => (
            <article key={item.level} className={`relative overflow-hidden rounded-[2rem] border ${item.border} bg-gradient-to-b ${item.tone} p-7 shadow-2xl shadow-black/20`}>
              <div className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${item.badge}`}>{item.level}</div>
              <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
              <p className="mt-4 min-h-[104px] text-sm leading-6 text-zinc-400">{item.description}</p>
              <div className="my-6 h-px bg-white/10" />
              <ul className="space-y-4">
                {item.examples.map((example) => (
                  <li key={example} className="flex gap-3 text-sm leading-6 text-zinc-300"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-violet-300" />{example}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 flex gap-4 rounded-3xl border border-amber-300/15 bg-amber-300/[.045] p-6 text-sm leading-6 text-amber-100/80">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
          <p><strong className="text-amber-100">Importante:</strong> o nível de suporte pode não explicar todas as necessidades de uma pessoa. Uma mesma pessoa pode precisar de diferentes tipos e intensidades de apoio em contextos diferentes.</p>
        </div>
      </section>

      <section id="caracteristicas" className="border-y border-white/10 bg-gradient-to-b from-violet-500/[.035] to-transparent">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Comunicação", "Diferenças na linguagem, comunicação não verbal e reciprocidade social podem aparecer de formas variadas."],
              ["Interação social", "Pode haver desafios para compreender regras sociais implícitas, iniciar interações ou ajustar o comportamento ao contexto."],
              ["Repetição e rotina", "Movimentos repetitivos, interesses intensos e preferência por previsibilidade podem fazer parte do perfil autista."],
              ["Sensorial", "Hiper ou hipossensibilidade a estímulos pode influenciar conforto, atenção, alimentação e participação."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-[#0d0b14]/80 p-6">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostico" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[.2em] text-indigo-300">03 · Diagnóstico e apoio</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Como acontece a avaliação?</h2>
            <p className="mt-5 text-base leading-7 text-zinc-400">Não existe um exame de sangue ou um único teste que, sozinho, confirme o TEA. A avaliação é clínica e considera o desenvolvimento, a comunicação, o comportamento e o funcionamento da pessoa em diferentes contextos.</p>
          </div>
          <div className="space-y-4">
            {[
              [Stethoscope, "Avaliação especializada", "Profissionais qualificados analisam a história do desenvolvimento e as características atuais."],
              [MessageCircle, "Comunicação e funcionalidade", "É importante observar como a pessoa se comunica, aprende, participa e lida com atividades do cotidiano."],
              [ShieldCheck, "Plano individualizado", "Após a avaliação, os apoios devem considerar as necessidades, objetivos e contexto da própria pessoa."],
              [Accessibility, "Inclusão", "Apoios ambientais, acessibilidade e respeito às diferenças são partes importantes do cuidado."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Stethoscope;
              return <div key={String(title)} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[.03] p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300"><I className="h-5 w-5" /></span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{text}</p></div></div>;
            })}
          </div>
        </div>
      </section>

      <section id="inclusao" className="border-y border-white/10 bg-white/[.018]">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[.2em] text-violet-300">04 · Vida e inclusão</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Suporte não é limitar. É possibilitar.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">Uma abordagem respeitosa procura remover barreiras e ampliar participação, comunicação, autonomia e qualidade de vida.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["Família e rede de apoio", "Escola e aprendizagem", "Trabalho e vida adulta", "Comunicação acessível", "Regulação sensorial", "Autonomia e participação"].map((title) => <div key={title} className="rounded-2xl border border-white/10 bg-[#0d0b14] px-5 py-4 text-sm font-medium text-zinc-300">{title}</div>)}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-5 py-24 lg:px-8">
        <div className="text-center">
          <div className="text-sm font-semibold uppercase tracking-[.2em] text-fuchsia-300">05 · Perguntas frequentes</div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Dúvidas comuns sobre autismo</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faq.map(([question, answer]) => (
            <details key={question} className="group rounded-2xl border border-white/10 bg-white/[.025] p-5 open:bg-white/[.045]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold"><span>{question}</span><ChevronDown className="h-5 w-5 shrink-0 text-zinc-500 transition group-open:rotate-180" /></summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-indigo-600/10 p-8 sm:p-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-violet-200"><ShieldCheck className="h-5 w-5" /> Informação responsável</div>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Informação ajuda. Avaliação profissional individualiza.</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">Este conteúdo é educativo e não substitui diagnóstico, consulta, acompanhamento ou orientação de profissionais de saúde. Em caso de dúvida sobre você ou alguém da sua família, procure uma equipe qualificada.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>Entenda o Autismo · Informação, respeito e inclusão.</div>
          <div className="flex gap-5"><a href="#o-que-e" className="hover:text-white">O que é</a><a href="#niveis" className="hover:text-white">Níveis</a><a href="#faq" className="hover:text-white">FAQ</a></div>
        </div>
      </footer>
    </main>
  );
}
