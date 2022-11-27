import { Avatar, Button, Divider, List } from 'antd'
import { observer } from 'mobx-react-lite'

import { imagesSelector } from '../../../utils/imagesSelector'
import useStore from '../../../hooks/useStore'

import s from './OrderList.module.scss'





const OrderList = () => {
   const { totalCost, basket } = useStore()


   const changeDeleteProductsButton = product => {
      const price = product.amount > 1 ? `-${product.price * product.amount}` : `-${product.price}`
      basket.deleteProducts(+product.id)
      totalCost.addTotalCost(+price)
   }

   const changeDeleteProductButton = product => {
      totalCost.addTotalCost(+(`-${product.price}`))
      basket.deleteProduct(product)
   }

   const changeAddProductButton = product => {
      totalCost.addTotalCost(+(`${product.price}`))
      basket.selectedProduct(product)
   }


   return (
      Array.isArray(basket.markedProducts) && basket?.markedProducts?.length
         ? <>
            <List
               size='small'
               itemLayout='horizontal'
               dataSource={basket.markedProducts}
               renderItem={item => (
                  <List.Item
                     className={s.lists}
                     actions={[
                        <Button
                           danger
                           onClick={() => changeDeleteProductsButton(item)}
                        >
                           удалить товар
                        </Button>]}
                  >
                     <List.Item.Meta
                        avatar={<Avatar size='large' src={imagesSelector(item.id)} />}
                        title={<span className={s.name}>{item.name}</span>}
                     />
                     <div className={s.price}>{item.amount}</div>
                     <div className={s.blockButton}>
                        <Button
                           onClick={() => changeDeleteProductButton(item)}
                        >
                           -
                        </Button>
                        <Button
                           onClick={() => changeAddProductButton(item)}
                        >
                           +
                        </Button>
                     </div>
                  </List.Item>
               )}
            />
            <Divider />
            <div className={s.total}>
               суммарная стоимость:
               <span className={s.totalNumber}>
                  {totalCost?.sum}
               </span>
            </div>
            <Divider />
         </>
         : null
   )
}

export default observer(OrderList)