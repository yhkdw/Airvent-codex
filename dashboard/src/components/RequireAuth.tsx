import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthed } from "../auth";

export default function RequireAuth() {
  const loc = useLocation();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    isAuthed().then(setAuthed);
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return <Outlet />;
}
