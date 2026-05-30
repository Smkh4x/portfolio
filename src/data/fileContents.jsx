import React from 'react';

export const FILE_META = {
  'Home.jsx': { icon: 'javascript', color: 'text-[#9fcaff]' },
  'About.jsx': { icon: 'javascript', color: 'text-[#ce9178]' },
  'Projects.jsx': { icon: 'description', color: 'text-primary' },
  'Contact.jsx': { icon: 'javascript', color: 'text-[#9fcaff]' },
};

export const CODE_CONTENT = {
  'Home.jsx': (
    <>
      <span className="syntax-keyword">import</span> React <span className="syntax-keyword">from</span> <span className="syntax-string">'react'</span>;{'\n'}
      <span className="syntax-keyword">import</span> {'{ Github, Linkedin }'} <span className="syntax-keyword">from</span> <span className="syntax-string">'./socials'</span>;{'\n\n'}
      <span className="syntax-keyword">const</span> <span className="syntax-function">Home</span> = () <span className="syntax-keyword">=&gt;</span> {'{'}{'\n'}
      {'  '}<span className="syntax-keyword">return</span> {'('}{'\n'}
      {'    '}<span className="syntax-tag">&lt;div</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"container"</span><span className="syntax-tag">&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;h1&gt;</span>Hi, I'm Youssef Al Mona<span className="syntax-tag">&lt;/h1&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;p&gt;</span>{'\n'}
      {'        '}Full-stack developer focused on building{'\n'}
      {'        '}scalable applications with React and Node.{'\n'}
      {'      '}<span className="syntax-tag">&lt;/p&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;div</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"actions"</span><span className="syntax-tag">&gt;</span>{'\n'}
      {'        '}<span className="syntax-tag">&lt;GithubButton</span> <span className="syntax-tag">/&gt;</span>{'\n'}
      {'        '}<span className="syntax-tag">&lt;LinkedinButton</span> <span className="syntax-tag">/&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;/div&gt;</span>{'\n'}
      {'    '}<span className="syntax-tag">&lt;/div&gt;</span>{'\n'}
      {'  '});{'\n'}
      {'}'};{'\n\n'}
      <span className="syntax-keyword">export default</span> Home;
    </>
  ),
  'About.jsx': (
    <>
      <span className="syntax-keyword">import</span> React <span className="syntax-keyword">from</span> <span className="syntax-string">'react'</span>;{'\n'}
      <span className="syntax-keyword">import</span> {'{ Section }'} <span className="syntax-keyword">from</span> <span className="syntax-string">'./Layout'</span>;{'\n\n'}
      <span className="syntax-keyword">const</span> <span className="syntax-function">About</span> = () =&gt; {'{'}{'\n'}
      {'  '}<span className="syntax-keyword">return</span> {'('}{'\n'}
      {'    '}<span className="syntax-tag">&lt;div</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"about-container"</span><span className="syntax-tag">&gt;</span>{'\n'}
      {'      '}<span className="syntax-comment">{'// My professional journey'}</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;Section</span> <span className="syntax-attr">title</span>=<span className="syntax-string">"Story"</span><span className="syntax-tag">&gt;</span>{'\n'}
      {'        '}<span className="syntax-tag">&lt;p&gt;</span>Passionate developer building...<span className="syntax-tag">&lt;/p&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;/Section&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;Section</span> <span className="syntax-attr">title</span>=<span className="syntax-string">"Experience"</span><span className="syntax-tag">&gt;</span>{'\n'}
      {'        '}<span className="syntax-tag">&lt;Timeline</span> <span className="syntax-attr">items</span>={'{experienceData}'} <span className="syntax-tag">/&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;/Section&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;Section</span> <span className="syntax-attr">title</span>=<span className="syntax-string">"Education"</span><span className="syntax-tag">&gt;</span>{'\n'}
      {'        '}<span className="syntax-tag">&lt;EducationGrid</span> <span className="syntax-tag">/&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;/Section&gt;</span>{'\n'}
      {'    '}<span className="syntax-tag">&lt;/div&gt;</span>{'\n'}
      {'  '});{'\n'}
      {'}'};{'\n\n'}
      <span className="syntax-keyword">export default</span> About;
    </>
  ),
  'Projects.jsx': (
    <>
      <span className="syntax-keyword">import</span> React <span className="syntax-keyword">from</span> <span className="syntax-string">'react'</span>;{'\n\n'}
      <span className="syntax-keyword">const</span> <span className="syntax-function">Projects</span> = () =&gt; {'{'}{'\n'}
      {'  '}<span className="syntax-keyword">const</span> <span className="syntax-attr">projectData</span> = [{'\n'}
      {'    '}{'{'}{'\n'}
      {'      '}id: <span className="syntax-string">1</span>,{'\n'}
      {'      '}name: <span className="syntax-string">"Neural-Net Dashboard"</span>,{'\n'}
      {'      '}tech: [<span className="syntax-string">"React"</span>, <span className="syntax-string">"ThreeJS"</span>],{'\n'}
      {'      '}active: <span className="syntax-keyword">true</span>{'\n'}
      {'    '}{'},'}{'\n'}
      {'    '}{'{'}{'\n'}
      {'      '}id: <span className="syntax-string">2</span>,{'\n'}
      {'      '}name: <span className="syntax-string">"CloudScale Optimizer"</span>,{'\n'}
      {'      '}tech: [<span className="syntax-string">"Go"</span>, <span className="syntax-string">"Next.js"</span>],{'\n'}
      {'      '}active: <span className="syntax-keyword">true</span>{'\n'}
      {'    '}{'}'}{'\n'}
      {'  '}];{'\n\n'}
      {'  '}<span className="syntax-keyword">return</span> {'('}{'\n'}
      {'    '}<span className="syntax-tag">&lt;div</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"project-grid"</span><span className="syntax-tag">&gt;</span>{'\n'}
      {'      '}{'{'}projectData.<span className="syntax-function">map</span>(project =&gt; ({'\n'}
      {'        '}<span className="syntax-tag">&lt;ProjectCard</span>{'\n'}
      {'          '}<span className="syntax-attr">key</span>={'{project.id}'}{'\n'}
      {'          '}<span className="syntax-attr">data</span>={'{project}'}{'\n'}
      {'        '}<span className="syntax-tag">/&gt;</span>{'\n'}
      {'      '})){'}'}{'}'}{'\n'}
      {'    '}<span className="syntax-tag">&lt;/div&gt;</span>{'\n'}
      {'  '});{'\n'}
      {'}'};
    </>
  ),
  'Contact.jsx': (
    <>
      <span className="syntax-keyword">import</span> React, {'{ useState }'} <span className="syntax-keyword">from</span> <span className="syntax-string">'react'</span>;{'\n\n'}
      <span className="syntax-keyword">const</span> <span className="syntax-function">Contact</span> = () =&gt; {'{'}{'\n'}
      {'  '}<span className="syntax-keyword">const</span> [<span className="syntax-attr">formData</span>, <span className="syntax-function">setFormData</span>] = <span className="syntax-function">useState</span>({'{'}{'}'});{'\n\n'}
      {'  '}<span className="syntax-keyword">const</span> <span className="syntax-function">handleSubmit</span> = (<span className="syntax-attr">e</span>) =&gt; {'{'}{'\n'}
      {'    '}e.<span className="syntax-function">preventDefault</span>();{'\n'}
      {'    '}<span className="syntax-comment">{'// Send form data'}</span>{'\n'}
      {'    '}<span className="syntax-function">console.log</span>(formData);{'\n'}
      {'  '}{'}'};{'\n\n'}
      {'  '}<span className="syntax-keyword">return</span> {'('}{'\n'}
      {'    '}<span className="syntax-tag">&lt;form</span> <span className="syntax-attr">onSubmit</span>={'{handleSubmit}'}<span className="syntax-tag">&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;Input</span> <span className="syntax-attr">label</span>=<span className="syntax-string">"Name"</span> <span className="syntax-tag">/&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;Input</span> <span className="syntax-attr">label</span>=<span className="syntax-string">"Email"</span> <span className="syntax-tag">/&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;TextArea</span> <span className="syntax-attr">label</span>=<span className="syntax-string">"Message"</span> <span className="syntax-tag">/&gt;</span>{'\n'}
      {'      '}<span className="syntax-tag">&lt;Button</span> <span className="syntax-attr">type</span>=<span className="syntax-string">"submit"</span><span className="syntax-tag">&gt;</span>Send<span className="syntax-tag">&lt;/Button&gt;</span>{'\n'}
      {'    '}<span className="syntax-tag">&lt;/form&gt;</span>{'\n'}
      {'  '});{'\n'}
      {'}'};{'\n\n'}
      <span className="syntax-keyword">export default</span> Contact;
    </>
  ),
};

export const CODE_LINE_COUNTS = {
  'Home.jsx': 20,
  'About.jsx': 22,
  'Projects.jsx': 28,
  'Contact.jsx': 22,
};
