"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { DataInputProps } from "../interfaces";
import InvestmentAmountModal from "./InvestmentAmountModal";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "../styles/day-picker.css";
import { calculateYearsPassed } from "../utils/helperFunctions";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
const DataInput = ({
  investAmount,
  updateInvestAmount,
  cumulatedImpactSelected,
  setNewDate,
  calculationStartDate,
}: DataInputProps) => {
  const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleInvestmentModal = (value: boolean) => {
    setInvestmentModalOpen(value);
  };

  const handleDateSelect = (prop: Date | undefined) => {
    prop && setNewDate && setNewDate(prop);
    setDatePickerOpen(false);
  };

  const showDatePicker = () => {
    setDatePickerOpen(true);
  };

  const countStepNumber = useMotionValue(100);
  const normalizedImpactAnimated = useTransform(countStepNumber, Math.round);

  useEffect(() => {
    const animation = animate(countStepNumber, investAmount, { duration: 1.5 });
    return animation.stop;
  }, [investAmount]);


  const cumulationStepNumber = useMotionValue(100);
  const cumulatedPercentage = useTransform(cumulationStepNumber, Math.round);
  useEffect(() => {
    const animation = animate(
      cumulationStepNumber,
      100 * calculateYearsPassed(calculationStartDate),
      { duration: 1.5 }
    );
    return animation.stop;
  }, [calculationStartDate]);

  return (
    <>
      <AnimatePresence>
        {investmentModalOpen && (
          <InvestmentAmountModal
            investmentModalOpen={investmentModalOpen}
            handleInvestmentModal={handleInvestmentModal}
            investAmount={investAmount}
            updateInvestAmount={updateInvestAmount}
          />
        )}
      </AnimatePresence>
      {cumulatedImpactSelected && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
   
          transition={{
            duration: 0.8,
          }}
        >
          <CumulatedInputWrapper>
            <div className="investmentDateContainer">
              <p className="datePickerLabel">
                Enter the start date of your investment
              </p>
              <button className="datePickerOpener" onClick={showDatePicker}>
                {format(calculationStartDate, "dd/LL/yyyy")}
              </button>
              {datePickerOpen && (
                <DayPicker
                  mode="single"
                  defaultMonth={calculationStartDate}
                  selected={calculationStartDate}
                  onSelect={handleDateSelect}
                  className="datePicker"
                  toDate={new Date()}
                />
              )}
            </div>
            <div className="cumulatedImpactLabelContainer">
              <p className="cumulatedPercentageLabel">
                Cumulated Impact since savings
              </p>
              <div className="cumulatedPercentage">
                  <motion.p>{cumulatedPercentage}</motion.p>
                %
              </div>
            </div>
          </CumulatedInputWrapper>
        </motion.div>
      )}

      {!cumulatedImpactSelected && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <AmountInputWrapper>
            <p className="investAmountLabel">
              Enter the amount you wish to invest
            </p>
            <button
              onClick={() => handleInvestmentModal(true)}
              className="investmentInputButton"
            >
              $<motion.p>{normalizedImpactAnimated}</motion.p>
            </button>
          </AmountInputWrapper>
        </motion.div>
      )}
    </>
  );
};

const AmountInputWrapper = styled.section`
  display: flex;
  width: 800px;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
  height: 120px;
  .investAmountLabel {
    font-size: 14px;
    margin-bottom: 15px;
  }
  .investmentInputButton {
    display: flex;
    width: 180px;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0;
    font-size: 28px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--custom-red);
  }
`;

const CumulatedInputWrapper = styled.section`
  display: flex;
  width: 600px;
  flex-direction: row;
  margin: auto;
  justify-content: space-between;
  height: 120px;
  .investmentDateContainer {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
    padding-top: 25px;
    .datePickerLabel {
      margin-bottom: 18px;
      font-size: 14px;
    }
    .datePicker {
      z-index: 999;
      margin-top: 5px;
    }
    .datePickerOpener {
      font-size: 26px;
      border: none;
      border-bottom: 2px solid var(--custom-red);
      background-color: transparent;
    }
  }
  .cumulatedImpactLabelContainer {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
    padding-top: 25px;
    .cumulatedPercentageLabel {
      font-size: 14px;
      margin-bottom: 20px;
    }
    .cumulatedPercentage {
      display: flex;
      flex-direction: row;
      font-size: 26px;
      color: var(--custom-darkblue);
    }
  }
`;

export default DataInput;
