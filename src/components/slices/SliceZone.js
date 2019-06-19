import React, { Fragment } from 'react'
import { ImageCaption, Quote, Text } from './'
import { client, linkResolver } from '../../prismic-configuration'

const SliceZone = ({ slices }) => (
  <Fragment>
    {
      slices.map((slice, index) => {
        switch (slice.slice_type) {
          case ('image_with_caption'):
            return <ImageCaption slice={slice} key={'slice-' + index} />
          case ('quote'):
            return <Quote slice={slice} key={'slice-' + index} />
          case ('text'):
            return <Text slice={slice} key={'slice-' + index} prismicCtx={{ client, linkResolver }} />
          default:
            return null
        }
      })
    }
  </Fragment>
)

export default SliceZone
