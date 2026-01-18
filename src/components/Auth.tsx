import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';

interface AuthProps {
    mode: 'login' | 'register';
    onLogin: (email: string) => void;
    onNavigate: (page: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ mode, onLogin, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setLoading(false);
            onLogin(email);
        }, 1500);
    };

    const isLogin = mode === 'login';

    return (
        <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
                <div className="text-center mb-4">
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        {isLogin ? 'Ingresa a tu panel financiero' : 'Únete a la nueva era financiera de Bolivia'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Nombre Completo</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '40px' }}
                                    placeholder="Juan Pérez"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Correo Electrónico</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: '40px' }}
                                placeholder="nombre@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: '40px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Confirmar Contraseña</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="password"
                                    className="form-input"
                                    style={{ paddingLeft: '40px' }}
                                    placeholder="••••••••"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        style={{ marginTop: '1rem', height: '48px', fontSize: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                        {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes cuenta?"}
                        <button
                            className="btn-text"
                            style={{ color: 'var(--color-accent)', fontWeight: 600, padding: '0 0.5rem' }}
                            onClick={() => onNavigate(isLogin ? 'register' : 'login')}
                        >
                            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
