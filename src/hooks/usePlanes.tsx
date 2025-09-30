import { useEffect, useState } from "react";

interface ApiPlan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

export function usePlanes() {
  const [planes, setPlanes] = useState<ApiPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const res = await fetch("https://rimac-front-end-challenge.netlify.app/api/plans.json");
        if (!res.ok) throw new Error("Error al traer los planes");
        const data = await res.json();
        setPlanes(data.list);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  return { planes, loading, error };
}
