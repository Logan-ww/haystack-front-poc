import { useSettings } from '../hooks/useSettings';

export const Settings = () => {
  const { settings } = useSettings();
  return <div>Settings: {JSON.stringify(settings)}</div>;
};
