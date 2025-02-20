import Link from "@node_modules/next/link";
import { ButtonProps } from "@types";

const Button: React.FC<ButtonProps> = ({ styles }) => {
  return (
    <Link 
    href="/services" 
    className="relative px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
  >
    Get Started
  </Link>
  );
};

export default Button;
