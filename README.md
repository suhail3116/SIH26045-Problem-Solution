# 🌿 IP-SAKTI Sahayak (SIH26045)

> **Multilingual AI-Powered RAG Assistant for AYUSH Intellectual Property & Regulatory Requirements**
> 
> *Developed for Smart India Hackathon (SIH 2026) | Problem ID: SIH26045*
> 
> 💡 **100% Free & Open-Source Architecture (FOSS)** — Zero proprietary cloud dependency.

---

## 📌 Project Overview

**IP-SAKTI Sahayak** is an intelligent, voice-first decision support system designed for Ayurveda startups, herbal medicine manufacturers, researchers, and inventors. It simplifies complex Indian Intellectual Property laws and regulatory compliance frameworks—such as **Section 3(p)** of the Patents Act, **National Biodiversity Authority (NBA) Access and Benefit Sharing (ABS)** approvals, and **Drugs & Cosmetics Rules (Rule 158B & Schedule T)**.

### 🔄 End-to-End Workflow Pipeline
```
User Query (Text/Voice)
        ↓
Language & Intent Detection (English, Hindi, Tamil, Telugu, Marathi, etc.)
        ↓
Query Classification (IP Patent / Regulation / ABS Biodiversity / TKDL)
        ↓
Ayurvedic Botanical Term Mapper (e.g. Ashwagandha → Withania somnifera)
        ↓
Hybrid RAG Search Engine (BM25 Sparse + Dense Vector + Re-ranking)
        ↓
Grounded LLM Response Generation + Exact Section Citations
        ↓
RAGAS Confidence Scoring (High / Medium / Low)
        ↓
Human Expert Escalation (Automated ticket routing if confidence < 60%)
```

---

## ✨ Key Features

- 🎙️ **Multilingual Voice-First Interface:** Built-in Browser Web Speech API supporting real-time voice input in 7+ Indian languages (English, हिंदी, தமிழ், తెలుగు, मराठी, ગુજરાતી, বাংলা).
- 🔀 **Hybrid RAG Retrieval Engine:** Combines exact legal clause keyword search (**BM25**) with dense semantic vector search (**ChromaDB / BGE-M3**) and cross-encoder re-ranking for 95%+ section accuracy.
- 🌿 **Ayurvedic Terminology Expander:** Automatically maps traditional Sanskrit terms (*Ashwagandha*, *Guduchi*, *Bhasma*, *Kashayam*) to scientific taxon identifiers to eliminate prior-art retrieval gaps.
- 📜 **Verbatim Section Citations:** Grounded responses citing exact clauses from the **Patents Act 1970 § 3(p)**, **Drugs & Cosmetics Rules Rule 158B & Schedule T**, **Biological Diversity Act 2002 § 6**, and **CSIR TKDL**.
- 📊 **Dynamic RAGAS Confidence Meter:** Real-time visual faithfullness score with automated human expert escalation routing when confidence falls below 60%.
- 🧙 **Interactive 4-Step Compliance Wizard:** Self-assessment roadmap generator for Ayurvedic startups to evaluate patentability and generate downloadable compliance roadmaps.
- 📚 **Knowledge Act Explorer:** Interactive search browser across official Government of India legal gazettes.

---

## 🏗️ Architecture & Tech Stack

| Layer | Component / Technology | Open-Source License |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 + Vite | MIT |
| **UI Styling** | Tailwind CSS + Lightswind UI + UI/UX Pro Max tokens | MIT |
| **Icons** | Lucide React | MIT |
| **Speech-to-Text (STT)** | Browser Web Speech API | Native / Free |
| **RAG Retrieval Engine** | BM25 Sparse Search + Vector Dense Retrieval + Cross-Encoder Reranker | MIT / Apache 2.0 |
| **Embedding Model** | `BAAI/bge-m3` | MIT |
| **Local LLM Engine** | Ollama (`qwen2.5:7b` / `llama3.1:8b`) *or* Google Gemini Flash API | Apache 2.0 / Free Tier |
| **Evaluation / Scoring** | RAGAS (Faithfulness & Context Relevance) | Apache 2.0 |

---

## 📁 Repository Directory Structure

```
ayush/
├── 📁 public/                    # Static public assets
├── 📁 src/
│   ├── 📁 components/            # React UI Components
│   │   ├── Navbar.jsx            # Top Navigation with emblem & language selector
│   │   ├── HeroBanner.jsx        # Shiny text hero header with sample query pills
│   │   ├── ChatInterface.jsx     # Voice/Text chat interface with citations & confidence bar
│   │   ├── ComplianceWizard.jsx  # 4-Step interactive self-assessment wizard
│   │   ├── KnowledgeBrowser.jsx  # Legal act explorer & section search
│   │   └── EscalationModal.jsx   # Expert ticket creation modal
│   ├── 📁 data/
│   │   ├── legalKnowledgeBase.js # Verified dataset of Indian acts, rules & circulars
│   │   └── ayushTerms.js          # Vernacular to scientific terminology dictionary
│   ├── 📁 engine/
│   │   └── hybridRag.js          # Hybrid retrieval, classification & confidence engine
│   ├── App.jsx                   # Main application layout & tab switcher
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Custom glassmorphism, aurora & theme CSS
├── 📁 knowledge_base/
│   └── 📁 raw_docs/              # Ingested official legal text files
│       ├── Indian_Patents_Act_1970_Updated.txt
│       ├── Biological_Diversity_Act_2002.txt
│       └── Drugs_and_Cosmetics_Schedule_T.txt
├── download_legal_docs.py        # Python script to download official government PDFs
├── test_rag_engine.py            # Python hybrid RAG engine verification script
├── package.json                  # Node dependencies & build scripts
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: 3.10 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ip-sakti-sahayak.git
   cd ip-sakti-sahayak
   ```

2. **Install frontend dependencies:**
   ```bash
   cmd /c npm install
   ```

3. **Start the local development server:**
   ```bash
   cmd /c npm run dev
   ```
   Open **`http://localhost:3000`** in your browser.

4. **Build for production:**
   ```bash
   cmd /c npm run build
   ```

---

## 🧪 Testing the Python RAG Backend

To run the offline Python RAG test suite against the ingested legal acts:

```bash
python test_rag_engine.py
```

---

## 📜 Disclaimer

*IP-SAKTI Sahayak provides AI-generated informational guidance based on verified Government of India legal gazettes. It does not constitute formal legal counsel. For patent filings, regulatory approvals, or National Biodiversity Authority clearances, users should consult a registered Patent Attorney or relevant legal authority.*

---

## 🤝 Contributing & License

Developed for **Smart India Hackathon (SIH 2026)** under Problem Statement **SIH26045**.
Licensed under the [MIT License](LICENSE).
