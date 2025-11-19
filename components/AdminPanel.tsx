
import React, { useState, useEffect } from 'react';
import { Project, Experience } from '../types';
import { 
    getProjects, saveProject, deleteProject, 
    getExperiences, saveExperience, deleteExperience, 
    login, isAuthenticated, logout 
} from '../services/dataService';
import { CloseIcon, ArrowRight } from './Icons';

const AdminPanel: React.FC = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'experience'>('projects');
  
  // Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  
  // Edit State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);

  useEffect(() => {
    if (isAuth) {
      refreshData();
    }
  }, [isAuth]);

  const refreshData = () => {
    setProjects(getProjects());
    setExperiences(getExperiences());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setIsAuth(true);
    } else {
      alert('Invalid password');
    }
  };

  // --- Project Handlers ---

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
       // Convert comma separated strings back to arrays if needed
       const projectToSave = {
           ...editingProject,
           id: editingProject.id || 0, // 0 implies new
           technologies: Array.isArray(editingProject.technologies) 
             ? editingProject.technologies 
             : (editingProject.technologies as unknown as string).split(',').map((t: string) => t.trim()),
           gallery: Array.isArray(editingProject.gallery) 
             ? editingProject.gallery 
             : (editingProject.gallery as unknown as string || "").split(',').map((t: string) => t.trim()).filter(Boolean),
       } as Project;

       saveProject(projectToSave);
       setEditingProject(null);
       refreshData();
    }
  };

  const handleDeleteProject = (id: number) => {
    if(confirm('Are you sure you want to delete this project?')) {
        deleteProject(id);
        refreshData();
    }
  };

  // --- Experience Handlers ---

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExp) {
        saveExperience(editingExp as Experience);
        setEditingExp(null);
        refreshData();
    }
  };

  const handleDeleteExp = (id: number) => {
    if(confirm('Delete this experience?')) {
        deleteExperience(id);
        refreshData();
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <form onSubmit={handleLogin} className="bg-white p-8 border border-neutral-200 shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 tracking-tighter">CMS Login</h2>
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full p-3 border border-neutral-300 mb-4 focus:border-neutral-900 outline-none transition-colors"
          />
          <button type="submit" className="w-full bg-neutral-900 text-white p-3 font-bold uppercase tracking-wider hover:bg-neutral-800">
            Access Panel
          </button>
          <p className="mt-4 text-xs text-neutral-400 text-center">Default: admin123</p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold tracking-tighter">DEV. <span className="text-neutral-400 font-normal">CMS</span></h1>
             <div className="h-6 w-[1px] bg-neutral-200"></div>
             <nav className="flex gap-4 text-sm font-medium">
                <button 
                    onClick={() => { setActiveTab('projects'); setEditingProject(null); setEditingExp(null); }}
                    className={`${activeTab === 'projects' ? 'text-neutral-900' : 'text-neutral-400'} hover:text-neutral-900`}
                >
                    Projects
                </button>
                <button 
                    onClick={() => { setActiveTab('experience'); setEditingProject(null); setEditingExp(null); }}
                    className={`${activeTab === 'experience' ? 'text-neutral-900' : 'text-neutral-400'} hover:text-neutral-900`}
                >
                    Experience
                </button>
             </nav>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="text-xs font-mono uppercase text-neutral-500 hover:text-neutral-900">View Site</a>
            <button onClick={logout} className="text-xs font-mono uppercase text-red-500 hover:text-red-700 border border-red-100 px-3 py-1 rounded-sm">Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">All Projects</h2>
                    <button 
                        onClick={() => setEditingProject({ title: '', category: '', description: '', technologies: [], image: '', gallery: [] })}
                        className="bg-neutral-900 text-white px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-neutral-700"
                    >
                        + Add New
                    </button>
                </div>

                {editingProject ? (
                    <form onSubmit={handleSaveProject} className="bg-white p-8 border border-neutral-200 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4">
                         <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                            <h3 className="font-bold uppercase tracking-widest text-sm text-neutral-500">{editingProject.id ? 'Edit Project' : 'New Project'}</h3>
                            <button type="button" onClick={() => setEditingProject(null)}><CloseIcon className="w-5 h-5 text-neutral-400 hover:text-neutral-900"/></button>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-1">
                                 <label className="text-xs font-bold uppercase text-neutral-500">Title</label>
                                 <input required className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingProject.title || ''} onChange={e => setEditingProject({...editingProject, title: e.target.value})} />
                             </div>
                             <div className="space-y-1">
                                 <label className="text-xs font-bold uppercase text-neutral-500">Category</label>
                                 <input required className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingProject.category || ''} onChange={e => setEditingProject({...editingProject, category: e.target.value})} />
                             </div>
                             <div className="space-y-1">
                                 <label className="text-xs font-bold uppercase text-neutral-500">Client</label>
                                 <input className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingProject.client || ''} onChange={e => setEditingProject({...editingProject, client: e.target.value})} />
                             </div>
                             <div className="space-y-1">
                                 <label className="text-xs font-bold uppercase text-neutral-500">Year</label>
                                 <input className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingProject.year || ''} onChange={e => setEditingProject({...editingProject, year: e.target.value})} />
                             </div>
                         </div>

                         <div className="space-y-1">
                             <label className="text-xs font-bold uppercase text-neutral-500">Short Description</label>
                             <textarea required className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none h-20" value={editingProject.description || ''} onChange={e => setEditingProject({...editingProject, description: e.target.value})} />
                         </div>

                         <div className="space-y-1">
                             <label className="text-xs font-bold uppercase text-neutral-500">Long Description (Modal)</label>
                             <textarea className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none h-32" value={editingProject.longDescription || ''} onChange={e => setEditingProject({...editingProject, longDescription: e.target.value})} />
                         </div>

                         <div className="space-y-1">
                             <label className="text-xs font-bold uppercase text-neutral-500">Main Image URL</label>
                             <input required className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingProject.image || ''} onChange={e => setEditingProject({...editingProject, image: e.target.value})} />
                         </div>

                         <div className="space-y-1">
                             <label className="text-xs font-bold uppercase text-neutral-500">Technologies (Comma separated)</label>
                             <input 
                                className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" 
                                value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : editingProject.technologies || ''} 
                                onChange={e => setEditingProject({...editingProject, technologies: e.target.value as unknown as string[]})} 
                                placeholder="React, TypeScript, Node.js"
                             />
                         </div>

                         <div className="space-y-1">
                             <label className="text-xs font-bold uppercase text-neutral-500">Gallery Images URLs (Comma separated)</label>
                             <textarea 
                                className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none h-24" 
                                value={Array.isArray(editingProject.gallery) ? editingProject.gallery.join(', ') : editingProject.gallery || ''} 
                                onChange={e => setEditingProject({...editingProject, gallery: e.target.value as unknown as string[]})} 
                                placeholder="https://site.com/img1.jpg, https://site.com/img2.jpg"
                             />
                         </div>

                         <div className="flex gap-4 pt-4">
                             <button type="submit" className="bg-neutral-900 text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-neutral-800">Save Project</button>
                             <button type="button" onClick={() => setEditingProject(null)} className="px-6 py-3 font-bold uppercase tracking-wider border border-neutral-200 hover:bg-neutral-50">Cancel</button>
                         </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {projects.map(p => (
                            <div key={p.id} className="bg-white p-4 border border-neutral-200 flex items-center justify-between group hover:border-neutral-400 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img src={p.image} alt="" className="w-16 h-12 object-cover bg-neutral-100" />
                                    <div>
                                        <h4 className="font-bold text-neutral-900">{p.title}</h4>
                                        <span className="text-xs text-neutral-500 uppercase">{p.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingProject(p)} className="text-xs font-bold uppercase px-3 py-1 bg-neutral-100 hover:bg-neutral-200">Edit</button>
                                    <button onClick={() => handleDeleteProject(p.id)} className="text-xs font-bold uppercase px-3 py-1 bg-red-50 text-red-500 hover:bg-red-100">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
             <div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">Experience History</h2>
                    <button 
                        onClick={() => setEditingExp({ role: '', company: '', period: '', description: '' })}
                        className="bg-neutral-900 text-white px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-neutral-700"
                    >
                        + Add New
                    </button>
                </div>

                {editingExp ? (
                    <form onSubmit={handleSaveExp} className="bg-white p-8 border border-neutral-200 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4">
                         <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                            <h3 className="font-bold uppercase tracking-widest text-sm text-neutral-500">{editingExp.id ? 'Edit Experience' : 'New Experience'}</h3>
                            <button type="button" onClick={() => setEditingExp(null)}><CloseIcon className="w-5 h-5 text-neutral-400 hover:text-neutral-900"/></button>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-1">
                                 <label className="text-xs font-bold uppercase text-neutral-500">Role</label>
                                 <input required className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingExp.role || ''} onChange={e => setEditingExp({...editingExp, role: e.target.value})} />
                             </div>
                             <div className="space-y-1">
                                 <label className="text-xs font-bold uppercase text-neutral-500">Company</label>
                                 <input required className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingExp.company || ''} onChange={e => setEditingExp({...editingExp, company: e.target.value})} />
                             </div>
                             <div className="space-y-1">
                                 <label className="text-xs font-bold uppercase text-neutral-500">Period</label>
                                 <input required className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingExp.period || ''} onChange={e => setEditingExp({...editingExp, period: e.target.value})} />
                             </div>
                             <div className="space-y-1">
                                 <label className="text-xs font-bold uppercase text-neutral-500">Image URL (Optional)</label>
                                 <input className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none" value={editingExp.image || ''} onChange={e => setEditingExp({...editingExp, image: e.target.value})} />
                             </div>
                         </div>

                         <div className="space-y-1">
                             <label className="text-xs font-bold uppercase text-neutral-500">Description</label>
                             <textarea required className="w-full p-2 border border-neutral-300 focus:border-neutral-900 outline-none h-32" value={editingExp.description || ''} onChange={e => setEditingExp({...editingExp, description: e.target.value})} />
                         </div>

                         <div className="flex gap-4 pt-4">
                             <button type="submit" className="bg-neutral-900 text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-neutral-800">Save Experience</button>
                             <button type="button" onClick={() => setEditingExp(null)} className="px-6 py-3 font-bold uppercase tracking-wider border border-neutral-200 hover:bg-neutral-50">Cancel</button>
                         </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        {experiences.map(e => (
                             <div key={e.id} className="bg-white p-4 border border-neutral-200 flex items-center justify-between group hover:border-neutral-400 transition-colors">
                                <div>
                                    <h4 className="font-bold text-neutral-900">{e.role}</h4>
                                    <div className="text-xs text-neutral-500 uppercase flex gap-2">
                                        <span>{e.company}</span>
                                        <span>•</span>
                                        <span>{e.period}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingExp(e)} className="text-xs font-bold uppercase px-3 py-1 bg-neutral-100 hover:bg-neutral-200">Edit</button>
                                    <button onClick={() => handleDeleteExp(e.id)} className="text-xs font-bold uppercase px-3 py-1 bg-red-50 text-red-500 hover:bg-red-100">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
             </div>
        )}

      </main>
    </div>
  );
};

export default AdminPanel;
