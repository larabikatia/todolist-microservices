// src/components/ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger m-3 p-4">
          <h4 className="alert-heading">Oups! Une erreur s'est produite</h4>
          <p>Ne vous inquiétez pas, nous avons été informés du problème.</p>
          <hr />
          <p className="mb-0">
            <button 
              className="btn btn-outline-danger" 
              onClick={() => window.location.reload()}
            >
              Rafraîchir la page
            </button>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;