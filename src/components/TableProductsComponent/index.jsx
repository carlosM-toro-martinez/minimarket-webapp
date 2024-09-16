import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import EnhancedTableHead from "./EnhancedTableHead";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalViewProduct from "./ModalViewProduct";
import useStyles from "./table.styles";
import productoDeleteServices from "../../async/services/delete/productoDeleteServices";

const ITEM_HEIGHT = 48;

export default function TableProductsComponent({ productos, refetchProducts }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedidProducto, setSelectedIdProduct] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = productos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/almacenes/crear");
  };

  const handleOpenUpdateModal = () => {
    handleCloseMenu();
    setOpenUpdateModal(true);
  };

  const handleOpenViewModal = () => {
    handleCloseMenu();
    setOpenViewModal(true);
  };

  const handleCloseModals = () => {
    setOpenUpdateModal(false);
    setOpenViewModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    productoDeleteServices(selectedidProducto);
    handleCloseMenu();
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isEvenRow = index % 2 === 0;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id_producto}
                    className={isEvenRow ? classes.evenRow : classes.oddRow}
                  >
                    <TableCell align="left">{row.nombre || "N/A"}</TableCell>
                    <TableCell align="left">
                      {row.codigo_barra || "N/A"}
                    </TableCell>
                    <TableCell align="left">{row.categoria || "N/A"}</TableCell>
                    <TableCell align="right">
                      {row.precio !== null ? row.precio : "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      {row.stock !== null ? row.stock : "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="more"
                        aria-haspopup="true"
                        onClick={(e) => {
                          handleClick(e);
                          setSelectedProduct(row);
                          setSelectedIdProduct(row.id_producto);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch",
                          },
                        }}
                      >
                        <MenuItem onClick={() => handleOpenUpdateModal()}>
                          <EditIcon /> Editar
                        </MenuItem>
                        <MenuItem onClick={() => handleOpenViewModal()}>
                          <VisibilityIcon /> Ver
                        </MenuItem>
                        {/* <MenuItem onClick={handleDeleteProduct}>
                          <DeleteIcon /> Eliminar
                        </MenuItem> */}
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={productos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleButtonClick}
        >
          Crear Nueva Compra
        </Button>
      </div>

      {openUpdateModal && (
        <ModalUpdateProduct
          product={selectedProduct}
          handleClose={handleCloseModals}
          refetchProducts={refetchProducts}
        />
      )}
      {openViewModal && (
        <ModalViewProduct
          product={selectedProduct}
          handleClose={handleCloseModals}
        />
      )}
    </Box>
  );
}

TableProductsComponent.propTypes = {
  productos: PropTypes.array.isRequired,
};

{
  /* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="acortar"
      /> */
}
