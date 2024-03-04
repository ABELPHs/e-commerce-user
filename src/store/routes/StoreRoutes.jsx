import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { LoginPage, MainPage, OrderCheckoutPage, RegisterPage, SearchPage } from '../pages'
import { ProductPage } from '../pages/ProductPage';
import { useAuth } from '../context';

export const StoreRoutes = ({
  storeSearch
}) => {
  const {pathname, search} = useLocation();
  const lastPath = pathname + search;
  localStorage.setItem('lastPath',lastPath);
  const { authData } = useAuth();
  return (
    <Routes>
        <Route path="/product/:product_id" element={<ProductPage />} />
        <Route path="/checkout" element={<OrderCheckoutPage />} />
        <Route path="/login" element={authData ? <MainPage/> : <LoginPage/>} />
        <Route path="/register" element={authData ? <MainPage/> : <RegisterPage/>} />
        <Route path='/' 
          element={
            storeSearch == '' ?
            <MainPage/> : 
            <SearchPage search={storeSearch}/>
          }
        />
        <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}
