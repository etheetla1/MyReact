import React, { useState, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Search,
  RotateCw,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { theme } from '../../styles/theme';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker with Vite's native worker import (recommended approach)
const configurePDFWorker = () => {
  console.group('🔧 PDF.js Worker Configuration');
  console.log('Environment:', import.meta.env.MODE);
  console.log('PDF.js version:', pdfjs.version);
  console.log('Base URL from env:', import.meta.env.VITE_CF_BASE || 'default');
  
  try {
    // Use Vite's native worker import with ?url parameter
    // This is the recommended approach for Vite applications
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    console.log('✅ Using Vite-native PDF.js worker');
    console.log('Worker source:', pdfjs.GlobalWorkerOptions.workerSrc);
    console.log('Import method: Native Vite worker import with ?url parameter');
    console.log('Version-locked to:', pdfjs.version);
  } catch (error) {
    console.error('❌ Failed to configure Vite worker:', error);
    
    // Safe fallback: disable worker for main thread processing
    console.warn('🔄 Falling back to main thread processing (slower but reliable)');
    pdfjs.GlobalWorkerOptions.workerSrc = '';
  }
  
  console.groupEnd();
};

configurePDFWorker();

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  fileName: string;
}

interface PDFState {
  numPages: number | null;
  currentPage: number;
  scale: number;
  rotation: number;
  isLoading: boolean;
  error: string | null;
  searchText: string;
  isSearching: boolean;
  isFullscreen: boolean;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  fileName
}) => {
  const [state, setState] = useState<PDFState>({
    numPages: null,
    currentPage: 1,
    scale: 1.0,
    rotation: 0,
    isLoading: true,
    error: null,
    searchText: '',
    isSearching: false,
    isFullscreen: false
  });

  // Debug function to test PDF URL accessibility
  const debugPDFUrl = useCallback(async (url: string) => {
    console.group('🔍 PDF URL Debug Test');
    console.log('Testing PDF URL:', url);
    
    try {
      // Test 1: Basic fetch to check if URL is accessible
      console.log('🧪 Test 1: Basic fetch test...');
      const response = await fetch(url, { method: 'HEAD' });
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.error('❌ URL not accessible:', response.status, response.statusText);
      } else {
        console.log('✅ URL is accessible');
      }
      
      // Test 2: Check content type
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
      
      if (contentType && !contentType.includes('pdf')) {
        console.warn('⚠️ Content-Type is not PDF:', contentType);
      }
      
      // Test 3: Try to fetch actual content
      console.log('🧪 Test 2: Fetching actual content...');
      const fullResponse = await fetch(url);
      const blob = await fullResponse.blob();
      console.log('Blob size:', blob.size, 'bytes');
      console.log('Blob type:', blob.type);
      
    } catch (error) {
      console.error('❌ Fetch test failed:', error);
    }
    
    console.groupEnd();
  }, []);

  // Enhanced observability with runtime feature flags
  useEffect(() => {
    if (isOpen) {
      console.group('📄 PDF Modal Opening');
      console.log('PDF URL:', pdfUrl);
      console.log('Title:', title);
      console.log('Filename:', fileName);
      console.log('PDF.js version:', pdfjs.version);
      console.log('PDF.js worker source:', pdfjs.GlobalWorkerOptions.workerSrc);
      
      // Runtime feature flag for iframe fallback
      const useIframeFallback = import.meta.env.VITE_PDF_IFRAME_FALLBACK === '1';
      console.log('Iframe fallback enabled:', useIframeFallback);
      
      // Log resolved URL once for dev debugging
      if (import.meta.env.DEV) {
        console.log('[PDF] URL:', pdfUrl);
        console.log('[PDF] RESUME_URL:', pdfUrl);
      }
      
      console.groupEnd();
      
      // Run debug test
      debugPDFUrl(pdfUrl);
    }
  }, [isOpen, pdfUrl, title, fileName, debugPDFUrl]);

  // Update state helper
  const updateState = useCallback((updates: Partial<PDFState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Handle PDF load success
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    updateState({ numPages, isLoading: false, error: null });
  }, [updateState]);

  // Handle PDF load error with detailed logging
  const onDocumentLoadError = useCallback((error: Error) => {
    console.group('🔴 PDF Load Error Details');
    console.error('Error object:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('PDF URL being loaded:', pdfUrl);
    console.error('PDF filename:', fileName);
    console.error('PDF title:', title);
    
    // Check if it's a network error
    if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('CORS')) {
      console.error('🌐 Network/CORS Error detected');
      console.error('This might be a CORS or network connectivity issue');
    }
    
    // Check if it's a PDF parsing error
    if (error.message.includes('PDF') || error.message.includes('parse')) {
      console.error('📄 PDF Parsing Error detected');
      console.error('The PDF file might be corrupted or invalid');
    }
    
    console.groupEnd();
    
    updateState({ 
      error: `Failed to load PDF: ${error.message}. Please try downloading the file directly.`,
      isLoading: false 
    });
  }, [updateState, pdfUrl, fileName, title]);

  // Navigation functions
  const goToPrevPage = useCallback(() => {
    updateState({ currentPage: Math.max(1, state.currentPage - 1) });
  }, [state.currentPage, updateState]);

  const goToNextPage = useCallback(() => {
    updateState({ 
      currentPage: Math.min(state.numPages || 1, state.currentPage + 1) 
    });
  }, [state.currentPage, state.numPages, updateState]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= (state.numPages || 1)) {
      updateState({ currentPage: page });
    }
  }, [state.numPages, updateState]);

  // Zoom functions
  const zoomIn = useCallback(() => {
    updateState({ scale: Math.min(3.0, state.scale + 0.25) });
  }, [state.scale, updateState]);

  const zoomOut = useCallback(() => {
    updateState({ scale: Math.max(0.25, state.scale - 0.25) });
  }, [state.scale, updateState]);

  const resetZoom = useCallback(() => {
    updateState({ scale: 1.0 });
  }, [updateState]);

  // Rotation function
  const rotate = useCallback(() => {
    updateState({ rotation: (state.rotation + 90) % 360 });
  }, [state.rotation, updateState]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    updateState({ isFullscreen: !state.isFullscreen });
  }, [state.isFullscreen, updateState]);

  // Download function
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl, fileName]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextPage();
          break;
        case '=':
        case '+':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            zoomIn();
          }
          break;
        case '-':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            zoomOut();
          }
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            resetZoom();
          }
          break;
        case 'f':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            // Focus search input
            const searchInput = document.getElementById('pdf-search-input');
            searchInput?.focus();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrevPage, goToNextPage, zoomIn, zoomOut, resetZoom]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      updateState({
        currentPage: 1,
        scale: 1.0,
        rotation: 0,
        isLoading: true,
        error: null,
        searchText: '',
        isSearching: false,
        isFullscreen: false
      });
    }
  }, [isOpen, updateState]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "fixed inset-0 z-50 bg-black/90 backdrop-blur-sm",
          state.isFullscreen && "bg-black"
        )}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={cn(
            "relative w-full h-full flex flex-col",
            !state.isFullscreen && "p-4 md:p-8"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={cn(
            "flex items-center justify-between mb-4 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4",
            state.isFullscreen && "rounded-none mb-0"
          )}>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-white truncate">
                {title}
              </h2>
              <p className="text-sm text-gray-400 truncate">
                {fileName}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 ml-4">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="pdf-search-input"
                    type="text"
                    placeholder="Search..."
                    value={state.searchText}
                    onChange={(e) => updateState({ searchText: e.target.value })}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                  />
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-gray-800 rounded-md p-1">
                <button
                  onClick={zoomOut}
                  disabled={state.scale <= 0.25}
                  className="p-2 text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Zoom Out (Ctrl+-)"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="px-2 text-sm text-white min-w-[4rem] text-center">
                  {Math.round(state.scale * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  disabled={state.scale >= 3.0}
                  className="p-2 text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Zoom In (Ctrl++)"
                >
                  <ZoomIn size={16} />
                </button>
              </div>

              {/* Page Navigation */}
              {state.numPages && (
                <div className="flex items-center gap-1 bg-gray-800 rounded-md p-1">
                  <button
                    onClick={goToPrevPage}
                    disabled={state.currentPage <= 1}
                    className="p-2 text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Previous Page (←)"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-2 text-sm text-white min-w-[4rem] text-center">
                    {state.currentPage} / {state.numPages}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={state.currentPage >= state.numPages}
                    className="p-2 text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Next Page (→)"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Additional Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={rotate}
                  className="p-2 text-white hover:bg-gray-700 rounded"
                  title="Rotate"
                >
                  <RotateCw size={16} />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-white hover:bg-gray-700 rounded"
                  title="Toggle Fullscreen"
                >
                  {state.isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 text-white hover:bg-gray-700 rounded"
                  title="Download PDF"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-white hover:bg-gray-700 rounded"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* PDF Content with Safe Fallbacks */}
          <div className={cn(
            "flex-1 bg-gray-100 rounded-lg overflow-auto",
            state.isFullscreen && "rounded-none"
          )}>
            {state.error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <div className="text-red-500 mb-4">
                    <X size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Failed to Load PDF
                  </h3>
                  <p className="text-gray-600 mb-4 max-w-md">
                    {state.error}
                  </p>
                  
                  {/* Safe iframe fallback */}
                  {import.meta.env.VITE_PDF_IFRAME_FALLBACK === '1' && (
                    <div className="mb-4">
                      <iframe
                        src={pdfUrl}
                        width="100%"
                        height="400"
                        style={{ border: 'none' }}
                        title={`${title} - PDF Preview`}
                        className="rounded-md shadow-sm"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Download PDF Instead
                    </button>
                    {import.meta.env.VITE_PDF_IFRAME_FALLBACK !== '1' && (
                      <button
                        onClick={() => window.open(pdfUrl, '_blank')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Open in New Tab
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center p-4">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading PDF...</p>
                      </div>
                    </div>
                  }
                  error={
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center">
                        <div className="text-red-500 mb-4">
                          <X size={48} className="mx-auto" />
                        </div>
                        <p className="text-gray-600">Failed to load PDF</p>
                      </div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={state.currentPage}
                    scale={state.scale}
                    rotate={state.rotation}
                    loading={
                      <div className="flex items-center justify-center h-96 bg-white rounded">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    }
                    error={
                      <div className="flex items-center justify-center h-96 bg-white rounded">
                        <p className="text-gray-600">Failed to load page</p>
                      </div>
                    }
                    className="shadow-lg"
                  />
                </Document>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden mt-4 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              {/* Mobile Search */}
              <div className="flex-1 mr-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={state.searchText}
                    onChange={(e) => updateState({ searchText: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 text-white hover:bg-gray-700 rounded"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-white hover:bg-gray-700 rounded"
                >
                  {state.isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PDFViewerModal;
