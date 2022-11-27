import { useNavigate } from 'react-router-dom'
import BasketIcon from '../BasketIcon/BasketIcon'

import s from './Header.module.scss'



export const Header = () => {
   const navigate = useNavigate()

   return (
      <header className={s.header}>
         <div className={s.wrapper}>
            <span
               className={s.title}
               onClick={() => navigate('/products/')}
            >
               Ваши монеточки, наш товар
            </span>
         </div>
         <div className={s.wrapper}>
            <BasketIcon />
         </div>
      </header>
   )
}