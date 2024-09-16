import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Snackbar } from "@mui/material";
import { useMutation } from "react-query";
import Alert from "@mui/material/Alert";
import useStyles from "./formProduct.styles";
import productsAddService from "../../async/services/post/productsAddServices";
import productoOneUpdateServices from "../../async/services/put/productoOneUpdateServices";

function FormProduct({ handleClose, refetchProducts, productData }) {
  const classes = useStyles();

  const [productId, setProductId] = useState(
    productData ? productData.id_producto : null
  );

  const [product, setProduct] = useState({
    nombre: productData ? productData.nombre : "",
    codigo_barra: productData ? productData.codigo_barra : "",
    categoria: productData ? productData.categoria : "",
    precio: productData ? productData.precio : "",
    stock: productData ? productData.stock : 0,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (productData) {
      setProduct({
        nombre: productData.nombre,
        codigo_barra: productData.codigo_barra,
        categoria: productData.categoria,
        precio: productData.precio,
        stock: productData.stock,
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Determinar la mutación basada en la existencia de productId
  const mutation = useMutation(
    productId
      ? () => productoOneUpdateServices(productId, product)
      : () => productsAddService(product),
    {
      onSuccess: () => {
        setSnackbar({
          open: true,
          message: productId
            ? "Producto actualizado exitosamente!"
            : "Producto creado exitosamente!",
          severity: "success",
        });
        handleClose();
        refetchProducts();
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: `Error al ${
            productId ? "actualizar" : "crear"
          } el producto: ${error.message}`,
          severity: "error",
        });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
              fullWidth
              required
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Código de Barras"
              name="codigo_barra"
              value={product.codigo_barra}
              onChange={handleChange}
              fullWidth
              required
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Categoría"
              name="categoria"
              value={product.categoria}
              onChange={handleChange}
              fullWidth
              required
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Precio"
              name="precio"
              value={product.precio}
              onChange={handleChange}
              fullWidth
              required
              className={classes.input}
              type="number"
              inputProps={{ step: "0.01" }}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              label="Stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              fullWidth
              required
              className={classes.input}
              type="number"
            />
          </Grid> */}
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              className={classes.button}
              disabled={mutation.isLoading}
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading
                ? productId
                  ? "Actualizando..."
                  : "Creando..."
                : productId
                ? "Actualizar Producto"
                : "Crear Producto"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar para mostrar mensajes */}
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
    </>
  );
}

export default FormProduct;
