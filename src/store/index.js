import { types } from 'mobx-state-tree'

import BasketStore, { TotalCost } from './basket'
import ProductsStore from './products'



const RootStore = types.model('RootStore', {
   products: types.optional(ProductsStore, {}),
   basket: types.optional(BasketStore, {}),
   totalCost: types.optional(TotalCost, {})
})


export default RootStore