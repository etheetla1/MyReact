import type { Theme } from '../types';

export const theme: Theme = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    accent: '#6B7280',
    background: '#000000',
    surface: 'rgba(255, 255, 255, 0.05)',
    surfaceHover: 'rgba(255, 255, 255, 0.10)',
    border: 'rgba(255, 255, 255, 0.10)',
    borderHover: 'rgba(255, 255, 255, 0.30)',
  },
  
  spacing: {
    section: 'py-20',
    container: 'px-6 lg:px-12',
    card: 'p-6',
    cardSmall: 'p-4',
    gap: 'gap-6',
    gapLarge: 'gap-12',
  },
  
  typography: {
    hero: 'text-5xl lg:text-7xl font-light tracking-tight',
    heading: 'text-2xl lg:text-3xl font-light',
    subheading: 'text-xl lg:text-2xl font-light',
    body: 'text-lg text-gray-400 font-light',
    bodySmall: 'text-sm font-medium text-gray-300',
    badge: 'text-sm font-medium tracking-wider',
  },
  
  layout: {
    page: 'min-h-screen bg-black text-white pt-20',
    container: 'container mx-auto px-6 lg:px-12',
    centerContent: 'max-w-6xl mx-auto',
    grid: {
      responsive: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6',
      projects: 'mb-12 flex flex-wrap lg:justify-center items-center gap-8',
    }
  },
  
  components: {
    card: 'border border-white/10 hover:border-white/30 transition-all duration-300 bg-white/5 hover:bg-white/10 backdrop-blur-sm',
    button: {
      primary: 'inline-flex items-center border border-white/30 px-8 py-4 text-sm font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300 group',
      tab: 'px-6 py-3 text-sm font-medium tracking-wider transition-all duration-300 border',
      tabActive: 'bg-white text-black border-white',
      tabInactive: 'bg-transparent text-gray-400 border-white/20 hover:border-white/40 hover:text-white',
    },
    badge: 'inline-block border border-white/30 px-4 py-2 text-sm font-medium tracking-wider',
  },
  
  animations: {
    transition: 'transition-all duration-300',
    transitionSlow: 'transition-all duration-700',
    hover: {
      scale: 'hover:scale-105',
      scaleSmall: 'hover:scale-110',
    }
  }
};

// Utility function to get theme values
export const getTheme = (path: string): any => {
  return path.split('.').reduce((obj: any, key: string) => obj?.[key], theme);
};
