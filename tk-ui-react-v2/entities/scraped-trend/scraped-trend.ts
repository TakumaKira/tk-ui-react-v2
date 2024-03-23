
type ResultBase<ScrapeDateType extends string | Date> = { scrape_date: ScrapeDateType }
export type Result<DataTypeWithoutDate extends Record<string, any>> = DataTypeWithoutDate & ResultBase<Date>
export type ResultPlain<DataTypeWithoutDate extends Record<string, any>> = DataTypeWithoutDate & ResultBase<string>

export type PlainScrapedTrend<DataTypeWithoutDate extends Record<string, any>> = {
  url: string;
  results: Array<ResultPlain<DataTypeWithoutDate>>;
}

export class ScrapedTrend<DataTypeWithoutDate extends Record<string, any>> {
  constructor(
    /**
     * url of the instance
     */
    readonly url: string,
    /**
     * results of the instance
     */
    readonly results: Array<Result<DataTypeWithoutDate>>
  ) {}

  /**
   * serialize a ScrapedTrend into
   * a serializable object.
   */
  toObject() {
    return {
      url: this.url,
      results: this.results.map(({ scrape_date, ...rest }) => ({ ...rest, scrape_date: scrape_date.toISOString() }))
    };
  }

  /**
   * create a ScrapedTrend object from a 
   * plain object.
   */
  static from<DataTypeWithoutDate extends Record<string, any>>(plainScrapedTrend: PlainScrapedTrend<DataTypeWithoutDate>, validator: (data: any) => DataTypeWithoutDate): ScrapedTrend<DataTypeWithoutDate> | null {
    return new ScrapedTrend<DataTypeWithoutDate>(
      plainScrapedTrend.url,
      plainScrapedTrend.results.map<Result<DataTypeWithoutDate>>(result => {
        const { scrape_date: scrapeDate, ...rest } = result;
        try {
          const validatedRest = validator(rest)
          return ({ ...validatedRest, scrape_date: new Date(scrapeDate + '+00:00') });
        } catch {
          return null;
        }
      })
    );
  }
}
