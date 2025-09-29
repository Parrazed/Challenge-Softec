import type { ReactNode } from "react";
import { FaCircle } from "react-icons/fa";

interface Detalle {
  icon: ReactNode;
  titulo: ReactNode;
  texto: ReactNode;
}

interface PlanesProps {
  id: Number;
  titulo: string;
  image: string;
  precioAntes: number;
  precioAhora: number;
  selectedCardId: number | null;
  recomendado: boolean;
  detelles: Detalle[];
}

function Planes({
  detelles,
  image,
  precioAntes,
  precioAhora,
  titulo,
  recomendado,
}: PlanesProps) {
  return (
    <div className="h-[800px] w-[400px] sm:h-[600px] sm:w-[280px] relative flex flex-col p-4 bg-white shadow-md rounded-3xl cursor-pointer transition-shadow my-10 items-center">
      <div className="flex mt-20">
        {recomendado && (
          <span className="absolute top-16 left-8 bg-[#7df0ba] text-black px-2 py-1 text-xs font-bold rounded-lg">
            Plan recomendado
          </span>
        )}
        <div className="w-2/3 px-5">
          <h1 className="font-bold text-3xl sm:text-lg mb-4">{titulo}</h1>
          <p className="text-sm sm:text-xs text-neutral-500">COSTO DEL PLAN</p>
          {precioAntes > 0 && (
            <p className="text- sm:text-xs text-neutral-500 line-through">
              ${precioAntes} antes
            </p>
          )}

          <p className="text-2xl sm:text-lg font-bold"> ${precioAhora} ahora</p>
        </div>
        <div className="w-1/3">
          <img
            src={image}
            alt={titulo}
            className=" object-cover rounded-md mb-2"
          />
        </div>
      </div>
      <hr className="border-t border-neutral-300 my-2 w-full" />
      <div className="flex flex-col gap-4 px-5">
        {detelles.map((detalle, index) => (
          <div key={index} className="flex gap-4 items-center mt-5 sm:mt-2">
            <div>
              <FaCircle className="hidden sm:inline-block text-black w-4 h-4 sm:w-2 sm:h-2 mt-1" />
              <span className="sm:hidden">{detalle.icon}</span>
            </div>
            <div className="text-lg sm:text-sm">
              <span className="font-bold">{detalle.titulo}</span>{" "}
              {detalle.texto}
            </div>
          </div>
        ))}
      </div>

      <button className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4  bg-[#f60732] rounded-full h-12 mt-20 mb-4 text-white m-auto ">
        <span className="text-lg">Seleccionar un Plan</span>
      </button>
    </div>
  );
}

export default Planes;
