import SignupCad from "../components/SignupCad.jsx"
import LoginCad from "../components/LoginCad.jsx"
import { useRecoilValue } from "recoil"
import authScreenAtom from "../atoms/authAtom.js"
 


const Authpage = () => {
  const authScreenState = useRecoilValue(authScreenAtom) ;
  console.log(authScreenState) ;
  return (
    <>
    {authScreenState ==='login' ? <LoginCad />:<SignupCad />}
    </>
  )
}

export default Authpage
