import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";
import Inicio from "./pages/Inicio";
import Ventas from "./pages/Ventas";
import Compras from "./pages/Compras";
import MovimientoCaja from "./pages/MovimientoCaja";
import Reportes from "./pages/Reportes";
import Almacenes from "./pages/Almacenes";
import Perfil from "./pages/Perfil";
import Trabajadores from "./pages/Trabajadores";
// import CrearVenta from "./pages/ventas/CrearVenta";
// import CrearCompra from "./pages/compras/CrearCompra";
// import CrearMovimiento from "./pages/movimientos/CrearMovimiento";
// import CrearReporte from "./pages/reportes/CrearReporte";
// import CrearAlmacen from "./pages/almacenes/CrearAlmacen";
// import CrearTrabajador from "./pages/trabajadores/CrearTrabajador";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateAlmacenes from "./pages/Almacenes/CreateAlmacenes";
import MainContextProvider from "./context/MainContextProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ventas" element={<Ventas />}>
              <Route path="crear" element={<Inicio />} />
            </Route>
            {/* <Route path="/compras" element={<Compras />}>
              <Route path="crear" element={<Inicio />} />
            </Route> */}
            <Route path="/movimiento-caja" element={<MovimientoCaja />}>
              <Route path="crear" element={<Inicio />} />
            </Route>
            <Route path="/reportes" element={<Reportes />}>
              <Route path="crear" element={<Inicio />} />
            </Route>
            <Route path="/almacenes">
              <Route path="" element={<Almacenes />} />
              <Route path="crear" element={<CreateAlmacenes />} />
            </Route>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/trabajadores" element={<Trabajadores />}>
              <Route path="crear" element={<Inicio />} />
            </Route>
          </Routes>
        </Router>
      </MainContextProvider>
    </QueryClientProvider>
  );
}

export default App;
