import React from "react";
import { useQuery } from "react-query";
import DrawerComponent from "../../components/DrawerComponent";
import TableProductsComponent from "../../components/TableProductsComponent";
import { Box, Button, Typography } from "@mui/material";
import categoriasService from "../../async/services/get/categoriasService";
import productosService from "../../async/services/get/productosService";
import TableCategoriasComponent from "../../components/TableCategoriasComponent";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function Almacenes() {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery(`sectionsProducts`, () =>
    productosService()
  );

  const {
    data: categorias,
    isLoading: isLoadingCategorias,
    isError,
    refetch: refetchCategoria,
  } = useQuery("categorias", categoriasService);

  const handleButtonClick = () => {
    navigate("/almacenes/crear");
  };

  return (
    <DrawerComponent>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component={"h2"}
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "1rem 0 1.5rem 0",
          }}
        >
          Inventario
        </Typography>
        {/* {!isLoading ? (
          <TableProductsComponent productos={data} refetchProducts={refetch} />
        ) : null} */}
        {!isLoading ? (
          Array.isArray(data) && data.length > 0 ? (
            <TableProductsComponent
              productos={data}
              refetchProducts={refetch}
            />
          ) : (
            <Typography variant="body1">
              Aún no existen productos registrados.
            </Typography>
          )
        ) : null}

        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleButtonClick}
          >
            Crear Nueva Compra
          </Button>
        </Box>

        <Typography
          component={"h2"}
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "1rem 0 1.5rem 0",
          }}
        >
          Categorias
        </Typography>

        {!isLoadingCategorias ? (
          Array.isArray(categorias) && categorias.length > 0 ? (
            <TableCategoriasComponent
              categorias={categorias}
              refetchCategorias={refetchCategoria}
            />
          ) : (
            <Typography variant="body1">Aún no existen categorías.</Typography>
          )
        ) : null}
      </Box>
    </DrawerComponent>
  );
}

export default Almacenes;
