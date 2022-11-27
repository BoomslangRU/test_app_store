import { Route, Routes, Navigate } from 'react-router-dom'
import { Result } from 'antd'

import Basket from '../pages/Basket/Basket'
import { ProductsList } from '../pages/ProductsList/ProductsList'




export const RoutesPage = () => {

   return (
      <Routes>
         <Route exact path='/' element={<Navigate replace to='/products/' />} />
         <Route exact path='/products/' element={<ProductsList />} />
         <Route exact path='/basket/' element={<Basket />} />
         <Route exact path='/error/'
            element={
               <Result
                  status='404'
                  title='404'
                  style={{ paddingTop: '200px' }}
                  subTitle='Sorry, the page you visited does not exist.'
               />
            }
         />
         <Route path='*' element={<Navigate replace to='/error/' />} />
      </Routes>
   )
}