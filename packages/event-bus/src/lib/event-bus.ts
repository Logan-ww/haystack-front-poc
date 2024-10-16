import mitt, { Emitter } from 'mitt';
import type { Book } from 'apps/remote-home/src/__generated__/graphql';
import type { Settings } from 'apps/remote-content-pages/src/app/hooks/useSettings';
import { ReactiveVar } from '@apollo/client';

type Events = {
  REMOTE_HOME_GET_BOOKS: Book[];
  REMOTE_CONTENT_SETTINGS: Settings;
  REMOTE_CONTENT_SETTINGS_VAR: ReactiveVar<Settings>;
};

export const emitter: Emitter<Events> = mitt<Events>();

export default emitter;
