import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api";

const AppContext = createContext(null);

function readJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("medease_theme") === "dark");
  const [user, setUser] = useState(() => {
    return readJson("medease_user", null);
  });
  const [bookmarks, setBookmarks] = useState(() => readJson("medease_bookmarks", []));
  const [completed, setCompleted] = useState(() => readJson("medease_completed", []));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("medease_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("medease_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("medease_completed", JSON.stringify(completed));
  }, [completed]);

  const login = async (identifier, password) => {
    const normalizedIdentifier = identifier.trim().toLowerCase();
    if (normalizedIdentifier === "doctor gouri sharma" && password === "1234") {
      const demoUser = {
        id: "demo-doctor-gouri-sharma",
        name: "Doctor Gouri Sharma",
        username: "doctor gouri sharma",
        email: "doctor.gouri.sharma@medease.ai",
        role: "student",
        streak: 7
      };
      localStorage.setItem("medease_token", "demo-local-token");
      localStorage.setItem("medease_user", JSON.stringify(demoUser));
      setUser(demoUser);
      return { token: "demo-local-token", user: demoUser };
    }

    const { data } = await api.post("/auth/login", { identifier, password });
    localStorage.setItem("medease_token", data.token);
    localStorage.setItem("medease_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("medease_token", data.token);
    localStorage.setItem("medease_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("medease_token");
    localStorage.removeItem("medease_user");
    setUser(null);
  };

  const toggleBookmark = (topicId) => {
    setBookmarks((items) => (items.includes(topicId) ? items.filter((id) => id !== topicId) : [...items, topicId]));
  };

  const toggleCompleted = (topicId) => {
    setCompleted((items) => (items.includes(topicId) ? items.filter((id) => id !== topicId) : [...items, topicId]));
  };

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      user,
      login,
      register,
      logout,
      bookmarks,
      completed,
      toggleBookmark,
      toggleCompleted
    }),
    [darkMode, user, bookmarks, completed]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
