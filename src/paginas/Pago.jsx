import React, { useState } from "react";
import ItemCarro from "../componentes/ItemCarro";
import CuponDescuento from "../componentes/CuponDescuento";

export default function Pago({
  carrito,
  onSumar,
  onRestar,
  onEliminar,
  cupon,
  onAplicarCupon,
  onComprar,
  temaOscuro,
}) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [procesando, setProcesando] = useState(false);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !direccion || !email) {
      setMensaje("Por favor completa todos los campos obligatorios");
      return;
    }
    
    setProcesando(true);
    setMensaje("");
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onComprar({ nombre, direccion, email, telefono });
    setMensaje("¡Compra realizada con éxito!");
    setNombre("");
    setDireccion("");
    setEmail("");
    setTelefono("");
    setProcesando(false);
  };

  // Calcular subtotal
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Lógica de cupones
  let descuento = 0;
  let envioGratis = false;
  if (cupon && typeof cupon === "object") {
    if (cupon.tipo === "porcentaje") {
      descuento = Math.round(subtotal * (cupon.valor / 100));
    }
    if (cupon.tipo === "envio") {
      envioGratis = true;
    }
  }
  
  const envio = envioGratis ? 0 : subtotal > 100000 ? 0 : 15000;
  const total = subtotal - descuento + envio;

  if (carrito.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div 
            className="text-6xl mb-6"
            style={{ color: 'var(--text-tertiary)' }}
          >
            🛒
          </div>
          <h1 
            className="text-3xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Tu carrito está vacío
          </h1>
          <p 
            className="text-lg mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Agrega algunos productos para comenzar tu compra
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Finalizar Compra
        </h1>
        <p 
          className="text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          Revisa tu pedido y completa la información de envío
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carrito de Compras */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Resumen del Pedido ({carrito.length} {carrito.length === 1 ? 'producto' : 'productos'})
            </h2>
            
            <div className="space-y-4">
              {carrito.map((item, idx) => (
                <ItemCarro
                  key={item.id}
                  item={item}
                  onSumar={() => onSumar(idx)}
                  onRestar={() => onRestar(idx)}
                  onEliminar={() => onEliminar(idx)}
                  mostrarSubtotal
                  temaOscuro={temaOscuro}
                />
              ))}
            </div>
          </div>

          {/* Cupón de Descuento */}
          <div className="card p-6">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Cupón de Descuento
            </h3>
            <CuponDescuento onAplicar={onAplicarCupon} />
            {cupon && (
              <div 
                className="mt-3 p-3 rounded-lg text-sm"
                style={{ backgroundColor: 'var(--success-500)', color: 'white' }}
              >
                ✅ Cupón "{cupon.codigo}" aplicado
              </div>
            )}
          </div>
        </div>

        {/* Formulario de Compra */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 
              className="text-xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Información de Envío
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="input-modern"
                  required
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-modern"
                  required
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="input-modern"
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Dirección de envío *
                </label>
                <textarea
                  placeholder="Calle, número, barrio, ciudad"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="input-modern h-20 resize-none"
                  required
                />
              </div>

              {mensaje && (
                <div 
                  className={`p-3 rounded-lg text-sm ${
                    mensaje.includes('éxito') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {mensaje}
                </div>
              )}

              <button
                type="submit"
                disabled={procesando}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  procesando ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: procesando ? 'var(--text-tertiary)' : 'var(--primary-500)',
                  color: 'white'
                }}
              >
                {procesando ? 'Procesando...' : `Comprar por ${formatearPrecio(total)}`}
              </button>
            </form>
          </div>

          {/* Resumen de Costos */}
          <div className="card p-6">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Resumen de Costos
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                <span style={{ color: 'var(--text-primary)' }}>{formatearPrecio(subtotal)}</span>
              </div>
              
              {descuento > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento:</span>
                  <span>-{formatearPrecio(descuento)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Envío:</span>
                <span style={{ color: envioGratis ? 'var(--success-500)' : 'var(--text-primary)' }}>
                  {envioGratis ? 'Gratis' : formatearPrecio(envio)}
                </span>
              </div>
              
              <hr style={{ borderColor: 'var(--border-primary)' }} />
              
              <div className="flex justify-between text-lg font-semibold">
                <span style={{ color: 'var(--text-primary)' }}>Total:</span>
                <span style={{ color: 'var(--primary-600)' }}>{formatearPrecio(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
