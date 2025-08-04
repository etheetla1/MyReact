import { useEffect } from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  structuredData 
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://knowelist.com';
  const defaultImage = 'https://d2f1f8uiawofsx.cloudfront.net/images/elishaTheetlaProfile.png';
  
  const fullTitle = title ? `${title} | Elisha Theetla` : 'Elisha Theetla - Cloud-Native Full Stack Developer';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const metaImage = image || defaultImage;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Update basic meta tags
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, true);
      updateMetaTag('twitter:description', description, true);
    }

    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', metaImage, true);
    updateMetaTag('og:type', type, true);

    // Update Twitter tags
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:url', fullUrl, true);
    updateMetaTag('twitter:image', metaImage, true);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', fullUrl);
      document.head.appendChild(canonical);
    }

    // Add structured data if provided
    if (structuredData) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"][data-dynamic]');
      if (structuredDataScript) {
        structuredDataScript.textContent = JSON.stringify(structuredData);
      } else {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        structuredDataScript.setAttribute('data-dynamic', 'true');
        structuredDataScript.textContent = JSON.stringify(structuredData);
        document.head.appendChild(structuredDataScript);
      }
    }

  }, [fullTitle, description, keywords, fullUrl, metaImage, type, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;
