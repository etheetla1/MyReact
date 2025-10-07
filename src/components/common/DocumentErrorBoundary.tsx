import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { theme } from '../../styles/theme';
import { cn } from '../../lib/utils';

interface DocumentErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface DocumentErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class DocumentErrorBoundary extends Component<DocumentErrorBoundaryProps, DocumentErrorBoundaryState> {
  constructor(props: DocumentErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<DocumentErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console and call optional error handler
    console.error('Document Error Boundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI or default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={cn(
          "p-6 rounded-lg border border-red-500/20 bg-red-500/5",
          theme.animations.transition
        )}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <div className="flex-1">
              <h4 className={cn(theme.typography.subheading, "text-red-400 mb-2")}>
                Document Loading Error
              </h4>
              <p className={cn(theme.typography.bodySmall, "text-red-300 mb-4")}>
                There was an error loading this document. This might be due to a network issue or the document being temporarily unavailable.
              </p>
              
              {/* Error Details (only in development) */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-4">
                  <summary className="text-xs text-red-400 cursor-pointer hover:text-red-300">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-2 p-2 bg-red-500/10 rounded text-xs text-red-300 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <button
                onClick={this.handleRetry}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wider",
                  "bg-transparent border border-red-400/30 rounded text-red-400",
                  "hover:border-red-400/50 hover:bg-red-500/10",
                  theme.animations.transition
                )}
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default DocumentErrorBoundary;
