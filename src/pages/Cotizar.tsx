import Header from "../components/Header";
import { useState, useEffect, lazy, Suspense, startTransition } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { usePlanes } from "../hooks/usePlanes";
import type { DatosResumen } from "../components/Paso2";
const Paso1 = lazy(() => import("../components/Paso1"));
const Paso2 = lazy(() => import("../components/Paso2"));

export default function Cotizar() {
  const [step, setStep] = useState(1);
  const [usuario, setUsuario] = useState<any | null>(null);
  const [datosPaso1, setDatosPaso1] = useState<DatosResumen>();
  const {planes,loading,error }=usePlanes();
  
  useEffect(() => {
    const stored = localStorage.getItem("formData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUsuario(parsed);
    }
  }, []);


  const handleNext = () => {
    startTransition(() => setStep(Math.min(2, step + 1)));
  };

  const handleBack = () => {
    startTransition(() => setStep(Math.max(1, step - 1)));
  };
  if (loading) return <p>Cargando planes...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="w-full h-full text-black relative bg-gradient-to-b from-white via-neutral-50  to-purple-50">
      <Header />
      <div className="p-4 relative flex items-center bg-violet-100">
        {step === 2 ? (
          <div className="sm:absolute sm:-bottom-14 sm:left-44 flex items-center gap-2">
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-8 h-8 border-2 border-neutral-500 rounded-full"
            >
              <FaChevronLeft className="text-neutral-500" />
            </button>
            <p className="hidden sm:block text-neutral-500">Volver</p>
          </div>
        ) : (
          <div className="sm:absolute sm:-bottom-14 sm:left-44 flex items-center gap-2">
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-8 h-8 border-2 border-neutral-500 rounded-full"
            >
              <FaChevronRight className="text-neutral-500" />
            </button>
            <p className="hidden sm:block text-neutral-500">Avanzar</p>
          </div>
        )}

        <p className="font-bold sm:hidden absolute left-[23%] -translate-x-1/2 z-10">
          Paso {step} de 2
        </p>
        <div className="relative block sm:hidden left-[15%] right-0 top-1/2 -translate-y-1/2 mx-auto w-3/5 h-2 bg-indigo-200 rounded-full z-0">
          <div
            className="h-2 bg-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        <div className="hidden sm:flex items-center gap-4 mx-auto">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold
              ${
                step === 1
                  ? "bg-indigo-600 text-white"
                  : "border border-indigo-400 text-indigo-400"
              }`}
            >
              1
            </span>
            <span
              className={`font-semibold ${
                step === 1 ? "text-black" : "text-gray-400"
              }`}
            >
              Planes y coberturas
            </span>
          </div>

          <span className="text-indigo-400">·····</span>

          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold
          ${
            step === 2
              ? "bg-indigo-600 text-white"
              : "border border-indigo-400 text-indigo-400"
          }`}
            >
              2
            </span>
            <span
              className={`${
                step === 2 ? "text-black font-semibold" : "text-gray-400"
              }`}
            >
              Resumen
            </span>
          </div>
        </div>
      </div>

      <hr className="border-t border-neutral-300 my-2 sm:hidden w-full" />
      <div className="w-full h-4/6 ">
        <Suspense fallback={<p>Cargando paso...</p>}>
          {step === 1 && (
            <Paso1
              datos={usuario}
              plan={planes}
              next={(d) => {
                setDatosPaso1(d);
                startTransition(() => setStep(2));
              }}
            />
          )}
          {step === 2 && datosPaso1 && <Paso2 datos={datosPaso1}/>}
        </Suspense>
      </div>
    </div>
  );
}
