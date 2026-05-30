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

    // IMPORTANT: Replace these placeholders with your actual EmailJS credentials
    // You must configure a template in EmailJS to send to: youssef.dev.sec@gmail.com
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_z90efos";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_u479ttt";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "d8Iy8Ag5qQxDFhc3R";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          formRef.current.reset(); // Reset form fields

          // Clear success message after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          console.error('FAILED...', error.text);
          setIsSubmitting(false);
          setSubmitStatus('error');
        }
      );
  };

  return (
    <>
      <h2 className="font-headline-lg text-headline-lg text-primary mb-8 flex items-center gap-4">
        <span className="text-on-surface-variant font-normal opacity-50">#</span> Get In Touch
      </h2>

      {/* Form Section */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative">

        {/* Success Overlay Animation */}
        {submitStatus === 'success' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-container/80 backdrop-blur-sm rounded-lg animate-in fade-in duration-500">
            <div className="flex flex-col items-center p-6 bg-surface border border-primary rounded-lg text-primary animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 shadow-2xl shadow-primary/20">
              <span className="material-symbols-outlined text-[48px] mb-2 text-primary">check_circle</span>
              <h3 className="font-bold text-lg text-on-surface">Message Sent!</h3>
              <p className="text-on-surface-variant text-sm mt-1">I'll get back to you soon.</p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-on-surface-variant text-[12px] uppercase tracking-wider mb-2">Name</label>
          <input
            required
            name="user_name"
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface font-editor-code text-[14px] focus:border-primary focus:outline-none transition-colors"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-on-surface-variant text-[12px] uppercase tracking-wider mb-2">Email</label>
          <input
            required
            name="user_email"
            type="email"
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface font-editor-code text-[14px] focus:border-primary focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-on-surface-variant text-[12px] uppercase tracking-wider mb-2">Message</label>
          <textarea
            required
            name="message"
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface font-editor-code text-[14px] focus:border-primary focus:outline-none transition-colors h-32 resize-none"
            placeholder="Tell me about your project..."
          ></textarea>
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="text-error flex items-center gap-2 text-sm bg-error-container/20 p-3 rounded border border-error/50">
            <span className="material-symbols-outlined text-[16px]">error</span>
            error hh
            {/*Failed to send message. Please check your EmailJS configuration.*/}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container rounded font-bold transition-all w-full md:w-auto justify-center
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 active:scale-95'}`}
        >
          {isSubmitting ? (
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined">send</span>
          )}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Info Panel */}
      <div className="mt-12 p-6 bg-surface-container border border-outline-variant rounded-lg">
        <h3 className="text-primary font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">link</span>Other Ways to Connect
        </h3>
        <div className="space-y-3 text-on-surface-variant text-sm">
          <div className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px]">mail</span>youssef.dev.sec@gmail.com</div>
          <div className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px]">location_on</span>San Francisco, CA</div>
          <div className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px]">schedule</span>Available for freelance</div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
