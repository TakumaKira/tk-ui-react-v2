import { TkUiReactV2Service } from './tk-ui-react-v2-service.js';

describe('corporate service', () => {
  it('should say hello', async () => {
    const tkUiReactV2Service = TkUiReactV2Service.from();
    const announcements = await tkUiReactV2Service.listAnnouncements();
    expect(announcements.length).toEqual(2);
  })
});
