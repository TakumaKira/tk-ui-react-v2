import { Routes, Route } from 'react-router-dom';
import { NavigationProvider, Link } from '@bitdesign/sparks.navigation.link';
import { Header } from '@bitdesign/sparks.layout.header';
import { Logo } from '@bitdesign/sparks.content.logo';
import { AcmeTheme } from '@acme/design.acme-theme';
import { Announcements } from '@takumakira-individual/tk-ui-react-v2.ui.announcements';

export function TkUiReactV2Web() {
  return (
    <AcmeTheme>
      <NavigationProvider>
        <Header logo={<Logo src='https://static.bit.dev/extensions-icons/acme.svg' name='Acme' slogan='Inc.' />}>
          <Link href='/'>Investors</Link>          
        </Header>
        <Routes>
          <Route path="/" element={<Announcements />} />
        </Routes>
      </NavigationProvider>
    </AcmeTheme>
  );
}
