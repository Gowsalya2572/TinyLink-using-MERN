import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App(){
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-3xl font-semibold text-slate-800">MiniShort</Link>
          <nav className="hidden sm:flex items-center gap-4">
           <Link to="/" className="text-sm sm:text-base md:text-lg lg:text-xl hover:underline">Dashboard</Link>
          </nav>
           <div className="sm:hidden">
             <span className="text-sm text-slate-500">v1.0</span>
             </div>
            </div>
       </header>
       <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t mt-8">
         <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-slate-500">© MiniShort • simple URL shortener</div>
      </footer>
    </div>
  );
}
