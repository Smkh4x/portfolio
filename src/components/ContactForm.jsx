import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || "service_z90efos";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_u479ttt";
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "d8Iy8Ag5qQxDFhc3R";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          formRef.current?.reset();

          // Clear success message after 6 seconds
          setTimeout(() => setSubmitStatus(null), 6000);
        },
        (error) => {
          console.error('Email send failed:', error?.text || error);
          setIsSubmitting(false);
          setSubmitStatus('error');
        }
      );
  };

  return (
    <form ref={formRef} id="contact-form" onSubmit={handleSubmit} className="space-y-4">
      {/* Success alert */}
      {submitStatus === 'success' && (
        <div className="p-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm flex items-start gap-3">
          <span className="material-symbols-outlined text-emerald-400 text-lg mt-0.5">check_circle</span>
          <div>
            <p className="font-medium text-emerald-200">Message sent successfully!</p>
            <p className="text-xs text-emerald-300/80 mt-0.5">Thank you for reaching out. I will get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      {/* Form fields */}
      {submitStatus !== 'success' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="user_name" className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                Name
              </label>
              <input
                id="user_name"
                type="text"
                name="user_name"
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full bg-[#141414] border border-white/10 rounded-md px-3.5 py-2.5 text-[14px] text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="user_email" className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                Email
              </label>
              <input
                id="user_email"
                type="email"
                name="user_email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                className="w-full bg-[#141414] border border-white/10 rounded-md px-3.5 py-2.5 text-[14px] text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              autoComplete="off"
              placeholder="Tell me about your project, idea, or inquiry…"
              className="w-full bg-[#141414] border border-white/10 rounded-md px-3.5 py-2.5 text-[14px] text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors resize-y min-h-[110px]"
            />
          </div>

          {/* Error alert */}
          {submitStatus === 'error' && (
            <div className="p-3 rounded-md border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-400 text-base">error</span>
              <span>Failed to send. Please try again or email directly at <a href="mailto:youssef.dev.sec@gmail.com" className="underline font-medium">youssef.dev.sec@gmail.com</a>.</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[#1a1a1a] font-medium text-[13px] rounded-md transition-all hover:bg-white/90 active:scale-[0.99] ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <span className="text-xs">→</span>
                </>
              )}
            </button>
            <span className="text-[12px] text-white/40 hidden sm:inline">
              Usually responds within 24h
            </span>
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
