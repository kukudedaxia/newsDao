import defaultSettings from '@/settings'

const title = defaultSettings.title || 'News Dao'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
