import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Divider, List, message, Space, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'

import useStore from '../../hooks/useStore'
import { imagesSelector } from '../../utils/imagesSelector'

import s from './Basket.module.scss'

const { confirm } = Modal





const Basket = () => {
   const { totalCost, basket } = useStore()


   const handlerClickDelete = () => {
      confirm({
         'title': <span style={{ color: '#6d7d9e' }}>Хотите совершить покупку?</span>,
         'icon': <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
         'cancelText': 'Отменить',
         'okText': 'Купить',
         'onOk'() {
            new Promise((_, __) => {
               setTimeout(() => {
                  message.success({ content: 'Поздравляем вас с успешной покупкой', duration: 3 })
                  basket.resetProducts()
                  totalCost.addTotalCost('reset')
               }, 1500)
            })
         }
      })
   }


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

   const changeResetProductButton = () => {
      totalCost.addTotalCost('reset')
      basket.resetProducts()
   }


   return (
      <div className={s.basket}>
         {Array.isArray(basket.markedProducts) && basket?.markedProducts?.length
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
                           avatar={
                              <img
                                 alt=''
                                 className={s.image}
                                 src={imagesSelector(item.id)}
                              />
                           }
                           description={`стоимость: ${item.price}`}
                           title={
                              <span className={s.name}>
                                 {item.name}
                              </span>
                           }
                        />
                        <div
                           className={s.price}
                        >
                           {item.amount}
                        </div>
                        <div
                           className={s.blockButton}
                        >
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
               <Space className={s.lowerBlockButton}>
                  <Button
                     onClick={changeResetProductButton}
                  >
                     Очистить корзину
                  </Button>
                  <Button
                     type='primary'
                     style={{ background: '#6d7d9e' }}
                     onClick={handlerClickDelete}
                  >
                     Сделать заказ
                  </Button>
               </Space>
            </>
            : <Navigate replace to='/products/' />
         }
      </div>
   )
}


export default observer(Basket)