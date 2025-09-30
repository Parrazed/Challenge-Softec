import { FaUser } from "react-icons/fa6";
export interface DatosResumen {
  name: string;
  lastName: string;
  edad: number;
  celular: string;
  numeroDocumento: string;
  tipoDocumento: string;
  plan: string;
  costo: number;
}

function Paso2({ datos }: { datos?: DatosResumen }) {
  if (!datos) return <p>Cargando resumen...</p>;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-4xl font-bold text-left w-full max-w-3xl mb-6">
        Resumen del seguro
      </h2>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="flex items-center gap-2 text-gray-800 font-semibold">
          <FaUser className="w-6 h-6" />
          <span>{datos.name} {datos.lastName}</span>
        </div>

        <div className="space-y-1 text-gray-700">
          <p className="font-semibold">Responsable de pago</p>
          <p>{datos.tipoDocumento}: {datos.numeroDocumento}</p>
          <p>Celular: {datos.celular}</p>
        </div>

        <div className="space-y-1 text-gray-700">
          <p className="font-semibold">Plan elegido</p>
          <p>{datos.plan}</p>
          <p>Costo del Plan: ${datos.costo} al mes</p>
        </div>
      </div>
    </div>
  );
}


export default Paso2;
