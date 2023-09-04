"use client";
import styled from "styled-components";
import Image from "next/image";
import { HeroStateUpdate } from "../interfaces";
import { motion } from "framer-motion";
const Header = ({ typeSwithcerIsOnTop }: HeroStateUpdate) => {
  return (
    <HeaderWrapper>
      <motion.div
        initial={{
          height: 50,
        }}
        animate={typeSwithcerIsOnTop ? { height: 30 } : { height: 50 }}
        transition={{
          duration: 0.1,
          type: "Tween",
          stiffness: 50,
        }}
        className="logoContainer"
      >
        <Image
          src={"/icons/logo.svg"}
          alt=""
          width="0"
          height="0"
          sizes="100vw"
          className={`projectLogo ${
            typeSwithcerIsOnTop && "projectLogoVisibility"
          }`}
        />
      </motion.div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.section`
  display: flex;
  width: 800px;
  align-items: center;
  margin: auto;
  height: 100px;
  background-color: var(--white);
  .logoContainer {
    display: flex;
    background-color: var(--white);
    .projectLogoVisibility {
      visibility: visible;
    }
    .headerHeightDecreased {
      height: 50px;
    }
    .projectLogo {
      width: auto;
      height: auto;
      margin-left: 40px;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    .logoContainer {
      display: flex;
      background-color: var(--white);
      .projectLogoVisibility {
        visibility: hidden;
      }
    }
  }
`;

export default Header;
