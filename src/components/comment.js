import React from "react"
import { Disqus } from "gatsby-plugin-disqus"

const PostTemplate = ({id, title}) => {
    let disqusConfig = {
    //   url: `${config.siteUrl+location.pathname}`,
      identifier: id,
      title: title,
    }
    return (
      <>
        {/* <h1>{post}</h1> */}
        {/* <CommentCount config={disqusConfig} placeholder={''} /> */}
        <Disqus config={disqusConfig} />
      </>
    )
  }
  
  export default PostTemplate