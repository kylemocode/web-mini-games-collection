import { FC, useCallback, useState, useEffect, useRef, memo } from 'react';
import styled from 'styled-components';

import useMineScreeperTimer from '@/hooks/useMineScreeperTimer';
import { flexBox, MainAlignment, CrossAlignment } from '@/utils/flexBox';
import { MineSweeperState } from './types';
import { CeilStatus, GameStatus, MineSweeperDifficulty } from './config';

interface IMineSweeperContainerProps extends MineSweeperState {
  handleReset: (difficulty: MineSweeperDifficulty) => void;
  openingSingleCeil: (index: number, gameStatus: GameStatus) => void;
  openingMultiCeils: (index: number, gameStatus: GameStatus) => void;
  openSingleCeil: (index: number) => void;
  openMultiCeils: (index: number) => void;
  changeCeilStatus: (
    index: number,
    gameStatus: GameStatus,
    ceil: MineSweeperState['ceils'][number]
  ) => void;
}

interface ICeilsProps {
  ceils: MineSweeperState['ceils'];
  onMouseEnter: (index: number) => void;
  onDoubleClick: (index: number) => void;
  onMouseDown: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
}

const renderCeil = (ceil: MineSweeperState['ceils'][number]) => {
  const { status, opening, nearBombs } = ceil;

  switch (status) {
    case CeilStatus.FLAGGED:
      return '🚩';
    case CeilStatus.DIE:
      return '💥';
    case CeilStatus.OPEN:
      return (
        <StyledCeilOpening>
          {nearBombs === 0 ? '' : nearBombs}
        </StyledCeilOpening>
      );
    case CeilStatus.MISFLAGGED:
      return '❌';
    case CeilStatus.MINE:
      return '💣';
    case CeilStatus.UNKNOWN:
      return '?';
    default:
      return opening ? <StyledCeilOpening /> : '';
  }
};

const Ceils: FC<ICeilsProps> = ({
  ceils,
  onMouseDown,
  onMouseEnter,
  onDoubleClick,
}) => {
  return (
    <>
      {ceils.map((ceil, idx) => (
        <StyledCeilWrapper
          key={idx}
          onMouseDown={e => onMouseDown(e, idx)}
          onMouseEnter={() => onMouseEnter(idx)}
          onDoubleClick={() => onDoubleClick(idx)}
        >
          {renderCeil(ceil)}
        </StyledCeilWrapper>
      ))}
    </>
  );
};

// eslint-disable-next-line react/display-name
const TimerSection: FC<{ status: GameStatus }> = memo(({ status }) => {
  const timerSeconds = useMineScreeperTimer(status);

  return (
    <>
      ⏰ : <StyledNumberSpan>{timerSeconds}</StyledNumberSpan>
    </>
  );
});

const MineSweeperContainer: FC<IMineSweeperContainerProps> = ({
  ceils,
  rows,
  columns,
  status,
  bombs,
  difficulty,
  handleReset,
  changeCeilStatus,
  openingSingleCeil,
  openingMultiCeils,
  openSingleCeil,
  openMultiCeils,
}) => {
  const [mouseDownContent, setMouseDownContent] = useState(false);
  const [openInformation, setOpenInformation] = useState({
    index: -1,
    singleClick: false,
  });
  const statusEmojiRef = useRef<HTMLDivElement | null>(null);

  const remainBombs =
    bombs -
    ceils.filter(
      ceil =>
        ceil.status === CeilStatus.FLAGGED ||
        ceil.status === CeilStatus.MISFLAGGED
    ).length;

  const getStatusFace = (status: GameStatus) => {
    if (mouseDownContent) return '🧐';

    switch (status) {
      case GameStatus.DIED:
        return '🥵';
      case GameStatus.WIN:
        return '😎';
      default:
        return '😃';
    }
  };

  const handleMouseDownOnCeils = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    /* 2 means right click */
    if (e.button === 2 && e.buttons === 2 && index !== -1) {
      changeCeilStatus(index, status, ceils[index]);
    } else if (e.button === 0 && e.buttons === 1) {
      /* The current event is triggered by pressing the left button alone, and other buttons (such as the right or middle button) are not pressed */
      setOpenInformation({
        index,
        singleClick: true,
      });
    }
  };

  const handleCeilMouseUp = () => {
    const { index, singleClick } = openInformation;

    if (index === -1) return;

    if (singleClick) {
      openSingleCeil(index);
    }
  };

  const handleMouseOverCeils = (index: number) => {
    setOpenInformation({
      index,
      singleClick: openInformation.singleClick,
    });
  };

  const handleMouseDownOnContent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.button !== 0) return;
    if (!statusEmojiRef.current) return;
    if (
      statusEmojiRef.current.contains(e.target as HTMLDivElement) ||
      status === GameStatus.WIN ||
      status === GameStatus.DIED
    )
      return;

    setMouseDownContent(true);
  };

  const handleMouseUp = () => {
    setOpenInformation({ index: -1, singleClick: false });
    setMouseDownContent(false);
  };

  const handleDoubleClickOnCeil = (index: number) => {
    openMultiCeils(index);
  };

  useEffect(() => {
    const { index, singleClick } = openInformation;

    if (singleClick) {
      openingSingleCeil(index, status);
    } else {
      openingSingleCeil(-1, status);
    }
  }, [openInformation, openingMultiCeils, openingSingleCeil, status]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <StyledGameContainer
      onContextMenu={e => {
        e.preventDefault();
      }}
    >
      <StyledHeader>
        <StyledDifficultyBtn
          onClick={() => handleReset(MineSweeperDifficulty.BEGINNER)}
        >
          Easy
        </StyledDifficultyBtn>
        <StyledDifficultyBtn
          onClick={() => handleReset(MineSweeperDifficulty.INTERMEDIATE)}
        >
          Mid
        </StyledDifficultyBtn>
        <StyledDifficultyBtn
          onClick={() => handleReset(MineSweeperDifficulty.HARD)}
        >
          Hard
        </StyledDifficultyBtn>
      </StyledHeader>
      <div onMouseDown={handleMouseDownOnContent}>
        <StyledStatusBoard>
          <StyledStatusItem>
            💣 : <StyledNumberSpan>{remainBombs}</StyledNumberSpan>
          </StyledStatusItem>
          <StyledStatusItem>
            <StyledStatusFaceBtn
              ref={statusEmojiRef}
              onClick={() => handleReset(difficulty)}
            >
              {getStatusFace(status)}
            </StyledStatusFaceBtn>
          </StyledStatusItem>
          <StyledStatusItem>
            <TimerSection status={status} />
          </StyledStatusItem>
        </StyledStatusBoard>
        <StyledCeilsSection
          columns={columns}
          rows={rows}
          onMouseUp={handleCeilMouseUp}
        >
          <Ceils
            ceils={ceils}
            onMouseDown={handleMouseDownOnCeils}
            onMouseEnter={handleMouseOverCeils}
            onDoubleClick={handleDoubleClickOnCeil}
          />
        </StyledCeilsSection>
      </div>
    </StyledGameContainer>
  );
};

export default MineSweeperContainer;

const StyledGameContainer = styled.div`
  padding: 20px 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: ${p => p.theme.colors.WHITE_100};
  border-radius: 5px;
`;

const StyledHeader = styled.div`
  position: relative;
  margin-bottom: 5px;
  ${flexBox({})}
`;

const StyledDifficultyBtn = styled.div`
  border-radius: 8px;
  border: solid 2px ${p => p.theme.colors.CEIL_RED};
  color: ${p => p.theme.colors.CEIL_RED};
  padding: 3px 10px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: ${p => p.theme.colors.CEIL_RED};
    color: ${p => p.theme.colors.WHITE_100};
  }
`;

const StyledStatusBoard = styled.div`
  color: ${p => p.theme.colors.BLACK_085};
  margin: 10px 0;
  ${flexBox({
    mainAlign: MainAlignment.spaceBetween,
    crossAlign: CrossAlignment.center,
  })}
`;

const StyledStatusItem = styled.div`
  font-weight: 600;
  width: 60px;
  ${flexBox({
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })};
`;

const StyledStatusFaceBtn = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const StyledCeilsSection = styled.div<{
  columns: number;
  rows: number;
}>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 26px);
  grid-template-rows: repeat(${({ rows }) => rows}, 26px);
  grid-gap: 3px;
`;

const StyledCeilWrapper = styled.div`
  background: ${p => p.theme.colors.CEIL_RED};
  width: 26px;
  height: 26px;
  border-radius: 3px;
  cursor: pointer;
  ${flexBox({
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })};
`;

const StyledCeilOpening = styled.div`
  background: ${p => p.theme.colors.CEIL_RED_OPRNING};
  width: 26px;
  height: 26px;
  border-radius: 3px;
  cursor: pointer;
  ${flexBox({
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })}
`;

const StyledNumberSpan = styled.span`
  width: 25px;
  margin-left: 3px;
`;
