"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getUserApi, signinApi, signupApi } from "@/services/authService";
import { authReducer, initialState } from "@/lib/authReducer";
import type { Action } from "@/lib/authReducer";
import type { User } from "@/types/User";
import type { CustomError } from "@/types/Api";

export type AuthData = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  dispatch: React.Dispatch<Action>;
  signin: (values: Omit<AuthData, "name">) => Promise<void>;
  signup: (values: AuthData) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  async function signin(values: Omit<AuthData, "name">) {
    dispatch({ type: "SET_LOADING" });
    try {
      const { user, message } = await signinApi(values);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const err = error as CustomError;
      const errorMessage = err?.response?.data?.message || "An error occurred";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      toast.error(errorMessage);
    }
  }

  async function signup(values: AuthData) {
    dispatch({ type: "SET_LOADING" });
    try {
      const { user, message } = await signupApi(values);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const err = error as CustomError;
      const errorMessage = err?.response?.data?.message || "An error occurred";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      toast.error(errorMessage);
    }
  }

  async function getUser() {
    dispatch({ type: "SET_LOADING" });
    try {
      await new Promise((res) => setTimeout(res, 3000));
      const { user } = await getUserApi();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      const err = error as CustomError;
      const errorMessage = err?.response?.data?.message || "An error occurred";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
    }
  }

  useEffect(() => {
    const fetchData = async () => await getUser();
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        signin,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext was used outside of its Provider");
  return context;
};
