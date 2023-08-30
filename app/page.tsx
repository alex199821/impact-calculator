"use client";
import ImpactCardList from "../components/ImpactCardList";
import DataInput from "../components/DataInput";
import Hero from "../components/Hero";
import { useState } from "react";
import Header from "../components/Header";
export default function HomePage() {
  const [investAmount, setInvestAmount] = useState(3000);
  const [cumulatedImpactSelected, setCumulatedImpactSelected] = useState(false);
  const [calculationStartDate, setCalculationStartDate] = useState(
    new Date(2020, 7, 1)
  );

  const updateInvestAmount = (prop: number): void => {
    setInvestAmount(prop);
  };

  const updateCumulatedImpact = (value: boolean): void => {
    setCumulatedImpactSelected(value);
  };

  const setNewDate = (prop: Date) => {
    setCalculationStartDate(prop);
  };

  return (
    <>
      <Header />
      <Hero
        cumulatedImpactSelected={cumulatedImpactSelected}
        updateCumulatedImpact={updateCumulatedImpact}
      />
      <DataInput
        investAmount={investAmount}
        updateInvestAmount={updateInvestAmount}
        cumulatedImpactSelected={cumulatedImpactSelected}
        calculationStartDate={calculationStartDate}
        setNewDate={setNewDate}
      />
      <ImpactCardList
        investAmount={investAmount}
        cumulatedImpactSelected={cumulatedImpactSelected}
        calculationStartDate={calculationStartDate}
      />
    </>
  );
}
