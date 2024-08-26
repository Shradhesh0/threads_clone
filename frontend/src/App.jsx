import {  Container } from "@chakra-ui/react";
import Userpage from "./pages/Userpage";
import { Navigate, Route,Routes } from "react-router-dom";
import Postpage from "./pages/Postpage";
import Header from './components/Header.jsx'
import Homepage from "./pages/Homepage.jsx";
import Authpage from "./pages/Authpage.jsx";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom.js";
import LogoutButton from "./components/LogoutButton.jsx";
function App() {
  
  const user = useRecoilValue(userAtom) ;
  return (
    <Container maxW={'620px'}>
      <Header/>
      <Routes>
        <Route path="/" element={user ? <Homepage/>:<Navigate to='/auth'/>} />
        <Route path="/auth" element={!user ? <Authpage/>:<Navigate to='/' />} />
        <Route path="/:username" element = {<Userpage/>}></Route>
        <Route path="/:username/post/:pid" element = {<Postpage/>}></Route>
      </Routes>

      {user && <LogoutButton/>}
    </Container>
  )
}

export default App ;
