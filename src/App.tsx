import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom'
import SearchTicket from "./components/SearchTicket";
import Account from "./components/Account";
import { useContext, useEffect } from "react";
import { Context } from ".";
import { observer } from 'mobx-react-lite'
import { PageSpinner } from "./components/UI/Spinner";
import Cart from "./components/Cart";

function App() {
  const { store } = useContext(Context)
  useEffect(() => {
      if(localStorage.getItem('token')){
          store.checkAuth()
      }
  },[])
  return (
    <div>
      {store.isLoading && <PageSpinner />}
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<SearchTicket />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default observer(App);
