import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("MedEase UI error:", error);
  }

  resetApp = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="grid min-h-screen place-items-center bg-clinic-50 px-4 text-clinic-950">
        <div className="max-w-md rounded-[2rem] bg-white p-6 text-center shadow-glow">
          <h1 className="font-display text-3xl font-extrabold">MedEase AI</h1>
          <p className="mt-3 font-bold text-slate-600">App load me issue aaya. Reset karke fresh start kar sakte ho.</p>
          <button onClick={this.resetApp} className="mt-5 rounded-2xl bg-clinic-950 px-5 py-3 font-black text-white">
            Reset and Reload
          </button>
        </div>
      </div>
    );
  }
}
