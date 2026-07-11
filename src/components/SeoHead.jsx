import { useEffect } from 'react';

const baseUrl = 'https://almona.online';
const defaultTitle = 'Youssef Al Mona | Full-Stack Developer Portfolio';
const defaultDescription = 'Youssef Al Mona is a full-stack developer building modern web experiences with React, Node.js, and polished UI systems.';
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
    const pageTitle = title.includes('Youssef') ? title : `${title} | Youssef Al Mona`;

    document.title = pageTitle;
    document.documentElement.lang = 'en';

    ensureLink('canonical', canonicalUrl);
    ensureLink('icon', '/favicon.ico', { type: 'image/x-icon' });
    ensureLink('shortcut icon', '/favicon.ico');
    ensureLink('apple-touch-icon', '/apple-touch-icon.png');
    ensureLink('manifest', '/manifest.webmanifest');

    setMetaTag('meta', { name: 'description' }, description);
    setMetaTag('meta', { name: 'author' }, 'Youssef Al Mona');
    setMetaTag('meta', { name: 'robots' }, 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaTag('meta', { name: 'theme-color' }, '#0050cb');
    setMetaTag('meta', { name: 'color-scheme' }, 'light');
    setMetaTag('meta', { name: 'keywords' }, 'Youssef Al Mona, full-stack developer, React developer, Node.js developer, portfolio, Morocco developer');

    setMetaTag('meta', { property: 'og:title' }, pageTitle);
    setMetaTag('meta', { property: 'og:description' }, description);
    setMetaTag('meta', { property: 'og:type' }, 'website');
    setMetaTag('meta', { property: 'og:url' }, canonicalUrl);
    setMetaTag('meta', { property: 'og:site_name' }, 'Youssef Al Mona');
    setMetaTag('meta', { property: 'og:image' }, image);
    setMetaTag('meta', { property: 'og:image:alt' }, 'Youssef Al Mona portfolio preview');
    setMetaTag('meta', { property: 'og:locale' }, 'en_US');

    setMetaTag('meta', { name: 'twitter:card' }, 'summary_large_image');
    setMetaTag('meta', { name: 'twitter:title' }, pageTitle);
    setMetaTag('meta', { name: 'twitter:description' }, description);
    setMetaTag('meta', { name: 'twitter:url' }, canonicalUrl);
    setMetaTag('meta', { name: 'twitter:image' }, image);
    setMetaTag('meta', { name: 'twitter:image:alt' }, 'Youssef Al Mona portfolio preview');

    ensureJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://almona.online/#person',
          name: 'Youssef Al Mona',
          jobTitle: 'Full-Stack Developer',
          url: 'https://almona.online',
          sameAs: ['https://github.com/Smkh4x', 'https://www.linkedin.com/in/youssef-almona'],
          description: description,
          knowsAbout: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Full-stack development'],
        },
        {
          '@type': 'Organization',
          '@id': 'https://almona.online/#organization',
          name: 'Youssef Al Mona',
          url: 'https://almona.online',
          sameAs: ['https://github.com/Smkh4x', 'https://www.linkedin.com/in/youssef-almona'],
          logo: 'https://almona.online/android-chrome-512x512.png',
        },
        {
          '@type': 'WebSite',
          '@id': 'https://almona.online/#website',
          name: 'Youssef Al Mona Portfolio',
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
            { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://almona.online/#work' },
            { '@type': 'ListItem', position: 3, name: 'Contact', item: 'https://almona.online/#contact' },
          ],
        },
        {
          '@type': 'CreativeWork',
          '@id': 'https://almona.online/#portfolio',
          name: 'Youssef Al Mona Portfolio',
          creator: { '@id': 'https://almona.online/#person' },
          description,
          genre: 'Developer Portfolio',
          about: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
          image: 'https://almona.online/android-chrome-512x512.png'
        },
        {
          '@type': 'Project',
          name: 'Omni Dashboard',
          description: 'A real-time financial tracking platform with automated reporting and custom data hooks.',
          url: 'https://almona.online/#work',
          creator: { '@id': 'https://almona.online/#person' },
          keywords: ['React', 'TypeScript', 'Node.js'],
        },
        {
          '@type': 'Project',
          name: 'Apex Commerce',
          description: 'High-performance headless e-commerce storefront with atomic design architecture.',
          url: 'https://almona.online/#work',
          creator: { '@id': 'https://almona.online/#person' },
          keywords: ['Next.js', 'PostgreSQL', 'Tailwind'],
        },
      ],
    });
  }, [description, image, path, title]);

  return null;
}
