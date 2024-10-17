import { makeVar, useReactiveVar } from '@apollo/client';
import { emitter } from '@fdc-frontend/event-bus';

import { useEffect } from 'react';

export type Settings = {
  displayBook: boolean;
};

const settingsVar = makeVar<Settings>({
  displayBook: true,
});

export const useSettings = () => {
  const settings = useReactiveVar(settingsVar);

  useEffect(() => {
    emitter.emit('REMOTE_CONTENT_SETTINGS', settings);
  }, [settings]);

  return { settings, settingsVar };
};
