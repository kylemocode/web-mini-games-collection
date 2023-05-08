import { createGlobalStyle } from 'styled-components';

import MineSweeperModule from '@/components/modules/mineSweeper';
import { flexBox, MainAlignment, CrossAlignment } from '@/utils/flexBox';

const PageStyle = createGlobalStyle`
    body {
      height: 100vh;
      ${flexBox({
        mainAlign: MainAlignment.center,
        crossAlign: CrossAlignment.center,
      })}
    }
`;

export default function MineSweeper() {
  return (
    <>
      <PageStyle />
      <MineSweeperModule />
    </>
  );
}
