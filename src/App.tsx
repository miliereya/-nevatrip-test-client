import { Route, Routes } from "react-router";
import { useEffect } from 'react'
import { Account } from "./components/Account";
import Header from "./components/Header";
import { PageSpinner } from "./components/UI/Spinner";
import { useAppSelector } from "./hooks/redux";
import { userAPI } from "./services/UserService";
import SearchTicket from "./components/SearchTicket";
import Cart from "./components/Cart";

function App() {

  const [checkAuth, {}] = userAPI.useRefreshMutation()

  const { isLoading, isCheckAuthLoading, isCartLoading } = useAppSelector(state => state.IsLoadingSlice)

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <div>
      <div className="background"></div>
      {(isLoading || isCheckAuthLoading || isCartLoading) && <PageSpinner />}
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

export default App