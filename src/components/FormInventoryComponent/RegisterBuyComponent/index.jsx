import React, { useState, useEffect } from "react";
import { Button, Grid, Box, Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import LoteFormComponent from "./LoteFormComponent";
import ProductoProveedorForm from "./ProductoProveedorForm";
import RegistroTableComponent from "./RegistroTableComponent";
import ProveedorModalComponent from "./ProveedorModalComponent";
import ProductoModalComponent from "./ProductoModalComponent";
import useStyles from "./RegisterBuy.styles";
import detalleCompraAddServices from "../../../async/services/post/detalleCompraAddServices";
import loteAddServices from "../../../async/services/post/loteAddServices";
import buyLoteService from "../../../async/services/get/buyLoteService";
import { useMutation, useQuery } from "react-query";

const RegisterBuyComponent = ({
  products,
  proveedores,
  refetchProducts,
  refetchProveedores,
  lotes,
  refetchLote,
}) => {
  const classes = useStyles();

  const [lote, setLote] = useState("");
  const [loteNumber, setLoteNumber] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [registroCombinado, setRegistroCombinado] = useState([]);
  const [detalleCompraId, setDetalleCompraId] = useState(null);
  const [error, setError] = useState();
  const [isLoteProveedorLocked, setIsLoteProveedorLocked] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [openProveedorModal, setOpenProveedorModal] = useState(false);
  const [openProductoModal, setOpenProductoModal] = useState(false);

  const handleOpenProveedorModal = () => setOpenProveedorModal(true);
  const handleCloseProveedorModal = () => setOpenProveedorModal(false);

  const handleOpenProductoModal = () => setOpenProductoModal(true);
  const handleCloseProductoModal = () => setOpenProductoModal(false);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const { data, refetch } = useQuery(
    ["detalle-compra", loteNumber],
    () => (loteNumber ? buyLoteService(loteNumber) : []),
    {
      enabled: true,
      onSuccess: (data) => {
        setRegistroCombinado(data);
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: `Error al obtener los datos del lote: ${error.message}`,
          severity: "error",
        });
      },
    }
  );

  useEffect(() => {
    if (loteNumber) {
      refetch();
    }
  }, [loteNumber, snackbar]);

  const getLocalDateTime = () => {
    const now = new Date();

    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now.getTime() - timezoneOffset);

    const year = localTime.getFullYear();
    const month = String(localTime.getMonth() + 1).padStart(2, "0");
    const day = String(localTime.getDate()).padStart(2, "0");

    const hours = String(localTime.getHours()).padStart(2, "0");
    const minutes = String(localTime.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const detalleCompraMutation = useMutation(detalleCompraAddServices, {
    onSuccess: (response) => {
      setDetalleCompraId(response.id_detalle);
      const newLote = {
        id_producto: producto,
        numero_lote: lote,
        fecha_ingreso: getLocalDateTime(),
        fecha_caducidad: fechaCaducidad,
        cantidad: cantidad,
        precio_unitario: precio,
        id_detalle_compra: response.id_detalle,
      };
      loteMutation.mutate(newLote);
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: `Error al guardar el detalle de compra: ${error.message}`,
        severity: "error",
      });
    },
  });

  const loteMutation = useMutation(loteAddServices, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: "Lote creado exitosamente!",
        severity: "success",
      });
      setLoteNumber(lote);
      setIsLoteProveedorLocked(true);
      setFechaIngreso("");
      setFechaCaducidad("");
      setProducto("");
      setCantidad("");
      setPrecio("");
      setDetalleCompraId(null);
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: `Error al crear el lote: ${error.message}`,
        severity: "error",
      });
    },
  });

  const handleSave = () => {
    const newBuy = {
      id_proveedor: proveedor,
      id_producto: producto,
      cantidad: cantidad,
      precio_unitario: precio,
      fecha_compra: getLocalDateTime(),
      id_trabajador: 1,
    };
    detalleCompraMutation.mutate(newBuy);
  };

  const handleFinalize = () => {
    setIsLoteProveedorLocked(false);
    setProveedor("");
    setLote("");
  };

  return (
    <Box style={{ minWidth: "100%", marginLeft: "2rem" }}>
      <Grid container spacing={6}>
        <Grid item xs={11} md={4}>
          <h3 className={classes.header}>Registro de Lote</h3>
          <ProductoProveedorForm
            proveedor={proveedor}
            setProveedor={setProveedor}
            producto={producto}
            setProducto={setProducto}
            productos={products}
            proveedores={proveedores}
            handleOpenProductoModal={handleOpenProductoModal}
            handleOpenProveedorModal={handleOpenProveedorModal}
            isLoteProveedorLocked={isLoteProveedorLocked}
          />
          <LoteFormComponent
            lote={lote}
            loteData={lotes}
            setLote={setLote}
            fechaIngreso={fechaIngreso}
            setFechaIngreso={setFechaIngreso}
            fechaCaducidad={fechaCaducidad}
            setFechaCaducidad={setFechaCaducidad}
            cantidad={cantidad}
            setCantidad={setCantidad}
            precio={precio}
            setPrecio={setPrecio}
            setError={setError}
            isLoteProveedorLocked={isLoteProveedorLocked}
          />
        </Grid>
        <Grid item xs={11} md={8}>
          <h3 className={classes.header}>Lote</h3>
          <RegistroTableComponent
            registroCombinado={registroCombinado}
            handleFinalize={handleFinalize}
            numeroLote={loteNumber}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginTop: "20px" }}
        disabled={
          detalleCompraMutation.isLoading || loteMutation.isLoading || error
        }
      >
        {detalleCompraMutation.isLoading || loteMutation.isLoading
          ? "Guardando..."
          : "Guardar"}
      </Button>

      <ProveedorModalComponent
        refetchProveedores={refetchProveedores}
        open={openProveedorModal}
        handleClose={handleCloseProveedorModal}
      />
      <ProductoModalComponent
        refetchProducts={refetchProducts}
        open={openProductoModal}
        handleClose={handleCloseProductoModal}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterBuyComponent;