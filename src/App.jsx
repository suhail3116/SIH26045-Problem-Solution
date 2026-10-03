import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ChatInterface from './components/ChatInterface';
import ComplianceWizard from './components/ComplianceWizard';
import KnowledgeBrowser from './components/KnowledgeBrowser';
import EscalationModal from './components/EscalationModal';
import { ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSelectSampleQuery = (queryText) => {
    setCurrentQuery(queryText);
    setActiveTab('chat');
  };

  const handleTriggerEscalation = (queryText) => {
    setCurrentQuery(queryText);
    setActiveTab('escalation');
  };

  return (
    <div className="min-h-screen bg-aurora text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'chat' && (
          <HeroBanner onSelectSampleQuery={handleSelectSampleQuery} />
        )}

        {activeTab === 'chat' && (
          <ChatInterface 
            selectedLang={selectedLang}
            initialQuery={currentQuery}
            onTriggerEscalation={handleTriggerEscalation}
          />
        )}

        {activeTab === 'wizard' && (
          <ComplianceWizard />
        )}

        {activeTab === 'explorer' && (
          <KnowledgeBrowser onSelectQuery={handleSelectSampleQuery} />
        )}

        {activeTab === 'escalation' && (
          <EscalationModal initialQuery={currentQuery} />
        )}
      </main>

      <footer className="glass-card border-t border-slate-800/80 mt-12 py-8 bg-slate-950/90 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-base">🌿</span>
            <div>
              <p className="text-slate-200 font-bold">IP-SAKTI Sahayak (SIH26045)</p>
              <p className="text-[11px] text-slate-400">Multilingual AI-Powered RAG Assistant for AYUSH & IP Regulations</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="https://ipindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
              <span>IP India (CGPDTM)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a href="https://ayush.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
              <span>Ministry of AYUSH</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a href="http://www.tkdl.res.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
              <span>CSIR TKDL</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a href="http://nbaindia.org" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
              <span>National Biodiversity Authority</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            Powered by 100% Free & Open-Source Hybrid RAG Stack (FOSS)
          </p>
        </div>
      </footer>
    </div>
  );
}
