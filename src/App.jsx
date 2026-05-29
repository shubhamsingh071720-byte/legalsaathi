import { useState, useRef } from "react";

const S = {
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 5%",
    background: "rgba(250,250,247,0.88)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #E2DDD5",
  },
  logo: {
    fontFamily: "var(--font-display)", fontSize: "22px", fontStyle: "italic",
    color: "var(--ink)", letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: "8px",
  },
  logoMark: {
    width: "30px", height: "30px", background: "var(--saffron)",
    borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "15px",
  },
  navCta: {
    background: "var(--ink)", color: "#fff", border: "none", cursor: "pointer",
    padding: "10px 22px", borderRadius: "8px", fontSize: "13px",
    fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.2px",
    transition: "all 0.2s",
  },
  hero: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "120px 5% 80px", textAlign: "center", position: "relative", overflow: "hidden",
  },
  heroBg: {
    position: "absolute", inset: 0, zIndex: 0,
    background: "radial-gradient(ellipse 80% 60% at 50% 0%, #FFF3E8 0%, transparent 70%)",
  },
  badge: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    background: "var(--saffron-dim)", border: "1px solid #E8660A44",
    color: "var(--saffron)", padding: "6px 14px", borderRadius: "99px",
    fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px",
    marginBottom: "28px", position: "relative", zIndex: 1,
  },
  h1: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(38px, 6.5vw, 80px)",
    lineHeight: 1.1, letterSpacing: "-1.5px",
    color: "var(--ink)", marginBottom: "24px",
    position: "relative", zIndex: 1, maxWidth: "900px",
  },
  h1Italic: { fontStyle: "italic", color: "var(--saffron)" },
  heroSub: {
    fontSize: "clamp(15px, 1.8vw, 18px)", color: "var(--muted)",
    maxWidth: "560px", lineHeight: 1.7, marginBottom: "40px",
    position: "relative", zIndex: 1,
  },
  heroCtas: {
    display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center",
    position: "relative", zIndex: 1, marginBottom: "60px",
  },
  btnPrimary: {
    background: "var(--saffron)", color: "#fff", border: "none", cursor: "pointer",
    padding: "16px 36px", borderRadius: "12px", fontSize: "15px",
    fontFamily: "var(--font-body)", fontWeight: 700,
    boxShadow: "0 4px 24px rgba(232,102,10,0.35)",
    transition: "all 0.2s", animation: "pulse-ring 2.5s infinite",
  },
  btnSecondary: {
    background: "transparent", color: "var(--ink)",
    border: "1.5px solid var(--border)", cursor: "pointer",
    padding: "16px 28px", borderRadius: "12px", fontSize: "15px",
    fontFamily: "var(--font-body)", fontWeight: 600, transition: "all 0.2s",
  },
  heroStats: {
    display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap",
    position: "relative", zIndex: 1,
  },
  stat: { textAlign: "center" },
  statNum: {
    fontFamily: "var(--font-display)", fontSize: "32px", fontStyle: "italic",
    color: "var(--ink)", display: "block", lineHeight: 1,
  },
  statLabel: { fontSize: "12px", color: "var(--muted)", letterSpacing: "0.3px" },
  marqueeWrap: {
    overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
    padding: "14px 0", background: "var(--cream)",
  },
  marqueeInner: {
    display: "flex", gap: "48px", whiteSpace: "nowrap",
    animation: "marquee 25s linear infinite",
  },
  marqueeItem: {
    fontSize: "12px", fontWeight: 600, color: "var(--muted)",
    letterSpacing: "1.5px", textTransform: "uppercase", flexShrink: 0,
  },
  section: { padding: "100px 5%" },
  sectionLabel: {
    fontSize: "11px", fontWeight: 700, color: "var(--saffron)",
    letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px",
  },
  h2: {
    fontFamily: "var(--font-display)", fontSize: "clamp(30px, 4vw, 52px)",
    letterSpacing: "-1px", lineHeight: 1.15, color: "var(--ink)", marginBottom: "16px",
  },
  h2Italic: { fontStyle: "italic" },
  sectionSub: { fontSize: "16px", color: "var(--muted)", maxWidth: "480px", lineHeight: 1.7 },
  problemGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1px", background: "var(--border)", border: "1px solid var(--border)",
    borderRadius: "20px", overflow: "hidden", marginTop: "60px",
  },
  problemCard: { background: "var(--paper)", padding: "36px 32px", transition: "background 0.2s" },
  problemIcon: { fontSize: "28px", marginBottom: "16px", display: "block" },
  problemTitle: {
    fontFamily: "var(--font-display)", fontSize: "20px", fontStyle: "italic",
    color: "var(--ink)", marginBottom: "10px",
  },
  problemDesc: { fontSize: "14px", color: "var(--muted)", lineHeight: 1.7 },
  problemHighlight: { color: "var(--saffron)", fontWeight: 600 },
  howBg: { background: "var(--cream)" },
  stepsWrap: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "32px", marginTop: "60px",
  },
  stepCard: { position: "relative" },
  stepNum: {
    fontFamily: "var(--font-display)", fontSize: "64px", fontStyle: "italic",
    color: "var(--saffron)", opacity: 0.15, lineHeight: 1,
    position: "absolute", top: "-10px", left: "-8px",
  },
  stepContent: { paddingTop: "28px" },
  stepTitle: {
    fontFamily: "var(--font-display)", fontSize: "20px", fontStyle: "italic",
    color: "var(--ink)", marginBottom: "8px",
  },
  stepDesc: { fontSize: "14px", color: "var(--muted)", lineHeight: 1.7 },
  docsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "12px", marginTop: "48px",
  },
  docChip: {
    background: "var(--paper)", border: "1.5px solid var(--border)",
    borderRadius: "12px", padding: "16px 18px",
    display: "flex", alignItems: "center", gap: "10px",
    fontSize: "13px", fontWeight: 500, color: "var(--ink)",
    transition: "all 0.2s", cursor: "default",
  },
  docChipIcon: { fontSize: "18px" },
  pricingWrap: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px", marginTop: "60px", maxWidth: "900px",
  },
  pricingCard: {
    border: "1.5px solid var(--border)", borderRadius: "20px",
    padding: "36px 32px", background: "var(--paper)", position: "relative",
  },
  pricingCardFeatured: {
    border: "2px solid var(--saffron)", borderRadius: "20px",
    padding: "36px 32px", background: "var(--ink)", position: "relative",
  },
  pricingBadge: {
    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
    background: "var(--saffron)", color: "#fff", fontSize: "11px",
    fontWeight: 700, padding: "4px 16px", borderRadius: "99px", letterSpacing: "0.5px",
  },
  planName: { fontSize: "13px", fontWeight: 700, color: "var(--muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" },
  planNameLight: { fontSize: "13px", fontWeight: 700, color: "#ffffff88", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" },
  planPrice: { fontFamily: "var(--font-display)", fontSize: "48px", fontStyle: "italic", color: "var(--ink)", lineHeight: 1, marginBottom: "4px" },
  planPriceLight: { fontFamily: "var(--font-display)", fontSize: "48px", fontStyle: "italic", color: "#fff", lineHeight: 1, marginBottom: "4px" },
  planPer: { fontSize: "13px", color: "var(--muted)", marginBottom: "28px" },
  planPerLight: { fontSize: "13px", color: "#ffffff66", marginBottom: "28px" },
  planFeature: { display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--ink)", marginBottom: "10px", lineHeight: 1.5 },
  planFeatureLight: { display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#ffffffcc", marginBottom: "10px", lineHeight: 1.5 },
  checkGreen: { color: "var(--green-light)", fontWeight: 700, flexShrink: 0, marginTop: "1px" },
  checkLight: { color: "var(--saffron-light)", fontWeight: 700, flexShrink: 0, marginTop: "1px" },
  planBtn: {
    width: "100%", marginTop: "28px", padding: "14px", borderRadius: "10px",
    border: "1.5px solid var(--border)", background: "transparent", color: "var(--ink)",
    cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px", transition: "all 0.2s",
  },
  planBtnFeatured: {
    width: "100%", marginTop: "28px", padding: "14px", borderRadius: "10px",
    border: "none", background: "var(--saffron)", color: "#fff", cursor: "pointer",
    fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px", transition: "all 0.2s",
    boxShadow: "0 4px 20px rgba(232,102,10,0.4)",
  },
  testimonialsWrap: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px", marginTop: "60px",
  },
  testimonialCard: {
    background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px",
  },
  testimonialQuote: {
    fontSize: "15px", color: "var(--ink)", lineHeight: 1.7,
    fontFamily: "var(--font-display)", fontStyle: "italic", marginBottom: "20px",
  },
  testimonialAuthor: { display: "flex", alignItems: "center", gap: "12px" },
  testimonialAvatar: {
    width: "40px", height: "40px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", fontWeight: 700, color: "#fff", flexShrink: 0,
  },
  testimonialName: { fontSize: "13px", fontWeight: 600, color: "var(--ink)" },
  testimonialRole: { fontSize: "12px", color: "var(--muted)" },
  faqItem: { borderBottom: "1px solid var(--border)", padding: "22px 0", cursor: "pointer" },
  faqQ: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "16px", fontWeight: 600, color: "var(--ink)" },
  faqA: { fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, paddingTop: "12px", maxWidth: "680px" },
  ctaSection: { background: "var(--ink)", padding: "100px 5%", textAlign: "center" },
  ctaH2: {
    fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 60px)",
    fontStyle: "italic", color: "#fff", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "20px",
  },
  ctaOrange: { color: "var(--saffron-light)" },
  ctaSub: { fontSize: "16px", color: "#ffffff66", marginBottom: "40px", maxWidth: "460px", margin: "0 auto 40px" },
  formWrap: {
    background: "var(--paper)", border: "1px solid var(--border)", borderRadius: "20px",
    padding: "40px", maxWidth: "520px", margin: "0 auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
  },
  formTitle: { fontFamily: "var(--font-display)", fontSize: "24px", fontStyle: "italic", color: "var(--ink)", marginBottom: "6px" },
  formSub: { fontSize: "13px", color: "var(--muted)", marginBottom: "24px" },
  input: {
    width: "100%", padding: "13px 16px", borderRadius: "10px",
    border: "1.5px solid var(--border)", background: "#fff",
    fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--ink)",
    outline: "none", marginBottom: "12px", transition: "border 0.2s",
  },
  select: {
    width: "100%", padding: "13px 16px", borderRadius: "10px",
    border: "1.5px solid var(--border)", background: "#fff",
    fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--ink)",
    outline: "none", marginBottom: "12px", appearance: "none",
  },
  submitBtn: {
    width: "100%", padding: "15px", borderRadius: "10px",
    background: "var(--saffron)", color: "#fff", border: "none",
    fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "15px",
    cursor: "pointer", transition: "all 0.2s",
    boxShadow: "0 4px 20px rgba(232,102,10,0.35)", marginTop: "4px",
  },
  formNote: { fontSize: "11px", color: "var(--muted)", textAlign: "center", marginTop: "10px" },
  footer: {
    background: "var(--cream)", borderTop: "1px solid var(--border)",
    padding: "40px 5%", display: "flex", justifyContent: "space-between",
    alignItems: "center", flexWrap: "wrap", gap: "16px",
  },
  footerNote: { fontSize: "12px", color: "var(--muted)" },
  footerDisclaimer: { fontSize: "11px", color: "var(--muted)", maxWidth: "460px", lineHeight: 1.6, textAlign: "right" },
};

const problems = [
  { icon: "💸", title: "Lawyers charge ₹3,000–₹20,000", desc: "For a simple vendor agreement that should cost ₹99. And they take 5–7 days to deliver it.", highlight: "per document" },
  { icon: "🤝", title: "Verbal agreements end in disputes", desc: "Most MSME deals are done on trust. When something goes wrong, there is no paper, no protection, no recourse.", highlight: "no protection" },
  { icon: "🌐", title: "Existing platforms are English-only", desc: "LegalDesk, Vakilsearch — all designed for English-speaking metros. 90% of MSMEs are left out.", highlight: "Hindi ignored" },
  { icon: "📄", title: "Static templates are dangerous", desc: "A template downloaded from Google won't have GST clauses, state-specific stamp duty, or MSME Act protections.", highlight: "wrong clauses" },
  { icon: "⏳", title: "Time kills momentum", desc: "By the time the lawyer delivers the agreement, your supplier has moved on or the deal terms have changed.", highlight: "3–7 day delay" },
  { icon: "🔒", title: "No subscription, no consistency", desc: "Every agreement is a new ordeal. No business can grow when legal protection is a one-time event instead of an ongoing system.", highlight: "no system" },
];

const steps = [
  { num: "01", title: "Tell us what you need", desc: "Fill a simple form — business name, party details, key terms. Takes under 3 minutes. Works in Hindi too." },
  { num: "02", title: "AI drafts your document", desc: "Our legal AI generates a court-valid agreement with GST clauses, state-specific stamp duty, and MSME protections built in." },
  { num: "03", title: "Review & sign digitally", desc: "Preview your document, request changes if needed, then sign via Aadhaar e-sign. No printer. No physical stamp paper." },
  { num: "04", title: "Get it on WhatsApp", desc: "Your signed, stamped document is delivered to your WhatsApp and email within 30 minutes. Ready to share with the other party." },
];

const documents = [
  { icon: "🤝", name: "Vendor Agreement" },
  { icon: "👷", name: "Employment Letter" },
  { icon: "🏠", name: "Rental Agreement" },
  { icon: "🤜", name: "Partnership Deed" },
  { icon: "🔒", name: "NDA / Confidentiality" },
  { icon: "💼", name: "Freelancer Contract" },
  { icon: "📦", name: "Distribution Agreement" },
  { icon: "⚡", name: "Service Agreement" },
  { icon: "📋", name: "MOU / Term Sheet" },
  { icon: "⚖️", name: "Legal Notice" },
  { icon: "🏭", name: "Franchise Agreement" },
  { icon: "💳", name: "Loan Agreement" },
];

const plans = [
  {
    name: "Starter", price: "₹99", per: "per document", featured: false,
    features: ["1 AI-generated document", "Hindi or English", "PDF delivery on WhatsApp", "Basic clauses included", "24hr support"],
  },
  {
    name: "Business", price: "₹499", per: "per month", featured: true,
    features: ["Unlimited documents/month", "All 12 document types", "State-specific clauses", "GST + MSME Act clauses", "Aadhaar e-sign included", "Priority WhatsApp support", "Document vault (store all docs)"],
  },
  {
    name: "Professional", price: "₹1,499", per: "per month", featured: false,
    features: ["Everything in Business", "Up to 5 team members", "Lawyer review on-demand", "Custom company letterhead", "Compliance calendar", "Dedicated account manager"],
  },
];

const testimonials = [
  { quote: "Maine pehle ek vendor ko bina agreement ke material diya. ₹1.8 lakh ka nuksaan hua. Ab LegalSaathi se har deal pe agreement hoti hai — 30 minute mein.", name: "Ramesh Gupta", role: "Textile Trader, Surat", color: "#E8660A" },
  { quote: "As a CA I recommend this to all my MSME clients. The GST clauses and state-specific stamp duty are accurate. Saves them thousands on legal fees.", name: "Priya Nair CA", role: "Chartered Accountant, Kochi", color: "#1A6B3C" },
  { quote: "We hired 3 delivery staff and finally have proper employment letters. Used to just give them verbal agreements. This feels like having a lawyer on call.", name: "Ankit Sharma", role: "Quick Commerce Operator, Jaipur", color: "#7C3AED" },
];

const faqs = [
  { q: "Are these documents legally valid in court?", a: "Yes. Every document generated by LegalSaathi is drafted according to the Indian Contract Act, relevant state laws, and includes proper stamp duty as required by your state. They are enforceable in Indian courts." },
  { q: "Do I need to know legal terms to use this?", a: "No. Our AI asks you questions in plain language — even in Hindi. You fill in the business details, we handle the legal language automatically." },
  { q: "What if I need a document type that's not listed?", a: "Write to us on WhatsApp. On the Business and Professional plans, we can generate custom document types within 24 hours." },
  { q: "Is my business information safe?", a: "Absolutely. We use bank-grade encryption. Your documents are stored in your private vault. We never share your data with third parties." },
  { q: "Can I get a lawyer to review the document?", a: "Yes — on the Professional plan, every document can be reviewed by a qualified Indian advocate within 24 hours for an added layer of protection." },
  { q: "What's the difference between LegalSaathi and LegalDesk or Vakilsearch?", a: "They are human-operated services that take 3–5 days and charge per document. LegalSaathi is an AI-first platform — instant delivery, Hindi support, GST-aware clauses, and a subscription model so legal protection is always on." },
];

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={S.faqItem} onClick={() => setOpen(!open)}>
      <div style={S.faqQ}>
        <span>{q}</span>
        <span style={{ fontSize: "20px", color: "var(--saffron)", flexShrink: 0, marginLeft: "16px" }}>{open ? "−" : "+"}</span>
      </div>
      {open && <div style={S.faqA}>{a}</div>}
    </div>
  );
}

function LeadForm() {
  const [form, setForm] = useState({ name: "", whatsapp: "", business: "", document: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.whatsapp || !form.business) {
      alert("Please fill all fields.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ ...S.formWrap, textAlign: "center", padding: "50px 40px" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontStyle: "italic", color: "var(--ink)", marginBottom: "10px" }}>You're on the list!</div>
      <div style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7 }}>We'll WhatsApp you within 2 hours with your free document. Welcome to LegalSaathi.</div>
    </div>
  );

  return (
    <div style={S.formWrap}>
      <div style={S.formTitle}>Get your first document free</div>
      <div style={S.formSub}>No credit card. No account needed. Just your WhatsApp number.</div>
      <input style={S.input} name="name" placeholder="Your full name" value={form.name} onChange={handle}
        onFocus={e => e.target.style.borderColor = "var(--saffron)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"} />
      <input style={S.input} name="whatsapp" placeholder="WhatsApp number (with +91)" value={form.whatsapp} onChange={handle}
        onFocus={e => e.target.style.borderColor = "var(--saffron)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"} />
      <input style={S.input} name="business" placeholder="Your business name" value={form.business} onChange={handle}
        onFocus={e => e.target.style.borderColor = "var(--saffron)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"} />
      <select style={S.select} name="document" value={form.document} onChange={handle}>
        <option value="">Which document do you need first?</option>
        <option>Vendor Agreement</option>
        <option>Employment Letter</option>
        <option>Rental Agreement</option>
        <option>Partnership Deed</option>
        <option>NDA / Confidentiality</option>
        <option>Service Agreement</option>
        <option>Legal Notice</option>
        <option>Other</option>
      </select>
      <button style={{ ...S.submitBtn, opacity: loading ? 0.7 : 1 }} onClick={submit}
        onMouseEnter={e => e.target.style.background = "#D45D08"}
        onMouseLeave={e => e.target.style.background = "var(--saffron)"}>
        {loading ? "Sending..." : "Get My Free Document →"}
      </button>
      <div style={S.formNote}>✓ 100% free &nbsp;·&nbsp; ✓ Delivered on WhatsApp in 30 mins &nbsp;·&nbsp; ✓ No spam</div>
    </div>
  );
}

export default function App() {
  const formRef = useRef(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div>
      <nav style={S.nav}>
        <div style={S.logo}>
          <div style={S.logoMark}>⚖️</div>
          LegalSaathi
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <a href="#how" style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none", fontWeight: 500 }}>How it works</a>
          <a href="#pricing" style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none", fontWeight: 500 }}>Pricing</a>
          <button style={S.navCta} onClick={scrollToForm}>Get Started Free</button>
        </div>
      </nav>

      <section style={S.hero}>
        <div style={S.heroBg} />
        <div style={S.badge}><span>🇮🇳</span> Built for Indian MSMEs</div>
        <h1 style={S.h1}>
          Court-valid business<br />
          agreements in <span style={S.h1Italic}>30 minutes.</span><br />
          Not 3 days.
        </h1>
        <p style={S.heroSub}>
          Stop losing deals and money to missing paperwork. LegalSaathi generates lawyer-quality agreements — in Hindi or English — and delivers them on WhatsApp. Starting ₹99.
        </p>
        <div style={S.heroCtas}>
          <button style={S.btnPrimary} onClick={scrollToForm}>Get First Document Free →</button>
          <button style={S.btnSecondary} onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}>See how it works</button>
        </div>
        <div style={S.heroStats}>
          {[
            { num: "30 min", label: "Average delivery time" },
            { num: "₹99", label: "Starting price" },
            { num: "12+", label: "Document types" },
            { num: "0", label: "Lawyer meetings needed" },
          ].map(s => (
            <div key={s.label} style={S.stat}>
              <span style={S.statNum}>{s.num}</span>
              <span style={S.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={S.marqueeWrap}>
        <div style={S.marqueeInner}>
          {[...Array(2)].map((_, i) =>
            ["Vendor Agreement", "Employment Letter", "Partnership Deed", "NDA", "Rental Agreement", "Service Contract", "Legal Notice", "Franchise Agreement", "MOU", "Freelancer Contract", "Loan Agreement", "Distribution Deal"].map(t => (
              <span key={t + i} style={S.marqueeItem}>⚖️ {t}</span>
            ))
          )}
        </div>
      </div>

      <section style={S.section}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={S.sectionLabel}>The Problem</div>
          <h2 style={S.h2}>Why most MSME deals<br /><span style={S.h2Italic}>end in disputes</span></h2>
          <p style={S.sectionSub}>63 million MSMEs in India. Most protected by nothing more than a handshake.</p>
          <div style={S.problemGrid}>
            {problems.map(p => (
              <div key={p.title} style={S.problemCard}
                onMouseEnter={e => e.currentTarget.style.background = "var(--cream)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--paper)"}>
                <span style={S.problemIcon}>{p.icon}</span>
                <div style={S.problemTitle}>{p.title}</div>
                <div style={S.problemDesc}>{p.desc} <span style={S.problemHighlight}>({p.highlight})</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...S.section, ...S.howBg }} id="how">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={S.sectionLabel}>How It Works</div>
          <h2 style={S.h2}>From zero to signed agreement<br /><span style={S.h2Italic}>in four steps</span></h2>
          <div style={S.stepsWrap}>
            {steps.map(s => (
              <div key={s.num} style={S.stepCard}>
                <div style={S.stepNum}>{s.num}</div>
                <div style={S.stepContent}>
                  <div style={S.stepTitle}>{s.title}</div>
                  <div style={S.stepDesc}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={S.section}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={S.sectionLabel}>Document Library</div>
          <h2 style={S.h2}>Every agreement your<br /><span style={S.h2Italic}>business will ever need</span></h2>
          <p style={S.sectionSub}>All documents include GST clauses, state stamp duty, and MSME Act protections.</p>
          <div style={S.docsGrid}>
            {documents.map(d => (
              <div key={d.name} style={S.docChip}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--saffron)"; e.currentTarget.style.background = "var(--saffron-dim)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--paper)"; }}>
                <span style={S.docChipIcon}>{d.icon}</span>
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...S.section, ...S.howBg }} id="pricing">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={S.sectionLabel}>Pricing</div>
          <h2 style={S.h2}>Less than one lawyer<br /><span style={S.h2Italic}>consultation per month</span></h2>
          <p style={S.sectionSub}>No hidden charges. Cancel any time. First document always free.</p>
          <div style={S.pricingWrap}>
            {plans.map(p => (
              <div key={p.name} style={p.featured ? S.pricingCardFeatured : S.pricingCard}>
                {p.featured && <div style={S.pricingBadge}>MOST POPULAR</div>}
                <div style={p.featured ? S.planNameLight : S.planName}>{p.name}</div>
                <div style={p.featured ? S.planPriceLight : S.planPrice}>{p.price}</div>
                <div style={p.featured ? S.planPerLight : S.planPer}>{p.per}</div>
                {p.features.map(f => (
                  <div key={f} style={p.featured ? S.planFeatureLight : S.planFeature}>
                    <span style={p.featured ? S.checkLight : S.checkGreen}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
                <button style={p.featured ? S.planBtnFeatured : S.planBtn} onClick={scrollToForm}>
                  {p.name === "Starter" ? "Get this document" : "Start free trial"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={S.section}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={S.sectionLabel}>Early Users</div>
          <h2 style={S.h2}>What Indian businesses<br /><span style={S.h2Italic}>are saying</span></h2>
          <div style={S.testimonialsWrap}>
            {testimonials.map(t => (
              <div key={t.name} style={S.testimonialCard}>
                <div style={S.testimonialQuote}>"{t.quote}"</div>
                <div style={S.testimonialAuthor}>
                  <div style={{ ...S.testimonialAvatar, background: t.color }}>
                    {t.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div style={S.testimonialName}>{t.name}</div>
                    <div style={S.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...S.section, ...S.howBg }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={S.sectionLabel}>FAQ</div>
          <h2 style={S.h2}>Questions you're<br /><span style={S.h2Italic}>probably thinking</span></h2>
          <div style={{ marginTop: "48px" }}>
            {faqs.map(f => <FAQ key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      <section style={S.ctaSection} ref={formRef}>
        <h2 style={S.ctaH2}>Your first document is<br /><span style={S.ctaOrange}>completely free.</span></h2>
        <p style={S.ctaSub}>No credit card. No account. Get a court-valid agreement on your WhatsApp in 30 minutes.</p>
        <LeadForm />
      </section>

      <footer style={S.footer}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontStyle: "italic", color: "var(--ink)", marginBottom: "4px" }}>⚖️ LegalSaathi</div>
          <div style={S.footerNote}>© 2025 LegalSaathi. All rights reserved.</div>
          <div style={{ ...S.footerNote, marginTop: "4px" }}>
            <a href="mailto:hello@legalsaathi.in" style={{ color: "var(--muted)", textDecoration: "none" }}>hello@legalsaathi.in</a>
          </div>
        </div>
        <div style={S.footerDisclaimer}>
          LegalSaathi is a document generation platform and does not provide legal advice. Documents should be reviewed by a qualified advocate for complex matters.
        </div>
      </footer>
    </div>
  );
}