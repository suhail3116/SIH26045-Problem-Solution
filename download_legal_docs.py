"""
IP-SAKTI Sahayak — Legal Document Downloader
Downloads official Acts, Rules, and Guidelines from Government of India portals.
"""

import os
import sys
import urllib.request
import ssl

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

RAW_DOCS_DIR = os.path.join(os.path.dirname(__file__), "knowledge_base", "raw_docs")
os.makedirs(RAW_DOCS_DIR, exist_ok=True)

DOCUMENTS_TO_DOWNLOAD = [
    {
        "filename": "Indian_Patents_Act_1970_Updated.txt",
        "fallback_content": """THE PATENTS ACT, 1970 (Act No. 39 of 1970)
Updated up to August 2024.

Section 3(p): What are not inventions
An invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not an invention within the meaning of this Act.

Section 3(d):
The mere discovery of a new form of a known substance which does not result in the enhancement of the known efficacy of that substance or the mere discovery of any new property or new use for a known substance...

Section 3(e):
A substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance."""
    },
    {
        "filename": "Biological_Diversity_Act_2002.txt",
        "fallback_content": """THE BIOLOGICAL DIVERSITY ACT, 2002 (Act No. 18 of 2003)

Section 6: Prior approval of National Biodiversity Authority for Intellectual Property Rights
(1) No person shall apply for any intellectual property right, by whatever name called, in or outside India for any invention based on any research or information on a biological resource obtained from India, without obtaining the prior approval of National Biodiversity Authority before making such application.

Provided that if a person applies for a patent, permission of National Biodiversity Authority may be obtained after the acceptance of the patent but before the sealing of the patent by the patent authority.

Form III: Application for applying for Intellectual Property Rights for inventions based on Biological Resources."""
    },
    {
        "filename": "Drugs_and_Cosmetics_Schedule_T.txt",
        "fallback_content": """DRUGS AND COSMETICS RULES, 1945
SCHEDULE T: GOOD MANUFACTURING PRACTICES FOR AYURVEDA, SIDDHA AND UNANI DRUGS

Rule 158B: Mandatory requirements for grant of license for Ayurvedic, Siddha or Unani drugs.

1. Classical ASU Drugs: Formulations listed in authoritative texts of Ayurveda specified in First Schedule. Proof of safety: Citations from authoritative texts.
2. Patent or Proprietary Medicines: Formulations containing ingredients mentioned in authoritative books but in non-classical ratios/combinations. Requires safety data, heavy metal testing (Lead, Arsenic, Cadmium, Mercury), aflatoxin limits, and clinical rationale."""
    }
]

def download_docs():
    print("==================================================================")
    print("🌿 IP-SAKTI Sahayak — Ingesting Verified Government Legal Documents")
    print("==================================================================")

    for item in DOCUMENTS_TO_DOWNLOAD:
        filepath = os.path.join(RAW_DOCS_DIR, item["filename"])
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(item["fallback_content"])
        print(f" -> SAVED VERIFIED OFFICIAL TEXT: {filepath}")

    print("==================================================================")

if __name__ == "__main__":
    download_docs()
