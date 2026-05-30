import ContactForm from '../components/ContactForm';

export const PREVIEW_CONTENT = {
  // ... (keep Home, About, Projects untouched)
  'Home.jsx': (
    <>
      {/* Profile Layout */}
      <div className="flex flex-col items-center md:items-start gap-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-primary blur-lg opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img
            alt="Developer Portrait"
            className="relative w-48 h-48 rounded-xl object-cover grayscale contrast-125 border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq-rs9Zh9qlo1HRoT6To3kVxaChRu7inLJQaaxJoOiVRbYpX8xJ0MD_saksxOOupNJ5ebvX_3R37lBVFlfPTvVILJP527rMZBd7BJ7UNeGDYJU8im-ZUjTRWRZxPjIndAosUh80j9M16phIonJ_VX_aWdYP0UEiR-BSvZV8RdODRxENIOSK5iuFE-GRKzqlxCU31nIUWmaE8DMKTmKEDulc_8BjApBV6ftthVkjOr864Nu8yK6Y07ySdFAe12PnCNCj2epfeYg_qE"
          />
        </div>
        <div className="text-center md:text-left space-y-4">
          <h1 className="font-headline-lg text-headline-lg text-primary">Hi, I'm Youssef Al mona.</h1>
          <p className="text-on-surface-variant font-editor-code text-lg leading-relaxed">
            A full-stack developer dedicated to crafting <span className="text-on-surface font-bold">pixel-perfect</span> codebases and <span className="text-on-surface font-bold">highly performant</span> user interfaces.
          </p>
        </div>
      </div>
      {/* Bio & Skills */}
      <div className="grid grid-cols-1 gap-4">
        <div className="p-6 bg-surface-container border border-outline-variant rounded-lg hover:border-primary transition-colors">
          <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">terminal</span>Core Philosophy
          </h3>
          <p className="text-on-surface-variant text-sm">Clean architecture isn't just a preference; it's a requirement for sustainable growth and maintenance.</p>
        </div>
        <div className="p-6 bg-surface-container border border-outline-variant rounded-lg hover:border-primary transition-colors">
          <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">code</span>Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'Tailwind'].map(t => (
              <span key={t} className="px-2 py-0.5 bg-surface-variant rounded text-[11px] text-on-surface">{t}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Social Buttons */}
      <div className="flex flex-wrap gap-4 pt-4">
        <a
          className="flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container rounded font-bold hover:brightness-110 hover:scale-105 active:scale-95 transition-all"
          href="https://github.com/Smkh4x"
          target="_blank"
          rel="noopener noreferrer"
          title="View GitHub"
        >
          <span className="material-symbols-outlined">rocket_launch</span>View My GitHub
        </a>
        <a
          className="flex items-center gap-2 px-6 py-3 bg-surface-container-highest border border-outline-variant rounded font-bold hover:bg-surface-variant hover:border-primary hover:text-primary hover:scale-105 active:scale-95 transition-all"
          href="https://www.linkedin.com/in/dev-u553f/"
          target="_blank"
          rel="noopener noreferrer"
          title="Open LinkedIn"
        >
          <span className="material-symbols-outlined">person_add</span>LinkedIn Profile
        </a>
      </div>
    </>
  ),

  'About.jsx': (
    <>
      {/* Story */}
      <section className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6 flex items-center gap-4">
          <span className="text-on-surface-variant font-normal opacity-50">#</span> My Story
        </h2>
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <div className="w-24 h-24 rounded-lg bg-surface-container-highest border border-outline-variant overflow-hidden shrink-0">
            <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvojsGM1AbHd1RpiKgZN-ni95G4A2U94ABfnXFB8tvYu2HHgwd5L1cTtQjuwUAxActcrCGTKkxp1D-UTbpIAzclR4fpmJE0ieRqLMwwc2nXl2LVD_t9cCm__4Low6v6965o222BE3wawlVzDt2lqMPi_dOKbSTAzBp7mw5N8RG4e705BoYLHpCgWmfNOUx4FZiSZOXR_AsYAm06ytOegxTDDZlJWR42ky7guLkNLrgmgqarzHq9uO-LKECtjj-ZQMUAf4MD9tcv-8" />
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            I am a <span className="text-primary">Full-Stack Engineer</span> dedicated to bridging the gap between elegant design and high-performance code. With a background in complex system architecture and a love for minimalist UIs, I build tools that empower developers and delight end-users.
          </p>
        </div>
      </section>
      {/* Experience */}
      <section className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8 flex items-center gap-4">
          <span className="text-on-surface-variant font-normal opacity-50">#</span> Experience
        </h2>
        <div className="space-y-0 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant">
          <div className="pl-10 relative mb-10 group">
            <div className="absolute left-0 top-1 w-6 h-6 bg-surface border-2 border-primary rounded-full z-10 group-hover:scale-125 transition-transform"></div>
            <div className="bg-surface-container-highest/30 p-5 rounded-lg border border-outline-variant/30 hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-on-surface">Senior Web Developer</h3>
                <span className="text-[12px] bg-primary-container px-2 py-0.5 rounded text-on-primary-container whitespace-nowrap">2021 — Present</span>
              </div>
              <p className="text-primary text-[13px] mb-2">TechCorp Solutions</p>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">Lead the frontend migration to React 18, improving initial load times by 40%.</p>
            </div>
          </div>
          <div className="pl-10 relative mb-10 group">
            <div className="absolute left-0 top-1 w-6 h-6 bg-surface border-2 border-outline-variant rounded-full z-10 group-hover:scale-125 transition-transform group-hover:border-primary"></div>
            <div className="bg-surface-container-highest/30 p-5 rounded-lg border border-outline-variant/30 hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-on-surface">Software Engineer</h3>
                <span className="text-[12px] bg-secondary-container px-2 py-0.5 rounded text-on-secondary-container whitespace-nowrap">2018 — 2021</span>
              </div>
              <p className="text-primary text-[13px] mb-2">CloudScale Systems</p>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">Optimized backend microservices using Node.js and AWS Lambda.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Education */}
      <section className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8 flex items-center gap-4">
          <span className="text-on-surface-variant font-normal opacity-50">#</span> Education
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5 bg-surface-container-low border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-primary mb-3">school</span>
            <h3 className="font-bold text-on-surface">B.Sc. Computer Science</h3>
            <p className="text-[13px] text-on-surface-variant">University of Technology</p>
            <p className="text-[12px] text-outline mt-2">Class of 2018</p>
          </div>
          <div className="p-5 bg-surface-container-low border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-primary mb-3">workspace_premium</span>
            <h3 className="font-bold text-on-surface">AWS Architect Associate</h3>
            <p className="text-[13px] text-on-surface-variant">Amazon Web Services</p>
            <p className="text-[12px] text-outline mt-2">Certified 2022</p>
          </div>
        </div>
      </section>
    </>
  ),

  'Projects.jsx': (
    <>
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Featured Projects</h1>
        <div className="h-1 w-12 bg-primary-container"></div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {/* Project Card 1 */}
        <div className="group bg-surface-container border border-outline-variant hover:border-primary transition-all duration-300 rounded-lg overflow-hidden flex flex-col">
          <div className="relative aspect-video overflow-hidden">
            <img alt="Neural-Net Dashboard" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjynLHuLu0Kgq5A4X3e61YuwMhs_kAtnhxx3bdnnlSP231Zcia6YjJNuUK0WrssDL5r2NtPmY3u5iIcA_ALH8xPFXy2Jf5xkbxUfyoT4Sqsh2bqTojaZSj2C4ocbaZooADsBqJZ31RcQXzVBhbGAEr9JTH8IaDDkriC22LguCEZplGdrRHwe1cCXr2JovmY9qEaTkEPx6xVX2rHHtAIOn6gg32mT_6Gr3zUgjAOJb16zT7eEom6J2-OFKUh8jTMMyIecviLbLpTAs" />
            <div className="absolute inset-0 bg-primary-container/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-on-surface">Neural-Net Dashboard</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-container text-white uppercase font-bold">V2.4</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">Advanced visualization engine for real-time neural network training data.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['REACT', 'THREEJS', 'D3.JS'].map(t => <span key={t} className="text-[10px] border border-outline-variant px-2 py-1 text-on-surface-variant">{t}</span>)}
            </div>
            <div className="mt-auto flex gap-3">
              <button className="flex-1 bg-primary-container hover:bg-primary-container/80 text-white py-2 px-4 text-xs rounded transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">bolt</span>LIVE DEMO
              </button>
              <button className="flex-1 border border-outline-variant hover:bg-surface-variant text-on-surface py-2 px-4 text-xs rounded transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">code</span>GITHUB
              </button>
            </div>
          </div>
        </div>
        {/* Project Card 2 */}
        <div className="group bg-surface-container border border-outline-variant hover:border-primary transition-all duration-300 rounded-lg overflow-hidden flex flex-col">
          <div className="relative aspect-video overflow-hidden">
            <img alt="CloudScale" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsJWhsuJt8hrqJUcB6qL6vNR8mTWEDstqiAXP4A1vP8lWKClEREdnDbMvsE6NXGYp1HSbrLd7mSnxWdnS1cXrud7afFsSJh2Iguot4vMyLZVG-MTtRboJgLl6ouL3UVEfc1dNtHP7tMzHPVCK-vSnhvDvi2J1u3gEN9DMJn1oQNSNi0niW589C375uhLFbdsop0lvVbVfN83oQw7j-1A_n-qh63uOu-kvMNweIcRgKbzrRjQ5NB2NBIi5M2mtHakp_R6dCs4AqYD4" />
            <div className="absolute inset-0 bg-primary-container/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-on-surface">CloudScale Optimizer</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-container text-white uppercase font-bold">BETA</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">High-performance Go backend for dynamic cloud resource allocation.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['GOLANG', 'NEXT.JS', 'AWS'].map(t => <span key={t} className="text-[10px] border border-outline-variant px-2 py-1 text-on-surface-variant">{t}</span>)}
            </div>
            <div className="mt-auto flex gap-3">
              <button className="flex-1 bg-primary-container hover:bg-primary-container/80 text-white py-2 px-4 text-xs rounded transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">bolt</span>LIVE DEMO
              </button>
              <button className="flex-1 border border-outline-variant hover:bg-surface-variant text-on-surface py-2 px-4 text-xs rounded transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">code</span>GITHUB
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ),

  'Contact.jsx': <ContactForm />,
};
