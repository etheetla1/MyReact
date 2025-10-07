import React from 'react';
import { FileText, Download, Eye, Award } from 'lucide-react';
import { theme } from '../styles/theme';
import { cn } from '../lib/utils';

interface DocumentCardSimpleProps {
  title: string;
  description: string;
  documentUrl: string;
  fileName: string;
  type: 'resume' | 'certificate';
  buttonStyle?: 'primary' | 'outline';
}

const DocumentCardSimple: React.FC<DocumentCardSimpleProps> = ({
  title,
  description,
  documentUrl,
  fileName,
  type,
  buttonStyle = 'outline'
}) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    // Add error handling and ensure the URL is valid
    if (documentUrl) {
      window.open(documentUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Document URL is not available');
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleView}
          className={getButtonClasses()}
        >
          <Eye size={16} />
          View {type === 'certificate' ? 'Certificate' : 'Resume'}
        </button>
        
        <button
          onClick={handleDownload}
          className={getButtonClasses()}
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default DocumentCardSimple;
