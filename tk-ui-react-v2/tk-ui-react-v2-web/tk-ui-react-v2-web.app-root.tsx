import { BrowserRouter } from 'react-router-dom';
import { 
  createRoot, 
  // hydrateRoot 
} from 'react-dom/client';
import { AcmeApolloProvider } from './apollo-provider.js';
import { TkUiReactV2Web } from "./tk-ui-react-v2-web.js";

/**
 * comment this in for server-side rendering (ssr) and comment 
 * out of the root.render() invocation below.
*/
// hydrateRoot(
//   document.getElementById("root") as HTMLElement,
//   <BrowserRouter>
//     <TkUiReactV2Web />
//   </BrowserRouter>
// );

/**
 * mounting for client side rendering.
 */
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <AcmeApolloProvider>
      <TkUiReactV2Web />
    </AcmeApolloProvider>
  </BrowserRouter>
);
