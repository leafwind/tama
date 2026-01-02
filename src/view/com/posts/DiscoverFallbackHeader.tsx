import {View} from 'react-native'
import {AtUri} from '@atproto/api'
import {Trans} from '@lingui/macro'

import {CUSTOM_FEEDS} from '#/lib/constants'
import {usePalette} from '#/lib/hooks/usePalette'
import {InfoCircleIcon} from '#/lib/icons'
import {TextLink} from '../util/Link'
import {Text} from '../util/text/Text'

export function DiscoverFallbackHeader() {
  const pal = usePalette('default')

  // 從自定義 feed URI 生成 href
  const feedUri = new AtUri(CUSTOM_FEEDS.liveStreamAndCreator)
  const href = `/profile/${feedUri.hostname}/feed/${feedUri.rkey}`
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 12,
          borderTopWidth: 1,
        },
        pal.border,
        pal.viewLight,
      ]}>
      <View style={{width: 68, paddingLeft: 12}}>
        <InfoCircleIcon size={36} style={pal.textLight} strokeWidth={1.5} />
      </View>
      <View style={{flex: 1}}>
        <Text type="md" style={pal.text}>
          <Trans>
            We ran out of posts from your follows. Here's the latest from{' '}
            <TextLink
              type="md-medium"
              href={href}
              text="實況與創作者"
              style={pal.link}
            />
            .
          </Trans>
        </Text>
      </View>
    </View>
  )
}
