import OrderList from './OrderList/OrderList'
import ProductItem from './ProductItem/ProductItem'

import s from './ProductsList.module.scss'



export const ProductsList = () => {

   return (
      <div className={s.products}>
         <OrderList />
         <ProductItem />
      </div>
   )
}