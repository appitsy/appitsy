import React from 'react';

/**
 * The theme components only imports it's theme CSS-file. These components are lazy
 * loaded, to enable "code splitting" (in order to avoid the themes being bundled together)
 */
const BootstrapTheme = React.lazy(() => import('./bootstrap/bootstrap'));
const FoundationTheme = React.lazy(() => import('./foundation/foundation'));

const ThemeSelector: React.FC = ({ children }) => {
  const theme = window.localStorage['appitsy-theme'];

  return (
    <>
      {/* Conditionally render theme, based on the current client context */}
      <React.Suspense fallback={() => null}>
        {theme === 'bootstrap' && <BootstrapTheme />}
        {theme === 'foundation' && <FoundationTheme />}
      </React.Suspense>
      {/* Render children immediately! */}
      {children}
    </>
  )
};

export default ThemeSelector;
