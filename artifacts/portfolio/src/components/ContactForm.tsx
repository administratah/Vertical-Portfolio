import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, RotateCcw } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }
    setFormState("loading");
    try {
      const res = await fetch("https://api.sajiali.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      if (res.ok) {
        setSubmittedName(form.name.trim());
        setFormState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const resetForm = () => {
    setFormState("idle");
    setSubmittedName("");
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 py-4 text-lg md:text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors";

  const firstName = submittedName.split(" ")[0];

  return (
    <div className="mt-24 lg:mt-32 border-t border-white/10 pt-20">
      <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground mb-12">
        {formState === "success" ? "Message Received" : "Send a Message"}
      </p>

      <AnimatePresence mode="wait">
        {formState === "success" ? (
          /* ─── Confirmation panel ─── */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-[640px]"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="w-16 h-16 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center"
            >
              <Check className="w-7 h-7 text-accent" strokeWidth={2.5} />
            </motion.div>

            <h3 className="mt-8 font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Thank you{firstName ? `, ${firstName}` : ""}.
            </h3>

            <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed font-sans">
              Your message has landed safely in my inbox. I read every enquiry personally
              &mdash; expect a reply from me, usually within{" "}
              <span className="text-white">1&ndash;2 business days</span>.
            </p>

            <p className="mt-4 text-sm text-white/40 leading-relaxed font-sans">
              My reply will come from{" "}
              <span className="text-white/70">contact@contact.sajiali.com</span> &mdash; if you
              don&rsquo;t see it, a quick check of your spam folder never hurts.
            </p>

            <button
              onClick={resetForm}
              className="group mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground hover:text-white transition-colors duration-300 font-sans"
            >
              <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform duration-300" />
              Send another message
            </button>
          </motion.div>
        ) : (
          /* ─── Form ─── */
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={inputClass}
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                type="email"
                className={inputClass}
              />
            </div>

            <div className="mb-8">
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled className="bg-black">Subject</option>
                <option value="Job Opportunity" className="bg-black">Job Opportunity</option>
                <option value="Collaboration" className="bg-black">Collaboration</option>
                <option value="General Inquiry" className="bg-black">General Inquiry</option>
                <option value="Other" className="bg-black">Other</option>
              </select>
            </div>

            <div className="mb-12">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="mb-8">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ldjb_osAAAAANlGsoOWlcK1YsUdC9fmOlTcWa1_"
                onChange={(token) => setRecaptchaToken(token)}
                theme="dark"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={formState === "loading"}
              className="group flex items-center gap-4 text-sm uppercase tracking-[0.4em] border-b border-white pb-2 hover:gap-8 transition-all disabled:opacity-50"
            >
              {formState === "loading" ? "Sending..." : formState === "error" ? "Try Again" : "Send Message"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {formState === "error" && (
              <p className="mt-4 text-sm text-red-400 uppercase tracking-widest">
                Something went wrong. Please try again.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
