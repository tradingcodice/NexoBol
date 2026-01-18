import React from 'react';
import { LayoutDashboard, Users, Wallet, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
    onLogout: () => void;
    userEmail?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout, userEmail }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Panel Principal', icon: <LayoutDashboard size={20} /> },
        { id: 'p2p', label: 'Mercado P2P', icon: <Users size={20} /> },
        { id: 'wallet', label: 'Billetera', icon: <Wallet size={20} /> }, // Placeholder page
        { id: 'settings', label: 'Configuración', icon: <Settings size={20} /> }, // Placeholder page
    ];

    return (
        <aside style={{
            width: '260px',
            height: '100vh',
            background: 'var(--color-bg-secondary)',
            borderRight: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed'
        }}>
            {/* Brand */}
            <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'white', borderRadius: '8px', padding: '6px 10px', display: 'flex', alignItems: 'center', width: '100%' }}>
                    <img src="/src/assets/logo.png" alt="NexoBol" style={{ height: '36px', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
            </div>

            {/* Menu */}
            <nav style={{ flex: 1, padding: '1rem' }}>
                <ul style={{ listStyle: 'none' }}>
                    {menuItems.map((item) => {
                        const isActive = currentPage === item.id;
                        return (
                            <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                                <button
                                    onClick={() => onNavigate(item.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '0.875rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: isActive ? 'var(--color-bg-tertiary)' : 'transparent',
                                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                        borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textAlign: 'left'
                                    }}
                                >
                                    {item.icon}
                                    <span style={{ fontWeight: isActive ? 600 : 500 }}>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Footer */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <div style={{ width: '36px', height: '36px', background: 'var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                        {userEmail ? userEmail[0].toUpperCase() : 'U'}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Mi Cuenta</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{userEmail}</div>
                    </div>
                </div>
                <button onClick={onLogout} className="btn w-full" style={{ background: 'rgba(246, 70, 93, 0.1)', color: 'var(--color-danger)', border: '1px solid rgba(246, 70, 93, 0.2)' }}>
                    <LogOut size={18} /> Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};
