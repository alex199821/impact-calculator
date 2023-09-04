"use client";
import styled from "styled-components";
import Image from "next/image";
import { HeroProps } from "../interfaces";
const Hero = ({ typeSwithcerIsOnTop }: HeroProps) => {
  return (
    <HeroWrapper
      style={
        typeSwithcerIsOnTop ? { position: "relative" } : { position: "sticky" }
      }
    >
      <div className="descriptionContainer">
        <h1 className="mainHeaderText">FF Sustainable Water & Waste Fund</h1>
        <h2 className="projectDescription">
          See what a positive impact investing in the fund can have over the
          future of our environment.
        </h2>
      </div>
      <div className="gradient" />
      <Image
        src={"/images/hero-bg@3x.jpg"}
        alt=""
        className="headerImage"
        width="0"
        height="0"
        sizes="100vw"
        priority
      />
    </HeroWrapper>
  );
};

const HeroWrapper = styled.section`
  display: flex;
  margin: auto;
  width: 800px;
  height: 300px;
  position: relative;
  z-index: 10;
  .gradient {
    float: left;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 4;
    background: linear-gradient(
      90deg,
      rgba(0, 97, 147, 1) 45%,
      rgba(0, 97, 147, 0.95) 50%,
      rgba(0, 97, 147, 0) 100%
    );
    color: #ffffff;
    font-weight: bold;
  }
  .descriptionContainer {
    display: flex;
    flex-direction: column;
    width: 450px;
    justify-content: center;
    row-gap: 20px;
    padding: 40px;
    position: relative;
    z-index: 5;
    .mainHeaderText {
      font-size: 46px;
      color: var(--white);
      line-height: 1;
    }
    .projectDescription {
      font-size: 18px;
      color: var(--white);
      line-height: 1.25;
    }
  }
  .headerImage {
    display: flex;
    position: absolute;
    width: auto;
    right: 0;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 18/12;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    .descriptionContainer {
      .mainHeaderText {
        font-size: 32px;
      }
    }
  }
`;

export default Hero;
