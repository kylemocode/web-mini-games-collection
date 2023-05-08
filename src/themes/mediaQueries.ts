import { css } from 'styled-components';

const makeCss =
  (size: number) =>
  (...args: any[]) =>
    css`
      @media (max-width: ${size}px) {
        ${(css as any)(...args)}
      }
    `;

export const MediaQueries = {
  mobileS: makeCss(320),
  mobileM: makeCss(375),
  mobileL: makeCss(425),
  tablet: makeCss(768),
  laptop: makeCss(1024),
  laptopL: makeCss(1440),
  desktop: makeCss(2560),
};
