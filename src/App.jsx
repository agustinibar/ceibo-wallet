import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './view/Login/Login';
import Wallet from './view/Wallet/Wallet'
import Transfer from './view/Transfer/Transfer';
import CreateUser from './view/User/Create/CreateUser';
import DepositMp from './view/MercadoPago/DepositMp/DepositMp'
function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/wallet' element={<Wallet/>}/>
        <Route path='/transfer' element={<Transfer/>}/>
        <Route path='/createUser' element={<CreateUser/>}/>
        <Route path='/mp' element={<DepositMp/>}/>
      </Routes>
    </>
  )
}

export default App
