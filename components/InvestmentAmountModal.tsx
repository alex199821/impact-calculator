"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { InvestmentModalProps } from "../interfaces";
import { motion, AnimatePresence,  } from "framer-motion";
const InvestmentAmountModal = ({
  investAmount,
  updateInvestAmount,
  handleInvestmentModal,
}: InvestmentModalProps) => {
  const [inputValue, setInputValue] = useState(
    investAmount.toLocaleString("en-US")
  );
  const [warningMessage, setWarningMessage] = useState(false);
  const [modalStartsOpening, setModalStartsOpening] = useState(true);
  const [modalStartsClosing, setModalStartsClosing] = useState(false);

  useEffect(() => {
    let formattedInvestAmont = investAmount.toLocaleString("en-US");
    setInputValue(formattedInvestAmont);
  }, [investAmount]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    const commasRemovedFromNewValue = newValue.replace(/,/g, "");
    const newValueParsed = parseInt(commasRemovedFromNewValue.replace("$", ""));

    if (isNaN(newValueParsed)) {
      setInputValue("");
      return;
    }
    setInputValue(newValueParsed.toLocaleString("en-US"));
  };

  const recalculateImpact = () => {
    const inputValueWithoutCommas = inputValue.replace(/,/g, "");
    const parsedInputValue = parseInt(inputValueWithoutCommas.replace("$", ""));

    if (
      isNaN(parsedInputValue) ||
      parsedInputValue < 1 ||
      parsedInputValue > 1000000
    ) {
      setWarningMessage(true);
      return;
    }

    updateInvestAmount && updateInvestAmount(parsedInputValue);
    closePopup();
    document.body.style.overflow = "visible";
  };

  const closePopup = () => {
    setModalStartsClosing(true);
    setTimeout(() => {
      handleInvestmentModal(false);
    }, 500);
    document.body.style.overflow = "visible";
  };

  useEffect(() => {
    setTimeout(() => {
      setModalStartsOpening(false);
    }, 400);
  }, []);

  useEffect(() => {
    if (warningMessage) {
      setTimeout(() => {
        setWarningMessage(false);
      }, 1500);
    }
  }, [warningMessage]);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closePopup();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      recalculateImpact();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [inputValue]);

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);
  return (
    <>
      <motion.div
        style={{
          zIndex: 99999,
          position: "absolute",
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <InvestmentAmountModalWrapper>
          <button className="closePopupButton" onClick={closePopup}>
            ✕
          </button>
          <motion.div
            initial={{
              y: 70,
            }}
            animate={
              modalStartsClosing
                ? { y: [0, 90], opacity: [1, 0] }
                : {
                    y: [90, 0],
                  }
            }
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 30,
              delay: modalStartsClosing ? 0 : 0.8,
            }}
          >
            <h4 className="investAmountInputLabel">
              Enter the amount you wish to invest
            </h4>
          </motion.div>
          <div className="warningMessageContainer">
            <AnimatePresence>
              {warningMessage && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >
                  <p className="warningMessage">
                    Please enter value between 1 and 1,000,000
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="investAmountInputContainer">
            {modalStartsOpening && (
              <motion.div
                initial={{
                  top: 0,
                }}
                animate={
                  window.innerWidth > 600
                    ? {
                        height: [0, 90],
                      }
                    : { height: [0, 70] }
                }
                transition={{
                  ease: "easeInOut",
                  stiffness: 30,
                  duration: 0.4,
                }}
                className="orangeCoverOverInput"
              />
            )}
            {!modalStartsOpening && (
              <motion.div
                initial={{
                  bottom: 0,
                }}
                animate={
                  window.innerWidth > 600
                    ? {
                        height: [90, 0],
                      }
                    : { height: [70, 0] }
                }
                transition={{
                  ease: "easeInOut",
                  stiffness: 30,
                  delay: 0.4,
                  duration: 0.4,
                }}
                className="orangeCoverOverInput"
              />
            )}
            <motion.div
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                stiffness: 30,
              }}
              animate={
                warningMessage ? { x: [0, 10, -10, 10, -10, 10, -10, 0] } : {}
              }
            >
              <input
                type="string"
                value={`$${inputValue}`}
                onChange={handleChange}
                className="investAmountInput"
              />
            </motion.div>
          </div>
          <p className="pressEscLabel">Hit the enter key or ESC to close</p>
          <motion.div
            animate={
              modalStartsClosing
                ? { y: [0, -80], opacity: [1, 0] }
                : {
                    y: [-80, 0],
                    opacity: [0, 1],
                  }
            }
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 30,
              delay: modalStartsClosing ? 0 : 0.8,
            }}
          >
            <button
              className="setNewInvestAmountButton"
              onClick={recalculateImpact}
            >
              REVIEW YOUR IMPACT SCORE
            </button>
          </motion.div>
        </InvestmentAmountModalWrapper>
      </motion.div>
    </>
  );
};

const InvestmentAmountModalWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--lightGrey);
  z-index: 14;

  .closePopupButton {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background-color: white;
    color: var(--grey);
    border: 1px solid var(--grey);
    right: 10px;
    top: 15px;
    font-size: 35px;
    cursor: pointer;
  }
  .investAmountInputLabel {
    margin-bottom: 40px;
    font-weight: medium;
  }
  .warningMessageContainer {
    display: flex;
    height: 14px;
    .warningMessage {
      display: flex;
      font-size: 12px;
      color: var(--custom-red);
    }
  }

  .investAmountInputContainer {
    position: relative;
    .orangeCoverOverInput {
      display: flex;
      position: absolute;
      background-color: var(--custom-red);
      width: 100%;
      z-index: 9999;
    }
    .investAmountInput {
      display: flex;
      position: relative;
      width: 420px;
      background-color: transparent;
      border: 1px solid var(--grey);
      border-bottom: 6px solid var(--custom-red);
      font-size: 70px;
      background-color: var(--lightGrey);
      text-align: center;
      margin-bottom: 0px;
      z-index: 8888;
    }
  }
  .pressEscLabel {
    display: flex;
    width: 420px;
    text-align: left;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 12px;
    margin-top: 10px;
    right: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .investAmountInput:focus {
    outline: none;
  }
  .setNewInvestAmountButton {
    display: flex;
    position: relative;
    color: white;
    margin-top: 60px;
    background-color: var(--custom-red);
    font-size: 14px;
    border: none;
    padding: 15px 20px;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    .closePopupButton {
    }
    .investAmountInputLabel {
    }
    .warningMessageContainer {
      .warningMessage {
      }
    }

    .investAmountInputContainer {
      display: flex;
      justify-content: center;

      .orangeCoverOverInput {
      }
      .investAmountInput {
        width: 290px;
        font-size: 54px;
      }
    }
    .pressEscLabel {
      display: none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    }
    .investAmountInput:focus {
    }
    .setNewInvestAmountButton {
    }
  }
`;

export default InvestmentAmountModal;
