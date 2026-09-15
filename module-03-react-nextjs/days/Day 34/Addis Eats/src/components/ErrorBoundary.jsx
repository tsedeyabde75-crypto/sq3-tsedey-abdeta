import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={styles.container}>
          <h2 style={styles.heading}>Oops! Something went wrong.</h2>
          <p style={styles.text}>Addis Eats ran into an unexpected error.</p>
          <button style={styles.button} onClick={this.handleReset}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    margin: '2rem auto',
    maxWidth: '500px',
    borderRadius: '8px',
    backgroundColor: '#fff3f3',
    border: '1px solid #ffcdd2',
  },
  heading: {
    color: '#d32f2f',
    marginBottom: '0.5rem',
  },
  text: {
    color: '#555',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ErrorBoundary;