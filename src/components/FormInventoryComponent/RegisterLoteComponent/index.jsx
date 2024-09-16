import React, { useState } from "react";
import { TextField } from "@material-ui/core";

function RegisterLoteComponent() {
  const [lote, setLote] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState("");

  return (
    <div>
      <TextField
        label="Número de Lote"
        fullWidth
        value={lote}
        onChange={(e) => setLote(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Fecha de Ingreso"
        fullWidth
        type="date"
        value={fechaIngreso}
        onChange={(e) => setFechaIngreso(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Fecha de Caducidad"
        fullWidth
        type="date"
        value={fechaCaducidad}
        onChange={(e) => setFechaCaducidad(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
    </div>
  );
}

export default RegisterLoteComponent;
