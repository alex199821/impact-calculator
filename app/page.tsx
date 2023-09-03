"use client";
import ImpactCardList from "../components/ImpactCardList";
import DataInput from "../components/DataInput";
import Hero from "../components/Hero";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
export default function HomePage() {
  const [investAmount, setInvestAmount] = useState(3000);
  const [cumulatedImpactSelected, setCumulatedImpactSelected] = useState(false);
  const [calculationStartDate, setCalculationStartDate] = useState(
    new Date(2020, 7, 1)
  );
  const [typeSwithcerIsOnTop, setTypeSwithcerIsOnTop] = useState(false);

  const updateInvestAmount = (prop: number): void => {
    setInvestAmount(prop);
  };

  const updateCumulatedImpact = (value: boolean): void => {
    setCumulatedImpactSelected(value);
  };

  const setNewDate = (prop: Date) => {
    setCalculationStartDate(prop);
  };

  const headerRef = useRef<HTMLInputElement>(null);
  const dataInputRef = useRef<HTMLInputElement>(null);

  const handleScroll = (): void => {
    if (!headerRef.current || !dataInputRef.current || !setTypeSwithcerIsOnTop)
      return;
    const headerRect = headerRef?.current?.getBoundingClientRect();
    const dataInputRect = dataInputRef?.current?.getBoundingClientRect();
    const dataInputRecttop = dataInputRect.top;
    const headerRectHeight = headerRect.height;
    const height = window.innerHeight;

    if (dataInputRecttop < 100) {
      setTypeSwithcerIsOnTop(true);
    } else {
      setTypeSwithcerIsOnTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HomeWrapper>
      <div ref={headerRef} className="headerContainer">
        <Header typeSwithcerIsOnTop={typeSwithcerIsOnTop} />
      </div>
      <Hero
        cumulatedImpactSelected={cumulatedImpactSelected}
        updateCumulatedImpact={updateCumulatedImpact}
        typeSwithcerIsOnTop={typeSwithcerIsOnTop}
      />
      <div
        ref={dataInputRef}
        className={`dataInputContainer ${
          typeSwithcerIsOnTop && "dataInputContainerBorders"
        }`}
      >
        <DataInput
          investAmount={investAmount}
          updateInvestAmount={updateInvestAmount}
          cumulatedImpactSelected={cumulatedImpactSelected}
          calculationStartDate={calculationStartDate}
          typeSwithcerIsOnTop={typeSwithcerIsOnTop}
          setNewDate={setNewDate}
          updateCumulatedImpact={updateCumulatedImpact}
        />
      </div>
      <ImpactCardList
        investAmount={investAmount}
        cumulatedImpactSelected={cumulatedImpactSelected}
        calculationStartDate={calculationStartDate}
      />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.section`
  .headerContainer {
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -o-sticky;
    position: -ms-sticky;
    position: sticky;
    top: 0;
    z-index: 11;
  }
  .dataInputContainer {
    position: -webkit-sticky;
    position: sticky;
    top: 99px;
    z-index: 12;
    background-color: var(--white);
  }
  .dataInputContainerBorders {
    border-top: 1px solid var(--grey);
    border-bottom: 1px solid var(--grey);
  }
  @media (max-width: 600px) {
    .dataInputContainer {
      top: 59px;
    }
  }
`;
