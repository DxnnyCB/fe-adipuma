import { useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import ViewProduct from "../../components/product/view-product/ProductTable/ViewProduct";

export default function AdipumaTable() {
  useEffect(() => {
    document.title = "Adipuma Sports";
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="Listado de ropa" />
      <div className="space-y-6">
        <ComponentCard title="Administrar ropa">
          <ViewProduct />
        </ComponentCard>
      </div>
    </>
  );
}