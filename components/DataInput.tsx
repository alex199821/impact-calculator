"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { DataInputProps } from "../interfaces";
import InvestmentAmountModal from "./InvestmentAmountModal";
import ImpactTypeSwitcher from "./ImpactTypeSwitcher";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "../styles/day-picker.css";
import { calculateYearsPassed } from "../utils/helperFunctions";
import DatePickerModal from "./DatePickerModal";
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
  updateCumulatedImpact,
  typeSwithcerIsOnTop,
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

  const closeDatePickerModal = (): void => {
    setDatePickerOpen(false);
  };

  const showDatePicker = () => {
    setDatePickerOpen(true);
  };

  const countStepNumber = useMotionValue(100);
  const normalizedImpactAnimated = useTransform(countStepNumber, (number) => {
    return Math.round(number).toLocaleString("en-US");
  });
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
    <DataInputWrapper>
      <section className="impactTypeSwitcherContainer">
        <ImpactTypeSwitcher
          cumulatedImpactSelected={cumulatedImpactSelected}
          updateCumulatedImpact={updateCumulatedImpact}
        />
      </section>
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

      <AnimatePresence mode="wait" initial={false}>
        {cumulatedImpactSelected && (
          <motion.section
            key="modal"
            initial={
              !typeSwithcerIsOnTop
                ? {
                    opacity: 0,
                    height: 120,
                  }
                : {
                    opacity: 0,
                    height: 60,
                  }
            }
            animate={
              typeSwithcerIsOnTop
                ? { opacity: 1, height: 60 }
                : {
                    opacity: 1,
                    height: 120,
                  }
            }
            exit={{
              opacity: 0,
            }}
            transition={
              typeSwithcerIsOnTop
                ? {
                    duration: 0.3,
                  }
                : { duration: 0.3 }
            }
            className="cumulatedInputContainer"
          >
            <div className="investmentDateContainer">
              <div className="investmentDateContainerInner">
                <p
                  className={`datePickerLabel ${
                    typeSwithcerIsOnTop && "hideDiv"
                  }`}
                >
                  Enter the start date of your investment
                </p>
                <motion.button
                  onClick={() => showDatePicker()}
                  className="datePickerOpener"
                  initial={{
                    fontSize: "28px",
                  }}
                  animate={
                    typeSwithcerIsOnTop
                      ? {
                          fontSize: "22px",
                        }
                      : { fontSize: "28px" }
                  }
                  transition={{
                    duration: 0.1,
                  }}
                >
                  {format(calculationStartDate, "dd/LL/yyyy")}
                </motion.button>
                {datePickerOpen && window.innerWidth > 600 && (
                  <span className="datePickerContainer">
                    <DayPicker
                      mode="single"
                      defaultMonth={calculationStartDate}
                      selected={calculationStartDate}
                      onSelect={handleDateSelect}
                      className="datePicker"
                      toDate={new Date()}
                    />
                  </span>
                )}
                <AnimatePresence mode="wait">
                  {datePickerOpen && window.innerWidth < 600 && (
                    <DatePickerModal
                      defaultMonth={calculationStartDate}
                      selected={calculationStartDate}
                      handleDateSelect={handleDateSelect}
                      closeDatePickerModal={closeDatePickerModal}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="cumulatedImpactLabelContainer">
              <div className="cumulatedImpactLabelContainerInner">
                <p
                  className={`cumulatedPercentageLabel ${
                    typeSwithcerIsOnTop && "hideDiv"
                  }`}
                >
                  Cumulated Impact since savings
                </p>
                <motion.div
                  className="cumulatedPercentage"
                  onClick={() => handleInvestmentModal(true)}
                  initial={{
                    fontSize: "28px",
                  }}
                  animate={
                    typeSwithcerIsOnTop
                      ? {
                          fontSize: "22px",
                        }
                      : { fontSize: "28px" }
                  }
                  transition={{
                    duration: 0.1,
                  }}
                >
                  <motion.p>{cumulatedPercentage}</motion.p>%{/* </div> */}
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {!cumulatedImpactSelected && (
          <motion.section
            key="moda2"
            initial={
              !typeSwithcerIsOnTop
                ? {
                    opacity: 0,
                    height: 120,
                  }
                : {
                    opacity: 0,
                    height: 60,
                  }
            }
            animate={
              typeSwithcerIsOnTop
                ? { opacity: 1, height: 60 }
                : {
                    opacity: 1,
                    height: 120,
                  }
            }
            exit={{
              opacity: 0,
            }}
            transition={
              typeSwithcerIsOnTop
                ? {
                    duration: 0.3,
                  }
                : { duration: 0.3 }
            }
            className="amountInputsConainer"
          >
            {!typeSwithcerIsOnTop && (
              <p className="investAmountLabel">
                Enter the amount you wish to invest
              </p>
            )}

            <motion.button
              onClick={() => handleInvestmentModal(true)}
              className="investmentInputButton"
              initial={{
                fontSize: "28px",
              }}
              animate={
                typeSwithcerIsOnTop
                  ? {
                      fontSize: "22px",
                    }
                  : { fontSize: "28px" }
              }
              transition={{
                duration: 0.1,
              }}
            >
              $<motion.p>{normalizedImpactAnimated}</motion.p>
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>
    </DataInputWrapper>
  );
};

const DataInputWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;
  width: 800px;

  .impactTypeSwitcherContainer {
    display: flex;
    position: absolute;
    top: -30px;
    z-index: 13;
    left: 50%;
  }
  .amountInputsConainer {
    display: flex;
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
  }
  .cumulatedInputContainer {
    display: flex;
    flex-direction: row;
    margin: auto;
    width: 100%;
    justify-content: center;
    align-items: center;
    .hideDiv {
      visibility: hidden;
      margin-top: -30px;
    }
    .investmentDateContainer {
      display: flex;
      width: 50%;
      align-items: center;
      justify-content: flex-end;
      padding-right: 25px;
      .investmentDateContainerInner {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
        justify-content: center;
        .datePickerLabel {
          margin-bottom: 18px;
          font-size: 14px;
        }
        .datePickerContainer {
          padding-right: 100%;
          .datePicker {
            z-index: 999;
            position: absolute;
            margin: auto;
            margin-left: -25px;
            margin-top: 5px;
          }
        }
        .datePickerOpener {
          font-size: 26px;
          border: none;
          width: 70%;
          margin: auto;
          border-bottom: 2px solid var(--custom-red);
          background-color: transparent;
        }
      }
    }
    .cumulatedImpactLabelContainer {
      display: flex;
      width: 50%;
      align-items: center;
      justify-content: flex-start;
      padding-left: 25px;
      .cumulatedImpactLabelContainerInner {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
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
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    .impactTypeSwitcherContainer {
      width: 100px;
    }
  }
  @media (max-width: 600px) {
    width: 100%;
    .cumulatedInputContainer {
      .hideDiv {
        display: none;
      }
      .investmentDateContainer {
        justify-content: flex-start;
        padding: 25px;
        .investmentDateContainerInner {
          display: flex;
          justify-content: center;
          align-items: center;
          .datePickerLabel {
          }
          .datePickerOpener {
            width: 100%;
          }
        }
      }

      .cumulatedImpactLabelContainer {
        justify-content: flex-end;
        padding: 25px;
        .cumulatedImpactLabelContainerInner {
          align-items: flex-end;
          text-align: end;
          .cumulatedPercentageLabel {
          }
          .cumulatedPercentage {
          }
        }
      }
    }
  }
`;

// const AmountInputWrapper = styled.section`
//   .amountInputsConainer {
//     display: flex;
//     flex-direction: column;
//     margin: auto;
//     justify-content: center;
//     align-items: center;
//     background-color: blue;
//     height: 120px;
//     .investAmountLabel {
//       font-size: 14px;
//       margin-bottom: 15px;
//     }
//     .investmentInputButton {
//       display: flex;
//       width: 180px;
//       text-align: center;
//       justify-content: center;
//       align-items: center;
//       padding: 0;
//       font-size: 28px;
//       cursor: pointer;
//       background-color: transparent;
//       border: none;
//       border-bottom: 2px solid var(--custom-red);
//     }
//   }
// `;

// const CumulatedInputWrapper = styled.section`
//   /* .cumulatedInputContainer {
//     display: flex;
//     flex-direction: row;
//     background-color: red;
//     margin: auto;
//     justify-content: center;
//     align-items: center;
//     .hideDiv {
//       visibility: hidden;
//       margin-top: -30px;
//     }
//     .investmentDateContainer {
//       display: flex;
//       width: 50%;
//       align-items: center;
//       justify-content: flex-end;
//       padding-right: 25px;
//       .investmentDateContainerInner {
//         display: flex;
//         flex-direction: column;
//         width: fit-content;
//         .datePickerLabel {
//           margin-bottom: 18px;
//           font-size: 14px;
//         }
//         .datePicker {
//           z-index: 999;
//           position: absolute;
//           margin: auto;
//           margin-left: -25px;
//           margin-top: 5px;
//         }
//         .datePickerOpener {
//           font-size: 26px;
//           border: none;
//           width: 70%;
//           margin: auto;
//           border-bottom: 2px solid var(--custom-red);
//           background-color: transparent;
//         }
//       }
//     }

//     .cumulatedImpactLabelContainer {
//       display: flex;
//       width: 50%;
//       align-items: center;
//       justify-content: flex-start;
//       padding-left: 25px;
//       .cumulatedImpactLabelContainerInner {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         width: fit-content;
//         .cumulatedPercentageLabel {
//           font-size: 14px;
//           margin-bottom: 20px;
//         }
//         .cumulatedPercentage {
//           display: flex;
//           flex-direction: row;
//           font-size: 26px;
//           color: var(--custom-darkblue);
//         }
//       }
//     }
//   } */

//   @media (max-width: 600px) {
//     .cumulatedInputContainer {
//       .hideDiv {
//         display: none;
//       }
//       .investmentDateContainer {
//         justify-content: flex-start;
//         padding: 25px;
//         .investmentDateContainerInner {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           /* background-color: red; */
//           .datePickerLabel {
//             /* margin-bottom: 18px;
//             font-size: 14px; */
//           }
//           .datePickerOpener {
//             width: 100%;
//           }
//         }
//       }

//       .cumulatedImpactLabelContainer {
//         justify-content: flex-end;
//         padding: 25px;
//         .cumulatedImpactLabelContainerInner {
//           align-items: flex-end;
//           text-align: end;
//           /* background-color: red; */
//           .cumulatedPercentageLabel {
//           }
//           .cumulatedPercentage {
//           }
//         }
//       }
//     }
//   }
// `;

export default DataInput;
