import { useContext } from "react";
import { styled } from "styled-components";
import Spinner from "../components/Spinner";
import Table from "../components/Table";
import { stockContext } from "../context/stock";

const Home = () => {
  const { stock, isLoaded } = useContext(stockContext);
  return (
    <Container>
      <Main>
        <Title>Stock Control</Title>
        {isLoaded ? <Table data={stock} /> : <Spinner />}
      </Main>
    </Container>
  );
};
export default Home;

const Container = styled.section`
  padding: 0 2rem;
  flex: 1;
`;

const Main = styled.div`
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
  & a {
    color: #0070f3;
    text-decoration: none;
  }

  & a:hover,
  & a:focus,
  & a:active {
    text-decoration: underline;
  }
`;
