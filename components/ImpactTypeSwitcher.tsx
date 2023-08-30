"use client";
import styled from "styled-components";
import { CumulatedImpactUpdate } from "../interfaces";

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
    position: absolute;
    width: fit-content;
    height: auto;
    z-index: 99997;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
    .impactSwitchButton {
      display: flex;
      width: 170px;
      font-size: 12px;
      padding: 10px 14px;
      border: none;
      justify-content: center;
      align-items: center;
    }
    .impactSwitchButtonSelected {
      border-bottom: none;
      background-color: var(--white);
      -moz-box-shadow: inset 0px 4px 0px 0px var(--custom-red);
      box-shadow: inset 0px 4px 0px 0px var(--custom-red);
      -webkit-box-shadow: 0px -4px 0px 0px var(--custom-red);
    }
    .impactSwitchButtonOff {
      background-color: #ecf9fd;
      border: 1px solid var(--grey);
      border-bottom: none;
    }
  }
`;

export default ImpactTypeSwitcher;
