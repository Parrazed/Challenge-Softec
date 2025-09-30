import { useState } from "react";
import type { Formulario } from "../pages/Home";

export function useFormulario() {
  const [formData, setFormData] = useState<Formulario>({
    tipoDocumento: "",
    numeroDocumento: "",
    celular: "",
    privacidad: false,
    comunicaciones: false,
    name: "",
    lastName: "",
    birthDay: "",
    edad:0,
  });

  const submitFormulario = async (data: Formulario): Promise<Formulario> => {
    const res = await fetch(
      `https://rimac-front-end-challenge.netlify.app/api/user.json`
    );
    const userApi = await res.json();
    
    const edad = calcularEdad(userApi.birthDay)
    function calcularEdad(birthday?: string): number {
      if(!birthday) return 0;
      const [dia, mes, año] = birthday.split("-").map(Number);
      const nacimiento = new Date(año, mes - 1, dia);
      const hoy = new Date();

      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mesActual = hoy.getMonth() - nacimiento.getMonth();

      if (
        mesActual < 0 ||
        (mesActual === 0 && hoy.getDate() < nacimiento.getDate())
      ) {
        edad;
      }

      return edad;
    }

    const finalData: Formulario = {
      ...data,
      name: userApi.name,
      lastName: userApi.lastName,
      birthDay: userApi.birthDay,
      edad,
    };

    setFormData(finalData);
    return finalData;
  };

  return { formData, setFormData, submitFormulario };
}
