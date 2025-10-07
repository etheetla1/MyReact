import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Download, ExternalLink } from 'lucide-react';
import { theme } from '../styles/theme';
import { cn } from '../lib/utils';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
  documentTitle: string;
  fileName: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  isOpen,
  onClose,
  documentUrl,
  documentTitle,
  fileName
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(documentUrl, '_blank');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] max-w-6xl bg-black border border-white/20 rounded-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div>
              <Dialog.Title className={cn(theme.typography.subheading, "text-white")}>
                {documentTitle}
              </Dialog.Title>
              <p className={theme.typography.bodySmall}>
                {fileName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Download Button */}
              <button
                onClick={handleDownload}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium",
                  "border border-white/30 rounded hover:bg-white hover:text-black",
                  theme.animations.transition
                )}
              >
                <Download size={16} />
                Download
              </button>
              
              {/* Open in New Tab Button (Mobile fallback) */}
              <button
                onClick={handleOpenInNewTab}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium",
                  "border border-white/30 rounded hover:bg-white hover:text-black",
                  theme.animations.transition,
                  "md:hidden" // Only show on mobile
                )}
              >
                <ExternalLink size={16} />
                Open
              </button>
              
              {/* Close Button */}
              <Dialog.Close asChild>
                <button
                  className={cn(
                    "p-2 rounded hover:bg-white/10",
                    theme.animations.transition
                  )}
                >
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 p-4">
            <div className="w-full h-full rounded-lg overflow-hidden bg-white/5">
              <iframe
                src={documentUrl}
                className="w-full h-full border-0"
                title={documentTitle}
                loading="lazy"
              />
            </div>
          </div>

          {/* Mobile Message */}
          <div className="md:hidden p-4 border-t border-white/10 bg-white/5">
            <p className={cn(theme.typography.bodySmall, "text-center")}>
              On mobile devices, use the "Open" button above to view the document in a new tab.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DocumentViewer;
