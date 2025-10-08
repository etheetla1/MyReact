import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    if (import.meta.env.VITE_ENVIRONMENT === 'production') {
      // Log to error reporting service (e.g., Sentry)
      console.error('Production error:', error);
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="mb-8">
              <svg 
                className="w-16 h-16 mx-auto text-red-500 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
              <h1 className="text-2xl font-light mb-2">Something went wrong</h1>
              <p className="text-gray-400 mb-6">
                We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center border border-white/30 px-6 py-3 text-sm font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                Refresh Page
              </button>
              
              <div>
                <button
                  onClick={() => window.location.href = '/'}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  Go to Homepage
                </button>
              </div>
            </div>

            {import.meta.env.VITE_ENVIRONMENT === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300">
                  Error Details (Development Only)
                </summary>
                <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded text-xs">
                  <pre className="whitespace-pre-wrap text-red-300">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                  <pre className="whitespace-pre-wrap text-red-400 mt-2">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
