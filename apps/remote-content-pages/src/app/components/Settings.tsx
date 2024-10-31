import { useReactiveVar } from '@apollo/client';
import { useSettings } from '../hooks/useSettings';
import { appSettingsVar } from '@fdc-frontend/state';
import { StateWrapper } from '@fdc-frontend/ui';

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
      <p>
        <StateWrapper state="Content">
          <div>Content Settings: {JSON.stringify(settings)}</div>
        </StateWrapper>
      </p>

      <StateWrapper state="Shared">
        <p>
          <button onClick={handleToggleNavigation}>Toggle Navigation</button>
          <div>App Settings: {JSON.stringify(appSettings)}</div>
        </p>
      </StateWrapper>
    </>
  );
};
