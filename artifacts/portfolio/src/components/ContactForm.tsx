import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
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
    setFormState("loading");
    try {
      const res = await fetch("https://api.sajiali.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 py-4 text-lg md:text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors";

  return (
    <div className="mt-24 lg:mt-32 border-t border-white/10 pt-20">
      <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground mb-12">
        Send a Message
      </p>

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

      <button
        onClick={handleSubmit}
        disabled={formState === "loading" || formState === "success"}
        className="group flex items-center gap-4 text-sm uppercase tracking-[0.4em] border-b border-white pb-2 hover:gap-8 transition-all disabled:opacity-50"
      >
        {formState === "loading" && "Sending..."}
        {formState === "success" && "Message Sent ✓"}
        {formState === "error" && "Try Again →"}
        {formState === "idle" && "Send Message →"}
      </button>

      {formState === "error" && (
        <p className="mt-4 text-sm text-red-400 uppercase tracking-widest">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}