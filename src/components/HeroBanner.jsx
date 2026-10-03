import React from 'react';
import { Sparkles, ShieldCheck, Scale, Cpu, Search } from 'lucide-react';

export default function HeroBanner({ onSelectSampleQuery }) {
  const SAMPLE_QUERIES = [
    {
      title: "Patentability of Ashwagandha Extraction",
      query: "Can I patent my novel Ashwagandha process that improves bioavailability by 40%?",
      badge: "Section 3(p) Patent"
    },
    {
      title: "Biological Resources & ABS Approval",
      query: "What is Form III approval under National Biodiversity Authority (NBA) for Shilajit export?",
      badge: "Biodiversity / ABS"
    },
    {
      title: "Rule 158B Manufacturing License",
      query: "What safety proof is required for a new Ayurvedic Proprietary medicine under Rule 158B?",
      badge: "D&C Rules"
    },
    {
      title: "Ayush Aahar vs ASU Drug",
      query: "Can I sell Ayurvedic herbal tea as a food supplement under FSSAI Ayush Aahar regulations?",
      badge: "FSSAI Guidelines"
    }
  ];

  return (
    <div className="relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8 bg-aurora rounded-3xl border border-slate-800/80 mb-8">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multilingual AI RAG Assistant • Grounded in Government Gazettes</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans">
          Understand AYUSH Intellectual Property & <br />
          <span className="shiny-text-gradient">Regulatory Laws with AI Confidence</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          Navigate <strong>Section 3(p)</strong> patent challenges, <strong>TKDL prior art</strong>, 
          <strong> National Biodiversity Authority (NBA) ABS clearances</strong>, and 
          <strong> Drugs & Cosmetics Act Rule 158B</strong> with verified citations and automatic human expert escalation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs text-slate-400">
          <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1">
            <Search className="w-3 h-3 text-emerald-400" /> Voice/Text Query
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-teal-400" /> Hybrid BM25 + Vector Search
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1">
            <Scale className="w-3 h-3 text-amber-400" /> Grounded Generation & Citation
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> RAGAS Confidence Verification
          </span>
        </div>

        <div className="text-left">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
            Try Sample High-Impact Queries
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAMPLE_QUERIES.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSampleQuery(sq.query)}
                className="glass-card glass-card-hover p-3.5 rounded-xl text-left border border-slate-800/80 flex flex-col justify-between group transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-emerald-300 group-hover:text-emerald-400">
                    {sq.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {sq.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 group-hover:text-white">
                  "{sq.query}"
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
