import TarjetaProducto from "./TarjetaProducto";

export default function CuadriculaProductos({
  productos,
  onAgregar,
  temaOscuro,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productos.map((prod, index) => (
        <div 
          key={prod.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TarjetaProducto
            producto={prod}
            onAgregar={onAgregar}
            temaOscuro={temaOscuro}
          />
        </div>
      ))}
    </div>
  );
}
