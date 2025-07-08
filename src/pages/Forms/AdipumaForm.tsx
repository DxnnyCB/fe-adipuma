import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ProductWizard from "../../components/product/add-forms/ProductWizard";

export default function AdipumaForm() {
  return (
    <div>
      <PageMeta
        title="Adipuma Sports"
        description="Dashboard - Adipuma Sports"
      />
      <PageBreadcrumb
        pageTitle="Agregar ropa"
        breadcrumbs={[
          { label: "Listado de ropa", to: "/product-table" },
          { label: "Agregar ropa" },
        ]}
      />
      <div className="space-y-6">
        <ProductWizard />
      </div>
    </div>
  );
}
