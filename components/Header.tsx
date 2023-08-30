"use client";
import styled from "styled-components";
import Image from "next/image";
const Header = () => {
  return (
    <HeaderWrapper>
      <Image
        src={"/icons/logo.svg"}
        alt=""
        width={150}
        height={70}
        className="projectLogo"
      />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.section`
  width: 800px;
  margin: auto;
  position: -webkit-sticky;
  position: sticky;
  z-index: 99997;
  top: 0;
  background-color: var(--white);
  .projectLogo {
    margin-left: 40px;
  }
`;

export default Header;
