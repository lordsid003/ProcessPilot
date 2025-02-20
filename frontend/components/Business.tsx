import styles, { layout } from "@/styles/style";
import { features } from "@/constants";
import Button from "./Button";
import Image from "next/image";
import { FeatredCardProps } from "@types";

const FeaturesCard: React.FC<FeatredCardProps> = ({
  icon,
  title,
  content,
  index,
}) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full bg-dimBlue ${styles.flexCenter}`}
    >
      <Image src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[24px]">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);
const Business: React.FC = () => (
  <section id="features" className={`${layout.section}`}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        You do the business, <br className="sm:block hidden" />
        We'll handle the Growth.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 justify-center text-justify`}>
        At ProcessPilot, we believe that businesses should focus on growth, not
        bottlenecks. Our AI-powered SaaS platform helps enterprises optimize
        their workflows, automate repetitive tasks, and gain actionable insights
        to improve efficiency and profitability. With intelligent process
        mapping, predictive bottleneck analysis, and real-time monitoring, we
        empower businesses to make data-driven decisions with confidence.
        Whether it's reducing costs, improving productivity, or enhancing
        digital transformation, ProcessPilot is your trusted partner in business
        optimization. Join us in revolutionizing the way businesses operate and
        grow.
      </p>
      <Button styles="mt-10" />
    </div>
    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeaturesCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
