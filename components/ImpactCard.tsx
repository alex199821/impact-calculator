"use client";
import { impactCalculator } from "../utils/helperFunctions";
import { ImpactCardProps } from "../interfaces";
import styled from "styled-components";
import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const ImpactCard = ({ impactData, investAmount }: ImpactCardProps) => {
  const {
    icons,
    title,
    equivalentDesc,
    normalizedImpact,
    equivalentIcon,
    normalizedEquivalent,
    fixedEquivalent,
    equivalentUnit,
    color,
    impactUnit,
    chartGroup,
  } = impactData;

  //Function to animate Accumulated Impact Counter
  const accumulatedStepNumber = useMotionValue(
    impactCalculator(normalizedEquivalent || 1, investAmount)
  );
  const accumulatedImpactAnimated = useTransform(
    accumulatedStepNumber,
    (number) => {
      return (Math.round(number * 100) / 100).toFixed(1);
    }
  );
  useEffect(() => {
    if (normalizedEquivalent !== undefined) {
      const animation = animate(
        accumulatedStepNumber,
        impactCalculator(normalizedEquivalent, investAmount),
        {
          duration: 1.5,
        }
      );
      return animation.stop;
    }
  }, [investAmount]);

  //Function to animate Normalized Impact Counter
  const countStepNumber = useMotionValue(
    impactCalculator(normalizedImpact, investAmount)
  );
  const normalizedImpactAnimated = useTransform(countStepNumber, (number) => {
    if (chartGroup === "a") {
      return Math.round(number).toFixed(1);
    }
    if (number < 0) {
      return (-Math.round(number * 100) / 100).toFixed(1);
    }
    return (Math.round(number * 100) / 100).toFixed(1);
  });
  useEffect(() => {
    const animation = animate(
      countStepNumber,
      impactCalculator(normalizedImpact, investAmount),
      { duration: 1.5 }
    );
    return animation.stop;
  }, [investAmount]);

  return (
    <ImpactCardWrapper>
      <div className="normalizedImpactContainer">
        <Image src={`/icons/${icons[0]}`} alt="" width="70" height="90" />
        <div className="normalizedImpactLabelsContainer">
          <h3
            style={{ color: `var(--custom-${color})` }}
            className="normalizedImpactLabel"
          >
            {title}
          </h3>
          <div className="normalizedImpactAmount">
            <motion.p>{normalizedImpactAnimated}</motion.p>
            &nbsp;{`${impactUnit}`}
          </div>
        </div>
      </div>

      <p className="equivalentDescription">{equivalentDesc}</p>
      <div className="normalizedEquivalentDataContainer">
        <div className="normalizedEquivalentIcon">
          <Image
            src={`/icons/${equivalentIcon}`}
            alt=""
            width="30"
            height="20"
          />
        </div>
        <div className="normalizedEquivalentLabel">
          {normalizedEquivalent ? (
            <>
              {" "}
              <motion.p style={{ color: `var(--custom-${color})` }}>
                {accumulatedImpactAnimated}
              </motion.p>
              {equivalentUnit && equivalentUnit}
            </>
          ) : (
            <>
              {" "}
              <p style={{ color: `var(--custom-${color})` }}>
                {fixedEquivalent}
                {equivalentUnit && equivalentUnit}
              </p>
            </>
          )}
        </div>
      </div>
    </ImpactCardWrapper>
  );
};

const ImpactCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  align-items: center;
  border: 1px solid var(--grey);
  justify-content: flex-end;
  position: absolute;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  .normalizedImpactContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    .normalizedImpactLabelsContainer {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      justify-content: center;
      align-items: center;
      .normalizedImpactLabel {
        font-size: 15px;
        font-weight: bold;
      }
      .normalizedImpactAmount {
        display: flex;
        flex-direction: row;
        font-weight: 900;
        font-size: 20px;
      }
    }
  }
  .equivalentDescription {
    display: flex;
    border-top: 1px solid var(--grey);
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    font-size: 14px;
  }
  .normalizedEquivalentDataContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: 1px solid var(--grey);
    height: 40px;
    .normalizedEquivalentIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-right: 1px solid var(--grey);
    }
    .normalizedEquivalentLabel {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      p {
        font-weight: bold;
      }
    }
  }
`;

export default ImpactCard;
