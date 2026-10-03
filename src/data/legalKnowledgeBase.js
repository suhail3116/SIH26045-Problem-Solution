export const LEGAL_KNOWLEDGE_BASE = [
  {
    id: "IPA-3P",
    act: "The Patents Act, 1970 (as amended 2005)",
    section: "Section 3(p)",
    title: "Non-Patentability of Traditional Knowledge",
    category: "IP_PATENT",
    keywords: ["patent", "traditional knowledge", "section 3(p)", "3p", "prior art", "tkdl", "ayurveda", "formulation"],
    verbatim_text: "An invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not an invention within the meaning of this Act.",
    explanation: "You cannot patent classical Ayurvedic formulations (e.g., Chyawanprash, Triphala, or basic herb mixtures) found in traditional texts like Charaka Samhita or API. However, if you develop a novel, non-obvious process of extraction, a synergistic nano-formulation, or a modified drug delivery system with validated enhanced efficacy, it CAN be patentable provided it overcomes Section 3(d) and Section 3(e).",
    citations: ["Indian Patents Act 1970 § 3(p)", "Manual of Patent Practice & Procedure § 03.03.09", "TKDL Prior Art Database"]
  },
  {
    id: "IPA-3E",
    act: "The Patents Act, 1970 (as amended 2005)",
    section: "Section 3(e)",
    title: "Admixture Exhibiting Only Aggregation of Properties",
    category: "IP_PATENT",
    keywords: ["admixture", "section 3(e)", "synergy", "aggregation", "combination", "synergistic"],
    verbatim_text: "A substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance is not patentable.",
    explanation: "Combining Ashwagandha and Brahmi without synergistic pharmacological proof is considered a 'mere admixture'. To patent an Ayurvedic combination product, you MUST provide comparative experimental data showing synergistic therapeutic efficacy exceeding the arithmetic sum of individual herbs.",
    citations: ["Indian Patents Act 1970 § 3(e)", "IPO Guidelines for Examination of Patent Applications Relating to Traditional Knowledge"]
  },
  {
    id: "IPA-3D",
    act: "The Patents Act, 1970 (as amended 2005)",
    section: "Section 3(d)",
    title: "Enhancement of Efficacy Requirement",
    category: "IP_PATENT",
    keywords: ["efficacy", "section 3(d)", "bioavailability", "derivative", "modification", "salt", "isomer"],
    verbatim_text: "The mere discovery of a new form of a known substance which does not result in the enhancement of the known efficacy of that substance... is not patentable.",
    explanation: "If you extract an active phytochemical (like Curcumin from Turmeric) or synthesize a derivative, you must prove a significant enhancement of therapeutic efficacy (not just increased solubility) over the raw extract.",
    citations: ["Indian Patents Act 1970 § 3(d)", "Novartis AG v. Union of India (2013) 6 SCC 1"]
  },
  {
    id: "DCA-158B",
    act: "Drugs and Cosmetics Act, 1940 & Rules 1945",
    section: "Rule 158B",
    title: "Requirements for Licensing of ASU (Ayurveda, Siddha, Unani) Drugs",
    category: "REGULATION",
    keywords: ["license", "rule 158b", "proprietary medicine", "asu", "proof of safety", "clinical trial", "ayurvedic drug"],
    verbatim_text: "For the grant of license to manufacture for sale of Ayurvedic, Siddha or Unani drugs, applicant must provide proof of safety and effectiveness depending on whether the formulation is Classical or Patent/Proprietary (Balya/Soundarya/Pramanya).",
    explanation: "Classical ASU drugs (from authoritative texts in First Schedule) do NOT require safety/efficacy clinical trials; only text reference proof. Proprietary ASU medicines (new combinations) require pilot safety studies, heavy metal testing, and rationale under Rule 158B.",
    citations: ["Drugs and Cosmetics Rules 1945 Rule 158B", "AYUSH Licensing Guidelines 2018"]
  },
  {
    id: "DCA-SCH-T",
    act: "Drugs and Cosmetics Act, 1940",
    section: "Schedule T",
    title: "Good Manufacturing Practices (GMP) for ASU Drugs",
    category: "REGULATION",
    keywords: ["gmp", "schedule t", "good manufacturing practices", "factory", "sanitation", "quality control", "testing"],
    verbatim_text: "Factory premises for manufacture of Ayurveda, Siddha and Unani drugs shall comply with space, machinery, raw material store, quality control laboratory, and hygienic conditions specified in Schedule T.",
    explanation: "Every Ayurvedic manufacturer MUST obtain a GMP certificate issued by the State Licensing Authority. Includes mandatory testing for heavy metals (Lead, Arsenic, Cadmium, Mercury), aflatoxins, and pesticide residues.",
    citations: ["Drugs and Cosmetics Rules 1945 Schedule T", "Ayurvedic Pharmacopoeia of India (API)"]
  },
  {
    id: "BDA-SEC3-6",
    act: "Biological Diversity Act, 2002",
    section: "Section 3 & Section 6",
    title: "Prior Approval of National Biodiversity Authority (NBA) for IPR & Commercialization",
    category: "ABS_BIODIVERSITY",
    keywords: ["biodiversity", "nba", "abs", "access and benefit sharing", "section 6", "form 3", "biological resources", "nagoya"],
    verbatim_text: "No person shall apply for any intellectual property right in or outside India for any invention based on any research or information on a biological resource obtained from India without obtaining prior approval of the National Biodiversity Authority (Form III).",
    explanation: "If your product uses Indian medicinal plants (like Ashwagandha, Tulsi, Shilajit harvested in India), you MUST file Form III with NBA before applying for a patent. Failure to do so is a non-bailable offense under Section 55.",
    citations: ["Biological Diversity Act 2002 § 6(1)", "NBA Guidelines for Access and Benefit Sharing 2014"]
  },
  {
    id: "TKDL-FRAMEWORK",
    act: "CSIR-TKDL Framework",
    section: "TKDL Prior Art Digital Library",
    title: "Traditional Knowledge Digital Library (TKDL) Protection",
    category: "TRADITIONAL_KNOWLEDGE",
    keywords: ["tkdl", "traditional knowledge digital library", "csir", "charaka", "sushruta", "prior art", "epo", "uspto"],
    verbatim_text: "TKDL contains over 415,000 formulation entries from classical Ayurveda, Unani, Siddha, and Yoga texts transcribed into 5 international languages (English, German, French, Japanese, Spanish) to prevent biopiracy.",
    explanation: "Global patent offices (EPO, USPTO, JPO, IPO India) search TKDL during examination. If your formulation exists in TKDL, the examiner will issue a 3(p) rejection. Always perform a TKDL pre-check before filing.",
    citations: ["CSIR TKDL Database Guidelines", "WIPO Intergovernmental Committee on IP and Genetic Resources"]
  },
  {
    id: "FSSAI-AYUSH-AAHAR",
    act: "FSSAI (Health Supplements, Nutraceuticals & Ayush Aahar) Regulations, 2022",
    section: "Regulation 3A",
    title: "Ayush Aahar Standards & Dual Licensing",
    category: "REGULATION",
    keywords: ["ayush aahar", "fssai", "food", "supplement", "nutraceutical", "health food", "ayurveda food"],
    verbatim_text: "Ayush Aahar refers to food items prepared in accordance with recipes or ingredients/processes described in authoritative books of Ayurveda listed under Schedule A of regulations.",
    explanation: "If you sell Ayurvedic teas, health drinks, or botanical powders as dietary supplements, you can register under FSSAI 'Ayush Aahar' instead of an ASU Drug license. However, therapeutic/disease cure claims are strictly prohibited.",
    citations: ["FSSAI Ayush Aahar Regulations 2022", "Food Safety and Standards Act 2006"]
  }
];
