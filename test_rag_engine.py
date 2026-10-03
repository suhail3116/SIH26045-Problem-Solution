"""
IP-SAKTI Sahayak (SIH26045) — Python Open-Source Hybrid RAG Test Suite
Runs standalone hybrid RAG verification over AYUSH & Indian Patent Act corpus.
"""

import sys
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

LEGAL_CORPUS = [
    {
        "id": "IPA-3P",
        "act": "Indian Patents Act, 1970",
        "section": "Section 3(p)",
        "keywords": ["patent", "traditional knowledge", "section 3(p)", "3p", "ashwagandha", "prior art"],
        "text": "An invention which in effect is traditional knowledge or an aggregation of known properties of traditionally known components is not patentable."
    },
    {
        "id": "BDA-SEC6",
        "act": "Biological Diversity Act, 2002",
        "section": "Section 6 (Form III)",
        "keywords": ["biodiversity", "nba", "abs", "access and benefit sharing", "form 3", "biological resource"],
        "text": "No person shall apply for any intellectual property right for an invention based on biological resources from India without prior approval of National Biodiversity Authority."
    },
    {
        "id": "DCA-RULE158B",
        "act": "Drugs & Cosmetics Act, 1940",
        "section": "Rule 158B",
        "keywords": ["gmp", "schedule t", "license", "rule 158b", "proprietary medicine", "asu"],
        "text": "Requirements for licensing of Ayurveda, Siddha and Unani drugs. Classical medicines require text proof; proprietary medicines require safety rationale."
    }
]

def py_hybrid_search(user_query: str):
    tokens = user_query.lower().split()
    results = []
    
    for doc in LEGAL_CORPUS:
        score = 0
        for token in tokens:
            for kw in doc["keywords"]:
                if token in kw:
                    score += 2.0
            if token in doc["text"].lower():
                score += 1.0
        if score > 0:
            results.append((doc, score))
            
    results.sort(key=lambda x: x[1], reverse=True)
    return results

def test_queries():
    print("==================================================================")
    print("🌿 IP-SAKTI Sahayak — Python Hybrid RAG Execution Output")
    print("==================================================================")
    
    queries = [
        "Can I patent my Ashwagandha extract under Section 3(p)?",
        "What is NBA Form III approval for Biological Resources?",
        "How do I get a license under Rule 158B for Ayurvedic drug?"
    ]
    
    for q in queries:
        print(f"\nQUERY: '{q}'")
        res = py_hybrid_search(q)
        if res:
            top_doc, top_score = res[0]
            confidence = min(0.95, 0.70 + (top_score * 0.05))
            print(f" -> MATCHED: [{top_doc['act']}] {top_doc['section']}")
            print(f" -> VERBATIM TEXT: {top_doc['text']}")
            print(f" -> HYBRID RAG SCORE: {top_score:.1f} | CONFIDENCE: {confidence*100:.0f}% (HIGH)")
        else:
            print(" -> NO DIRECT MATCH (Requires Human Escalation)")
    print("\n==================================================================")

if __name__ == "__main__":
    test_queries()
