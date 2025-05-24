// CloudFront distribution URL
export const CLOUDFRONT_URL = 'https://d1234abcd.cloudfront.net'; // Replace with your actual CloudFront distribution URL

// Image URLs
export const S3_IMAGES = {
  profile: `${CLOUDFRONT_URL}/images/elishaTheetlaProfile1.png`,
  about: `${CLOUDFRONT_URL}/images/about.jpg`,
  projects: {
    project1: `${CLOUDFRONT_URL}/images/projects/project-1.jpg`,
    project2: `${CLOUDFRONT_URL}/images/projects/project-2.jpg`,
    project3: `${CLOUDFRONT_URL}/images/projects/project-3.jpg`,
    project4: `${CLOUDFRONT_URL}/images/projects/project-4.jpg`,
  }
}; 