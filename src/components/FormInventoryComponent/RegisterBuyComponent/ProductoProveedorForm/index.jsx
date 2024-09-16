import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const ProductoProveedorForm = ({
  proveedor,
  setProveedor,
  producto,
  setProducto,
  productos,
  proveedores,
  handleOpenProductoModal,
  handleOpenProveedorModal,
  isLoteProveedorLocked,
}) => {
  return (
    <Box style={{ display: "flex", gap: 30 }}>
      <FormControl fullWidth>
        <InputLabel>Proveedor</InputLabel>
        <Select
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          disabled={isLoteProveedorLocked}
        >
          {proveedores.map((proveedor) => (
            <MenuItem
              key={proveedor.id_proveedor}
              value={proveedor.id_proveedor}
            >
              {proveedor.nombre}
            </MenuItem>
          ))}

          <Button
            onClick={handleOpenProveedorModal}
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
            disabled={isLoteProveedorLocked}
          >
            <AddCircleOutlineIcon color="red" />
          </Button>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Producto</InputLabel>
        <Select value={producto} onChange={(e) => setProducto(e.target.value)}>
          {productos.map((product) => (
            <MenuItem key={product.id_producto} value={product.id_producto}>
              {product.nombre}
            </MenuItem>
          ))}
          <Button
            onClick={handleOpenProductoModal}
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <AddCircleOutlineIcon />
          </Button>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductoProveedorForm;
