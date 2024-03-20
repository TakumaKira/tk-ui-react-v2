import { TkUiReactV2ServiceExpress } from './tk-ui-react-v2-service-express.js';

describe('express server', () => {
  it('should say hello', async () => {
    const tkUiReactV2ServiceExpress = TkUiReactV2ServiceExpress.from();
    const greeting = await tkUiReactV2ServiceExpress.getHello();
    expect(greeting).toEqual('Hello World!');
  })
});
    