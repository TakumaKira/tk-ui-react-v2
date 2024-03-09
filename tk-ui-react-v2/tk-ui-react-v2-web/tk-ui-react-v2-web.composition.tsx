import { MockProvider } from '@acme/acme.testing.mock-provider';
import { TkUiReactV2Web } from "./tk-ui-react-v2-web.js";
    
export const TkUiReactV2WebBasic = () => {
  return (
    <MockProvider noTheme>
      <TkUiReactV2Web />
    </MockProvider>
  );
}
