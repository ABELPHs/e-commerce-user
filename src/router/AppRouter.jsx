
import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { StoreRoutes } from '../store/routes/StoreRoutes'
import { Navbar } from '../ui'


export const AppRouter = () => {
    let [search, onSearch] = useState('');
    return (
        <>
            <Navbar cartItems={1} onSearch={(newValue) => {
              onSearch(newValue);
            }}/>
            <StoreRoutes storeSearch={search}/>
        </>
      )
  /* const {logged} = useContext(AuthContext);
  if(logged){
    return (
      <>
          <Routes>
  
              <Route path='/main' element={<HeroesRoutes/>}/>

          </Routes>
      </>
    )
  }
  return (
    <>
        <Routes>
            
            <Route path='login' element={<LoginPage/>}/>

            <Route path='/*' element={<Navigate to={'login'}/>}/>

        </Routes>
    </>
  ) */
}

