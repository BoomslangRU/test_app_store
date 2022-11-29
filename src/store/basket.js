import { types } from 'mobx-state-tree'



// РЕВЬЮ. Этот стор не нужен и более того опасен. Есть 2 риска
// 1. в местах реалитзации логики, нужно вызывать и методы корзины и метод этого стора `addTotalCost`
// Это очень узкое место и рано или поздно кто-то забудет об этой связке и состояние разойдется
// 2. Его состояние. фактически дублирует состояние `BasketStore`. Семантически
// он несет данные о состоянии корзины
// Чем хорош MobX, он имеет `computed` поля которые лениво вычисляются на основании состояния
// Посмотрите на 77 строку
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

   // РЕВЬЮ. Нейминг - `selected` означает "добавленный", а тут действие "добавить"
   selectedProduct(product) {

       // РЕВЬЮ. Ниже и в методе `deleteProduct` неоптимальный перебор
      // Сначала вы определяете есть ли продукт в списке, потенциально это прогон по всему списку
      // А потом опять прогон по всему списку с таким же поиском и изменением значений
      // Оптимизировать можно через запись  соответствующего продукта в переменную
      //
      // const appropriateMarkedProducts = self.markedProducts?.find(m => m.id === product.id) || null
      //
      //  if (appropriateMarkedProducts) {
      //      appropriateMarkedProducts.amount += 1
      //  }
      //  else {
      //      self.markedProducts.push({ ...product, amount: 1 })
      //  }

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
    .views((self) => ({
        get sum() {
            return self.markedProducts.reduce(
                (sum, item) => sum + item.price * item.amount,
                0,
            )
        }
    }))


export default BasketStore 