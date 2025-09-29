import { BiCheck } from "react-icons/bi";

interface CardProps {
  id: string | number;
  titulo: string;
  descripcion: string;
  imagen: string;
  selected: boolean;
  onSelect: (id: string | number) => void;
}

function Card({
  id,
  titulo: title,
  descripcion: description,
  imagen: image,
  selected,
  onSelect,
}: CardProps) {
  return (
    <div className="max-w-[382px] sm:max-w-[220px]">
      <div
        onClick={() => onSelect(id)}
        className={`relative flex flex-col p-4 bg-white shadow-md rounded-2xl cursor-pointer transition-shadow ${
          selected ? "border-black border-4" : "border-gray-300 hover:shadow-md"
        }`}
      >
        <div
          className={`absolute right-8 sm:right-4 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
            selected ? "border-green-600" : "border-gray-400"
          }`}
        >
          {selected && (
            <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
              <BiCheck className="text-white text-lg" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 mt-8 sm:mt-0">
          <div className="relative flex items-center sm:items-start sm:flex-col gap-3 mt-8">
            <img
              src={image}
              alt={title}
              className="w-10 h-10 sm:w-15 sm:h-15 object-cover rounded-md"
            />

            <div className="flex flex-col">
              <h3 className="font-bold text-lg">{title}</h3>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}

export default Card;
