import { useSettings } from './hooks/useSettings';

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function NxWelcome({ title }: { title: string }) {
  const { settings, settingsVar } = useSettings();

  const { displayBook } = settings;
  return (
    <>
      <style />
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome to {title} 👋
            </h1>
            <button onClick={() => settingsVar({ displayBook: !displayBook })}>
              Toggle display book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NxWelcome;
