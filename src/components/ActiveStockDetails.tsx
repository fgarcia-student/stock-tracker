import styled from "styled-components";

interface Props {
  className?: string;
}

const ActiveStockDetailsComponent = (props: Props) => {
  return (
    <article className={props.className}>
      Active Stock Details
    </article>
  );
};

export const ActiveStockDetails = styled(ActiveStockDetailsComponent)`
  height: 25%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

