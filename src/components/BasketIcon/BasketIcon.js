import { ShoppingCartOutlined } from '@ant-design/icons'
import { Affix, Avatar, Badge } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import useStore from '../../hooks/useStore'



const BasketIcon = () => {
   const { basket } = useStore()
   const navigate = useNavigate()


   return (
      <Affix offsetTop={20}>
         <Badge
            count={
               basket?.markedProducts?.reduce((acc, item) => {
                  acc += item.amount
                  return acc
               }, 0)
            }
         >
            <Avatar
               shape='square'
               onClick={() => navigate('/basket/')}
               icon={
                  <ShoppingCartOutlined
                     style={{ fontSize: '22px' }}
                  />
               }
            />
         </Badge>
      </Affix>
   )
}

export default observer(BasketIcon)