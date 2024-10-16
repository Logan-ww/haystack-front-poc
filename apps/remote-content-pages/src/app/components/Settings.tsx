import { useReactiveVar } from '@apollo/client';
import { useSettings } from '../hooks/useSettings';
import { appSettingsVar } from '@fdc-frontend/state';

export const Settings = () => {
  const { settings } = useSettings();
  const appSettings = useReactiveVar(appSettingsVar);
  const handleToggleNavigation = () => {
    appSettingsVar({
      ...appSettings,
      displayNavigation: !appSettings.displayNavigation,
    });
  };
  return (
    <>
      <div>Settings: {JSON.stringify(settings)}</div>
      <button onClick={handleToggleNavigation}>Toggle Navigation</button>
      <div>App Settings: {JSON.stringify(appSettings)}</div>
    </>
  );
};
