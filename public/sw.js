//@amit- need to implement this once background sync is supported in electron


const API_FOR_SYNC = [
  'erpnext.projects.doctype.tracker.tracker.add_timesheet'
]
const reqApiForSyncArray = []

const SYNC_TAGS = {
  SYNC_API: 'sync_api'
}

self.addEventListener('fetch', async (event) => {
  const req = event.request
  const url = new URL(req.url)
  console.log('sw')
  if (req.url.includes(API_FOR_SYNC[0])) {
    reqApiForSyncArray.push(req.clone())
    event.waitUntil(handleSyncAPI())
  }

})

const handleSyncAPI = () => {
  const req = reqApiForSyncArray.shift()
  console.log('sw1')

  return fetch(req.clone()).catch((error) => {
    reqApiForSyncArray.push(req.clone())
    self.registration.sync.register(SYNC_TAGS.SYNC_API)
  })
}

self.addEventListener('sync', function (event) {
  switch (event.tag) {
    case SYNC_TAGS.SYNC_API:
      event.waitUntil(handleSyncAPI())
      return
    default:
      return
  }
})
