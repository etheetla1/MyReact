// Common types used throughout the application
export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  location: string;
}

export interface ContactInfo {
  address: string;
  phoneNo: string;
  email: string;
}

export interface SocialLinks {
  linkedin: string;
  instagram: string;
  twitter: string;
  github: string;
}

export interface Technology {
  icon: React.ReactNode;
  label: string;
  color: string;
}

export interface TechCategory {
  description: string;
  technologies: Technology[];
}

export interface TechCategories {
  [key: string]: TechCategory;
}

// Component Props Types
export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'slideLeft' | 'slideRight' | 'fadeIn' | 'fadeInUp' | 'container';
  className?: string;
}

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export interface TechCardProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  index: number;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderHover: string;
}

export interface ThemeSpacing {
  section: string;
  container: string;
  card: string;
  cardSmall: string;
  gap: string;
  gapLarge: string;
}

export interface ThemeTypography {
  hero: string;
  heading: string;
  subheading: string;
  body: string;
  bodySmall: string;
  badge: string;
}

export interface ThemeLayout {
  page: string;
  container: string;
  centerContent: string;
  grid: {
    responsive: string;
    projects: string;
  };
}

export interface ThemeComponents {
  card: string;
  button: {
    primary: string;
    secondary?: string;
    tab: string;
    tabActive: string;
    tabInactive: string;
  };
  badge: string;
}

export interface ThemeAnimations {
  transition: string;
  transitionSlow: string;
  hover: {
    scale: string;
    scaleSmall: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  layout: ThemeLayout;
  components: ThemeComponents;
  animations: ThemeAnimations;
}
