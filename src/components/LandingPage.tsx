import React from 'react';
import { ShieldCheck, Globe, Zap, ArrowRight, TrendingUp, UserCheck, Smartphone } from 'lucide-react';


interface LandingPageProps {
    onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-text-main)' }}>

            {/* Ticker Tape */}
            <div style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', overflow: 'hidden', padding: '10px 0', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '2rem', animation: 'marquee 20s linear infinite', whiteSpace: 'nowrap', justifyContent: 'center' }}>
                    <TickerItem pair="BTC/USD" price="$65,430.00" change="+2.4%" />
                    <TickerItem pair="USDT/BOB" price="9.57 Bs" change="+0.1%" />
                    <TickerItem pair="ETH/USD" price="$3,450.00" change="+1.2%" />
                    <TickerItem pair="SOL/USD" price="$145.20" change="-0.5%" />
                    <TickerItem pair="BNB/USD" price="$590.00" change="+0.8%" />
                </div>
            </div>

            {/* Hero Section */}
            <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
                {/* Background Radial Glow */}
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0,163,224,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }}></div>

                <div className="container flex items-center" style={{ flexDirection: 'row', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                    <div className="animate-fade-in" style={{ flex: '1 1 500px', paddingRight: '2rem' }}>
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(252, 213, 53, 0.1)', color: 'var(--color-primary)', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                            🚀 La plataforma P2P #1 de Bolivia
                        </div>
                        <h1 style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
                            El puente seguro entre <br />
                            <span style={{ background: 'linear-gradient(90deg, #FCD535 0%, #F0B90B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>tu dinero</span> y el mundo digital.
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '550px' }}>
                            Compra y vende USDT, Bitcoin y dólares digitales con transferencias bancarias locales y QR. Sin comisiones ocultas.
                        </p>
                        <div className="flex gap-4">
                            <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={() => onNavigate('register')}>
                                Crear Cuenta Gratis
                            </button>
                            <button className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={() => onNavigate('login')}>
                                Iniciar Sesión
                            </button>
                        </div>

                        <div className="flex gap-6 mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)', width: 'fit-content' }}>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>15K+</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Usuarios Activos</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$2M+</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Volumen Mensual</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        {/* 3D Illustration Placeholder or Image */}
                        <div className="animate-float" style={{ position: 'relative', width: '100%', maxWidth: '500px', height: '400px' }}>
                            {/* Create a CSS Composition if image fails or simulates the 3D vibe */}
                            <div style={{
                                width: '100%', height: '100%',
                                background: 'url(https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)',
                                backgroundSize: 'cover',
                                borderRadius: '24px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                border: '1px solid var(--color-border)'
                            }}>
                                {/* Overlay Elements simulating UI */}
                                <div className="glass-panel" style={{ position: 'absolute', bottom: '-20px', left: '-20px', padding: '1.5rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center', width: '220px' }}>
                                    <div style={{ background: 'var(--color-success)', padding: '10px', borderRadius: '12px' }}><TrendingUp color="white" /></div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>USDT/BOB</div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+9.57 Bs</div>
                                    </div>
                                </div>

                                <div className="glass-panel" style={{ position: 'absolute', top: '40px', right: '-30px', padding: '1rem', borderRadius: '16px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <div style={{ width: '10px', height: '10px', background: 'var(--color-success)', borderRadius: '50%' }}></div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Transacción Exitosa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section style={{ padding: '5rem 0', background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 style={{ marginBottom: '1rem' }}>Empieza en minutos</h2>
                        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Sin papeleos innecesarios. Tu cuenta lista para operar hoy mismo.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                        <StepCard number="01" title="Crea tu cuenta" desc="Regístrate con tu correo y verifica tu identidad en tiempo récord." icon={<UserCheck size={32} color="var(--color-primary)" />} />
                        <StepCard number="02" title="Deposita Fondos" desc="Usa QR o transferencia bancaria para cargar saldo en Bolivianos." icon={<Smartphone size={32} color="var(--color-accent)" />} />
                        <StepCard number="03" title="Intercambia" desc="Compra USDT, Bitcoin o Dólares al mejor tipo de cambio." icon={<ArrowRight size={32} color="var(--color-success)" />} />
                    </div>
                </div>
            </section>

            {/* Grid of Features (Trust) */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <FeatureCard
                            icon={<ShieldCheck size={40} color="var(--color-primary)" />}
                            title="Seguridad de Grado Bancario"
                            desc="Tus activos protegidos con custodia fría y encriptación SSL de 256 bits."
                        />
                        <FeatureCard
                            icon={<Globe size={40} color="var(--color-accent)" />}
                            title="Liquidez Global"
                            desc="Acceso a mercados internacionales con la facilidad de tu moneda local."
                        />
                        <FeatureCard
                            icon={<Zap size={40} color="var(--color-success)" />}
                            title="Ejecución Instantánea"
                            desc="Nuestro motor de emparejamiento procesa miles de órdenes por segundo."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section style={{ padding: '5rem 0', textAlign: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(252, 213, 53, 0.05) 100%)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>¿Listo para tomar el control?</h2>
                    <button className="btn btn-accent" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }} onClick={() => onNavigate('register')}>
                        Únete a NexoBol Ahora
                    </button>
                </div>
            </section>

        </div>
    );
};

const TickerItem = ({ pair, price, change }: { pair: string, price: string, change: string }) => {
    const isPositive = change.startsWith('+');
    return (
        <div className="flex items-center gap-2" style={{ marginRight: '2rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>{pair}</span>
            <span style={{ fontWeight: 700 }}>{price}</span>
            <span style={{ color: isPositive ? 'var(--color-success)' : 'var(--color-danger)', fontSize: '0.8rem' }}>{change}</span>
        </div>
    );
};

const StepCard = ({ number, title, desc, icon }: any) => (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-bg)', position: 'absolute', top: -10, right: 10, opacity: 0.1 }}>{number}</div>
        <div style={{ marginBottom: '1.5rem', background: 'var(--color-bg)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
    </div>
);

const FeatureCard = ({ icon, title, desc }: any) => (
    <div className="flex gap-4 items-start">
        <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--color-border)'
        }}>
            {icon}
        </div>
        <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{desc}</p>
        </div>
    </div>
);
