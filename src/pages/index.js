import React from 'react'
import { graphql, Link } from 'gatsby'
import bem from 'utils/bem'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import Hero from 'components/home/Hero'
import WhoIsUsing from 'components/home/WhoIsUsing'
import HowItWorks from 'components/home/HowItWorks'
import Tools from 'components/home/Tools'
import Features from 'components/home/Features'
import Quotes from 'components/home/Quotes'
import CallToAction from 'components/CallToAction'
import Layout from 'components/Layout';

import './index.sass'

const b = bem.lock('IndexPage')

const IndexPage = ({ data }) => (
  <Layout hideChat>
    <HelmetDatoCms seo={data.home.seoMetaTags} />
    <Hero
      title="Headless CMS, done right"
      description="The fastest GraphQL API, the easiest editing interface"
    />
    <div className={b('second-wave')}>
      <HowItWorks />
      <Tools data={data} />
    </div>
    <Features data={data.features.edges.map(x => x.node)} />
    <WhoIsUsing data={data.home.whosUsingDatocms} />
    <Quotes data={data.reviews.edges.map(x => x.node)} />
    <CallToAction />
  </Layout>
)

export default IndexPage

export const query = graphql`
query IndexPageQuery {
  home: datoCmsHomePage {
    heroText
    heroDescription
    whosUsingDatocms {
      name
      logo {
        url
      }
    }
  }
  integrations: allDatoCmsIntegration(sort: { fields: [position], order: ASC }) {
    edges {
      node {
        name
        logo {
          url
        }
      }
    }
  }
  features: allDatoCmsFeature(sort: { fields: [position], order: ASC }) {
    edges {
      node {
        id
        title
        description: descriptionNode {
          markdown: childMarkdownRemark {
            html
          }
        }
        image {
          url
          format
        }
      }
    }
  }
  reviews: allDatoCmsReview(sort: { fields: [position], order: ASC }) {
    edges {
      node {
        id
        name
        role
        website
        quote: quoteNode {
          markdown: childMarkdownRemark {
            html
          }
        }
        image {
          fluid(maxWidth: 55) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
  }
}
`
