import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FileText, Download, Eye, Award, AlertCircle, Loader2, ExternalLink, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { cn } from '../lib/utils';
import { PDFViewerModal } from './common';

// Type definition for Google Analytics gtag function
interface GtagWindow extends Window {
  gtag?: (
    command: 'event',
    eventName: string,
    parameters: {
      event_category: string;
      event_label: string;
      value: number;
    }
  ) => void;
  URL: typeof URL;
}

declare const window: GtagWindow;

interface DocumentCardSimpleProps {
  title: string;
  description: string;
  documentUrl: string;
  fileName: string;
  type: 'resume' | 'certificate';
  buttonStyle?: 'primary' | 'outline';
  onError?: (error: Error) => void;
}

interface DocumentState {
  isLoading: boolean;
  error: string | null;
  isVerified: boolean;
  downloadAttempted: boolean;
  viewAttempted: boolean;
  isPDFModalOpen: boolean;
}

const DocumentCardSimple: React.FC<DocumentCardSimpleProps> = ({
  title,
  description,
  documentUrl,
  fileName,
  type,
  buttonStyle = 'outline',
  onError
}) => {
  const [state, setState] = useState<DocumentState>({
    isLoading: false,
    error: null,
    isVerified: false,
    downloadAttempted: false,
    viewAttempted: false,
    isPDFModalOpen: false
  });
  
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Utility function to update state
  const updateState = useCallback((updates: Partial<DocumentState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Enhanced error handling with user-friendly messages
  const handleError = useCallback((errorMessage: string, errorObj?: Error) => {
    updateState({ 
      error: errorMessage, 
      isLoading: false 
    });
    
    if (onError && errorObj) {
      onError(errorObj);
    }
    
    // Log detailed error for debugging
    console.error(`Document ${type} error:`, {
      message: errorMessage,
      error: errorObj,
      documentUrl,
      fileName,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  }, [type, documentUrl, fileName, onError, updateState]);

  // Validate document URL format and accessibility
  const validateDocumentUrl = useCallback((url: string): boolean => {
    try {
      const urlObj = new URL(url);
      
      // Check for valid protocol
      if (!['https:', 'http:'].includes(urlObj.protocol)) {
        return false;
      }
      
      // Check for PDF file extension or CloudFront URL
      const isPdf = url.toLowerCase().includes('.pdf');
      const isCloudFront = url.includes('cloudfront.net') || url.includes('d2f1f8uiawofsx.cloudfront.net');
      
      return isPdf || isCloudFront;
    } catch (error) {
      console.error('URL validation error:', error);
      return false;
    }
  }, []);

  // Check if document is accessible
  const checkDocumentAccessibility = useCallback(async (url: string): Promise<boolean> => {
    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();
      
      const response = await fetch(url, {
        method: 'HEAD',
        signal: abortControllerRef.current.signal,
        headers: {
          'Accept': 'application/pdf,*/*'
        }
      });
      
      return response.ok;
    } catch (error) {
      // If CORS blocks the request, assume the document is accessible
      // since CloudFront URLs typically have CORS restrictions for HEAD requests
      if (error instanceof Error && error.name === 'TypeError') {
        return true; // Assume accessible if CORS blocked
      }
      console.warn('Document accessibility check failed:', error);
      return true; // Assume accessible on other errors
    }
  }, []);

  // Modern download handler with comprehensive error handling
  const handleDownload = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    updateState({ isLoading: true, error: null, downloadAttempted: true });

    try {
      // Validate URL format
      if (!documentUrl || !validateDocumentUrl(documentUrl)) {
        throw new Error('Invalid document URL format. Please contact support.');
      }

      // Check document accessibility
      const isAccessible = await checkDocumentAccessibility(documentUrl);
      if (!isAccessible) {
        throw new Error('Document is currently unavailable. Please try again later.');
      }

      // Use modern approach with better browser compatibility
      try {
        // Method 1: Try using fetch and blob (modern browsers)
        const response = await fetch(documentUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        window.URL.revokeObjectURL(url);
        
      } catch (fetchError) {
        // Method 2: Fallback to direct link approach
        console.warn('Fetch method failed, using fallback:', fetchError);
        
        const link = document.createElement('a');
        link.href = documentUrl;
        link.download = fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      updateState({ isLoading: false, isVerified: true });
      
      // Analytics tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'document_download', {
          event_category: 'engagement',
          event_label: `${type}_${fileName}`,
          value: 1
        });
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to download document. Please try again or contact support.';
      handleError(errorMessage, error as Error);
    }
  }, [documentUrl, fileName, type, validateDocumentUrl, checkDocumentAccessibility, updateState, handleError]);

  // Modern PDF viewer handler
  const handleView = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Open PDF in modal viewer
    updateState({ isPDFModalOpen: true, error: null });
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'document_view', {
        event_category: 'engagement',
        event_label: `${type}_${fileName}`,
        value: 1
      });
    }
  }, [type, fileName, updateState]);

  // Close PDF modal
  const closePDFModal = useCallback(() => {
    updateState({ isPDFModalOpen: false });
  }, [updateState]);

  // Clear error state
  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  // Get appropriate icon based on document type
  const getIcon = useCallback(() => {
    return type === 'certificate' ? <Award size={24} /> : <FileText size={24} />;
  }, [type]);

  // Dynamic button styling with better accessibility
  const getButtonClasses = useCallback(() => {
    const baseClasses = "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium tracking-wider rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (buttonStyle === 'primary') {
      return cn(
        baseClasses,
        "bg-transparent border border-white/30 text-white",
        "hover:bg-white hover:text-black hover:border-white",
        "disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/30"
      );
    }
    
    return cn(
      baseClasses,
      "bg-transparent border border-white/20 text-white",
      "hover:border-white/40 hover:bg-white/5",
      "disabled:hover:border-white/20 disabled:hover:bg-transparent"
    );
  }, [buttonStyle]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "p-6 rounded-lg group cursor-pointer",
          theme.components.card,
          theme.animations.transition,
          "focus-within:ring-2 focus-within:ring-white/20"
        )}
      >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className={cn(theme.typography.subheading, "text-white mb-2")}>
            {title}
          </h4>
          <p className={cn(theme.typography.bodySmall, "leading-relaxed")}>
            {description}
          </p>
          {state.isVerified && (
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-xs text-green-400">Verified & Accessible</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
          <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm text-red-400 block">{state.error}</span>
            <div className="flex gap-2 mt-2">
              <button
                onClick={clearError}
                className="text-xs text-red-300 hover:text-red-200 underline"
              >
                Dismiss
              </button>
              {state.error.includes('Popup blocked') && (
                <button
                  onClick={handleDownload}
                  disabled={state.isLoading}
                  className="text-xs text-red-300 hover:text-red-200 underline"
                >
                  Try Download Instead
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleView}
          disabled={state.isLoading}
          className={getButtonClasses()}
          aria-label={`View ${type === 'certificate' ? 'certificate' : 'resume'} in new tab`}
          title={`Open ${fileName} in a new tab`}
        >
          {state.isLoading && state.viewAttempted ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Eye size={16} />
          )}
          View {type === 'certificate' ? 'Certificate' : 'Resume'}
          <ExternalLink size={12} className="opacity-60" />
        </button>
        
        <button
          onClick={handleDownload}
          disabled={state.isLoading}
          className={getButtonClasses()}
          aria-label={`Download ${fileName}`}
          title={`Download ${fileName} to your device`}
        >
          {state.isLoading && state.downloadAttempted ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          Download PDF
        </button>
      </div>

      {/* Hidden download link for accessibility and fallback */}
      <a
        ref={downloadLinkRef}
        href={documentUrl}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      >
        {fileName}
      </a>
      </motion.div>

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={state.isPDFModalOpen}
        onClose={closePDFModal}
        pdfUrl={documentUrl}
        title={title}
        fileName={fileName}
      />
    </>
  );
};

export default DocumentCardSimple;
