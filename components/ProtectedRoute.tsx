import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-12 h-12 border-4 border-avanti-900 border-t-avanti-gold rounded-full animate-spin"></div>
                    <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Cargando Sistema...</p>
                </div>
            </div>
        );
    }

    return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
