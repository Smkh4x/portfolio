# Portfolio SEO Implementation

This project is a React + Vite portfolio for Youssef Al Mona. The site now includes production-ready SEO and accessibility improvements while preserving the existing UI and interaction patterns.

## SEO Features Implemented

- Unique page title and meta description
- Canonical URL support
- Open Graph and Twitter metadata
- Web app manifest support
- Favicon and touch icon support
- Robots.txt configuration for public indexing
- Sitemap.xml for search engine discovery
- Structured data (JSON-LD) for Person, Organization, WebSite, WebPage, BreadcrumbList, and CreativeWork
- Semantic landmarks and improved navigation accessibility
- Stronger form labels and accessible controls
- Preconnect and resource preloading for faster rendering
- Lazy loading support for non-critical UI modules

## Why These Features Matter

These changes help search engines understand the site, improve social previews, and increase trustworthiness for crawlers and users. They also improve accessibility and perceived performance for visitors.

## Files Modified

- [index.html](index.html)
- [src/App.jsx](src/App.jsx)
- [src/components/ContactForm.jsx](src/components/ContactForm.jsx)
- [src/components/SeoHead.jsx](src/components/SeoHead.jsx)
- [public/robots.txt](public/robots.txt)
- [public/sitemap.xml](public/sitemap.xml)
- [public/manifest.webmanifest](public/manifest.webmanifest)

## How to Update Metadata

Update the values in [src/components/SeoHead.jsx](src/components/SeoHead.jsx) for:

- title
- description
- image
- path
- social profile links

The component manages the document title, canonical URL, Open Graph metadata, Twitter cards, and JSON-LD automatically.

## How to Update Sitemap

Edit [public/sitemap.xml](public/sitemap.xml) and add or update the URLs that should be discoverable by search engines.

## How to Update Robots.txt

Edit [public/robots.txt](public/robots.txt) when:

- new private or admin-only routes are added
- the site is deployed under a new domain
- crawl behavior needs to be narrowed or widened

## Structured Data

The JSON-LD created in [src/components/SeoHead.jsx](src/components/SeoHead.jsx) is generated for the homepage and helps search engines understand the portfolio as a Person, Organization, and WebPage.

## Performance Optimizations

- Preconnect and preload for font resources
- Lazy-loaded contact form and floating background UI
- Optimized image loading with explicit decoding and eager loading for the hero image

## Accessibility Improvements

- Skip link to main content
- Better heading structure preserved from the existing design
- Improved form labels and input associations
- More descriptive button and navigation labels

## Future SEO Recommendations

- Add dedicated project detail pages for each project if you want deeper indexing
- Publish fresh content regularly through a blog or case studies section
- Submit the sitemap to Google Search Console and Bing Webmaster Tools
- Monitor Core Web Vitals and search performance after deployment
