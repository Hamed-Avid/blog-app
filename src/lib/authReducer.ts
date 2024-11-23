import type { User } from "@/types/User";

type State = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type Action =
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "SET_LOADING" }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "LOGOUT" };

export const initialState: State = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGOUT":
      return initialState;
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
