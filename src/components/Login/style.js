import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginWithGoogleBtn = styled.button`
  display: flex;
  gap: 1rem;
  background-color: var(--secondaryColor);
  padding: 2rem 4rem;
  border-radius: 5rem;
  color: #fff;
  transition: all .5s ease-in-out;
  cursor: pointer;
  font-size: 2rem;

  &:hover {
    transform: translate(20px, -10px) scale(1.1);
    box-shadow: -.6rem 0.8em 0.9em -0.3em var(--secondaryColorAlt);
  }
`;
