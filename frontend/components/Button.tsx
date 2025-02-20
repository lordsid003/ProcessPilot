<<<<<<< HEAD
import Link from "@node_modules/next/link";
=======
import Link from "next/link";
>>>>>>> 60607857ea62596ed7c4d47161f7943e3a499287
import { ButtonProps } from "@types";

const Button: React.FC<ButtonProps> = ({ styles }) => {
  return (
<<<<<<< HEAD
    <Link 
    href="/services" 
    className="relative px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
  >
    Get Started
  </Link>
=======
    <Link href="/services">
      <button
        type="button"
        className={`${styles} py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[10px] hover:translate-x-2 transition-all ease-linear cursor-pointer`}
      >
        Get Started
      </button>
    </Link>
>>>>>>> 60607857ea62596ed7c4d47161f7943e3a499287
  );
};

export default Button;
