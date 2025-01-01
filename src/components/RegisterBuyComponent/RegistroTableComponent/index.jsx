import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import productoUpdateServices from "../../../async/services/put/productoUpdateServices";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFReport from "./PDFReport";
import { MainContext } from "../../../context/MainContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import detalleCompraDeleteServices from "../../../async/services/delete/detalleCompraDeleteServices";
import { useMutation } from "react-query";

const RegistroTableComponent = ({
  registroCombinado,
  handleFinalize,
  numeroLote,
}) => {
  const { user } = useContext(MainContext);

  const buyLote = registroCombinado;
  buyLote.sort((a, b) => a.id_lote - b.id_lote);

  const prevRegistroCombinadoLength = useRef(buyLote.length);
  const navigate = useNavigate();
  const [infoArray, setInfoArray] = useState([]);

  useEffect(() => {
    const handleUpdate = async () => {
      if (buyLote.length > prevRegistroCombinadoLength.current) {
        const data = buyLote[buyLote.length - 1];
  
        const nuevoData = {
          ...data,
          tipo_movimiento: "compra",
          id_trabajador: user?.id_trabajador,
        };
  
        try {
          const info = await productoUpdateServices(nuevoData?.producto?.id_producto, nuevoData);
          setInfoArray((prevInfoArray) => [...prevInfoArray, info]);
        } catch (error) {
          console.error("Error al actualizar el producto:", error);
        }
  
        prevRegistroCombinadoLength.current = buyLote.length;
      }
    };
  
    handleUpdate(); 
  }, [registroCombinado, buyLote, user]);

  const calcularPrecioTotal = (registro, precioPeso) => {
    const precioUnitario = parseFloat(registro?.detalleCompra?.precio_unitario);

    if (isNaN(precioUnitario)) {
      return 0;
    }

    if (precioPeso) {
      return precioUnitario;
    } else {
      const cantidad = registro.cantidad;
      return typeof cantidad === "number" ? cantidad * precioUnitario : 0;
    }
  };

  const calcularSumaTotal = () => {
    const total = buyLote.reduce(
      (acumulado, registro) =>
        acumulado +
        (registro.cantidad > 0
          ? calcularPrecioTotal(registro)
          : calcularPrecioTotal(registro, true)),
      0
    );

    return total;
  };

  const handleRoute = () => {
    handleFinalize();
    navigate("/almacenes");
  };

  const mutation = useMutation(
    ({ id_detalle, data }) => detalleCompraDeleteServices(id_detalle, data),
    {
      onSuccess: (_, variables) => {
        const { index } = variables;
        buyLote.splice(index, 1);
        console.log('El registro se eliminó exitosamente.');
      },
      onError: (error) => {
        console.error('Error al eliminar el registro:', error);
      },
    }
  );
  

  const handleDelete = (index, registro) => {
    console.log(registro);
    console.log(infoArray);
    
    const data = {
      id_detalle: registro.detalleCompra.id_detalle,
      id_lote: registro.id_lote,
      id_inventario: infoArray[index].inventario.id_inventario,
      id_movimiento: infoArray[index].movimiento.id_movimiento,
      cantidad: registro.cantidad,
      subCantidad: registro.subCantidad,
      peso: registro.peso,
      id_producto: registro.producto.id_producto,
    }
    console.log(data);
    mutation.mutate({ id_detalle: data.id_detalle, data, index });
  }

  return (
    <Box sx={{ width: "93%" }}>
      {numeroLote && (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h6" component="div" gutterBottom>
            Número de Lote: {numeroLote}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Proveedor: {buyLote[0]?.detalleCompra?.proveedor?.nombre}
          </Typography>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table style={{
          maxHeight: "40vh", 
          overflowY: "auto",
          display: 'block',
          width: '100%',
        }}>
          <TableHead style={{ backgroundColor: "#3d97ef", width: '100%' }}>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>Producto</TableCell>
              <TableCell style={{ color: "#fff" }}>Fecha Caducidad</TableCell>
              <TableCell style={{ color: "#fff" }}>Peso</TableCell>
              <TableCell style={{ color: "#fff" }}>Cantidad</TableCell>
              <TableCell style={{ color: "#fff" }}>Precio Unitario</TableCell>
              <TableCell style={{ color: "#fff" }}>Precio Total</TableCell>
              <TableCell style={{ color: "#fff" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buyLote.map((registro, index) => (
              <TableRow key={index}>
                <TableCell style={{textTransform: 'capitalize'}} >{registro?.producto?.nombre}</TableCell>
                <TableCell>
                  {new Date(registro?.fecha_caducidad).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {registro?.peso}
                  {"Kg"}
                </TableCell>
                <TableCell>
                  {`${registro?.cantidad} - ${registro?.subCantidad}`}
                  {"u"}
                </TableCell>
                {/* <TableCell>
                  {registro?.detalleCompra?.proveedor?.nombre}
                </TableCell> */}
                <TableCell>
                  {registro?.detalleCompra?.precio_unitario} Bs
                </TableCell>
                <TableCell>
                  {registro.cantidad > 0
                    ? calcularPrecioTotal(registro).toFixed(2)
                    : calcularPrecioTotal(registro, true).toFixed(2)}{" "}
                  Bs
                </TableCell>
                <TableCell>
                    <Button onClick={() => handleDelete(index, registro)}>
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableRow>
          <TableCell
            colSpan={5}
            align="right"
            style={{ fontWeight: "bold", fontSize: '2rem' }}
          >
            Suma Total:
          </TableCell>
          <TableCell style={{ fontWeight: "bold", fontSize: '2rem' }}>
            {calcularSumaTotal().toFixed(2)} Bs
          </TableCell>
        </TableRow>
      </TableContainer>
      <Box style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRoute}
          style={{ marginTop: "20px" }}
        >
          {buyLote.length > 0 ? "Finalizar" : "Cancelar"}
        </Button>
        {buyLote.length > 0 ? (
          <PDFDownloadLink
            document={
              <PDFReport buyLote={buyLote} sumaTotal={calcularSumaTotal()} />
            }
            fileName="reporte_compra.pdf"
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Generar Reporte
            </Button>
          </PDFDownloadLink>
        ) : null}
      </Box>
    </Box>
  );
};

export default RegistroTableComponent;
