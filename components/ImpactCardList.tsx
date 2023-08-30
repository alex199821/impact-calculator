"use client";
import data from "../public/data.json";
import ImpactCard from "./ImpactCard";
import styled from "styled-components";
import { ImpactCardListProps } from "../interfaces";
import CumulatedImpactCard from "./CumulatedImpactCard";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

const ImpactCardList = ({
  investAmount,
  cumulatedImpactSelected,
  calculationStartDate,
}: ImpactCardListProps) => {
  return (
    <ImpactCardListWrapper>
      <div className="impartCardListMain">
        <AnimatePresence initial={false} mode="sync">
          {data.map((impactData, index) => {
            const { chartGroup } = impactData;
            return cumulatedImpactSelected && chartGroup ? (
              // <AnimatePresence initial={false} mode="wait" key={index}>
              <CumulatedImpactCard
                key={index}
                impactData={impactData}
                investAmount={investAmount}
                calculationStartDate={calculationStartDate}
              />
            ) : (
              // </AnimatePresence>
              <ImpactCard
                key={`${index}b`}
                impactData={impactData}
                investAmount={investAmount}
                calculationStartDate={calculationStartDate}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <div className="impartCardListFooter">
        <p>
          Want to play a part into our future?{" "}
          <Link href="#">in the FF Sustainable Water & Waste Fund</Link>
        </p>
      </div>
    </ImpactCardListWrapper>
  );
};

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
  }
  .impartCardListFooter {
    padding: 25px 35px;
    p {
      font-size: 16px;
      font-weight: medium;
    }
  }
`;

export default ImpactCardList;
