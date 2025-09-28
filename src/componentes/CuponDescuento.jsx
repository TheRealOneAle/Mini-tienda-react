import React, { useState } from "react";

const CUPONES = {
  DESCUENTO10: {
    tipo: "porcentaje",
    valor: 10,
    descripcion: "10% de descuento en el total",
    icono: "🎉"
  },
  ENVIOGRATIS: {
    tipo: "envio",
    descripcion: "¡Envío gratis aplicado!",
    icono: "🚚"
  },
  PRIMERACOMPRA: {
    tipo: "porcentaje",
    valor: 15,
    descripcion: "15% de descuento en tu primera compra",
    icono: "🎁"
  },
  BLACKFRIDAY: {
    tipo: "porcentaje",
    valor: 25,
    descripcion: "25% de descuento Black Friday",
    icono: "🛍️"
  },
  VERANO2024: {
    tipo: "porcentaje",
    valor: 20,
    descripcion: "20% de descuento en ropa de verano",
    icono: "☀️"
  }
};

export default function CuponDescuento({ onAplicar }) {
  const [cupon, setCupon] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleAplicar = () => {
    const codigo = cupon.trim().toUpperCase();
    if (CUPONES[codigo]) {
      onAplicar(codigo, CUPONES[codigo]);
      setMensaje(`${CUPONES[codigo].icono} ${CUPONES[codigo].descripcion}`);
      setTipoMensaje("success");
    } else {
      setMensaje("❌ Cupón inválido o expirado");
      setTipoMensaje("error");
    }
    setCupon("");
    setTimeout(() => {
      setMensaje("");
      setTipoMensaje("");
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAplicar();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ingresa tu código de cupón"
            value={cupon}
            onChange={(e) => setCupon(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-modern pr-10"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-primary)',
              color: 'var(--text-primary)'
            }}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
        <button
          onClick={handleAplicar}
          disabled={!cupon.trim()}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            cupon.trim() ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
          }`}
          style={{
            backgroundColor: cupon.trim() ? 'var(--primary-500)' : 'var(--text-tertiary)',
            color: 'white'
          }}
        >
          Aplicar
        </button>
      </div>

      {mensaje && (
        <div 
          className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
            tipoMensaje === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {mensaje}
        </div>
      )}

      {/* Available Coupons Hint */}
      <div 
        className="p-3 rounded-lg text-xs"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <p 
          className="font-medium mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          💡 Cupones disponibles:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {Object.entries(CUPONES).map(([codigo, datos]) => (
            <span 
              key={codigo}
              className="text-xs"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {datos.icono} {codigo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
