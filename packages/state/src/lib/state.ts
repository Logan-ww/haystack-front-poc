import { makeVar } from '@apollo/client';

type AppSettings = {
  displayNavigation: boolean;
};

export const appSettingsVar = makeVar<AppSettings>({
  displayNavigation: true,
});
