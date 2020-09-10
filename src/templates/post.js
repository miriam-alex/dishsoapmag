import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import Head from "../components/head"
import Nav from "../components/nav"
import postStyles from "./post.module.scss"
import Subheader from "../components/subHeader"
import MobileNav from "../components/mobileNav"


export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      body {
        json
      }
      author
      type
    }
  }
`

const Post = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      }
    }
  }

  return (
    <>
    <MobileNav />
      <Nav />
      <Subheader title={props.data.contentfulPost.type} />
      <Layout>
        <Head title={props.data.contentfulPost.title} />
        <div className={postStyles.mission}>
          <h3>{props.data.contentfulPost.author}</h3>
          <h1>{props.data.contentfulPost.title}</h1>
          {documentToReactComponents(
            props.data.contentfulPost.body.json,
            options
          )}
        </div>
        <div className={postStyles.row}>
          <div>
          <Link to="/issues"><button>back</button></Link>
          </div>
          <div className={postStyles.nameplate}>{props.data.contentfulPost.title} by {props.data.contentfulPost.author}</div>
        </div>
      </Layout>
    </>
  )
}

export default Post