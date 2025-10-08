// Environment-driven base URL configuration
export const S3_BASE_URL = import.meta.env.VITE_CF_BASE || 'https://d2f1f8uiawofsx.cloudfront.net';

/**
 * Utility function to generate asset URLs consistently
 * @param path - Asset path relative to S3 bucket root
 * @param useCDN - Whether to use CloudFront CDN (default: true)
 * @returns Complete asset URL
 */
const getAssetUrl = (path: string, useCDN: boolean = true): string => {
  return useCDN 
    ? `${S3_BASE_URL}/${path}`
    : `https://s3.us-east-1.amazonaws.com/knowelist.com/${path}`;
};

// Image URLs - All using CloudFront for consistent performance
export const S3_IMAGES = {
  profile: getAssetUrl('images/elishaTheetlaProfile.png'),
  about: getAssetUrl('images/about.jpeg'),
  projects: {
    project1: getAssetUrl('images/projects/project-1.jpg'),
    project2: getAssetUrl('images/projects/project-2.jpg'),
    project3: getAssetUrl('images/projects/project-3.jpg'),
    project4: getAssetUrl('images/projects/project-4.jpg'),
    project5: getAssetUrl('images/projects/knowelist.png'),
  },
  logo: getAssetUrl('images/logo.png'),
};

// Document URLs - Standardized to use CloudFront for security and performance
export const S3_DOCUMENTS = {
  resume: getAssetUrl('documents/resume-mscs24.pdf'),
  awsCertification: getAssetUrl('documents/aws-cloud-practitioner-certificate.pdf'),
};

// Export utility function for dynamic asset URL generation
export { getAssetUrl };
