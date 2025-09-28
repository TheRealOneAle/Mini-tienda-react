import React, { useState, useEffect } from "react";
import Encabezado from "./componentes/Encabezado";
import Catalogo from "./paginas/Catalogo";
import Pago from "./paginas/Pago";
import Exito from "./paginas/Exito";
import productosData from "./datos/productos";

export default function App() {
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [pagina, setPagina] = useState("catalogo");
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [cupon, setCupon] = useState(null);
  const [notificacion, setNotificacion] = useState(null);

  useEffect(() => {
    const html = document.documentElement;
    if (temaOscuro) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [temaOscuro]);

  // Filtrar productos por búsqueda y categoría
  const productos = productosData.filter((p) => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro === "todas" || p.categoria === categoriaFiltro;
    return coincideBusqueda && coincideCategoria;
  });

  // Obtener categorías únicas
  const categorias = ["todas", ...new Set(productosData.map(p => p.categoria))];

  const mostrarNotificacion = (mensaje, tipo = "success") => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3000);
  };

  const handleAgregar = (producto) => {
    const idx = carrito.findIndex((item) => item.id === producto.id);
    let nuevoCarrito;
    
    if (idx !== -1) {
      nuevoCarrito = [...carrito];
      nuevoCarrito[idx].cantidad = (nuevoCarrito[idx].cantidad || 1) + (producto.cantidad || 1);
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: producto.cantidad || 1 }];
    }
    
    setCarrito(nuevoCarrito);
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, "success");
  };

  const handleSumar = (idx) => {
    setCarrito((prev) => {
      const nuevo = [...prev];
      nuevo[idx].cantidad += 1;
      return nuevo;
    });
  };

  const handleRestar = (idx) => {
    setCarrito((prev) => {
      const nuevo = [...prev];
      if (nuevo[idx].cantidad > 1) {
        nuevo[idx].cantidad -= 1;
        return nuevo;
      } else {
        return nuevo.filter((_, i) => i !== idx);
      }
    });
  };

  const handleEliminar = (idx) => {
    setCarrito((prev) => prev.filter((_, i) => i !== idx));
    mostrarNotificacion("Producto eliminado del carrito", "info");
  };

  const handleAplicarCupon = (codigo, datosCupon) => {
    setCupon(datosCupon ? { ...datosCupon, codigo } : null);
    mostrarNotificacion(datosCupon ? "Cupón aplicado" : "Cupón inválido", datosCupon ? "success" : "error");
  };

  const handleComprar = (datosCompra) => {
    setCarrito([]);
    setCupon(null);
    setPagina("exito");
    mostrarNotificacion("¡Compra realizada con éxito!", "success");
  };

  const handleNavegar = (destino) => {
    setPagina(destino);
  };

  const cantidadTotalCarrito = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Notificación Toast */}
      {notificacion && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg animate-fade-in ${
          notificacion.tipo === 'success' ? 'bg-green-500 text-white' :
          notificacion.tipo === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notificacion.mensaje}
        </div>
      )}

      <Encabezado
        temaOscuro={temaOscuro}
        onTema={() => setTemaOscuro((t) => !t)}
        onNavegar={handleNavegar}
        paginaActual={pagina}
        cantidadCarrito={cantidadTotalCarrito}
      />

      <main className="min-h-screen">
        {pagina === "catalogo" && (
          <Catalogo
            productos={productos}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            categoriaFiltro={categoriaFiltro}
            setCategoriaFiltro={setCategoriaFiltro}
            categorias={categorias}
            onAgregar={handleAgregar}
            temaOscuro={temaOscuro}
          />
        )}
        {pagina === "pago" && (
          <Pago
            carrito={carrito}
            onSumar={handleSumar}
            onRestar={handleRestar}
            onEliminar={handleEliminar}
            cupon={cupon}
            onAplicarCupon={handleAplicarCupon}
            onComprar={handleComprar}
            temaOscuro={temaOscuro}
          />
        )}
        {pagina === "exito" && (
          <Exito 
            onNavegar={handleNavegar}
            temaOscuro={temaOscuro}
          />
        )}
      </main>
    </div>
  );
}
