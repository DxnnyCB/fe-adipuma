import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function WelcomeBanner() {
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const nombre = localStorage.getItem("nombreUsuario");
    if (nombre) setNombreUsuario(nombre);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-6 py-6">
      <Link to="/">
        <img
          width={231}
          height={48}
          src="/images/logo/puma.png"
          alt="Logo Adipuma"
        />
      </Link>

      <div className="text-left">
        {nombreUsuario && (
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Hola, <span className="font-semibold">{nombreUsuario}</span> 👋
          </p>
        )}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Bienvenido a <span className="text-blue-600">Adipuma</span>
        </h1>
      </div>
    </div>
  );
}
