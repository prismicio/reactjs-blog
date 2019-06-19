import { string, shape, func } from 'prop-types'

export const imagePropType = shape({
  url: string.isRequired,
  alt: string
})

export const locationPropType = shape({
  pathname: string.isRequired
})

export const historyPropType = shape({
  push: func.isRequired
})
