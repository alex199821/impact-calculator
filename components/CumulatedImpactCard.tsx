"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "chartjs-plugin-datalabels";
import Image from "next/image";
import { ImpactCardProps } from "../interfaces";
import {
  calculateYearsPassed,
  impactCalculator,
} from "../utils/helperFunctions";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
  Legend,
  ChartDataLabels
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
    layout: {
      padding: {
        top: 35,
      },
    },
    elements: {
      bar: {
        borderWidth: 1.2,
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grace: "10%",
        suggestedMin:
          chartGroup === "b"
            ? 0 - (Math.abs(normalizedImpact) * investAmount) / 500000
            : 0,
        suggestedMax:
          chartGroup === "b"
            ? (Math.abs(normalizedImpact) * investAmount) / 500000
            : 0,
        grid: {
          display: true,
          color: (context) => {
            if (context.tick.value === 0) {
              return "rgba(102,102,102,0.2)";
            } else {
              return "transparent";
            }
          },
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
          callback: function (value: string | number): string {
            return chartGroup === "a"
              ? Number(value).toFixed(0) + " " + impactUnit
              : Number(value).toFixed(2) + " " + impactUnit;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        labels: {
          title: {
            display: true,
            borderRadius: 0,
            color: "black",
            backgroundColor: "#d8d8d8",
            align: "end",
            anchor: "end",
            offset: 5,
            rotation: 45,
            padding: function (context) {
              return {
                top: 5,
                bottom: 5,
                left: 12,
                right: 12,
              };
            },
            formatter: function (value, context) {
              if (context.chart.data && context.dataset.data[0] == 0) {
                return null;
              } else if (context.dataset.data[0]) {
                return "";
              }
            },
          },
          value: {
            display: true,
            borderRadius: 0,
            color: "black",
            backgroundColor: "#d8d8d8",
            align: "end",
            anchor: "end",
            offset: 10,
            padding: function (context) {
              return {
                top: 5,
                bottom: 5,
                left: 18,
                right: 18,
              };
            },
            textAlign: "center",
            font: { size: 10, weight: "bold" },
            formatter: function (value, context) {
              if (context.chart.data && context.dataset.data[0] == 0) {
                return null;
              } else if (context.dataset.data[0]) {
                return chartGroup == "a"
                  ? [
                      `${Number(context.dataset.data[0]).toFixed(0)}`,
                      `${impactUnit}`,
                    ]
                  : [
                      `${Number(context.dataset.data[0]).toFixed(1)}`,
                      `${impactUnit}`,
                    ];
              }
            },
          },
        },
      },
      tooltip: {
        enabled: false,
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
        hoverBackgroundColor: "white",
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
