import logoH from "../assets/logoH.png";
import logoF from "../assets/logoF.png";
import logoF2 from "../assets/logoF2.png";
import familia from "../assets/familia.png";
import { FaExclamationCircle, FaPhoneAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useFormulario } from "../hooks/useFormulario";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
export interface Formulario {
  tipoDocumento: string;
  numeroDocumento: string;
  celular: string;
  privacidad: boolean;
  comunicaciones: boolean;
  name?: string;
  lastName?: string;
  birthDay?: string;
  edad?: number;
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [errores, setErrores] = useState<string[]>([]);
  const { formData, setFormData, submitFormulario } = useFormulario();
  const navigate= useNavigate();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validarFormulario = () => {
    const errores: string[] = [];

    if (formData.tipoDocumento.length == 0) {
      errores.push("documento");
    }
    if (formData.numeroDocumento.length !== 8) {
      errores.push("DNI");
    }
    if (formData.celular.length !== 9) {
      errores.push("celular");
    }
    if (!formData.privacidad) {
      errores.push("privacidad");
    }
    if (!formData.comunicaciones) {
      errores.push("comunicaciones");
    }

    return errores;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errores = validarFormulario();
    if (errores.length > 0) {
      setErrores(errores);
      return;
    }

    const finalData = await submitFormulario(formData);
    localStorage.setItem("formData", JSON.stringify(finalData));
    navigate("/cotizar")
  };

  return (
    <div className="w-full flex flex-col min-h-screen  text-black relative overflow-hidden">
      <div className="absolute top-[-230px] left-[280px] w-80 h-80 sm:top-[5%] sm:left-[94%] md:w-[800px] sm:h-[80vh] rounded-full blur-2xl bg-cyan-400/60 z-0"></div>
      <div className="absolute bottom-[5%] right-[80%] w-80 h-80 sm:bottom-[-20%] sm:right-[85%] sm:w-[800px] sm:h-[80vh] rounded-full blur-2xl bg-purple-400/60 z-0"></div>

      <Header/>
      <main className="relative mx-6 z-10 mb-20 flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-10">
        <div className="hidden sm:flex sm:justify-end sm:w-1/4">
          <img src={familia} alt="familia" className=" max-w-[500px]" />
        </div>
        <div className="flex flex-col space-y-6 sm:max-w-[500px]">
          <div className="mt-8 mb-2">
            <span className="bg-[linear-gradient(135deg,_#01ff84)] px-2 py-1 rounded-md font-bold text-sm">
              Seguro Salud Flexible
            </span>
            <h1 className="text-3xl font-bold mt-4">
              Creando para <br />
              ti y tu familia
            </h1>
          </div>
          <div className="flex justify-end sm:hidden">
            <img
              src={familia}
              alt="familia"
              className="absolute top-[-8px] rounded-2xl w-[160px] h-[170px] object-cover"
            />
          </div>
          <hr className="border-t border-neutral-300 my-2 sm:hidden w-5/6" />
          <div>
            <h2 className="font-bold text-lg">
              Tú eliges cuánto pagar. Ingresa tus datos,
              <br /> cotiza y recibe nuestra asesoría, 100% online.
            </h2>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="flex">
                <div className="relative w-2/5">
                  <select
                    className={`appearance-none w-full h-full bg-white border border-neutral-500 rounded-s-lg py-2 px-4 pr-10 ${
                      errores.includes("documento")
                        ? "border-red-500"
                        : "border-neutral-500"
                    }`}
                    value={formData.tipoDocumento}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tipoDocumento: e.target.value,
                      })
                    }
                  >
                    <option value="">Documento</option>
                    <option value="DNI">DNI</option>
                  </select>
                  {errores.includes("documento") && (
                    <FaExclamationCircle
                      className="absolute right-[35px] top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                      title="Seleccione un tipo de documento"
                    />
                  )}
                  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FaChevronDown />
                  </div>
                </div>

                <div
                  className={`relative bg-white rounded-e-lg py-2 w-3/5 border ${
                    errores.includes("DNI")
                      ? "border-red-500"
                      : "border-neutral-500"
                  }`}
                >
                  <p className="px-4 text-neutral-500">Nro° de documento</p>
                  <input
                    type="text"
                    className="bg-white outline-none pl-4 text-lg w-full"
                    value={formData.numeroDocumento}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numeroDocumento: e.target.value,
                      })
                    }
                  />
                  {errores.includes("DNI") && (
                    <FaExclamationCircle
                      className="absolute right-3 top-9 text-red-500 cursor-pointer"
                      title="El DNI debe tener 8 dígitos"
                    />
                  )}
                </div>
              </div>

              <div className={`relative bg-white w-full border border-neutral-500 rounded-lg py-2 ${
                    errores.includes("celular")
                      ? "border-red-500"
                      : "border-neutral-500"
                  }`}>
                <p className="px-4 text-neutral-500">Celular</p>
                <input
                  type="text"
                  className="bg-white outline-none px-4 text-lg"
                  value={formData.celular}
                  onChange={(e) =>
                    setFormData({ ...formData, celular: e.target.value })
                  }
                />
                {errores.includes("celular") && (
                    <FaExclamationCircle
                      className="absolute right-3 top-9 text-red-500 cursor-pointer"
                      title="El celular debe tener 9 dígitos"
                    />
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-black"
                    checked={formData.privacidad}
                    onChange={(e) =>
                      setFormData({ ...formData, privacidad: e.target.checked })
                    }
                  />
                  <span className="ml-2 text-gray-700">
                    Acepto la Política de Privacidad
                  </span>
                  {errores.includes("privacidad") && (
                    <FaExclamationCircle
                      className="ml-3 right-4 top-9 text-red-500 cursor-pointer"
                      title="debes aceptar las politivas de privacidad"
                    />
                  )}
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-black"
                    checked={formData.comunicaciones}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        comunicaciones: e.target.checked,
                      })
                    }
                  />
                  <span className="ml-2 text-gray-700">
                    Acepto la Política Comunicaciones <br /> Comerciales
                  </span>
                  {errores.includes("comunicaciones") && (
                    <FaExclamationCircle
                      className="ml-3 right-4 top-9 text-red-500 cursor-pointer"
                      title="debes aceptar las politivas de privacidad"
                    />
                  )}
                </label>

                <span className="font-semibold pt-2 text-sm underline">
                  Aplican Términos y Condiciones.
                </span>
              </div>

              <button
                type="submit"
                className="bg-black text-white w-full py-3 rounded-full text-lg font-bold mt-6 sm:w-1/2"
              >
                Cotiza aqui
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative bg-black mt-auto text-white flex flex-col items-center z-10 md:flex-row md:justify-between md:px-10">
        <img
          src={isMobile ? logoF2 : logoF}
          alt="Logo"
          className={`py-7 ${isMobile ? "m-auto w-[35%]" : "w-[3%]"}`}
        />
        <hr className="border-t border-neutral-300 my-2 sm:hidden w-5/6" />
        <label className="my-8">© 2023 RIMAC Seguros y Reaseguros.</label>
      </footer>
    </div>
  );
}
