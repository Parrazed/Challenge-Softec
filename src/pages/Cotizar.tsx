import Header from "../components/Header";
import { useState, useEffect, lazy, Suspense, startTransition } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Paso1 = lazy(() => import("../components/Paso1"));
const Paso2 = lazy(() => import("../components/Paso2"));

export default function Cotizar() {
  const [step, setStep] = useState(1);
  const [datos, setDatos] = useState<any[]>([]);
  const [_datosPaso1, setDatosPaso1] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("formData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDatos(Array.isArray(parsed) ? parsed : [parsed]);
    }
  }, []);

  const handleNext = () => {
    startTransition(() => setStep(Math.min(2, step + 1)));
  };

  const handleBack = () => {
    startTransition(() => setStep(Math.max(1, step - 1)));
  };

  return (
    <div className="w-full h-full text-black min-h-screen relative">
      <Header />
      <div className="w-full p-4 ms:p-2 relative flex items-center bg-violet-100">
        {step === 2 ? (
          <div className="sm:absolute sm:-bottom-14 sm:left-44 flex items-center gap-2 ">
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
      </div>
      <hr className="border-t border-neutral-300 my-2 sm:hidden w-full" />
      <div className="">
        <Suspense fallback={<p>Cargando paso...</p>}>
          {step === 1 && (
            <Paso1
              datos={datos}
              next={(d: any[]) => {
                setDatosPaso1(d);
                startTransition(() => setStep(2));
              }}
            />
          )}
          {step === 2 && <Paso2  />}
        </Suspense>
      </div>
    </div>
  );
}
