import React, { useEffect } from "react";
import productosService from "../../async/services/get/productosService";
import { useQuery } from "react-query";
import DashboardComponent from "../../components/DashboardComponent";
import FormProduct from "../../components/FormProductComponent";
import DrawerComponent from "../../components/DrawerComponent";
import TableProductsComponent from "../../components/TableProductsComponent";

function MovimientoCaja() {
  // const { data, isLoading, error, refetch } = useQuery(`sectionsProducts`, () =>
  //   productosService()
  // );
  // useEffect(() => {
  //   console.log(data);
  // }, [isLoading]);
  return (
    <>
      <DrawerComponent>
        {/* {!isLoading ? <TableProductsComponent productos={data} /> : null}
        <FormProduct /> */}
        <div>caja</div>
      </DrawerComponent>
    </>
  );
}

export default MovimientoCaja;
