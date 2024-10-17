import mitt, { Emitter } from 'mitt';
import type { Settings } from 'apps/remote-content-pages/src/app/hooks/useSettings';
import type { Book } from '@fdc-frontend/state';

type Events = {
  REMOTE_HOME_GET_BOOKS: Book[];
  REMOTE_CONTENT_SETTINGS: Settings;
};

export const emitter: Emitter<Events> = mitt<Events>();

export default emitter;
