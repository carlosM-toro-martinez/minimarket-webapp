import React, { useEffect, useState } from "react";
import { TextField, Box } from "@material-ui/core";

const LoteFormComponent = ({
  lote,
  setLote,
  fechaCaducidad,
  setFechaCaducidad,
  cantidad,
  setCantidad,
  precio,
  setPrecio,
  loteData,
  setError,
  isLoteProveedorLocked,
}) => {
  const [errors, setErrors] = useState({
    lote: false,
    fechaIngreso: false,
    fechaCaducidad: false,
    cantidad: false,
    precio: false,
    loteExists: false,
  });

  useEffect(() => {
    validateForm();
  }, [lote, fechaCaducidad, cantidad, precio]);

  const validateForm = () => {
    let newErrors = {
      lote: false,
      fechaCaducidad: false,
      cantidad: false,
      precio: false,
      loteExists: false,
    };

    let hasErrors = false;

    if (
      loteData?.some((item) => item.numero_lote === lote) &&
      !isLoteProveedorLocked
    ) {
      newErrors.loteExists = true;
      hasErrors = true;
    }

    if (!lote && !isLoteProveedorLocked) {
      newErrors.lote = true;
      hasErrors = true;
    }
    if (!fechaCaducidad) {
      newErrors.fechaCaducidad = true;
      hasErrors = true;
    }
    if (!cantidad) {
      newErrors.cantidad = true;
      hasErrors = true;
    }
    if (!precio) {
      newErrors.precio = true;
      hasErrors = true;
    }

    setErrors(newErrors);
    setError(hasErrors);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        label="Número de Lote"
        fullWidth
        value={lote}
        onChange={(e) => {
          if (!isLoteProveedorLocked) {
            setLote(e.target.value);
          }
        }}
        margin="normal"
        error={errors.lote || errors.loteExists}
        helperText={
          errors.loteExists
            ? "Error: Ese número de lote ya existe"
            : errors.lote
            ? "Este campo es requerido"
            : ""
        }
        disabled={isLoteProveedorLocked}
      />
      <TextField
        label="Fecha de Caducidad"
        fullWidth
        type="date"
        value={fechaCaducidad}
        onChange={(e) => setFechaCaducidad(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={errors.fechaCaducidad}
        helperText={errors.fechaCaducidad && "Este campo es requerido"}
      />
      <Box style={{ display: "flex", gap: 30 }}>
        <TextField
          label="Cantidad"
          fullWidth
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          margin="normal"
          error={errors.cantidad}
          helperText={errors.cantidad && "Este campo es requerido"}
        />
        <TextField
          label="Precio Unitario"
          fullWidth
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          margin="normal"
          error={errors.precio}
          helperText={errors.precio && "Este campo es requerido"}
        />
      </Box>
    </Box>
  );
};

export default LoteFormComponent;
