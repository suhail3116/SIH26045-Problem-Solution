import React, { useState } from 'react';
import { Users, CheckCircle, Send } from 'lucide-react';

export default function EscalationModal({ initialQuery = '', onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    queryText: initialQuery,
    reason: 'Section 3(p) Patentability Ambiguity'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `TK-AYUSH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(id);
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 rounded-2xl border border-amber-500/30 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Human Expert Escalation Portal</h2>
          <p className="text-xs text-amber-300">
            Connect directly with registered AYUSH Patent Attorneys & National Biodiversity Authority (NBA) Consultants.
          </p>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Primary Escalation Subject:</label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="Section 3(p) Patentability Ambiguity">Section 3(p) Patentability Ambiguity</option>
              <option value="NBA Form III ABS Approval & Benefit Sharing Royalty">NBA Form III ABS Approval & Benefit Sharing Royalty</option>
              <option value="Drugs & Cosmetics Rule 158B License Support">Drugs & Cosmetics Rule 158B Manufacturing License</option>
              <option value="TKDL Prior Art Pre-Grant Opposition">TKDL Prior Art Pre-Grant Opposition</option>
              <option value="FSSAI Ayush Aahar Dual Registration">FSSAI Ayush Aahar Dual Registration</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Your Inquiry / Query Details:</label>
            <textarea
              rows={3}
              value={formData.queryText}
              onChange={(e) => setFormData({ ...formData, queryText: e.target.value })}
              placeholder="Describe your formulation, extraction method, or regulatory query..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Ayush Sharma"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ayush@herbalinnovations.in"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Phone Number:</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Organization / Startup Name:</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="VedaPharma Labs Pvt Ltd"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-950 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Human Expert Review</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 rounded-xl bg-slate-900 border border-emerald-500/40 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Escalation Ticket Submitted Successfully!</h3>
            <p className="text-xs text-slate-300 mt-1">
              Your inquiry has been assigned to an empaneled AYUSH IP & Patent Consultant.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 inline-block font-mono text-xs text-emerald-400 font-bold">
            Ticket ID: {ticketId}
          </div>

          <p className="text-xs text-slate-400">
            A confirmation receipt and official legal opinion draft will be sent to <strong>{formData.email}</strong> within 24 business hours.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
          >
            Submit Another Escalation Ticket
          </button>
        </div>
      )}
    </div>
  );
}
