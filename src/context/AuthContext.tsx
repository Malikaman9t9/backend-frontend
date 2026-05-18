import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../services/api";
import type { AppUser } from "../types";

interface AuthContextValue {
  user: AppUser | null;
  isPro: boolean;
  planLabel: string;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => void;
  supabase: SupabaseClient | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function createDemoUser(): AppUser {
  return { email: "demo@nexgenweblab.com", user_metadata: { plan: "free" } };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sb: SupabaseClient | null = null;
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabase(sb);
      } catch {
        sb = null;
      }
    }
    if (!sb) {
      setUser(createDemoUser());
      setLoading(false);
    } else {
      sb.auth.getUser().then((res) => {
        if (res.data?.user) {
          const meta = res.data.user.user_metadata || {};
          setUser({
            email: res.data.user.email || "user@nexgenweblab.com",
            user_metadata: { plan: meta.plan || "free" },
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<string | null> => {
    if (!supabase) {
      setUser(createDemoUser());
      return null;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return error.message;
      if (data.user) {
        const meta = data.user.user_metadata || {};
        setUser({
          email: data.user.email || email,
          user_metadata: { plan: meta.plan || "free" },
        });
      }
      return null;
    } catch {
      return "Invalid email or password.";
    }
  };

  const signOut = () => {
    if (supabase) supabase.auth.signOut();
    setUser(null);
  };

  const planType = user?.user_metadata?.plan || "free";
  const isPro = planType === "pro";
  const planLabel = isPro ? "Enterprise Pro" : "Starter";

  return (
    <AuthContext.Provider value={{ user, isPro, planLabel, loading, signIn, signOut, supabase }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
