import React, { useState, useEffect } from 'react';
import { generateGroundedResponse } from '../engine/hybridRag';
import { 
  Mic, MicOff, Send, Sparkles, AlertTriangle, 
  FileText, CheckCircle2, ChevronDown, ChevronUp, UserCheck, Search, Scale
} from 'lucide-react';

export default function ChatInterface({ selectedLang, initialQuery = '', onTriggerEscalation }) {
  const [query, setQuery] = useState(initialQuery);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [showRetrievalDetails, setShowRetrievalDetails] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Browser speech recognition is not supported. Please use Chrome or Edge.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    const langMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      bn: 'bn-IN'
    };

    recognition.lang = langMap[selectedLang] || 'en-IN';
    recognition.interimResults = false;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  };

  const handleSearch = (queryToSearch = query) => {
    if (!queryToSearch.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const res = generateGroundedResponse(queryToSearch, selectedLang);
      setResponse(res);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-4 rounded-2xl border border-slate-800 shadow-xl relative">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-3">
          <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 focus-within:border-emerald-500 transition-all">
            <Search className="w-5 h-5 text-emerald-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask any question on AYUSH IP, patent eligibility under Sec 3(p), NBA ABS, or D&C Rule 158B..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            
            <button
              type="button"
              onClick={handleVoiceInput}
              title="Voice Input (Text/Voice)"
              className={`p-2.5 rounded-xl transition-all relative ${
                isListening 
                  ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-950' 
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
              {isListening && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
              )}
            </button>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-900/50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 animate-pulse space-y-4">
          <div className="h-4 bg-slate-800 rounded w-1/4"></div>
          <div className="h-16 bg-slate-800/60 rounded"></div>
          <div className="h-4 bg-slate-800 rounded w-1/2"></div>
        </div>
      )}

      {response && !loading && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-400">Query Category:</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                {response.classification.label}
              </span>
            </div>

            <div className="flex items-center space-x-3 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Confidence Score:</span>
              <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    response.confidenceScore >= 0.8 ? 'bg-emerald-500' :
                    response.confidenceScore >= 0.6 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${response.confidenceScore * 100}%` }}
                ></div>
              </div>
              <span className={`text-xs font-bold ${
                response.confidenceScore >= 0.8 ? 'text-emerald-400' :
                response.confidenceScore >= 0.6 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {(response.confidenceScore * 100).toFixed(0)}% ({response.confidenceLevel})
              </span>
            </div>
          </div>

          {response.termsFound && response.termsFound.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 font-semibold text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Ayurvedic Botanical Mapper Triggered:</span>
              </div>
              {response.termsFound.map((tf, i) => (
                <p key={i} className="pl-5">
                  • <strong>{tf.term.toUpperCase()}</strong> mapped to scientific taxon <em>{tf.botanical}</em>. {tf.warning}
                </p>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-slate-300 font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Grounded Legal Response:</span>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 leading-relaxed space-y-2">
              <p className="whitespace-pre-line">{response.answer}</p>
            </div>
          </div>

          {response.citations && response.citations.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-400" /> Verified Legal Sources & Citations:
              </span>
              <div className="flex flex-wrap gap-2">
                {response.citations.map((cite, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    {cite}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setShowRetrievalDetails(!showRetrievalDetails)}
              className="text-xs font-medium text-slate-400 hover:text-emerald-400 flex items-center space-x-1.5 transition-colors"
            >
              <span>{showRetrievalDetails ? 'Hide RAG Search Metrics' : 'Inspect Hybrid RAG Retrieval Scores (BM25 + Vector)'}</span>
              {showRetrievalDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showRetrievalDetails && response.retrievedChunks && (
              <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                <p className="text-[11px] text-slate-400 font-sans">
                  Retrieved chunks ordered by Cross-Encoder Reranker:
                </p>
                {response.retrievedChunks.map((item, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-emerald-400 font-bold">#{idx + 1} {item.doc.act}</span>
                      <span className="text-slate-400 ml-2">({item.doc.section})</span>
                    </div>
                    <div className="flex items-center space-x-3 text-[11px]">
                      <span className="text-teal-300">BM25: {item.bm25Score}</span>
                      <span className="text-amber-300">Dense Vector: {item.denseScore}</span>
                      <span className="text-emerald-300 font-bold">Total: {item.rawScore.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {response.requiresEscalation && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-rose-300 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Confidence below 60% — Expert Review Recommended</span>
                </div>
                <button
                  onClick={() => onTriggerEscalation(response.query)}
                  className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-md shadow-rose-950"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Escalate to Legal Expert</span>
                </button>
              </div>
              <p className="text-xs text-slate-300">
                This query involves complex or ambiguous legal interpretations. You can forward your question directly to a registered AYUSH IP attorney.
              </p>
            </div>
          )}

          <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800/50">
            ⚠️ {response.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
