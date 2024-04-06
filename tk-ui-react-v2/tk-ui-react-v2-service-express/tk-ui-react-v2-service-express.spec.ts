import { mockPlainScrapedTrend } from '@takumakira-individual/tk-ui-react-v2.entities.scraped-trend';
import { TkUiReactV2ServiceExpress } from './tk-ui-react-v2-service-express.js';

describe('express server', () => {
  it('should say hello', async () => {
    const tkUiReactV2ServiceExpress = TkUiReactV2ServiceExpress.from();
    const scrapedTrend = await tkUiReactV2ServiceExpress.getScrapedTrend();
    expect(scrapedTrend).toEqual(mockPlainScrapedTrend());
  })
});
