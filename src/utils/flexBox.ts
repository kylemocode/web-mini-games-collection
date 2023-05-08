import { css, FlattenSimpleInterpolation } from 'styled-components';

export enum Direction {
  row = 'row',
  rowReverse = 'row-reverse',
  column = 'column',
  columnReverse = 'column-reverse',
}

export enum MainAlignment {
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  center = 'center',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  spaceEvenly = 'space-evenly',
}

export enum CrossAlignment {
  stretch = 'stretch',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  center = 'center',
  baseline = 'baseline',
}

interface FlexBoxArgs {
  direction?: Direction;
  mainAlign?: MainAlignment;
  crossAlign?: CrossAlignment;
}

export function flexBox({
  direction = Direction.row,
  mainAlign = MainAlignment.flexStart,
  crossAlign = CrossAlignment.stretch,
}: FlexBoxArgs): FlattenSimpleInterpolation {
  return css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${mainAlign};
    align-items: ${crossAlign};
  `;
}
