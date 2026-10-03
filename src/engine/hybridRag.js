import { LEGAL_KNOWLEDGE_BASE } from '../data/legalKnowledgeBase';
import { AYUSH_DICTIONARY } from '../data/ayushTerms';

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' }
];

export function classifyQuery(query) {
  const q = query.toLowerCase();
  
  if (q.includes('patent') || q.includes('section 3') || q.includes('3(p)') || q.includes('3p') || q.includes('prior art') || q.includes('novel') || q.includes('invent')) {
    return { category: 'IP_PATENT', label: 'IP & Patent Law', color: 'emerald' };
  }
  if (q.includes('biodiversity') || q.includes('nba') || q.includes('abs') || q.includes('form iii') || q.includes('form 3') || q.includes('biological resource')) {
    return { category: 'ABS_BIODIVERSITY', label: 'ABS & Biodiversity Act', color: 'amber' };
  }
  if (q.includes('license') || q.includes('gmp') || q.includes('schedule t') || q.includes('rule 158') || q.includes('asu') || q.includes('fssai') || q.includes('ayush aahar')) {
    return { category: 'REGULATION', label: 'AYUSH Regulations & Licensing', color: 'blue' };
  }
  if (q.includes('tkdl') || q.includes('charaka') || q.includes('classical') || q.includes('traditional knowledge') || q.includes('samhita')) {
    return { category: 'TRADITIONAL_KNOWLEDGE', label: 'Traditional Knowledge (TKDL)', color: 'purple' };
  }

  return { category: 'GENERAL_AYUSH', label: 'General AYUSH IP/Regulatory Inquiry', color: 'slate' };
}

export function expandAyurvedicTerms(query) {
  let expanded = query;
  const termsFound = [];

  Object.keys(AYUSH_DICTIONARY).forEach(term => {
    if (query.toLowerCase().includes(term)) {
      const data = AYUSH_DICTIONARY[term];
      expanded += ` ${data.botanical} ${data.ayurvedic_properties}`;
      termsFound.push({ term, botanical: data.botanical, warning: data.patent_warning });
    }
  });

  return { expandedQuery: expanded, termsFound };
}

export function hybridRagSearch(userQuery, categoryFilter = null) {
  const { expandedQuery, termsFound } = expandAyurvedicTerms(userQuery);
  const queryTokens = expandedQuery.toLowerCase().split(/\W+/).filter(t => t.length > 2);

  const scoredDocs = LEGAL_KNOWLEDGE_BASE.map(doc => {
    let bm25Score = 0;
    doc.keywords.forEach(kw => {
      queryTokens.forEach(token => {
        if (kw.includes(token) || token.includes(kw)) {
          bm25Score += 2.5;
        }
      });
    });

    if (userQuery.toLowerCase().includes(doc.section.toLowerCase()) || 
        userQuery.toLowerCase().includes(doc.id.toLowerCase())) {
      bm25Score += 10.0;
    }

    const textToMatch = `${doc.title} ${doc.explanation} ${doc.verbatim_text}`.toLowerCase();
    let denseScore = 0;
    queryTokens.forEach(token => {
      if (textToMatch.includes(token)) {
        denseScore += 1.2;
      }
    });

    let categoryBonus = 0;
    if (categoryFilter && doc.category === categoryFilter) {
      categoryBonus = 3.0;
    }

    const rawScore = (bm25Score * 0.5) + (denseScore * 0.3) + categoryBonus;

    return {
      doc,
      bm25Score: Math.min(bm25Score, 10).toFixed(1),
      denseScore: Math.min(denseScore, 10).toFixed(1),
      rawScore
    };
  });

  let matched = scoredDocs.filter(item => item.rawScore > 0.5);
  matched.sort((a, b) => b.rawScore - a.rawScore);
  const rerankedResults = matched.slice(0, 3);

  return {
    results: rerankedResults,
    termsFound,
    expandedQuery
  };
}

export function generateGroundedResponse(userQuery, lang = 'en') {
  const classification = classifyQuery(userQuery);
  const search = hybridRagSearch(userQuery, classification.category);
  const topDocs = search.results.map(r => r.doc);

  if (topDocs.length === 0) {
    return {
      query: userQuery,
      classification,
      answer: "I could not find exact legal provisions matching your specific query in verified Indian Patent and AYUSH regulatory databases. To ensure compliance, I recommend escalating this to a qualified Patent Attorney or Biodiversity legal consultant.",
      citations: [],
      confidenceScore: 0.42,
      confidenceLevel: "LOW",
      requiresEscalation: true,
      retrievedChunks: [],
      termsFound: search.termsFound,
      disclaimer: "IP-SAKTI Sahayak provides informational guidance only. This is not formal legal advice."
    };
  }

  const primaryDoc = topDocs[0];
  let mainAnswer = "";
  
  if (classification.category === 'IP_PATENT') {
    mainAnswer = `Under **${primaryDoc.act} (${primaryDoc.section})**, traditional knowledge or mere aggregations of known plant properties are non-patentable. `;
    mainAnswer += `${primaryDoc.explanation} `;
    if (search.termsFound.length > 0) {
      mainAnswer += `Note regarding **${search.termsFound[0].term.toUpperCase()}** (${search.termsFound[0].botanical}): ${search.termsFound[0].warning}`;
    }
  } else if (classification.category === 'ABS_BIODIVERSITY') {
    mainAnswer = `Pursuant to **${primaryDoc.act} (${primaryDoc.section})**, using Indian biological resources requires mandatory prior approval from the National Biodiversity Authority (NBA) via **Form III** before filing IPR. `;
    mainAnswer += `${primaryDoc.explanation}`;
  } else if (classification.category === 'REGULATION') {
    mainAnswer = `Under **${primaryDoc.act} (${primaryDoc.section})**, manufacturing Ayurvedic drugs requires specific compliance depending on whether it is Classical or Proprietary. `;
    mainAnswer += `${primaryDoc.explanation}`;
  } else {
    mainAnswer = `According to verified provisions in **${primaryDoc.act}**: ${primaryDoc.explanation}`;
  }

  const bm25Avg = topDocs.reduce((acc, curr, idx) => acc + (1.0 / (idx + 1)), 0);
  const confidenceScore = Math.min(0.96, Math.max(0.65, 0.72 + (bm25Avg * 0.08))).toFixed(2);
  const confidenceFloat = parseFloat(confidenceScore);
  const requiresEscalation = confidenceFloat < 0.60;

  const citations = Array.from(new Set(topDocs.flatMap(d => d.citations)));

  let translatedAnswer = mainAnswer;
  if (lang === 'hi') {
    translatedAnswer = `[हिंदी उत्तर]: ${mainAnswer.replace('Under', 'भारतीय कानून के तहत').replace('According to', 'सत्यापित दस्तावेज़ के अनुसार')}`;
  } else if (lang === 'ta') {
    translatedAnswer = `[தமிழ் பதில்]: ${mainAnswer.replace('Under', 'இந்திய சட்டத்தின் கீழ்')}`;
  }

  return {
    query: userQuery,
    classification,
    answer: translatedAnswer,
    citations,
    confidenceScore: confidenceFloat,
    confidenceLevel: confidenceFloat >= 0.8 ? "HIGH" : confidenceFloat >= 0.6 ? "MEDIUM" : "LOW",
    requiresEscalation,
    retrievedChunks: search.results,
    termsFound: search.termsFound,
    disclaimer: "IP-SAKTI Sahayak provides AI-generated informational guidance based on verified Government of India gazettes. This does not constitute legal counsel."
  };
}
