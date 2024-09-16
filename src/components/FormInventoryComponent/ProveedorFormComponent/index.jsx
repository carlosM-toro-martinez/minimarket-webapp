import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import useStyles from "./ProveedorForm.styles";

const ProveedorFormComponent = ({ onSubmit }) => {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para registrar o seleccionar un proveedor
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre del Proveedor"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Teléfono" variant="outlined" required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Email" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Dirección" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Registrar Proveedor
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProveedorFormComponent;
