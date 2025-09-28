import React from "react";

export default function ItemCarro({
  item,
  onSumar,
  onRestar,
  onEliminar,
  mostrarSubtotal,
  temaOscuro,
}) {
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  return (
    <div 
      className="flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-primary)'
      }}
    >
      {/* Product Image */}
      <div 
        className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        {item.imagen}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 
          className="font-semibold text-sm truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {item.nombre}
        </h3>
        <p 
          className="text-xs truncate"
          style={{ color: 'var(--text-secondary)' }}
        >
          {item.categoria}
        </p>
        <p 
          className="text-sm font-medium"
          style={{ color: 'var(--primary-600)' }}
        >
          {formatearPrecio(item.precio)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onRestar}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:scale-105"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
          title="Disminuir cantidad"
        >
          -
        </button>
        <span 
          className="w-8 text-center font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {item.cantidad}
        </span>
        <button
          onClick={onSumar}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:scale-105"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
          title="Aumentar cantidad"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      {mostrarSubtotal && (
        <div className="text-right">
          <p 
            className="text-sm font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {formatearPrecio(item.precio * item.cantidad)}
          </p>
          <p 
            className="text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {item.cantidad} × {formatearPrecio(item.precio)}
          </p>
        </div>
      )}

      {/* Remove Button */}
      <button
        onClick={onEliminar}
        className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
        style={{ 
          backgroundColor: 'var(--error-500)',
          color: 'white'
        }}
        title="Eliminar del carrito"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
