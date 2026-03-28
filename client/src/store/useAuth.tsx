import {create} from "zustand"
import { login, signup } from "../api/api.js"
import {toast} from "react-hot-toast"

type AuthState = {
    user:unknown;
    token: string | null;
    setToken: (token: string) => void;
    login: (data: { email: string; password: string }) => Promise<void>;
    signup: (data: { email: string; password: string; name: string }) => Promise<void>;
    isSucess:boolean;
    setUser:(user:{user:unknown}) => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    token: null,
    setToken: (token: string) => {
        set({token})
    },
    setUser: (user: unknown) => {
        set({user})
    },
    login:async(data:{email:string, password:string})=>{
        try {
            const result = await login(data)
console.log("login result is ",result.user)
console.log("token is", result.token)
set({user:result.user, token:result.token})
set({isSucess:true})
toast.success("Login in success")
        }
        catch (error: any) {
  set({ isSucess: false });

  const msg = error?.response?.data?.message;

  if (Array.isArray(msg)) {
    toast.error(msg[0]); // show first validation error
  } else {
    toast.error(msg || "Login failed");
  }
}
    },
    signup:async(data:{email:string, password:string, name:string})=>{
        try {
  const result = await signup(data)
        console.log("sign up result is ",result)
        set({user:result.data, token:result.token})
        set({isSucess:true})
        toast.success("Sign up successful")
        }
        catch (error: any) {
  set({ isSucess: false });

  const msg = error?.response?.data?.message;

  if (Array.isArray(msg)) {
    toast.error(msg[0]); // show first validation error
  } else {
    toast.error(msg || "Login failed");
  }
}

    }
}))
