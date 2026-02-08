import React, { useEffect, useState } from 'react';
import { getIssues, updateIssue, deleteIssue, createIssue } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [view, setView] = useState('dashboard');
    const [issues, setIssues] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) navigate('/login');
        fetchIssues();
    }, [userId]);

    const fetchIssues = async () => {
        try {
            const res = await getIssues(userId);
            setIssues(res.data);
        } catch (err) { console.error(err); }
    };

    const handleAddIssue = async (e) => {
        e.preventDefault();
        try {
            await createIssue({ title, description, priority, status: 'Started' }, userId);
            setTitle(''); setDescription(''); fetchIssues();
        } catch (err) { alert("Error saving bug."); }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        await updateIssue(id, newStatus);
        fetchIssues();
    };

    const getStatusStyle = (s) => {
        if (s === 'Completed') return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        if (s === 'In Process') return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    };

    // Filtered lists based on search term
    const activeSprints = issues.filter(i =>
        i.status !== 'Completed' && i.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const completedArchive = issues.filter(i =>
        i.status === 'Completed' && i.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#0b0f1a] text-slate-300 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-[#111827] border-r border-slate-800 p-8 flex flex-col shadow-2xl">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20 text-2xl">B</div>
                    <h2 className="text-xl font-bold text-white tracking-tight italic">BugTracker <span className="text-blue-500 font-black not-italic">PRO</span></h2>
                </div>

                <nav className="flex-1 space-y-2">
                    <button onClick={() => { setView('dashboard'); setSearchTerm(''); }} className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all ${view === 'dashboard' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:bg-slate-800 text-slate-500'}`}>
                        <span>⚡</span> Dashboard
                    </button>
                    <button onClick={() => { setView('analytics'); setSearchTerm(''); }} className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all ${view === 'analytics' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:bg-slate-800 text-slate-500'}`}>
                        <span>📊</span> Analytics
                    </button>
                </nav>

                <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="mt-auto text-slate-500 hover:text-red-400 p-4 font-bold flex items-center gap-2 transition-colors">
                    <span>🚪</span> Logout
                </button>
            </aside>

            {/* Main Area */}
            <main className="flex-1 p-12 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
                {view === 'dashboard' ? (
                    <div className="max-w-5xl mx-auto">
                        <header className="mb-12 flex justify-between items-end">
                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tight">Active Sprints</h1>
                                <p className="text-slate-500 mt-2 italic">Centralized bug management system</p>
                            </div>

                            <div className="relative w-72">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search active bugs..."
                                    className="w-full bg-[#111827] border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all shadow-xl"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </header>

                        <form onSubmit={handleAddIssue} className="bg-[#111827] p-8 rounded-[2rem] border border-slate-800 mb-16 shadow-xl">
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <div className="col-span-2">
                                    <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block tracking-widest">Issue Title</label>
                                    <input className="w-full bg-[#0b0f1a] p-4 rounded-xl border border-slate-800 focus:border-blue-500 outline-none text-white transition-all" placeholder="Enter task name..." value={title} onChange={(e)=>setTitle(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block tracking-widest">Priority</label>
                                    <select className="w-full bg-[#0b0f1a] p-4 rounded-xl border border-slate-800 focus:border-blue-500 outline-none text-white" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                                        <option>Low</option><option>Medium</option><option>High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block tracking-widest">Description</label>
                                <textarea className="w-full bg-[#0b0f1a] p-4 rounded-xl border border-slate-800 focus:border-blue-500 outline-none text-white h-24" placeholder="Briefly describe the bug..." value={description} onChange={(e)=>setDescription(e.target.value)} required />
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-xl font-black text-white tracking-widest shadow-lg shadow-blue-500/20 transition-all uppercase">Deploy Ticket</button>
                        </form>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {activeSprints.length > 0 ? activeSprints.map(issue => (
                                <div key={issue.id} className="bg-[#111827] p-8 rounded-[2rem] border border-slate-800 hover:border-blue-500/40 transition-all shadow-sm group">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-tighter ${getStatusStyle(issue.status)}`}>{issue.status}</span>
                                        <div className={`w-3 h-3 rounded-full ${issue.priority === 'High' ? 'bg-red-500 shadow-[0_0_10px_red]' : issue.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{issue.title}</h3>
                                    <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2">{issue.description}</p>

                                    <div className="flex items-center gap-2 p-1 bg-black/20 rounded-2xl border border-white/5">
                                        <button onClick={() => handleStatusUpdate(issue.id, 'Started')} className={`flex-1 py-2 text-[9px] font-black rounded-xl transition ${issue.status === 'Started' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:bg-white/5'}`}>START</button>
                                        <button onClick={() => handleStatusUpdate(issue.id, 'In Process')} className={`flex-1 py-2 text-[9px] font-black rounded-xl transition ${issue.status === 'In Process' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5'}`}>PROCESS</button>
                                        <button onClick={() => handleStatusUpdate(issue.id, 'Completed')} className={`flex-1 py-2 text-[9px] font-black rounded-xl transition ${issue.status === 'Completed' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5'}`}>FINISH</button>
                                        <button onClick={() => deleteIssue(issue.id).then(fetchIssues)} className="px-4 text-slate-600 hover:text-red-500 transition-colors">🗑️</button>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full py-20 text-center bg-[#111827] rounded-[2rem] border border-dashed border-slate-800">
                                    <p className="text-slate-500">No active bugs found match your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto">
                        <header className="mb-12">
                            <h1 className="text-4xl font-black text-white tracking-tight">Project Intelligence</h1>
                            <p className="text-slate-500 mt-2 italic">Historical data and completed milestones</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-[#111827] p-10 rounded-[2.5rem] border border-slate-800 text-center shadow-xl">
                                <p className="text-emerald-500 text-[10px] font-black mb-4 tracking-widest uppercase">Fixed</p>
                                <h4 className="text-7xl font-black text-white">{issues.filter(i => i.status === 'Completed').length}</h4>
                            </div>
                            <div className="bg-[#111827] p-10 rounded-[2.5rem] border border-slate-800 text-center shadow-xl border-blue-500/20">
                                <p className="text-blue-500 text-[10px] font-black mb-4 tracking-widest uppercase">Active</p>
                                <h4 className="text-7xl font-black text-white">{issues.filter(i => i.status === 'In Process').length}</h4>
                            </div>
                            <div className="bg-[#111827] p-10 rounded-[2.5rem] border border-slate-800 text-center shadow-xl">
                                <p className="text-slate-500 text-[10px] font-black mb-4 tracking-widest uppercase">Pending</p>
                                <h4 className="text-7xl font-black text-white">{issues.filter(i => i.status === 'Started').length}</h4>
                            </div>
                        </div>

                        <div className="bg-[#111827] rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-slate-800 bg-white/[0.01] flex flex-col md:flex-row justify-between items-center gap-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <span className="text-emerald-500">✔</span> Completed History
                                </h3>

                                <div className="relative w-full md:w-64">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
                                    <input
                                        type="text"
                                        placeholder="Search history..."
                                        className="w-full bg-[#0b0f1a] border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:border-blue-500 outline-none transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto">
                                {completedArchive.length > 0 ? (
                                    <div className="divide-y divide-slate-800/50">
                                        {completedArchive.map(issue => (
                                            <div key={issue.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                    <span className="text-slate-200 font-semibold">{issue.title}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase ${
                                                        issue.priority === 'High' ? 'text-red-400 border-red-500/20' :
                                                        issue.priority === 'Medium' ? 'text-amber-400 border-amber-500/20' :
                                                        'text-slate-400 border-slate-500/20'
                                                    }`}>
                                                        {issue.priority}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Archived</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-20 text-center text-slate-500 italic">
                                        No archived projects found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;