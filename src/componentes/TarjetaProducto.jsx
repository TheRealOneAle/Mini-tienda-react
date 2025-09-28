import React, { useState } from "react";

export default function TarjetaProducto({ producto, onAgregar, temaOscuro }) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  const handleCantidad = (e) => setCantidad(Math.max(1, Number(e.target.value)));
  
  const handleAgregar = () => {
    onAgregar({ ...producto, cantidad });
    setCantidad(1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  return (
    <div className="card group overflow-hidden h-full flex flex-col">
      {/* Product Image */}
      <div 
        className="relative h-48 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <span className="select-none">{producto.imagen}</span>
        
        {/* Category Badge */}
        <div 
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-700)'
          }}
        >
          {producto.categoria}
        </div>

        {/* Stock Badge */}
        {producto.stock <= 5 && (
          <div 
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: 'var(--error-500)',
              color: 'white'
            }}
          >
            ¡Últimas unidades!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 
            className="text-lg font-semibold mb-2 line-clamp-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {producto.nombre}
          </h3>
          
          <p 
            className="text-sm mb-3 line-clamp-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {producto.descripcion}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span 
              className="text-2xl font-bold"
              style={{ color: 'var(--primary-600)' }}
            >
              {formatearPrecio(producto.precio)}
            </span>
            <span 
              className="text-xs"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Stock: {producto.stock}
            </span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cantidad:
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={producto.stock}
              value={cantidad}
              onChange={handleCantidad}
              className="w-16 p-2 text-center rounded-lg border-0"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            />
            <button
              onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAgregar}
          disabled={agregado || producto.stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            agregado ? 'animate-bounce' : 'hover:scale-105'
          } ${producto.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{
            backgroundColor: agregado 
              ? 'var(--success-500)' 
              : producto.stock === 0
              ? 'var(--text-tertiary)'
              : 'var(--primary-500)',
            color: 'white'
          }}
        >
          {agregado ? "¡Agregado!" : producto.stock === 0 ? "Sin stock" : "Agregar al Carrito"}
        </button>

        {/* Details Toggle */}
        <button
          onClick={() => setMostrarDetalles(!mostrarDetalles)}
          className="mt-2 text-sm underline transition-colors"
          style={{ color: 'var(--primary-500)' }}
        >
          {mostrarDetalles ? 'Ocultar detalles' : 'Ver detalles'}
        </button>

        {/* Additional Details */}
        {mostrarDetalles && (
          <div 
            className="mt-3 p-3 rounded-lg text-sm"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          >
            <p><strong>ID:</strong> {producto.id}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
          </div>
        )}
      </div>
    </div>
  );
}
