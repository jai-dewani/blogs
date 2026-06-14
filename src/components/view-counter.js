import * as React from "react"
import { useEffect, useState } from "react"

/**
 * Reads the page view count from GoatCounter's JSON endpoint for the current
 * path and renders it. GoatCounter records the page under location.pathname,
 * so we query the same path to get a matching count. The number is cached on
 * GoatCounter's side for ~30 minutes, so fresh views won't appear instantly.
 */
const ViewCounter = () => {
  const [views, setViews] = useState(null)

  useEffect(() => {
    const path = window.location.pathname
    const url = `https://jaid.goatcounter.com/counter${path}.json`
    fetch(url)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.count) {
          setViews(data.count)
        }
      })
      .catch(() => {
        // Network error or not tracked yet, just show nothing.
      })
  }, [])

  if (!views) {
    return null
  }

  return (
    <span className="view-counter" title="Page views (via GoatCounter)">
      {` · ${views} views`}
    </span>
  )
}

export default ViewCounter
