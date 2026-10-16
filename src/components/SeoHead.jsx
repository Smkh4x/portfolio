import { useEffect } from 'react';

const baseUrl = 'https://almona.online';
const defaultTitle = 'Youssef Almona | Full Stack & Mobile Developer';
const defaultDescription = 'Youssef Almona is a Full Stack and Mobile Developer skilled in React Native, React, Node.js, and modern AI tooling.';
const defaultImage = `${baseUrl}/android-chrome-512x512.png`;

function setMetaTag(tagName, attributes, value) {
  const [[attrName, attrValue]] = Object.entries(attributes);
  const selector = `${tagName}[${attrName}="${attrValue}"]`;
  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement(tagName);
    document.head.appendChild(tag);
  }

  for (const [key, attr] of Object.entries(attributes)) {
    tag.setAttribute(key, attr);
  }

  if (value !== undefined) {
    tag.setAttribute('content', value);
  }
}

function ensureLink(rel, href, extra = {}) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    document.head.appendChild(link);
  }

  link.setAttribute('rel', rel);
  link.setAttribute('href', href);

  Object.entries(extra).forEach(([key, value]) => link.setAttribute(key, value));
}

function ensureJsonLd(json) {
  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(json);
}

export default function SeoHead({ title = defaultTitle, description = defaultDescription, path = '/', image = defaultImage }) {
  useEffect(() => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${baseUrl}${normalizedPath}`;
    const pageTitle = title.includes('Youssef') ? title : `${title} | Youssef Almona`;

    document.title = pageTitle;
    document.documentElement.lang = 'en';

    ensureLink('canonical', canonicalUrl);
    ensureLink('icon', '/favicon.ico', { type: 'image/x-icon' });
    ensureLink('shortcut icon', '/favicon.ico');
    ensureLink('apple-touch-icon', '/apple-touch-icon.png');
    ensureLink('manifest', '/manifest.webmanifest');

    setMetaTag('meta', { name: 'description' }, description);
    setMetaTag('meta', { name: 'author' }, 'Youssef Almona');
    setMetaTag('meta', { name: 'robots' }, 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaTag('meta', { name: 'theme-color' }, '#1a1a1a');
    setMetaTag('meta', { name: 'color-scheme' }, 'dark');
    setMetaTag('meta', { name: 'keywords' }, 'Youssef Almona, Almona, full stack developer, react native, react, node.js, portfolio, morocco developer');

    setMetaTag('meta', { property: 'og:title' }, pageTitle);
    setMetaTag('meta', { property: 'og:description' }, description);
    setMetaTag('meta', { property: 'og:type' }, 'website');
    setMetaTag('meta', { property: 'og:url' }, canonicalUrl);
    setMetaTag('meta', { property: 'og:site_name' }, 'Youssef Almona');
    setMetaTag('meta', { property: 'og:image' }, image);
    setMetaTag('meta', { property: 'og:image:alt' }, 'Youssef Almona Portfolio');
    setMetaTag('meta', { property: 'og:locale' }, 'en_US');

    setMetaTag('meta', { name: 'twitter:card' }, 'summary_large_image');
    setMetaTag('meta', { name: 'twitter:title' }, pageTitle);
    setMetaTag('meta', { name: 'twitter:description' }, description);
    setMetaTag('meta', { name: 'twitter:url' }, canonicalUrl);
    setMetaTag('meta', { name: 'twitter:image' }, image);
    setMetaTag('meta', { name: 'twitter:image:alt' }, 'Youssef Almona Portfolio');

    ensureJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://almona.online/#person',
          name: 'Youssef Almona',
          jobTitle: 'Full Stack & Mobile Developer',
          url: 'https://almona.online',
          sameAs: ['https://github.com/Smkh4x', 'https://www.linkedin.com/in/youssef-almona'],
          description: description,
          knowsAbout: ['React Native', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Full-stack development'],
        },
        {
          '@type': 'Organization',
          '@id': 'https://almona.online/#organization',
          name: 'Youssef Almona',
          url: 'https://almona.online',
          sameAs: ['https://github.com/Smkh4x', 'https://www.linkedin.com/in/youssef-almona'],
          logo: 'https://almona.online/android-chrome-512x512.png',
        },
        {
          '@type': 'WebSite',
          '@id': 'https://almona.online/#website',
          name: 'Youssef Almona Portfolio',
          url: 'https://almona.online',
          publisher: { '@id': 'https://almona.online/#organization' },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://almona.online/#contact',
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'WebPage',
          '@id': 'https://almona.online/#webpage',
          url: canonicalUrl,
          name: pageTitle,
          isPartOf: { '@id': 'https://almona.online/#website' },
          about: { '@id': 'https://almona.online/#person' },
          description,
          inLanguage: 'en-US',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://almona.online/' },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://almona.online/#projects' },
            { '@type': 'ListItem', position: 3, name: 'Experience', item: 'https://almona.online/#experience' },
            { '@type': 'ListItem', position: 4, name: 'Contact', item: 'https://almona.online/#contact' },
          ],
        },
        {
          '@type': 'CreativeWork',
          '@id': 'https://almona.online/#portfolio',
          name: 'Youssef Almona Portfolio',
          creator: { '@id': 'https://almona.online/#person' },
          description,
          genre: 'Developer Portfolio',
          about: ['React Native', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
          image: 'https://almona.online/android-chrome-512x512.png'
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Meetiva',
          applicationCategory: 'CommunicationApplication',
          description: 'Interest-based video matching mobile application built with React Native and Expo.',
          url: 'https://github.com/Smkh4x/Meetiva',
          creator: { '@id': 'https://almona.online/#person' },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Management Dashboard',
          applicationCategory: 'BusinessApplication',
          description: 'Modern administrative dashboard for resource management and real-time analytics.',
          url: 'https://github.com/Smkh4x/Management-Dashboard',
          creator: { '@id': 'https://almona.online/#person' },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Quiz Mind',
          applicationCategory: 'EducationalApplication',
          description: 'Interactive knowledge assessment platform built with React and modern UI.',
          url: 'https://github.com/Smkh4x/Quiz-Mind',
          creator: { '@id': 'https://almona.online/#person' },
        },
      ],
    });
  }, [description, image, path, title]);

  return null;
}
