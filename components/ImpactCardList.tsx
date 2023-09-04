"use client";
import data from "../public/data.json";
import ImpactCard from "./ImpactCard";
import styled from "styled-components";
import { ImpactCardListProps } from "../interfaces";
import CumulatedImpactCard from "./CumulatedImpactCard";
import Link from "next/link";
import { motion } from "framer-motion";
import "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ImpactCardList = ({
  investAmount,
  cumulatedImpactSelected,
  calculationStartDate,
}: ImpactCardListProps) => {
  return (
    <ImpactCardListWrapper>
      <section className="impartCardListMain">
        {data.map((impactData, index) => {
          const { chartGroup } = impactData;
          return (
            <div className="impactCard" key={index}>
              <motion.div
                initial={{}}
                animate={
                  chartGroup && cumulatedImpactSelected
                    ? {
                        rotateY: 180,
                      }
                    : {}
                }
                transition={{
                  duration: 0.2,
                  delay: index / 50,
                }}
                className="impactCardInner"
              >
                <ImpactCard
                  key={`${index}a`}
                  impactData={impactData}
                  investAmount={investAmount}
                  calculationStartDate={calculationStartDate}
                />
                <CumulatedImpactCard
                  key={`${index}b`}
                  impactData={impactData}
                  investAmount={investAmount}
                  calculationStartDate={calculationStartDate}
                />
              </motion.div>
            </div>
          );
        })}
      </section>
      <div className="impartCardListFooter">
        <p>
          Want to play a part into our future?{" "}
          <Link href="#">in the FF Sustainable Water & Waste Fund</Link>
        </p>
      </div>
    </ImpactCardListWrapper>
  );
};

export default ImpactCardList;

const ImpactCardListWrapper = styled.section`
  display: flex;
  width: 800px;
  margin: auto;
  flex-direction: column;
  border-bottom: 2px solid var(--lightGrey);
  .impartCardListMain {
    display: grid;
    margin: auto;
    width: 100%;
    grid-template-columns: auto auto auto;
    gap: 20px;
    justify-content: center;
    background-color: var(--lightGrey);
    padding: 30px 0 45px 0;
    .impactCard {
      background-color: transparent;
      width: 230px;
      height: 280px;
      border: 1px solid #f1f1f1;
      perspective: 2500px;
    }

    .impactCardInner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transform-style: preserve-3d;
    }

    .flip {
      transform: rotateY(180deg);
    }
  }
  .impartCardListFooter {
    padding: 25px 35px;
    p {
      font-size: 16px;
      font-weight: medium;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    .impartCardListMain {
      grid-template-columns: auto auto;
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    .impartCardListMain {
      grid-template-columns: auto;
      .impactCard {
        background-color: transparent;
        width: 280px;
        height: 280px;
      }
    }
  }
`;
