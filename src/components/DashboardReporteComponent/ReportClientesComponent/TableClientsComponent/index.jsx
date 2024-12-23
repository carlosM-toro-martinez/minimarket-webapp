import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function TableClientsComponent({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: "#3d97ef" }}>
          <TableRow>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              ID Cliente
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Nombre
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Apellido
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Código
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Puntos Fidelidad
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Total Gastado
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((cliente) => (
            <TableRow key={cliente.id_cliente}>
              <TableCell>{cliente.id_cliente}</TableCell>
              <TableCell>{cliente.nombre}</TableCell>
              <TableCell>{cliente.apellido || "N/A"}</TableCell>
              <TableCell>{cliente.codigo || "N/A"}</TableCell>
              <TableCell style={{color: 'green'}} >{cliente.puntos_fidelidad}</TableCell>
              <TableCell style={{color: 'green'}} >{cliente.total_gastado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableClientsComponent;