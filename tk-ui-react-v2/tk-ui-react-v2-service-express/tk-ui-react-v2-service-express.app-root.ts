import express from 'express';
import cors from 'cors';
import { TkUiReactV2ServiceExpress } from "./tk-ui-react-v2-service-express.js";

export function run() {
  const app = express();
  app.use(cors())
  const tkUiReactV2ServiceExpress = TkUiReactV2ServiceExpress.from();
  const port = process.env.PORT || 3000;

  /**
   * learn more on the express docs:
   * https://expressjs.com/en/starter/hello-world.html
   */
  app.get('/', async (req, res) => {
    const scrapedTrend = await tkUiReactV2ServiceExpress.getScrapedTrend();
    res.send(scrapedTrend);
  });
  
  const server = app.listen(port, () => {
    console.log(`🚀  Express Server ready at: http://localhost:${port}`);
  });

  return {
    port,
    // implement stop to support HMR.
    stop: async () => {
      server.closeAllConnections();
      server.close();
    }
  };
}
