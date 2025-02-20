import { card } from "@/public/assets";
import styles, { layout } from "@/styles/style";
import Button from "./Button";
import Image from "next/image";
import Link from "@node_modules/next/link";
const CardDeal: React.FC = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
    <h2 className={styles.heading2}>
  Gain Deep Business Insights <br className="sm:block hidden" /> in Just a One Click.
</h2>
<p className={`${styles.paragraph} max-w-[470px] mt-5`}>
  Unlock key market trends, competitive analysis, and financial insights tailored for your business. Make data-driven decisions with ease.
</p>

<Link 
    href="/services" 
    className="relative px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
  >
    Get Bussiness Insights
  </Link>
    </div>
    <div className={layout.sectionImg}>
      <Image  src="/assets/bussiness.avif"
        height={500}
        width={300}
        alt="billing"
        className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
