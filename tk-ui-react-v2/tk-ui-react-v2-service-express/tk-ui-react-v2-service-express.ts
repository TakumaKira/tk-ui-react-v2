import { mockPlainScrapedTrend } from "@takumakira-individual/tk-ui-react-v2.entities.scraped-trend"

/**
 * express server
 */
export class TkUiReactV2ServiceExpress {
  
  /**
   * get scraped trend.
   */
  async getScrapedTrend() {
    return mockPlainScrapedTrend();
  }

  /**
   * create a new instance of a express server.
   */
  static from() {
    return new TkUiReactV2ServiceExpress();
  }
}
