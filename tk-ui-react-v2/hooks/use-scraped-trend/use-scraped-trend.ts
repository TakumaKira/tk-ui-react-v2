import { useMemo } from 'react';
import { useApi } from '@takumakira-individual/tk-ui-react-v2.hooks.use-api';
import { ScrapedTrend, mockPlainScrapedTrend } from '@takumakira-individual/tk-ui-react-v2.entities.scraped-trend';

/**
 * A useScrapedTrend React hook.
 */
export function useScrapedTrend<DataTypeWithoutDate extends Record<string, any>>(scrapedTrendResultApiEndpoint: string, validator: (data: any) => DataTypeWithoutDate, useMockData?: boolean): undefined | null | ScrapedTrend<DataTypeWithoutDate>[] {
  const { isLoading, isError, data } = useApi(['scrapedTrend'], () => useMockData ? Promise.resolve(new Response(JSON.stringify(mockPlainScrapedTrend()))) : fetch(scrapedTrendResultApiEndpoint))
  const validatedScrapedTrend = useMemo<ScrapedTrend<DataTypeWithoutDate>[]>(() => {
    if (isLoading) {
      return undefined
    }
    if (isError) {
      return null
    }
    if (!data || !Array.isArray(data)) {
      console.error(new Error('Got the result of useApi successfully but it is something unexpected.'))
      return null
    }
    return data.flatMap(assumedScrapedTrend => {
      const validated = ScrapedTrend.from(assumedScrapedTrend, validator)
      return validated ? [validated] : [];
    })
  }, [data])

  return validatedScrapedTrend;
}
