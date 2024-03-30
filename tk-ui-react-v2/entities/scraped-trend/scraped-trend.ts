import { isInvalidDate } from "./utils.js";

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
  static from<DataTypeWithoutDate extends Record<string, any>>(assumedPlainScrapedTrend: any, validator: (data: any) => DataTypeWithoutDate, showValidationErrors?: boolean): ScrapedTrend<DataTypeWithoutDate> | null {
    if (!assumedPlainScrapedTrend.url) {
      if (showValidationErrors) {
        console.error(new Error('The data has no url property'), '\n', assumedPlainScrapedTrend, '\n')
      }
      return null
    }
    if (!Array.isArray(assumedPlainScrapedTrend.results)) {
      if (showValidationErrors) {
        console.error(new Error('The data has no results property in array type'), '\n', assumedPlainScrapedTrend, '\n')
      }
      return null
    }
    return new ScrapedTrend<DataTypeWithoutDate>(
      assumedPlainScrapedTrend.url,
      assumedPlainScrapedTrend.results.flatMap(result => {
        if (!result.scrape_date) {
          if (showValidationErrors) {
            console.error(new Error('The result has no scrape_date property'), '\n', result, '\n')
          }
          return []
        }
        const scrapeDate = new Date(result.scrape_date + '+00:00')
        if (isInvalidDate(scrapeDate)) {
          if (showValidationErrors) {
            console.error(new Error('The result has an invalid scrape_date property'), '\n', result, '\n')
          }
          return []
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { scrape_date: _, ...rest } = result
        let validatedRest
        try {
          validatedRest = validator(rest)
        } catch (error) {
          if (showValidationErrors) {
            console.error(new Error('The result has invalid data'), '\n', result, '\n', error, '\n')
          }
          return []
        }
        return [({ ...validatedRest, scrape_date: scrapeDate })]
      }) as Result<DataTypeWithoutDate>[]
    );
  }
}
