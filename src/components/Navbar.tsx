import React from 'react';
import { User, LogOut } from 'lucide-react';

interface NavbarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
    currentPage: string;
    onNavigate: (page: string) => void;
    userEmail?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout, currentPage, onNavigate, userEmail }) => {
    return (
        <header style={{ background: 'var(--color-primary)', color: 'white', padding: '1rem 0' }}>
            <div className="container flex justify-between items-center">
                <div
                    className="flex items-center gap-2 cursor-pointer h-full"
                    onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'landing')}
                >
                    {/* Logo Text with Bolivia Colors */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: '900', fontSize: '1.8rem', letterSpacing: '-1px' }}>
                        <span style={{ color: 'white' }}>Nexo</span>
                        <span style={{ background: 'linear-gradient(to right, #DA291C 33%, #F4E400 33%, #F4E400 66%, #007A33 66%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Bol</span>
                    </div>
                </div>

                <nav className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <button
                                className={`btn`}
                                style={{
                                    background: currentPage === 'dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    color: 'white'
                                }}
                                onClick={() => onNavigate('dashboard')}
                            >
                                Dashboard
                            </button>
                            <button
                                className={`btn`}
                                style={{
                                    background: currentPage === 'p2p' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    color: 'white'
                                }}
                                onClick={() => onNavigate('p2p')}
                            >
                                Mercado P2P
                            </button>

                            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)', margin: '0 0.5rem' }}></div>

                            <div className="flex items-center gap-2 text-sm" style={{ opacity: 0.9 }}>
                                <div style={{ width: '32px', height: '32px', background: 'var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={18} color="white" />
                                </div>
                                <span className="hidden-mobile">{userEmail?.split('@')[0]}</span>
                            </div>
                            <button onClick={onLogout} className="btn-text" style={{ color: 'rgba(255,255,255,0.7)' }} title="Cerrar Sesión">
                                <LogOut size={20} />
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <button className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={() => onNavigate('login')}>Iniciar Sesión</button>
                            <button className="btn btn-accent" onClick={() => onNavigate('register')}>Registrarse</button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};
