import { types } from 'mobx-state-tree'



export const TotalCost = types.model('TotalCost', {
   sum: types.optional(types.number, 0)
}).actions(self => ({
   addTotalCost(changeSum) {
      if (changeSum === 'reset') return self.sum = 0
      return self.sum += changeSum
   }
}))


export const Basket = types.model('Basket', {
   id: types.optional(types.number, 0),
   name: types.optional(types.string, ''),
   price: types.optional(types.string, ''),
   amount: types.optional(types.number, 0)
})



const BasketStore = types.model('BasketStore', {
   markedProducts: types.optional(types.array(Basket), [])
}).actions(self => ({
   selectedProduct(product) {
      if (self.markedProducts?.find(m => m.id === product.id)) {
         self.markedProducts?.forEach((marked, index) => marked.id === product.id
            ? self.markedProducts[index].amount += 1
            : null
         )
      } else self.markedProducts = [...self.markedProducts, { ...product, amount: 1 }]
   },
   deleteProducts(productId) {
      self.markedProducts = self.markedProducts?.filter(marked => marked.id !== productId)
   },
   deleteProduct(product) {
      if (self.markedProducts?.find(m => m.id === product.id)) {
         self.markedProducts?.forEach((marked, index) => marked.id === product.id
            ? self.markedProducts[index].amount -= 1
            : self.markedProducts = self.markedProducts?.filter(marked => marked.id !== product.id)
         )
      }
      if (self.markedProducts?.length <= 1 && self.markedProducts[0].amount === 0) {
         self.markedProducts = []
      }
   },
   resetProducts() {
      self.markedProducts = []
   }
}))


export default BasketStore 