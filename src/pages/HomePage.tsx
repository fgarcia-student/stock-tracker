import styled from "styled-components";

interface Props {
  className?: string;
}

const HomePageComponent = (props: Props) => {
  return (
    <div className={props.className}>
      <div>Active Stock Details</div>
      <div>
        <div>
          <div>Add stock to tracker button</div>
          <div>List of tracked stocks</div>
        </div>
        <div>Active Stock Grid</div>
      </div>
    </div>
  );
};

export const HomePage = styled(HomePageComponent)`
  flex: 1;
`;
