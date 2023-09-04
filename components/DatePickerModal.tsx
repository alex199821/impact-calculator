"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import { DatePickerModalProps } from "../interfaces";
import { DayPicker } from "react-day-picker";

const DatePickerModal = ({
  selected,
  defaultMonth,
  handleDateSelect,
  closeDatePickerModal,
}: DatePickerModalProps) => {
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
        <DatePickerModalWrapper>
          <button className="closePopupButton" onClick={closeDatePickerModal}>
            ✕
          </button>
          <div className="datePickerAndLabelContainer">
            <motion.p
              initial={{
                y: 50,
              }}
              animate={{ y: [50, 0] }}
              exit={{ y: [0, 50] }}
              transition={{
                duration: 0.01,
                type: "spring",
                stiffness: 30,
              }}
              className="datePickerLabelInModal"
            >
              Enter the amount you wish to invest
            </motion.p>
            <DayPicker
              mode="single"
              defaultMonth={defaultMonth}
              selected={selected}
              onSelect={handleDateSelect}
              className="datePickerInModal"
              toDate={new Date()}
            />
          </div>
        </DatePickerModalWrapper>
      </motion.div>
    </>
  );
};

const DatePickerModalWrapper = styled.section`
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
    z-index: 99;
  }
  .datePickerAndLabelContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .datePickerLabelInModal {
      z-index: 15;
      position: relative;
      font-weight: medium;
    }
    .datePickerInModal {
      position: relative;
      z-index: 16;
    }
  }
`;

export default DatePickerModal;
