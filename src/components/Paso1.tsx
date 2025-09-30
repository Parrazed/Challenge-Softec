import { useState, useRef, type JSX } from "react";
import Card from "./Card";
import Planes from "./Planes";
import usuarios from "../assets/usuario.png";
import otros from "../assets/otros.png";
import { BiLaptop } from "react-icons/bi";
import Casa from "../assets/casa.png";
import Clinica from "../assets/clinica.png";
import { FaUserDoctor } from "react-icons/fa6";
import { BsHospital } from "react-icons/bs";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import type { DatosResumen } from "./Paso2";
interface UserData {
  name: string;
  lastName: string;
  celular: string;
  edad: number;
  numeroDocumento: string;
  tipoDocumento: string;
}

interface UserPlan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

interface UIPlan {
  id: number;
  cardId: number;
  titulo: string;
  edad: number;
  detalles: { titulo: string; icon: JSX.Element | null; texto: string }[];
  precioAhora: number;
  precioAntes?: number;
  image: string;
  recomendado: boolean;
}

interface Paso1Props {
  datos: UserData;
  plan: UserPlan[];
  next: (seleccionados: DatosResumen) => void;
}

const extras: Record<string, { image: string; recomendado: boolean }> = {
  "Plan en Casa": { image: Casa, recomendado: false },
  "Plan en Casa y Clínica": { image: Clinica, recomendado: true },
  "Plan en Casa + Bienestar": { image: Casa, recomendado: false },
  "Plan en Casa + Chequeo": { image: Casa, recomendado: false },
  "Plan en Casa + Fitness": { image: Casa, recomendado: false },
};

function mapToUIPlan(plan: UserPlan, id: number, cardId: number): UIPlan {
  const extra = extras[plan.name] ?? { image: Casa };

  return {
    id,
    cardId,
    titulo: plan.name,
    edad: plan.age,
    detalles: plan.description.map((desc, idx) => ({
      titulo: `Detalle ${idx + 1}`,
      icon:
        idx === 0 ? (
          <FaUserDoctor />
        ) : idx === 1 ? (
          <BiLaptop />
        ) : (
          <BsHospital />
        ),
      texto: desc,
    })),
    precioAhora: plan.price,
    precioAntes: cardId === 2 ? plan.price : undefined,
    image: extra.image,
    recomendado: extra.recomendado,
  };
}

export default function Paso1({ datos, plan, next }: Paso1Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const uiPlanes = plan.flatMap((p, i) => [
    mapToUIPlan(p, i + 1, 1),
    mapToUIPlan(p, i + 1 + plan.length, 2),
  ]);

  const planesPorCard = uiPlanes.reduce((acc, p) => {
    if (!acc[p.cardId]) acc[p.cardId] = [];
    acc[p.cardId].push(p);
    return acc;
  }, {} as Record<number, UIPlan[]>);

  const planesVisibles = selectedId ? planesPorCard[selectedId] || [] : [];

  const scrollToIndex = (index: number) => {
    if (scrollRef.current && planesVisibles.length) {
      const container = scrollRef.current;
      const cardWidth = container.scrollWidth / planesVisibles.length;
      container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const nextPlan = () => {
    if (currentIndex < planesVisibles.length - 1)
      scrollToIndex(currentIndex + 1);
  };

  const prevPlan = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };


  const handleSelectPlan = (seleccionado: UIPlan) => {
    if (!seleccionado) return;

    const resumen = {
      name: datos.name,
      lastName: datos.lastName,
      edad: datos.edad,
      celular: datos.celular,
      numeroDocumento: datos.numeroDocumento,
      tipoDocumento: datos.tipoDocumento,
      plan: seleccionado.titulo,
      costo: seleccionado.precioAhora,
    };

    console.log("Resumen a usar en Paso 2:", resumen);
    next(resumen);
  };

  return (
    <div className="w-full h-full px-6 pt-4 ">
      <h2 className="text-3xl sm:text-xl sm:text-center font-bold mb-4">
        {datos?.name} ¿Para quién deseas <br /> cotizar?
      </h2>
      <p className="text-lg mb-6 sm:text-base sm:text-center">
        Selecciona la opción que se ajuste más a tus necesidades.
      </p>

      <div className="flex flex-col sm:flex-row gap-8 justify-center">
        <Card
          id={1}
          imagen={usuarios}
          titulo="Para mi"
          descripcion="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
          onSelect={(id) => setSelectedId(Number(id))}
          selected={selectedId === 1}
        />
        <Card
          id={2}
          imagen={otros}
          titulo="Para alguien más"
          descripcion="Realiza una cotización para uno de tus familiares o cualquier persona."
          onSelect={(id) => setSelectedId(Number(id))}
          selected={selectedId === 2}
        />
      </div>

      {selectedId && (
        <div className="mt-10 relative ">
          <div
            ref={scrollRef}
            className="flex sm:justify-center sm:gap-16 gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {planesVisibles
              .filter((p: { edad: number; }) => p.edad >= (datos.edad ?? 0))
              .map((p: UIPlan) => (
                <div
                  key={p.id}
                  className="flex-shrink-0 w-[400px] sm:w-[250px]"
                >
                  <Planes
                    id={p.id}
                    titulo={p.titulo}
                    detelles={p.detalles}
                    precioAntes={p.precioAntes ?? 0}
                    precioAhora={p.precioAhora}
                    image={p.image}
                    edad={p.edad}
                    recomendado={p.recomendado}
                    selectedCardId={selectedId}
                    onSelect={() => handleSelectPlan(p)}
                  />
                </div>
              ))}
          </div>
          <div className="flex justify-center sm:hidden items-center gap-6 mt-4 pb-10">
            <button
              onClick={prevPlan}
              disabled={currentIndex === 0}
              className="w-10 h-10 flex justify-center items-center rounded-full bg-purple-500 text-purple-100 disabled:opacity-50"
            >
              <FaChevronCircleLeft className="w-10 h-10" />
            </button>

            <span className="text-lg font-semibold">
              {currentIndex + 1}/{planesVisibles.length}
            </span>

            <button
              onClick={nextPlan}
              disabled={currentIndex === planesVisibles.length - 1}
              className="w-10 h-10 flex justify-center items-center rounded-full bg-purple-500 text-purple-100 disabled:opacity-50"
            >
              <FaChevronCircleRight className="w-10 h-10" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
