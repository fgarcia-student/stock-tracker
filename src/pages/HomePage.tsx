import styled from "styled-components";
import {ActiveStockDetails} from "../components/ActiveStockDetails";
import {LiveStatsGrid} from "../components/LiveStatsGrid";
import {TrackedStockList} from "../components/TrackedStockList";

interface Props {
  className?: string;
}

const Row = styled.section<{height?: string; paddingTop?: string;}>`
  display: flex;
  flex: 1;
  height: ${p => p.height || "unset"};
  padding-top: ${p => p.paddingTop || "unset"};
`;

const HomePageComponent = (props: Props) => {
  return (
    <section className={props.className}>
      <ActiveStockDetails/>
      <Row height={"75%"} paddingTop={"10px"}>
        <TrackedStockList/>
        <LiveStatsGrid/>
      </Row>
    </section>
  );
};

export const HomePage = styled(HomePageComponent)`
  flex: 1;
  padding: 10px;
`;
