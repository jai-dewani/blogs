/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */
const React = require("react")

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setPostBodyComponents }) => {
  setHtmlAttributes({ lang: `en` })

  // GoatCounter page view tracking. count.js skips localhost automatically,
  // so local development won't pollute the stats.
  setPostBodyComponents([
    React.createElement("script", {
      key: "goatcounter",
      "data-goatcounter": "https://jaid.goatcounter.com/count",
      async: true,
      src: "//gc.zgo.at/count.js",
    }),
  ])
}
