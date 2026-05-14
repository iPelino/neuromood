import {Component, ReactNode} from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {hasError: true};
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-background-main px-container-padding-mobile">
          <section className="max-w-md rounded-DEFAULT border border-border-subtle bg-surface p-6 text-center">
            <h1 className="font-headline-md text-headline-md text-text-primary">Something went wrong</h1>
            <p className="mt-2 text-text-secondary">Please refresh the page and try again.</p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-5 rounded-full bg-primary-container px-5 py-2 text-on-primary-container font-medium hover:bg-primary transition-colors"
            >
              Reload app
            </button>
          </section>
        </main>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;
