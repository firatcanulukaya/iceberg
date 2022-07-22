import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

export const LoginBtns = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const LoginBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--secondaryColor);
  padding: 1rem 2rem;
  border-radius: 5rem;
  color: #fff;
  transition: all .3s ease-in-out;
  cursor: pointer;
  font-size: 1.3rem;
  flex-shrink: 0;

  &:hover {
    transform: translate(20px, -10px) scale(1.1);
    box-shadow: -.6rem 0.8em 0.9em -0.3em var(--secondaryColorAlt);
  }
`;

export const IcebergLabel = styled.span`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const IcebergTitle = styled.h3`
  font-size: 2rem;
  color: #fff;
`;

export const IcebergLogo = styled.img`
  width: 64px;
  height: 64px;
`;
