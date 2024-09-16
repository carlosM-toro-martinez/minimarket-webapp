import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import useStyles from "./loteForm.styles";

const LoteFormComponent = ({ onSubmit }) => {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para registrar el lote
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Número de Lote"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha de Ingreso"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha de Caducidad"
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Cantidad Total"
            variant="outlined"
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Registrar Lote
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoteFormComponent;
