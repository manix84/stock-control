import { useEffect, useRef } from "react";
import { keyframes, styled } from "styled-components";

const Background = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;

      (elementRef.current as HTMLDivElement).animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 7000, fill: "forwards" }
      );
    };
    addEventListener("pointermove", pointerMove);
    return () => removeEventListener("pointermove", pointerMove);
  }, []);

  return (
    <Container>
      <Overlay />
      <Element ref={elementRef} />
    </Container>
  );
};
export default Background;

const rotate = keyframes`
  from {
    rotate: 0deg;
  }
  50% {
    scale: 1 1.5;
  }
  to {
    rotate: 360deg;
  }
`;

const Element = styled.div`
  background-color: transparent;
  height: 34vmax;
  aspect-ratio: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border-radius: 50%;
  animation: ${rotate} 20s infinite;
  opacity: 0.8;
  z-index: -2;

  background: linear-gradient(to right, rgb(127, 255, 212), rgb(147, 112, 219));
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to right, rgb(0, 127, 84), rgb(73, 56, 109));
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -2;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  backdrop-filter: blur(12vmax);
`;
