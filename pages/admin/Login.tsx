import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Lock, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSupabaseConfigured) {
            setError("La configuración de Supabase no se encuentra en el entorno de producción (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Por favor, añade las Variables de Entorno en el dashboard de Vercel.");
            return;
        }

        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="mb-8 text-center animate-page-enter">
                <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="bg-avanti-900 text-white p-3 rounded-sm shadow-lg">
                        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 10L36 38H30L24 22L18 38H12L24 10Z" fill="#BD9F63" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-3xl font-serif font-bold text-avanti-900">AVANTI CMS</h1>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Admin Access</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-lg w-full max-w-md border-t-4 border-avanti-gold animate-page-enter" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-xl font-bold text-avanti-900 mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-avanti-gold" /> Iniciar Sesión
                </h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-sm text-sm mb-6 border border-red-100 flex items-center gap-2">
                        <span className="font-bold">Error:</span> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 rounded-sm focus:outline-none focus:border-avanti-gold focus:ring-1 focus:ring-avanti-gold transition-all"
                            placeholder="admin@avantiadvisory.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 rounded-sm focus:outline-none focus:border-avanti-gold focus:ring-1 focus:ring-avanti-gold transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-avanti-900 text-white font-bold py-3 rounded-sm hover:bg-avanti-800 transition-colors uppercase tracking-widest text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Verificando...' : 'Acceder al Panel'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                        Acceso restringido únicamente para personal autorizado.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
