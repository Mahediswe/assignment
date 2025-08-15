import React, { useState } from "react";
import { loginApi, registerApi } from "../api/authApi";

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const api = mode === "login" ? loginApi : registerApi;
      const res = await api(form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onAuthSuccess?.(user);
    } catch (err) {
      alert(err?.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={submit} className="space-y-3">
        {mode === "register" && (
          <input className="border p-2 w-full" placeholder="Name"
                 value={form.name} onChange={e=>setForm({...form, name: e.target.value})}/>
        )}
        <input className="border p-2 w-full" type="email" placeholder="Email"
               value={form.email} onChange={e=>setForm({...form, email: e.target.value})}/>
        <input className="border p-2 w-full" type="password" placeholder="Password"
               value={form.password} onChange={e=>setForm({...form, password: e.target.value})}/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <button className="text-sm mt-3 underline" onClick={()=>setMode(m=>m==="login"?"register":"login")}>
        {mode === "login" ? "Need an account? Register" : "Have an account? Login"}
      </button>
    </div>
  );
}
