import React, { useState, useEffect } from 'react'
import Home from './componennts/Home'
import Auth from './componennts/Auth';

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);
  return user ? <Home /> : <Auth onAuthSuccess={setUser} />;
}
