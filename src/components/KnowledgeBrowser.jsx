import React, { useState } from 'react';
import { LEGAL_KNOWLEDGE_BASE } from '../data/legalKnowledgeBase';
import { BookOpen, Search, FileText } from 'lucide-react';

export default function KnowledgeBrowser({ onSelectQuery }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', name: 'All Documents' },
    { id: 'IP_PATENT', name: 'Indian Patent Act' },
    { id: 'REGULATION', name: 'AYUSH & D&C Rules' },
    { id: 'ABS_BIODIVERSITY', name: 'Biodiversity & ABS' },
    { id: 'TRADITIONAL_KNOWLEDGE', name: 'TKDL Framework' }
  ];

  const filtered = LEGAL_KNOWLEDGE_BASE.filter(item => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.act.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Verified Legal Database</span>
            </div>
            <h2 className="text-xl font-bold text-white">Indian Patent & AYUSH Regulatory Knowledge Explorer</h2>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by Act, Section, or keyword..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.section}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{item.id}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
              <p className="text-xs text-teal-400 font-medium">{item.act}</p>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-[11px] text-slate-300 leading-relaxed italic">
                "{item.verbatim_text}"
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.explanation}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-mono truncate">
                <FileText className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="truncate">{item.citations[0]}</span>
              </div>

              <button
                onClick={() => onSelectQuery(`Explain ${item.section} of ${item.act} for Ayurvedic products`)}
                className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-medium transition-all shrink-0"
              >
                Ask AI about this Section →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
