import React, { useState, useMemo } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface Offer {
    id: string;
    advertiser: string;
    verified: boolean;
    completionRate: string;
    price: string;
    limitMin: string;
    limitMax: string;
    available: string;
    methods: string[];
    type: 'buy' | 'sell';
    asset: string;
}

const MOCK_OFFERS: Offer[] = [
    // BUY TAB: User wants to BUY USDT. Advertisers are SELLING. Prices around 9.55+
    { id: '1', advertiser: 'CambiosAndinos', verified: true, completionRate: '98%', price: '9.55 BOB', limitMin: '50', limitMax: '5000', available: '500 USDT', methods: ['Bank Transfer', 'QR'], type: 'buy', asset: 'USDT' },
    { id: '2', advertiser: 'NexoTrader_BOL', verified: true, completionRate: '99%', price: '9.56 BOB', limitMin: '100', limitMax: '10000', available: '2500 USDT', methods: ['Bank Transfer', 'QR'], type: 'buy', asset: 'USDT' },
    { id: '3', advertiser: 'CryptoPando', verified: false, completionRate: '92%', price: '9.55 BOB', limitMin: '150', limitMax: '3000', available: '450 USDT', methods: ['Tigo Money', 'QR'], type: 'buy', asset: 'USDT' },
    { id: '4', advertiser: 'FastSwapper24', verified: true, completionRate: '96%', price: '9.57 BOB', limitMin: '1000', limitMax: '20000', available: '5000 USDT', methods: ['Bank Transfer'], type: 'buy', asset: 'USDT' },
    { id: '5', advertiser: 'ElChuroCripto', verified: false, completionRate: '91%', price: '9.58 BOB', limitMin: '50', limitMax: '1500', available: '200 USDT', methods: ['QR'], type: 'buy', asset: 'USDT' },
    { id: '6', advertiser: 'BoliviaWali', verified: true, completionRate: '100%', price: '9.60 BOB', limitMin: '20', limitMax: '500', available: '100 USDT', methods: ['Bank Transfer', 'QR'], type: 'buy', asset: 'USDT' },
    { id: '7', advertiser: 'DigitalSantaCruz', verified: true, completionRate: '97%', price: '9.55 BOB', limitMin: '500', limitMax: '8000', available: '1200 USDT', methods: ['Bank Transfer'], type: 'buy', asset: 'USDT' },
    { id: '8', advertiser: 'SkrillKing', verified: true, completionRate: '95%', price: '1.04 USD', limitMin: '10', limitMax: '1000', available: '800 USDT', methods: ['Skrill'], type: 'buy', asset: 'USDT' },
    { id: '9', advertiser: 'NetellerPro', verified: false, completionRate: '89%', price: '1.05 USD', limitMin: '20', limitMax: '500', available: '300 USDT', methods: ['Neteller'], type: 'buy', asset: 'USDT' },
    { id: '10', advertiser: 'CochaloCoins', verified: false, completionRate: '93%', price: '9.59 BOB', limitMin: '100', limitMax: '5000', available: '600 USDT', methods: ['QR', 'Bank Transfer'], type: 'buy', asset: 'USDT' },

    // SELL TAB: User wants to SELL USDT. Advertisers are BUYING. Prices around 9.53 or lower
    { id: '11', advertiser: 'InversionesLaPaz', verified: true, completionRate: '99%', price: '9.53 BOB', limitMin: '1000', limitMax: '20000', available: '4000 USDT', methods: ['Bank Transfer'], type: 'sell', asset: 'USDT' },
    { id: '12', advertiser: 'CompraRapida_BO', verified: true, completionRate: '98%', price: '9.53 BOB', limitMin: '50', limitMax: '5000', available: '1000 USDT', methods: ['Bank Transfer', 'QR'], type: 'sell', asset: 'USDT' },
    { id: '13', advertiser: 'TarijaChange', verified: false, completionRate: '94%', price: '9.52 BOB', limitMin: '200', limitMax: '3000', available: '800 USDT', methods: ['QR'], type: 'sell', asset: 'USDT' },
    { id: '14', advertiser: 'AndesCapital', verified: true, completionRate: '100%', price: '9.51 BOB', limitMin: '5000', limitMax: '50000', available: '10000 USDT', methods: ['Bank Transfer'], type: 'sell', asset: 'USDT' },
    { id: '15', advertiser: 'QuickPay', verified: false, completionRate: '90%', price: '0.99 USD', limitMin: '10', limitMax: '500', available: '450 USDT', methods: ['PayPal'], type: 'sell', asset: 'USDT' },
    { id: '16', advertiser: 'SolDeOriente', verified: true, completionRate: '97%', price: '9.50 BOB', limitMin: '100', limitMax: '2000', available: '500 USDT', methods: ['QR', 'Tigo Money'], type: 'sell', asset: 'USDT' },
    { id: '17', advertiser: 'PotosiTrade', verified: false, completionRate: '92%', price: '9.52 BOB', limitMin: '50', limitMax: '1000', available: '150 USDT', methods: ['QR'], type: 'sell', asset: 'USDT' },
    { id: '18', advertiser: 'SecureSwap', verified: true, completionRate: '96%', price: '9.53 BOB', limitMin: '2000', limitMax: '10000', available: '3000 USDT', methods: ['Bank Transfer'], type: 'sell', asset: 'USDT' },
    { id: '19', advertiser: 'GlobalPay', verified: false, completionRate: '91%', price: '1.00 USD', limitMin: '20', limitMax: '1000', available: '1000 USDT', methods: ['Skrill', 'Neteller'], type: 'sell', asset: 'USDT' },
];

export const P2PMarket: React.FC = () => {
    const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
    const [selectedAsset, setSelectedAsset] = useState('USDT');
    const [selectedCurrency, setSelectedCurrency] = useState('BOB');
    const [selectedPayment, setSelectedPayment] = useState('All');
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [amount, setAmount] = useState('');

    // Filter Logic
    const filteredOffers = useMemo(() => {
        return MOCK_OFFERS.filter(offer => {
            if (offer.type !== tradeType) return false;
            // Mock currency matching based on price string content for simplicity
            const currencyMatch = offer.price.includes(selectedCurrency);
            if (!currencyMatch) return false;

            if (selectedPayment !== 'All') {
                const methodMatch = offer.methods.some(m => {
                    if (selectedPayment === 'Skrill') return m === 'Skrill';
                    if (selectedPayment === 'Neteller') return m === 'Neteller';
                    if (selectedPayment === 'PayPal') return m === 'PayPal';
                    if (selectedPayment === 'Bank/QR') return m === 'Bank Transfer' || m === 'QR';
                    return true;
                });
                if (!methodMatch) return false;
            }
            return true;
        });
    }, [tradeType, selectedCurrency, selectedPayment]);

    const handleOpenModal = (offer: Offer) => {
        setSelectedOffer(offer);
        setAmount('');
    };

    const isBuy = tradeType === 'buy';
    const actionColor = isBuy ? 'var(--color-success)' : 'var(--color-danger)';

    return (
        <div className="animate-fade-in" style={{ padding: '0 0.5rem' }}>

            {/* Top Tabs */}
            <div className="flex mb-6">
                <button
                    className="btn"
                    style={{
                        fontSize: '1.2rem',
                        padding: '1rem 2rem',
                        background: isBuy ? 'var(--color-success)' : 'transparent',
                        color: isBuy ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                        fontWeight: 800,
                        borderRadius: '8px 0 0 8px',
                        border: isBuy ? 'none' : '1px solid var(--color-border)'
                    }}
                    onClick={() => setTradeType('buy')}
                >
                    Quiero Comprar
                </button>
                <button
                    className="btn"
                    style={{
                        fontSize: '1.2rem',
                        padding: '1rem 2rem',
                        background: !isBuy ? 'var(--color-danger)' : 'transparent',
                        color: !isBuy ? 'white' : 'var(--color-text-secondary)',
                        fontWeight: 800,
                        borderRadius: '0 8px 8px 0',
                        border: !isBuy ? 'none' : '1px solid var(--color-border)'
                    }}
                    onClick={() => setTradeType('sell')}
                >
                    Quiero Vender
                </button>
            </div>

            {/* Filters */}
            <div className="card mb-6 flex flex-wrap gap-4 items-center" style={{ background: 'var(--color-bg-secondary)' }}>
                <div style={{ fontWeight: '600', marginRight: '1rem', color: 'var(--color-text-main)' }}>Filtros:</div>

                {/* Asset */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted">Activo:</span>
                    <select className="form-input" style={{ width: '100px' }} value={selectedAsset} onChange={e => setSelectedAsset(e.target.value)}>
                        <option value="USDT">USDT</option>
                        <option value="BTC">BTC</option>
                    </select>
                </div>

                {/* Currency */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted">Moneda:</span>
                    <div className="flex gap-2">
                        <button title="Bolivianos" className={`btn btn-sm ${selectedCurrency === 'BOB' ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.5rem 1rem' }} onClick={() => setSelectedCurrency('BOB')}>BOB</button>
                        <button title="Dólares" className={`btn btn-sm ${selectedCurrency === 'USD' ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.5rem 1rem' }} onClick={() => setSelectedCurrency('USD')}>USD</button>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted">Pago:</span>
                    <select className="form-input" style={{ width: '180px' }} value={selectedPayment} onChange={e => setSelectedPayment(e.target.value)}>
                        <option value="All">Todos</option>
                        <option value="Bank/QR">Banco / QR</option>
                        <option value="Skrill">Skrill</option>
                        <option value="Neteller">Neteller</option>
                        <option value="PayPal">PayPal</option>
                    </select>
                </div>
            </div>

            {/* Offers Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead style={{ background: 'var(--color-bg-tertiary)', borderBottom: '1px solid var(--color-border)' }}>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Comerciante</th>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Precio</th>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Límites / Disponible</th>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Método de Pago</th>
                                <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOffers.length > 0 ? (
                                filteredOffers.map((offer) => (
                                    <tr key={offer.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div className="flex items-center gap-2">
                                                <div style={{ width: '30px', height: '30px', background: 'var(--color-bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>
                                                    {offer.advertiser[0]}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-1 font-medium text-sm text-primary" style={{ color: 'var(--color-text-main)' }}>
                                                        {offer.advertiser}
                                                        {offer.verified && <CheckCircle size={14} color="#F0B90B" fill="#F0B90B" textAnchor="middle" style={{ color: 'var(--color-bg)' }} />}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{offer.completionRate} completado</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>
                                                {offer.price}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                                                <span style={{ color: 'var(--color-text-secondary)' }}>Disponible:</span> <span style={{ fontWeight: '600' }}>{offer.available}</span>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                                                <span style={{ color: 'var(--color-text-secondary)' }}>Límites:</span> {offer.limitMin} - {offer.limitMax}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div className="flex gap-1 flex-wrap">
                                                {offer.methods.map(m => (
                                                    <span key={m} style={{ fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                                                        {m}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                className="btn"
                                                style={{ background: actionColor, color: 'white', padding: '0.5rem 1.5rem' }}
                                                onClick={() => handleOpenModal(offer)}
                                            >
                                                {isBuy ? 'Comprar' : 'Vender'} {offer.asset}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                        No hay ofertas que coincidan con tus filtros. Intenta cambiar el método de pago o la moneda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Trade Modal */}
            {selectedOffer && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="card" style={{ width: '90%', maxWidth: '500px', animation: 'fadeIn 0.2s', border: '1px solid var(--color-primary)' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 style={{ margin: 0 }}>
                                {isBuy ? 'Comprar' : 'Vender'} {selectedOffer.asset}
                                <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>
                                    de {selectedOffer.advertiser}
                                </span>
                            </h3>
                            <button className="btn-text" onClick={() => setSelectedOffer(null)}><X size={20} /></button>
                        </div>

                        <div style={{ background: 'var(--color-bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                            <div className="flex justify-between mb-2">
                                <span className="text-secondary" style={{ color: 'var(--color-text-secondary)' }}>Precio:</span>
                                <span style={{ fontWeight: 600, color: actionColor }}>{selectedOffer.price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-secondary" style={{ color: 'var(--color-text-secondary)' }}>Límite:</span>
                                <span style={{ color: 'var(--color-text-main)' }}>{selectedOffer.limitMin} - {selectedOffer.limitMax}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">¿Cuánto quieres pagar?</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="100.00"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-tertiary)', padding: '0 1rem', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--color-text-main)' }}>
                                    {selectedCurrency}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Recibirás (Estimado)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="form-input"
                                    readOnly
                                    value={amount ? (parseFloat(amount) / parseFloat(selectedOffer.price.split(' ')[0])).toFixed(2) : '0.00'}
                                    style={{ background: 'var(--color-bg-tertiary)', opacity: 0.7 }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-tertiary)', padding: '0 1rem', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--color-text-main)' }}>
                                    {selectedAsset}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-6">
                            <button className="btn btn-outline" onClick={() => setSelectedOffer(null)}>Cancelar</button>
                            <button
                                className="btn"
                                style={{ background: actionColor, color: 'white', flex: 1, border: 'none' }}
                                onClick={() => { alert('¡Orden Iniciada con Éxito! (Simulación)'); setSelectedOffer(null); }}
                            >
                                Confirmar {isBuy ? 'Compra' : 'Venta'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
