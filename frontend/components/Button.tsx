import Link from "next/link";
import { ButtonProps } from "@types";

const Button: React.FC<ButtonProps> = ({ styles }) => {
  return (
    <Link href="/services">
      <button
        type="button"
        className={`${styles} py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[10px] hover:translate-x-2 transition-all ease-linear cursor-pointer`}
      >
        Get Started
      </button>
    </Link>
  );
};

export default Button;
