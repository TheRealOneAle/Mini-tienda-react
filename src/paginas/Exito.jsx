import React, { useEffect, useState } from "react";

export default function Exito({ onNavegar, temaOscuro }) {
  const [contador, setContador] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setContador((prev) => {
        if (prev <= 1) {
          onNavegar("catalogo");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNavegar]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center animate-fade-in">
        {/* Success Animation */}
        <div className="mb-8">
          <div 
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl animate-bounce"
            style={{ backgroundColor: 'var(--success-500)' }}
          >
            ✅
          </div>
        </div>

        {/* Success Message */}
        <h1 
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: 'var(--success-500)' }}
        >
          ¡Compra Exitosa!
        </h1>
        
        <p 
          className="text-xl md:text-2xl mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Gracias por confiar en nosotros
        </p>
        
        <p 
          className="text-lg mb-8 max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación 
          con todos los detalles de tu compra y el número de seguimiento.
        </p>

        {/* Order Details Card */}
        <div className="card p-8 mb-8 max-w-2xl mx-auto">
          <h2 
            className="text-2xl font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Detalles de tu Pedido
          </h2>
          
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center">
              <span style={{ color: 'var(--text-secondary)' }}>Número de pedido:</span>
              <span 
                className="font-mono font-semibold"
                style={{ color: 'var(--primary-600)' }}
              >
                #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span style={{ color: 'var(--text-secondary)' }}>Fecha:</span>
              <span style={{ color: 'var(--text-primary)' }}>
                {new Date().toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span style={{ color: 'var(--text-secondary)' }}>Estado:</span>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--success-100)',
                  color: 'var(--success-700)'
                }}
              >
                Confirmado
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span style={{ color: 'var(--text-secondary)' }}>Tiempo estimado de entrega:</span>
              <span style={{ color: 'var(--text-primary)' }}>3-5 días hábiles</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card p-6 mb-8 max-w-2xl mx-auto">
          <h3 
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Próximos Pasos
          </h3>
          
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-0.5"
                style={{ backgroundColor: 'var(--primary-500)' }}
              >
                1
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                Recibirás un correo de confirmación en los próximos minutos
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-0.5"
                style={{ backgroundColor: 'var(--primary-500)' }}
              >
                2
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                Procesaremos tu pedido y lo prepararemos para envío
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-0.5"
                style={{ backgroundColor: 'var(--primary-500)' }}
              >
                3
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                Te enviaremos el número de seguimiento cuando sea despachado
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavegar("catalogo")}
            className="btn-primary px-8 py-3"
          >
            Continuar Comprando
          </button>
          
          <button
            onClick={() => window.print()}
            className="btn-secondary px-8 py-3"
          >
            Imprimir Recibo
          </button>
        </div>

        {/* Auto Redirect Notice */}
        <div 
          className="mt-8 p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <p 
            className="text-sm"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Serás redirigido automáticamente al catálogo en {contador} segundos
          </p>
        </div>
      </div>
    </div>
  );
}
