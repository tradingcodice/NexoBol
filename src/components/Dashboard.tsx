import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownLeft, Clock, MoreHorizontal, Copy } from 'lucide-react';

interface DashboardProps {
    onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    return (
        <div className="animate-fade-in" style={{ padding: '0 0.5rem' }}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 style={{ fontSize: '1.75rem' }}>Resumen de Cuenta</h2>
                    <p className="text-muted">Bienvenido de nuevo</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-primary" onClick={() => onNavigate('p2p')}>
                        <TrendingUp size={18} /> Ir al Mercado P2P
                    </button>
                </div>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid-cols-3 mb-8">
                {/* Total Balance Card */}
                <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-muted text-sm">Balance Estimado</span>
                        <span className="badge-success" style={{ fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', color: 'var(--color-success)', background: 'rgba(14, 203, 129, 0.1)' }}>+2.5%</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        $ 1,250.00 <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>USD</span>
                    </div>
                    <div className="text-muted text-sm">≈ 8,562.50 BOB</div>

                    {/* Decorative Sparkline */}
                    <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', opacity: 0.2 }} preserveAspectRatio="none">
                        <path d="M0,40 Q20,30 40,35 T80,20 T120,30 T160,10 T200,30 V50 H0 Z" fill="var(--color-primary)" />
                    </svg>
                </div>

                {/* BOB Balance Card */}
                <div className="card">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-muted text-sm">Saldo en Bolivianos</span>
                        <div style={{ background: 'var(--color-bg)', padding: '4px', borderRadius: '4px' }}><Clock size={14} color="var(--color-text-secondary)" /></div>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        250.00 <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>BOB</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', flex: 1 }}>Depositar</button>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', flex: 1 }}>Retirar</button>
                    </div>
                </div>

                {/* PNL Card */}
                <div className="card">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-muted text-sm">Ganancia de Hoy (PNL)</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-success)' }}>
                        +$ 12.50
                    </div>
                    <p className="text-muted text-sm">Basado en movimientos de mercado</p>
                </div>
            </div>

            {/* Recent Transactions Section */}
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Transacciones Recientes</h3>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                        <tr>
                            <th style={{ padding: '1rem' }}>Tipo</th>
                            <th style={{ padding: '1rem' }}>Activo</th>
                            <th style={{ padding: '1rem' }}>Cantidad</th>
                            <th style={{ padding: '1rem' }}>Estado</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Fecha</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.9rem' }}>
                        <TransactionRow type="Compra P2P" asset="USDT" amount="+ 100.00" status="Completado" date="Hoy, 10:30" />
                        <TransactionRow type="Retiro" asset="BOB" amount="- 500.00" status="Procesando" date="Ayer, 18:45" />
                        <TransactionRow type="Depósito" asset="BOB" amount="+ 2000.00" status="Completado" date="16 Ene" />
                    </tbody>
                </table>
            </div>

        </div>
    );
};

const TransactionRow = ({ type, asset, amount, status, date }: any) => {
    const isCredit = amount.startsWith('+');
    return (
        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
            <td style={{ padding: '1rem', fontWeight: 500 }}>
                <div className="flex items-center gap-2">
                    <div style={{ padding: '6px', borderRadius: '50%', background: isCredit ? 'rgba(14, 203, 129, 0.1)' : 'rgba(246, 70, 93, 0.1)' }}>
                        {isCredit ? <ArrowDownLeft size={16} color="var(--color-success)" /> : <ArrowUpRight size={16} color="var(--color-danger)" />}
                    </div>
                    {type}
                </div>
            </td>
            <td style={{ padding: '1rem' }}>{asset}</td>
            <td style={{ padding: '1rem', fontWeight: 600, color: isCredit ? 'var(--color-success)' : 'var(--color-text-main)' }}>{amount}</td>
            <td style={{ padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: status === 'Completado' ? 'rgba(14, 203, 129, 0.1)' : 'rgba(252, 213, 53, 0.1)', color: status === 'Completado' ? 'var(--color-success)' : 'var(--color-primary)' }}>
                    {status}
                </span>
            </td>
            <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--color-text-secondary)' }}>{date}</td>
        </tr>
    );
};
