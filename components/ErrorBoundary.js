import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error: "", trace: "" };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    console.log("error", error);

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });

    this.setState({
      ...this.state,

      error: error?.message,
      trace: errorInfo.componentStack,
    });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full flex flex-col gap-5 items-center justify-center">
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            className="bg-primary px-2 py-1 text-white rounded-md"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>

          <div className="p-3 mx-10 bg-gray-900 rounded-md">
            <p className="mb-0 text-white">Error message:</p>
            <code className="font-bold">{this.state.error}</code>

            <p className="mt-3 mb-0 text-white">Stack trace:</p>
            <code>{this.state.trace}</code>
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
