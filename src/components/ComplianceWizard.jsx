import React, { useState } from 'react';
import { Compass, CheckCircle, AlertOctagon, FileCheck, ArrowRight, RotateCcw, Download } from 'lucide-react';

export default function ComplianceWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productType: '',
    bioResource: '',
    synergyProof: '',
    targetGoal: ''
  });

  const handleSelect = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      productType: '',
      bioResource: '',
      synergyProof: '',
      targetGoal: ''
    });
  };

  const getAnalysis = () => {
    const recommendations = [];
    const warnings = [];
    let patentable = "UNCERTAIN";

    if (formData.productType === 'classical') {
      patentable = "NON-PATENTABLE (Sec 3(p))";
      warnings.push("Formulation exists in classical texts (Charaka/API). Covered under Section 3(p) as Traditional Knowledge.");
      recommendations.push("File for Classical ASU Manufacturing License under D&C Act (No clinical trial needed, only text reference proof).");
    } else if (formData.productType === 'novel_process') {
      patentable = "LIKELY PATENTABLE";
      recommendations.push("Novel extraction process or bio-availability delivery mechanism is eligible for patent under Section 3.");
      recommendations.push("Ensure process is non-obvious and yields surprising technical advantages over raw extract.");
    } else {
      patentable = "CONDITIONAL PATENTABLE (Sec 3(e))";
      recommendations.push("Must provide comparative experimental data showing synergistic efficacy beyond individual components.");
    }

    if (formData.bioResource === 'yes') {
      warnings.push("MANDATORY: Uses biological resources from India. Must obtain National Biodiversity Authority (NBA) prior approval (Form III) before applying for IPR.");
      recommendations.push("Submit NBA Form III application for Access & Benefit Sharing (ABS) clearance under Section 6 of Biological Diversity Act 2002.");
    }

    if (formData.synergyProof === 'no_proof' && formData.productType !== 'classical') {
      warnings.push("Risk of Section 3(e) rejection: Mere admixtures without synergistic data will be rejected by the Indian Patent Office.");
    }

    if (formData.targetGoal === 'fssai') {
      recommendations.push("Register product under FSSAI Ayush Aahar Regulations 2022. Note: Therapeutic disease cure claims are prohibited.");
    } else if (formData.targetGoal === 'export') {
      recommendations.push("Comply with destination country heavy metal & pesticide residue limits + obtain AYUSH Premium Mark certification.");
    }

    return { patentable, recommendations, warnings };
  };

  const analysis = getAnalysis();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Self-Assessment</span>
        </div>
        <h2 className="text-2xl font-bold text-white">AYUSH Patentability & Regulatory Readiness Wizard</h2>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Answer 4 simple questions about your product to get a personalized compliance roadmap and patent eligibility report.
        </p>

        <div className="flex items-center justify-center space-x-4 pt-4 max-w-md mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950 scale-110' 
                  : step > s 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 4 && <div className={`w-8 h-0.5 ${step > s ? 'bg-emerald-600' : 'bg-slate-800'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-semibold text-emerald-300">Step 1: What is your product formulation based on?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'classical', title: 'Classical Text Recipe', desc: 'Exact formula from Charaka, Sushruta, or Ayurvedic Pharmacopoeia (e.g., Chyawanprash).' },
              { id: 'modified_combo', title: 'Modified Combination', desc: 'Proprietary blend of 2+ known Ayurvedic herbs with custom proportions.' },
              { id: 'novel_process', title: 'Novel Process / Extract', desc: 'Unique extraction technique, nano-particle delivery, or isolated synergistic fraction.' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect('productType', item.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.productType === item.id
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-semibold text-emerald-300">Step 2: Does your product utilize biological resources sourced in India?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'yes', title: 'Yes, Indian Medicinal Plants/Minerals', desc: 'Uses herbs harvested in India (e.g., Indian Ashwagandha, Shilajit, Tulsi).' },
              { id: 'no', title: 'No, Fully Synthetic or Imported', desc: 'Non-biological or entirely imported raw materials.' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect('bioResource', item.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.bioResource === item.id
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-semibold text-emerald-300">Step 3: Do you have comparative experimental data proving synergistic efficacy?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'has_proof', title: 'Yes, Lab/Clinical Efficacy Data', desc: 'Comparative studies showing formulation efficacy exceeds individual component sum.' },
              { id: 'no_proof', title: 'No / In Progress', desc: 'Formulated based on traditional rationale without formal comparative lab data.' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect('synergyProof', item.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.synergyProof === item.id
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-semibold text-emerald-300">Step 4: What is your primary commercial or legal objective?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'patent', title: 'File Indian Patent', desc: 'Obtain exclusive 20-year IPR protection.' },
              { id: 'license', title: 'Manufacturing License', desc: 'Obtain State Licensing Authority drug license under Rule 158B.' },
              { id: 'fssai', title: 'Sell as Ayush Aahar', desc: 'Register as health food supplement under FSSAI.' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect('targetGoal', item.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.targetGoal === item.id
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {step > 1 && step <= 4 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            ← Back
          </button>
        )}

        {step < 4 && (
          <button
            disabled={
              (step === 1 && !formData.productType) ||
              (step === 2 && !formData.bioResource) ||
              (step === 3 && !formData.synergyProof)
            }
            onClick={handleNext}
            className="ml-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-emerald-950"
          >
            <span>Next Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {step === 4 && formData.targetGoal && (
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Assessment Complete</span>
              <h3 className="text-xl font-bold text-white">Your AYUSH Compliance & Patent Roadmap</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              analysis.patentable.includes('LIKELY') ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
              analysis.patentable.includes('CONDITIONAL') ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
              'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              Patent Status: {analysis.patentable}
            </span>
          </div>

          {analysis.warnings.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-amber-400">
                <AlertOctagon className="w-4 h-4" />
                <span>Critical Compliance Mandates & Warnings:</span>
              </div>
              {analysis.warnings.map((w, idx) => (
                <p key={idx} className="pl-5">• {w}</p>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Recommended Next Steps & Legal Approvals:
            </h4>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Assessment</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download Roadmap Report</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
