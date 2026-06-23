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
    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || "service_z90efos";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_u479ttt";
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "d8Iy8Ag5qQxDFhc3R";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          formRef.current.reset();

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
    <form ref={formRef} id="contact-form" onSubmit={handleSubmit}
      className="flex flex-col gap-stack-md">

      {/* Success message — matches update.html #success-msg */}
      {submitStatus === 'success' && (
        <div className="text-center py-8">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 36 }}>check_circle</span>
          <p className="font-headline-lg text-headline-lg text-on-surface mt-2" style={{ fontSize: 20 }}>Message sent!</p>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">I'll get back to you soon.</p>
        </div>
      )}

      {/* Form fields — hidden on success, matching update.html #form-fields */}
      {submitStatus !== 'success' && (
        <div>
          {/* Name + Email grid (side-by-side on sm+) — matches update.html layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Name</label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="Your name"
                className="form-input"
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Email</label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="your@email.com"
                className="form-input"
              />
            </div>
          </div>

          <div className="mt-stack-md">
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project…"
              className="form-input"
            />
          </div>

          {/* Error message */}
          {submitStatus === 'error' && (
            <div className="font-body-md text-body-md text-error flex items-center gap-2 mt-2">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>error</span>
              Failed to send. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-stack-md w-full flex items-center justify-center gap-2 px-8 py-4 bg-on-surface text-on-primary font-label-md text-label-md transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary'}`}
          >
            {isSubmitting
              ? <><span className="material-symbols-outlined animate-spin" style={{ fontSize: 18 }}>progress_activity</span> Sending…</>
              : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span> Send Message</>
            }
          </button>
        </div>
      )}

    </form>
  );
};

export default ContactForm;
