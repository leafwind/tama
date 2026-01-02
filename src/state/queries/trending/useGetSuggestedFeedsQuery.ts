import {useQuery} from '@tanstack/react-query'

// import {
//   aggregateUserInterests,
//   createBskyTopicsHeader,
// } from '#/lib/api/feed/utils'
// import {getContentLanguages} from '#/state/preferences/languages'
import {CUSTOM_FEEDS} from '#/lib/constants'
import {STALE} from '#/state/queries'
import {usePreferencesQuery} from '#/state/queries/preferences'
import {useAgent} from '#/state/session'

export const DEFAULT_LIMIT = 15

export const createGetSuggestedFeedsQueryKey = () => ['suggested-feeds']

export function useGetSuggestedFeedsQuery({enabled}: {enabled?: boolean}) {
  const agent = useAgent()
  const {data: preferences} = usePreferencesQuery()
  // const savedFeeds = preferences?.savedFeeds

  return useQuery({
    enabled: !!preferences && enabled !== false,
    staleTime: STALE.MINUTES.THREE,
    queryKey: createGetSuggestedFeedsQueryKey(),
    queryFn: async () => {
      // TODO: /search 頁面暫時停用 suggested feeds，改為返回自定義 feeds
      // const contentLangs = getContentLanguages().join(',')
      // const {data} = await agent.app.bsky.unspecced.getSuggestedFeeds(
      //   {
      //     limit: DEFAULT_LIMIT,
      //   },
      //   {
      //     headers: {
      //       ...createBskyTopicsHeader(aggregateUserInterests(preferences)),
      //       'Accept-Language': contentLangs,
      //     },
      //   },
      // )

      const feed1 = await agent.app.bsky.feed.getFeedGenerator({
        feed: CUSTOM_FEEDS.liveStreamAndCreator,
      })
      const feed2 = await agent.app.bsky.feed.getFeedGenerator({
        feed: CUSTOM_FEEDS.traditionalChinese,
      })

      return {
        // feeds: data.feeds.filter(feed => {
        //   const isSaved = !!savedFeeds?.find(s => s.value === feed.uri)
        //   return !isSaved
        // }),
        feeds: [feed1.data.view, feed2.data.view],
      }
    },
  })
}
