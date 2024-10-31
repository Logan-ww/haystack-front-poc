import { ReactNode, FC } from 'react';

type State = 'Shared' | 'Home' | 'Content';

type StateWrapperProps = {
  state: State;
  children: ReactNode;
};

export const StateWrapper: FC<StateWrapperProps> = ({ state, children }) => {
  const getColor = (state: State) => {
    switch (state) {
      case 'Shared':
        return '#93e993';
      case 'Home':
        return '#b4b4f9';
      case 'Content':
        return '#f2abab';
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        position: 'relative',
        background: getColor(state),
      }}
    >
      <span
        style={{
          position: 'absolute',
          fontSize: '12px',
          fontStyle: 'italic',
          left: 2,
          top: 2,
        }}
      >
        {state} state
      </span>
      {children}
    </div>
  );
};
