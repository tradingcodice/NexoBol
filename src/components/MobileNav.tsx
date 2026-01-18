import React from 'react';
import { LayoutDashboard, Users, Wallet, Settings } from 'lucide-react';

interface MobileNavProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
    const navItems = [
        { id: 'dashboard', label: 'Inicio', icon: <LayoutDashboard size={24} /> },
        { id: 'p2p', label: 'P2P', icon: <Users size={24} /> },
        { id: 'wallet', label: 'Billetera', icon: <Wallet size={24} /> },
        { id: 'settings', label: 'Menú', icon: <Settings size={24} /> },
    ];

    return (
        <div className="mobile-nav" style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            background: 'var(--color-bg-secondary)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '0.75rem 0',
            zIndex: 1000,
            paddingBottom: 'env(safe-area-inset-bottom, 1rem)' /* Handle iPhone notches */
        }}>
            {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            flex: 1
                        }}
                    >
                        {item.icon}
                        <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
