import { observer } from 'mobx-react-lite'

import { imagesSelector } from '../../../utils/imagesSelector'
import useStore from '../../../hooks/useStore'

import s from './ProductItem.module.scss'



// РЕВЬЮ. По неймингу, на мой взгляд, именование в единственном чиле путает в данной ситуации
// Это не "Продукт", а "Список продуктов".
const ProductItem = () => {
   const { products, totalCost, basket } = useStore()


   const changeClickBlockProduct = product => {
      totalCost.addTotalCost(+product.price)
      basket.selectedProduct(product)
   }


   return (
      products?.products?.map(p =>
         <div
            key={p.id}
            className={s.product}
            onClick={() => changeClickBlockProduct(p)}
         >
            <img
               alt=''
               className={s.image}
               src={imagesSelector(p.id)}
            />
            <div className={s.block}>
               <div className={s.name}>
                  {p.name}
               </div>
               <div className={s.price}>
                  {`Цена: ${p.price} монеток`}
               </div>
            </div>
         </div>
      )
   )
}

export default observer(ProductItem)