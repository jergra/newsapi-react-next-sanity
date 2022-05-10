import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import choices from './choices'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    choices
  ]),
})
