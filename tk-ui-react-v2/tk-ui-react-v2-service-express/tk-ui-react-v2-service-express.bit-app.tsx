import { NodeServer } from '@bitdev/node.node-server';

export default NodeServer.from({
  name: 'tk-ui-react-v2-service-express',
  mainPath: import.meta.resolve('./tk-ui-react-v2-service-express.app-root.js'),
});
