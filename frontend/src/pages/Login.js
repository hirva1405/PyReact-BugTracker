import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        try {
            const res = await axios.post('http://127.0.0.1:8000/users/login', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            if (res.data.access_token) {
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('userId', res.data.user_id);
                navigate('/dashboard');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.detail || "Invalid Email or Password";
            alert("LOGIN FAILED: " + errorMsg);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0b0f1a] p-6 font-sans">
            <div className="bg-[#111827] p-12 rounded-[2.5rem] border border-slate-800 w-full max-w-md shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-3xl font-black italic shadow-lg shadow-blue-500/20">B</div>
                    <h2 className="text-2xl font-bold text-white tracking-tight uppercase">BugTracker <span className="text-blue-500 font-black">Pro</span></h2>
                    <p className="text-slate-500 text-xs mt-2 font-medium tracking-widest">SECURE WORKSPACE LOGIN</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full bg-[#0b0f1a] border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full bg-[#0b0f1a] border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black tracking-widest transition-all shadow-lg shadow-blue-500/20 uppercase">Sign In</button>
                    <p className="text-slate-500 text-center mt-8 text-sm italic">Need an account? <Link to="/register" className="text-blue-500 font-bold underline ml-1">Join the Team</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;