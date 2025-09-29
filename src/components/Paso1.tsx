import { useState, useRef } from "react";
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

interface UserData {
  birthDay: string;
  celular: string;
  comunicaciones: boolean;
  edad: number;
  lastName: string;
  name: string;
  numeroDocumento: string;
  privacidad: boolean;
  tipoDocumento: string;
}

interface Paso1Props {
  datos: UserData[];
  next: (seleccionados: UserData[]) => void;
}

export default function Paso1({ datos, next }: Paso1Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // índice del plan visible
  const scrollRef = useRef<HTMLDivElement>(null);

  const planes = [
    {
      id: 1,
      cardId: 2,
      titulo: "Plan en Casa",
      detalles: [
        {
          titulo: "Médico general a domicilio",
          icon: <FaUserDoctor />,
          texto: "por S/20 y medicinas cubiertas al 100%.",
        },
        {
          titulo: "Videoconsulta",
          icon: <BiLaptop />,
          texto:
            "y orientación telefónica al 100% en medicina general + pediatría.",
        },
        {
          titulo: "Indemnización",
          icon: <BsHospital />,
          texto: "de S/300 en caso de hospitalización por más de un día.",
        },
      ],
      precioAhora: 37.05,
      precioAntes: 39,
      image: Casa,
      recomendado: false,
    },
    {
      id: 2,
      cardId: 2,
      titulo: "Plan en Casa y Clínica",
      detalles: [
        {
          titulo: "Consulta en clínica",
          icon: <FaUserDoctor />,
          texto: "para cualquier especialidad.",
        },
        {
          titulo: "Medicinas y exámenes",
          icon: <BiLaptop />,
          texto: "derivados cubiertos al 80%",
        },
        {
          titulo: "más de 200 clínicas del país",
          icon: <BsHospital />,
          texto: "con atención médica completa",
        },
      ],
      precioAhora: 94.05,
      precioAntes: 99,
      image: Clinica,
      recomendado: true,
    },
    {
      id: 3,
      cardId: 2,
      titulo: "Plan en Casa + Chequeo",
      detalles: [
        {
          titulo: "Un Chequeo preventivo general",
          icon: <FaUserDoctor />,
          texto: "de manera presencial o virtual.",
        },
        {
          titulo: "Acceso a Vacunas",
          icon: <BiLaptop />,
          texto: "en el Programa del MINSA en centros privados.",
        },
        {
          titulo: "Incluye todos los beneficios del plan en casa.",
          icon: <BsHospital />,
          texto: "",
        },
      ],
      precioAhora: 46.55,
      precioAntes: 49,
      image: Casa,
      recomendado: false,
    },
    {
      id: 4,
      cardId: 1,
      titulo: "Plan en Casa",
      detalles: [
        {
          titulo: "Médico general a domicilio",
          icon: <FaUserDoctor />,
          texto: "por S/20 y medicinas cubiertas al 100%.",
        },
        {
          titulo: "Videoconsulta",
          icon: <BiLaptop />,
          texto:
            "y orientación telefónica al 100% en medicina general + pediatría.",
        },
        {
          titulo: "Indemnización",
          icon: <BsHospital />,
          texto: "de S/300 en caso de hospitalización por más de un día.",
        },
      ],
      precioAhora: 37.05,
      image: Casa,
      recomendado: false,
    },
    {
      id: 5,
      cardId: 1,
      titulo: "Plan en Casa y Clínica",
      detalles: [
        {
          titulo: "Consulta en clínica",
          icon: <FaUserDoctor />,
          texto: "para cualquier especialidad.",
        },
        {
          titulo: "Medicinas y exámenes",
          icon: <BiLaptop />,
          texto: "derivados cubiertos al 80%",
        },
        {
          titulo: "más de 200 clínicas del país",
          icon: <BsHospital />,
          texto: "con atención médica completa",
        },
      ],
      precioAhora: 94.05,
      image: Clinica,
      recomendado: true,
    },
    {
      id: 6,
      cardId: 1,
      titulo: "Plan en Casa + Chequeo",
      detalles: [
        {
          titulo: "Un Chequeo preventivo general",
          icon: <FaUserDoctor />,
          texto: "de manera presencial o virtual.",
        },
        {
          titulo: "Acceso a Vacunas",
          icon: <BiLaptop />,
          texto: "en el Programa del MINSA en centros privados.",
        },
        {
          titulo: "Incluye todos los beneficios del plan en casa.",
          icon: <BsHospital />,
          texto: "",
        },
      ],
      precioAhora: 46.55,
      image: Casa,
      recomendado: false,
    },
  ];
  const planesPorCard: Record<number, typeof planes> = planes.reduce(
    (acc, plan) => {
      if (!acc[plan.cardId]) acc[plan.cardId] = [];
      acc[plan.cardId].push(plan);
      return acc;
    },
    {} as Record<number, typeof planes>
  );

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
    if (currentIndex < planes.length - 1) scrollToIndex(currentIndex + 1);
  };

  const prevPlan = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };

  return (
    <div className="w-full h-full px-6 pt-4 bg-gradient-to-b from-neutral-50 to-purple-100">
      <h2 className="text-3xl sm:text-xl sm:text-center font-bold mb-4">
        {datos[0]?.name} ¿Para quién deseas <br /> cotizar?
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
            {planes
              .filter((plan) => plan.cardId === selectedId)
              .map((plan) => (
                <div
                  key={plan.id}
                  className="flex-shrink-0 w-[400px] sm:w-[250px]"
                >
                  <Planes
                    id={plan.id}
                    titulo={plan.titulo}
                    detelles={plan.detalles}
                    precioAntes={plan.precioAntes ?? 0}
                    precioAhora={plan.precioAhora}
                    image={plan.image}
                    recomendado={plan.recomendado}
                    selectedCardId={selectedId}
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-center sm:hidden items-center gap-6 mt-4 mb-10">
            <button
              onClick={prevPlan}
              disabled={currentIndex === 0}
              className={`
                w-10 h-10 flex justify-center items-center rounded-full 
                ${
                  currentIndex === 0
                    ? "bg-purple-400 text-purple-50"
                    : "bg-purple-500 text-purple-100"
                }
                transition-colors
              `}
            >
              <FaChevronCircleLeft className="w-10 h-10" />
            </button>

            <span className="text-lg font-semibold">
              {currentIndex + 1}/{planesVisibles.length}
            </span>

            <button
              onClick={nextPlan}
              disabled={currentIndex === planesVisibles.length - 1}
              className={`
                w-10 h-10 flex justify-center items-center rounded-full border-2 text-purple-500
                ${
                  currentIndex === planes.length - 1
                    ? "bg-purple-400 text-purple-50"
                    : "bg-purple-500 text-purple-100"
                }
                transition-colors
              `}
            >
              <FaChevronCircleRight className="w-10 h-10" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
