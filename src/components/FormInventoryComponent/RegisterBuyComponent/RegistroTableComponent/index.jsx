import React, { useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import productoUpdateServices from "../../../../async/services/put/productoUpdateServices";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegistroTableComponent = ({
  registroCombinado,
  handleFinalize,
  numeroLote,
}) => {
  const buyLote = registroCombinado;
  const prevRegistroCombinadoLength = useRef(registroCombinado.length);
  const navigate = useNavigate();

  useEffect(() => {
    if (registroCombinado.length > prevRegistroCombinadoLength.current) {
      const data = registroCombinado[registroCombinado.length - 1];
      const nuevoData = {
        ...data,
        tipo_movimiento: "compra",
        id_trabajador: 1,
      };
      productoUpdateServices(nuevoData?.producto?.id_producto, nuevoData);

      prevRegistroCombinadoLength.current = registroCombinado.length;
    }
  }, [registroCombinado]);

  const calcularPrecioTotal = (registro) =>
    registro.cantidad * registro.detalleCompra.precio_unitario;

  const calcularSumaTotal = () =>
    buyLote.reduce(
      (total, registro) => total + calcularPrecioTotal(registro),
      0
    );

  const handleRoute = () => {
    handleFinalize();
    navigate("/almacenes");
  };

  return (
    <Box sx={{ width: "93%" }}>
      {numeroLote && (
        <Typography variant="h6" component="div" gutterBottom>
          Número de Lote: {numeroLote}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha Caducidad</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Precio Unitario</TableCell>
              <TableCell>Precio Total</TableCell> {/* Nueva columna */}
            </TableRow>
          </TableHead>
          <TableBody>
            {buyLote.map((registro, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(registro?.fecha_caducidad).toLocaleDateString()}
                </TableCell>
                <TableCell>{registro?.cantidad}</TableCell>
                <TableCell>{registro?.producto?.nombre}</TableCell>
                <TableCell>
                  {registro?.detalleCompra?.proveedor?.nombre}
                </TableCell>
                <TableCell>
                  {registro?.detalleCompra?.precio_unitario} Bs
                </TableCell>
                <TableCell>
                  {calcularPrecioTotal(registro).toFixed(2)} Bs{" "}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={5}
                align="right"
                style={{ fontWeight: "bold" }}
              >
                Suma Total:
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {calcularSumaTotal().toFixed(2)} Bs
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRoute}
          style={{ marginTop: "20px" }}
        >
          {buyLote.length > 0 ? "Finalizar" : "Cancelar"}
        </Button>
      </div>
    </Box>
  );
};

export default RegistroTableComponent;
