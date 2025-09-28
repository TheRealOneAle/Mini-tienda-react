import React from "react";
import BarraBusqueda from "../componentes/BarraBusqueda";
import CuadriculaProductos from "../componentes/CuadriculaProductos";

export default function Catalogo({
  productos,
  busqueda,
  setBusqueda,
  categoriaFiltro,
  setCategoriaFiltro,
  categorias,
  onAgregar,
  temaOscuro,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Descubre Nuestros Productos
        </h1>
        <p 
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Encuentra los mejores productos con la mejor calidad y los precios más competitivos del mercado
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <BarraBusqueda
            valor={busqueda}
            onChange={setBusqueda}
            temaOscuro={temaOscuro}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaFiltro(categoria)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                categoriaFiltro === categoria
                  ? "text-white shadow-lg transform scale-105"
                  : "hover:scale-105"
              }`}
              style={{
                backgroundColor: categoriaFiltro === categoria 
                  ? 'var(--primary-500)' 
                  : 'var(--bg-secondary)',
                color: categoriaFiltro === categoria 
                  ? 'white' 
                  : 'var(--text-secondary)',
                border: `2px solid ${categoriaFiltro === categoria ? 'var(--primary-500)' : 'var(--border-primary)'}`
              }}
            >
              {categoria === "todas" ? "Todos los productos" : categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-center">
        <p 
          className="text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {productos.length} {productos.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          {busqueda && ` para "${busqueda}"`}
          {categoriaFiltro !== "todas" && ` en ${categoriaFiltro}`}
        </p>
      </div>

      {/* Products Grid */}
      <CuadriculaProductos
        productos={productos}
        onAgregar={onAgregar}
        temaOscuro={temaOscuro}
      />

      {/* Empty State */}
      {productos.length === 0 && (
        <div className="text-center py-16">
          <div 
            className="text-6xl mb-4"
            style={{ color: 'var(--text-tertiary)' }}
          >
            🔍
          </div>
          <h3 
            className="text-xl font-semibold mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            No se encontraron productos
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Intenta ajustar tus filtros de búsqueda o categoría
          </p>
        </div>
      )}
    </div>
  );
}
