/// <reference types="jest-styled-components" />
// ref. https://www.styled-components.com/docs/api#typescript

// import original module declarations
import { FlattenSimpleInterpolation } from 'styled-components';
import Colors from '@/themes/colors';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends IMediaQuery, IColor {}
}

type MediaQueryType = (...args: any[]) => FlattenSimpleInterpolation;

interface IMediaQuery {
  mobileS: MediaQueryType;
  mobileM: MediaQueryType;
  mobileL: MediaQueryType;
  tablet: MediaQueryType;
  laptop: MediaQueryType;
  laptopL: MediaQueryType;
  desktop: MediaQueryType;
}

type ColorCommonTypes = { colors: typeof Colors };

interface IColor extends ColorCommonTypes {}
