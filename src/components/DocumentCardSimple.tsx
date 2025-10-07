import React, { useState } from 'react';
import { FileText, Download, Eye, Award, AlertCircle, Loader2 } from 'lucide-react';
import { theme } from '../styles/theme';
import { cn } from '../lib/utils';

interface DocumentCardSimpleProps {
  title: string;
  description: string;
  documentUrl: string;
  fileName: string;
  type: 'resume' | 'certificate';
  buttonStyle?: 'primary' | 'outline';
  onError?: (error: Error) => void;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string, error?: Error) => {
    setError(errorMessage);
    setIsLoading(false);
    if (onError && error) {
      onError(error);
    }
    console.error(`Document ${type} error:`, errorMessage, error);
  };

  const verifyDocumentExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setError(null);

    try {
      if (!documentUrl) {
        throw new Error('Document URL is not available');
      }

      // Verify document exists before attempting download
      const exists = await verifyDocumentExists(documentUrl);
      if (!exists) {
        throw new Error('Document not found or unavailable');
      }

      const link = document.createElement('a');
      link.href = documentUrl;
      link.download = fileName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsLoading(false);
    } catch (error) {
      handleError('Failed to download document', error as Error);
    }
  };

  const handleView = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!documentUrl) {
        throw new Error('Document URL is not available');
      }

      // Verify document exists before opening
      const exists = await verifyDocumentExists(documentUrl);
      if (!exists) {
        throw new Error('Document not found or unavailable');
      }

      window.open(documentUrl, '_blank', 'noopener,noreferrer');
      setIsLoading(false);
    } catch (error) {
      handleError('Failed to open document', error as Error);
    }
  };

  const getIcon = () => {
    return type === 'certificate' ? <Award size={24} /> : <FileText size={24} />;
  };

  const getPrimaryButtonClasses = () => {
    return cn(
      "flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wider",
      "bg-transparent border border-white/30 rounded",
      "hover:bg-white hover:text-black",
      theme.animations.transition
    );
  };

  const getOutlineButtonClasses = () => {
    return cn(
      "flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wider",
      "bg-transparent border border-white/20 rounded",
      "hover:border-white/40 hover:bg-white/5",
      theme.animations.transition
    );
  };

  const getButtonClasses = () => {
    return buttonStyle === 'primary' ? getPrimaryButtonClasses() : getOutlineButtonClasses();
  };

  return (
    <div className={cn(
      "p-6 rounded-lg group cursor-pointer",
      theme.components.card,
      theme.animations.transition
    )}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className={cn(theme.typography.subheading, "text-white mb-2")}>
            {title}
          </h4>
          <p className={theme.typography.bodySmall}>
            {description}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-400" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleView}
          disabled={isLoading}
          className={cn(
            getButtonClasses(),
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Eye size={16} />
          )}
          View {type === 'certificate' ? 'Certificate' : 'Resume'}
        </button>
        
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className={cn(
            getButtonClasses(),
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default DocumentCardSimple;
