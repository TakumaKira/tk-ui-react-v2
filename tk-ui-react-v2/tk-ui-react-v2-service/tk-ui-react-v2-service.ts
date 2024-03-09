import { mockAnnouncements } from "@takumakira-individual/tk-ui-react-v2.entities.announcement";

/**
 * corporate service
 */
export class TkUiReactV2Service {
  /**
   * say hello.
   */
  async listAnnouncements() {
    return mockAnnouncements();
  }

  /**
   * create a new instance of a corporate service.
   */
  static from() {
    return new TkUiReactV2Service();
  }
}    
