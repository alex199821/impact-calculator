"use client";
import styled from "styled-components";
import { CumulatedImpactUpdate } from "../interfaces";
import React, { useState, useEffect, useRef } from "react";
const ImpactTypeSwitcher = ({
  cumulatedImpactSelected,
  updateCumulatedImpact,
}: CumulatedImpactUpdate) => {
  return (
    <ImpactTypeSwitcherWrapper>
      <div className="switchButtonContainer">
        <button
          className={`impactSwitchButton ${
            cumulatedImpactSelected
              ? "impactSwitchButtonOff"
              : "impactSwitchButtonSelected"
          }`}
          onClick={() => updateCumulatedImpact && updateCumulatedImpact(false)}
        >
          IMPACT SCORE
        </button>
        <button
          className={`impactSwitchButton ${
            cumulatedImpactSelected
              ? "impactSwitchButtonSelected"
              : "impactSwitchButtonOff"
          }`}
          onClick={() => updateCumulatedImpact && updateCumulatedImpact(true)}
        >
          CUMULATED IMPACT
        </button>
      </div>
    </ImpactTypeSwitcherWrapper>
  );
};

const ImpactTypeSwitcherWrapper = styled.section`
  .switchButtonContainer {
    display: flex;
    width: fit-content;
    height: 32px;
    z-index: 99997;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
    border-left: 1px solid var(--grey);
    border-right: 1px solid var(--grey);
    border-bottom: 1px solid var(--grey);
    .impactSwitchButton {
      display: flex;
      width: 160px;
      font-size: 12px;
      padding: 0px 14px;
      border: none;
      justify-content: center;
      align-items: center;
    }
    .impactSwitchButtonSelected {
      border-bottom: none;
      background-color: var(--white);
      -moz-box-shadow: inset 0px 3px 0px 0px var(--custom-red);
      box-shadow: inset 0px 3px 0px 0px var(--custom-red);
      -webkit-box-shadow: 0px -3px 0px 0px var(--custom-red);
    }
    .impactSwitchButtonOff {
      background-color: #ecf9fd;
      border-top: 1px solid var(--grey);
      cursor: pointer;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export default ImpactTypeSwitcher;
