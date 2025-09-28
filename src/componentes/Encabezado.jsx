import React from "react";

export default function Encabezado({
  temaOscuro,
  onTema,
  onNavegar,
  paginaActual,
  cantidadCarrito,
}) {
  return (
    <header 
      className="sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300"
      style={{
        backgroundColor: temaOscuro ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderColor: 'var(--border-primary)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Brand */}
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavegar("catalogo")}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))' }}
              >
                🛍️
              </div>
              <span 
                className="text-xl font-bold hidden sm:block"
                style={{ color: 'var(--text-primary)' }}
              >
                ShopStyle
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavegar("catalogo")}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                paginaActual === "catalogo" 
                  ? "text-white shadow-lg" 
                  : "hover:bg-opacity-10"
              }`}
              style={{
                backgroundColor: paginaActual === "catalogo" 
                  ? 'var(--primary-500)' 
                  : 'transparent',
                color: paginaActual === "catalogo" 
                  ? 'white' 
                  : 'var(--text-secondary)'
              }}
            >
              Catálogo
            </button>
            
            <button
              onClick={() => onNavegar("pago")}
              className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                paginaActual === "pago" 
                  ? "text-white shadow-lg" 
                  : "hover:bg-opacity-10"
              }`}
              style={{
                backgroundColor: paginaActual === "pago" 
                  ? 'var(--primary-500)' 
                  : 'transparent',
                color: paginaActual === "pago" 
                  ? 'white' 
                  : 'var(--text-secondary)'
              }}
            >
              <span>Carrito</span>
              {cantidadCarrito > 0 && (
                <span 
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white animate-bounce"
                  style={{ backgroundColor: 'var(--error-500)' }}
                >
                  {cantidadCarrito}
                </span>
              )}
            </button>
          </nav>

          {/* Theme Toggle y Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onTema}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
              title={`Cambiar a tema ${temaOscuro ? "claro" : "oscuro"}`}
            >
              {temaOscuro ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
              onClick={() => {
                // Mobile menu functionality could be added here
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div id="mobile-menu" className="hidden md:hidden border-t py-4" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => onNavegar("catalogo")}
              className={`px-4 py-2 rounded-lg font-medium text-left transition-all duration-200 ${
                paginaActual === "catalogo" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: paginaActual === "catalogo" ? 'var(--primary-500)' : 'transparent',
                color: paginaActual === "catalogo" ? 'white' : 'var(--text-secondary)'
              }}
            >
              Catálogo
            </button>
            <button
              onClick={() => onNavegar("pago")}
              className={`px-4 py-2 rounded-lg font-medium text-left transition-all duration-200 flex items-center justify-between ${
                paginaActual === "pago" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: paginaActual === "pago" ? 'var(--primary-500)' : 'transparent',
                color: paginaActual === "pago" ? 'white' : 'var(--text-secondary)'
              }}
            >
              <span>Carrito</span>
              {cantidadCarrito > 0 && (
                <span 
                  className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--error-500)' }}
                >
                  {cantidadCarrito}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
