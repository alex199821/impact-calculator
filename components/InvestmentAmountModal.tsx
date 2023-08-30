"use client";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { InvestmentModalProps } from "../interfaces";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
const InvestmentAmountModal = ({
  investAmount,
  updateInvestAmount,
  handleInvestmentModal,
}: InvestmentModalProps) => {
  const [inputValue, setInputValue] = useState(investAmount);
  const [warningMessage, setWarningMessage] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    setInputValue(parseInt(newValue));
  };

  const recalculateImpact = () => {
    if (inputValue < 1 || inputValue > 1000000) {
      setWarningMessage(true);
      return;
    }
    updateInvestAmount && updateInvestAmount(inputValue);
    closePopup();
    document.body.style.overflow = "visible";
  };

  const closePopup = () => {
    handleInvestmentModal(false);
    document.body.style.overflow = "visible";
  };

  useEffect(() => {
    if (warningMessage) {
      setTimeout(() => {
        setWarningMessage(false);
      }, 1500);
    }
  }, [warningMessage]);

  useEffect(() => {
    setInputValue(investAmount);
  }, [investAmount]);



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
            animate={{
              y: [90, 0],
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 30,
              delay: 0.5,
              times: [0, 0.5],
            }}
            exit={{
              y: [0, 70],
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
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: [100, 0],
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                stiffness: 30,
                times: [0.16, 0, 0.32],
              }}
              className="orangeCoverOverInput"
            ></motion.div>
            <input
              type="number"
              value={inputValue}
              onChange={handleChange}
              className="investAmountInput"
            />
          </div>
          <p className="pressEscLabel">Hit the enter key or ESC to close</p>
          <motion.div
            animate={{
              y: [-160, 0],
            }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 30,
              delay: 0.5,
              times: [0, 0.2],
            }}
            exit={{
              y: [0, -100],
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* overflow-x: hidden; */
  background-color: var(--lightGrey);
  z-index: 9;
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
      bottom: 0;
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
    margin-bottom: 80px;
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
    background-color: var(--custom-red);
    font-size: 14px;
    border: none;
    padding: 15px 20px;
    cursor: pointer;
  }
`;

export default InvestmentAmountModal;
