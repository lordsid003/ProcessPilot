import { apple, bill, google } from "@/public/assets";
import styles, { layout } from "@/styles/style";
import Link from "@node_modules/next/link";
import Image from "next/image";
const Billing: React.FC = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <Image
        src="/assets/stock_image.jpg"
        height={500}
        width={300}
        alt="billing"
        className="w-[100%] h-[100%] relative z-[5]"
      />
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient" />
    </div>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Stay Updated with <br className="sm:block hidden" /> Real-Time Stock
        Info
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Get instant access to live stock prices, market trends, and historical
        data. Make informed investment decisions with accurate insights and
        analytics. Stay ahead with real-time updates and portfolio tracking.
      </p>

      <div className="flex flex-row flex-wrap sm:mt-10 mt-6 text-white border border-black p-3 rounded-lg">
  <Link 
    href="/services" 
    className="relative px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
  >
    Get Stock Info
  </Link>
</div>

    </div>
  </section>
);

export default Billing;
