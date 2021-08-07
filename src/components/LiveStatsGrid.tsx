import styled from "styled-components";

interface Props {
  className?: string;
}

const LiveStatsGridComponent = (props: Props) => {
  return (
    <section className={props.className}>
      Active Stock Grid
    </section>
  )
}

export const LiveStatsGrid = styled(LiveStatsGridComponent)`
  flex: 3;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;