import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login, register } = useApp();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register(form);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Check backend and credentials.");
    }
  };

  return (
    <div className="medical-grid grid min-h-screen place-items-center px-4 py-10">
      <div className="glass w-full max-w-md rounded-[2rem] p-6">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-clinic-500 to-ocean-500 text-white shadow-glow">
            <Sparkles />
          </div>
          <h1 className="font-display text-3xl font-extrabold">MedEase AI</h1>
          <p className="font-semibold text-slate-500">Login or create your MBBS study account.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {mode === "register" && (
            <input placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-2xl bg-white p-4 font-bold outline-none ring-1 ring-slate-100 dark:bg-white/10 dark:ring-white/10" />
          )}
          <input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-2xl bg-white p-4 font-bold outline-none ring-1 ring-slate-100 dark:bg-white/10 dark:ring-white/10" />
          <input type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-2xl bg-white p-4 font-bold outline-none ring-1 ring-slate-100 dark:bg-white/10 dark:ring-white/10" />
          {error && <p className="font-bold text-rose-600">{error}</p>}
          <button className="w-full rounded-2xl bg-clinic-950 px-5 py-4 font-black text-white shadow-glow dark:bg-cyan-300 dark:text-clinic-950">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="mt-5 w-full font-black text-clinic-700 dark:text-cyan-300">
          {mode === "login" ? "New student? Register" : "Already registered? Login"}
        </button>
      </div>
    </div>
  );
}
