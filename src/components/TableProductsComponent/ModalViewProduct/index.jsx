import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import productosInventarioService from "../../../async/services/get/productosInventarioService";
import { useQuery } from "react-query";

function ModalViewProduct({ handleClose, product }) {
  const { data, isLoading, error } = useQuery(
    `InventarioProducts`,
    () => productosInventarioService(product?.id_producto),
    {
      enabled: !!product?.id_producto,
    }
  );

  if (isLoading) {
    return (
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Ver Producto</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography color="error">
            Ocurrió un error al cargar los inventarios. Por favor, intenta de
            nuevo.
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Ver Producto</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Producto: {data.producto}</Typography>
        <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número de Lote</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Fecha de Caducidad</TableCell>
                <TableCell>Fecha de Ingreso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.inventarios.map((inventario, index) => (
                <TableRow key={index}>
                  <TableCell>{inventario.numero_lote}</TableCell>
                  <TableCell>{inventario.cantidad}</TableCell>
                  <TableCell>
                    {new Date(inventario.fecha_caducidad).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(inventario.fecha_ingreso).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalViewProduct;
