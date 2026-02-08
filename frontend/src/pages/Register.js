import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ email, full_name: fullName, password });
            alert("Account Created! You can now log in.");
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("REGISTRATION FAILED: Email may already be in use.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#080b14] font-sans">
            <div className="bg-[#0f1422] p-10 rounded-[2.5rem] border border-white/5 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold text-white text-center mb-10 tracking-tight">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full bg-[#080b14] border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-blue-500/50" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
                    <input type="email" placeholder="Email" className="w-full bg-[#080b14] border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-blue-500/50" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full bg-[#080b14] border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-blue-500/50" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-black tracking-widest transition-all shadow-lg shadow-blue-500/20">REGISTER</button>
                    <p className="text-slate-400 text-center mt-6 text-sm">Have an account? <Link to="/login" className="text-blue-500 font-bold hover:underline">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;