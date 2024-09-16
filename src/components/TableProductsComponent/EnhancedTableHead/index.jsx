import React from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import useStyles from "../table.styles";

const headCells = [
  { id: "nombre", numeric: false, disablePadding: false, label: "Nombre" },
  {
    id: "codigo_barra",
    numeric: false,
    disablePadding: false,
    label: "Código de Barras",
  },
  {
    id: "categoria",
    numeric: false,
    disablePadding: false,
    label: "Categoría",
  },
  { id: "precio", numeric: true, disablePadding: false, label: "Precio" },
  { id: "stock", numeric: true, disablePadding: false, label: "Stock" },
  { id: "actions", numeric: true, disablePadding: false, label: "Acciones" },
];

const EnhancedTableHead = () => {
  const classes = useStyles();

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            className={classes.tableHeadText}
          >
            <TableSortLabel
              className={classes.tableHeadText}
              sx={{ color: "#c0c0c0" }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

export default EnhancedTableHead;
