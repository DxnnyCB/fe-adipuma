import React from "react";

interface Props {
  step: number; // 1 = Agregar ropa, 2 = Compra, 3 = Venta
}

const ProgressBar: React.FC<Props> = ({ step }) => {
  // Calcula el porcentaje según el paso
  const percentage = step === 1 ? 33 : step === 2 ? 66 : 100;

  // Mensaje según el paso
  const stepText =
    step === 1
      ? "Paso 1 de 3: Agregar ropa"
      : step === 2
      ? "Paso 2 de 3: Estado de Compra"
      : "Paso 3 de 3: Estado de Venta";

  return (
    <div className="w-full mb-6">
      <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-2">
        {stepText}
      </p>
    </div>
  );
};

export default ProgressBar;