import { flow, types } from 'mobx-state-tree'

import ApiCall from '../api'



const Product = types.model('Product', {
   id: types.identifierNumber,
   name: types.string,
   price: types.string
})



const ProductsStore = types.model('ProductsStore', {
   products: types.maybe(types.array(Product))
}).actions(self => ({
   load: flow(function* () {
      self.products = yield ApiCall.get('products')
   }),
   afterCreate() {
      self.load()
   }
}))


export default ProductsStore