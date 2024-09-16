import React, { useEffect } from "react";
import productosService from "../../async/services/get/productosService";
import { useQuery } from "react-query";
import DashboardComponent from "../../components/DashboardComponent";
import FormProduct from "../../components/FormProductComponent";
import DrawerComponent from "../../components/DrawerComponent";
import TableProductsComponent from "../../components/TableProductsComponent";

function Almacenes() {
  const { data, isLoading, error, refetch } = useQuery(`sectionsProducts`, () =>
    productosService()
  );
  return (
    <>
      <DrawerComponent>
        {!isLoading ? (
          <TableProductsComponent productos={data} refetchProducts={refetch} />
        ) : null}
        {/* <FormProduct /> */}
      </DrawerComponent>
    </>
  );
}

export default Almacenes;
