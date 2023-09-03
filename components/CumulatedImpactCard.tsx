"use client";
import { impactCalculator } from "../utils/helperFunctions";
import { ImpactCardProps } from "../interfaces";
import { getNumberBasedOnRange } from "../utils/helperFunctions";
import { useEffect, useState } from "react";
import "chartjs-plugin-datalabels";
import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";
import { calculateYearsPassed } from "../utils/helperFunctions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CumulatedImpactCard = ({
  impactData,
  investAmount,
  calculationStartDate,
}: ImpactCardProps) => {
  const {
    icons,
    title,
    normalizedImpact,
    showFullYear,
    color,
    impactUnit,
    chartGroup,
  } = impactData;

  const [chartColor, setChartColor] = useState<string | null>(null);

  useEffect(() => {
    setChartColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        `--custom-${color}`
      )
    );
  }, []);

  let options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      bar: {
        borderSkipped: false,
        borderWidth: 1.2,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        min:
          chartGroup === "b"
            ? calculateYearsPassed(calculationStartDate) > 1
              ? -getNumberBasedOnRange(
                  impactCalculator(normalizedImpact, investAmount)
                ) *
                8 *
                Math.ceil(calculateYearsPassed(calculationStartDate))
              : -getNumberBasedOnRange(
                  impactCalculator(normalizedImpact, investAmount)
                ) * 8
            : 0,
        max:
          calculateYearsPassed(calculationStartDate) > 1
            ? getNumberBasedOnRange(
                impactCalculator(normalizedImpact, investAmount)
              ) *
              10 *
              Math.ceil(calculateYearsPassed(calculationStartDate))
            : getNumberBasedOnRange(
                impactCalculator(normalizedImpact, investAmount)
              ) * 10,
        grid: {
          display: true,
          drawTicks: false,
          lineWidth: (context) => (context.tick.value == 0 ? 1 : 0),
        },
        border: {
          display: false,
        },
        afterTickToLabelConversion: (ctx) => {
          ctx.ticks.push({ value: 0, label: "0" });
        },
        ticks: {
          display: true,
          stepSize: getNumberBasedOnRange(
            impactCalculator(normalizedImpact, investAmount)
          ),
          callback: function (value: string | number): string {
            return (value + " " + impactUnit).toString();
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      colors: {
        enabled: false,
        forceOverride: true,
      },
      title: {
        display: false,
      },
      datalabels: {
        display: false,
      },

      tooltip: {
        enabled: true,
        backgroundColor: "#d8d8d8",
        displayColors: false,
        padding: 10,
        cornerRadius: 0,
        yAlign: "bottom" as const,
        callbacks: {
          label: (context) => {
            let label = "";
            if (context.parsed.y) {
              label = context.parsed.y.toFixed(1) + "\n" + impactUnit;
            }
            return label;
          },
          labelTextColor: () => {
            return "#000000";
          },
        },
      },
    },
  };

  const labels = [""];

  let data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Full Year Impact",
        data: [
          impactCalculator(normalizedImpact, investAmount) *
            calculateYearsPassed(calculationStartDate),
        ],
        backgroundColor:
          typeof chartColor === "string" ? chartColor : "transparent",
        borderColor:
          typeof chartColor === "string" ? chartColor : "transparent",
        barPercentage: 0.7,
      },
      {
        label: "Cumulative Impact",
        data: [
          showFullYear === true
            ? impactCalculator(normalizedImpact, investAmount)
            : 0,
        ],
        backgroundColor: "white",
        borderColor:
          typeof chartColor === "string" ? chartColor : "transparent",
        barPercentage: 0.7,
      },
      {
        label: "Dataset 3",
        data: [0],
        backgroundColor: "white",
        borderColor: "white",
      },
    ],
  };

  return (
    <CumulatedImpactCardWrapper>
      <div className="cumulatedImpactIconContainer">
        <Image src={`/icons/${icons[0]}`} alt="" width="35" height="45" />
      </div>

      <div className="barChartContainer">
        {chartColor && <Bar options={options} data={data} />}
        {showFullYear && <p className="fullYearLabel">Full Year</p>}
      </div>
      <p
        className="barChartTitle"
        style={{ color: chartColor ? chartColor : "transparent" }}
      >
        {title}
      </p>
    </CumulatedImpactCardWrapper>
  );
};

const CumulatedImpactCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  border: 1px solid var(--grey);
  justify-content: flex-end;
  position: absolute;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background-color: var(--white);
  .cumulatedImpactIconContainer {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 100%;
  }
  .barChartContainer {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 80%;
    width: 100%;
    padding-left: 5px;
    .fullYearLabel {
      position: absolute;
      right: -10px;
      top: 45%;
      font-size: 12px;
      letter-spacing: 2px;
      transform: rotate(-90deg);
    }
  }
  .barChartTitle {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

export default CumulatedImpactCard;
