import logoH from "../assets/logoH.png";
import { FaPhoneAlt } from "react-icons/fa";

function Header() {
  return (
    <header className="relative flex justify-between mx-6 md:mx-20 my-4 bg-transparent z-10">
      <img src={logoH} className="h-9 w-auto" />
      <div className="flex gap-4 items-center">
        <span className="hidden sm:block font-semibold">
          ¡Compra por este medio!
        </span>
        <span className="flex gap-2 items-center font-bold text-xl">
          <FaPhoneAlt /> {"(01)411 6001"}
        </span>
      </div>
    </header>
  );
}

export default Header;
