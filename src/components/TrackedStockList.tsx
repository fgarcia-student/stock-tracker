import styled from "styled-components";

interface Props {
  className?: string;
}

const TrackedStockListComponent = (props: Props) => {
  return (
    <aside className={props.className}>
      <button>Add stock to tracker button</button>
      <article>List of tracked stocks</article>
    </aside>
  );
};

export const TrackedStockList = styled(TrackedStockListComponent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 10px;

  button {

  }

  article {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    text-align: center;
    border: 1px solid black;
  }
`;