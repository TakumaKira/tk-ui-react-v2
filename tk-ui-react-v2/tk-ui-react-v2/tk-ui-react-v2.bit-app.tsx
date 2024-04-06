import { Platform } from '@bitdev/platforms.platform';

const TkUiReactV2Web = import.meta.resolve('@takumakira-individual/tk-ui-react-v2.tk-ui-react-v2-web');
const TkUiReactV2ServiceExpress = import.meta.resolve('@takumakira-individual/tk-ui-react-v2.tk-ui-react-v2-service-express');

export const TkUiReactV2 = Platform.from({
  name: 'tk-ui-react-v2',

  frontends: {
    main: TkUiReactV2Web,
    mainPortRange: [3000, 3100]
  },

  backends: {
    main: TkUiReactV2ServiceExpress,
  },
});

export default TkUiReactV2;
