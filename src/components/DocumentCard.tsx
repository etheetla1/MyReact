import React, { useState } from 'react';
import { FileText, Download, Eye, Award } from 'lucide-react';
import { theme } from '../styles/theme';
import { cn } from '../lib/utils';
import DocumentViewer from './DocumentViewer';

interface DocumentCardProps {
  title: string;
  description: string;
  documentUrl: string;
  fileName: string;
  type: 'resume' | 'certificate';
  buttonStyle?: 'primary' | 'outline';
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  description,
  documentUrl,
  fileName,
  type,
  buttonStyle = 'outline'
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

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
    setIsViewerOpen(true);
  };

  const getIcon = () => {
    return type === 'certificate' ? <Award size={24} /> : <FileText size={24} />;
  };

  const getPrimaryButtonClasses = () => {
    return cn(
      "flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wider",
      "bg-transparent border border-white/30 rounded",
      "hover:bg-white hover:text-black",
      theme.animations.transition,
      "group"
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
    <>
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

        {/* Button Style Indicator (for demo purposes) */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            Button Style: {buttonStyle === 'primary' ? 'Primary (Bold)' : 'Outline (Subtle)'}
          </p>
        </div>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        documentUrl={documentUrl}
        documentTitle={title}
        fileName={fileName}
      />
    </>
  );
};

export default DocumentCard;
