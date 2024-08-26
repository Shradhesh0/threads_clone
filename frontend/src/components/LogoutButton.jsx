import { Button } from "@chakra-ui/react"
import {  useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";


const LogoutButton = () => {
   
  const setuser = useSetRecoilState(userAtom) ;
  const showToast =  useShowToast() ;
  const handlelogout = async()=>{
    try{
       const res =await fetch('/api/users/logout',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
       })
       const data = await res.json() ;
       console.log(data) ;

       if(data.error){
         showToast('Error',data.error,'error');
         return ;
       }
       localStorage.removeItem('user-threads') ;
       setuser(null) ;
    }catch(error){
      console.log(error);
      showToast('Error',error,'error');
    }
  }

  return (
    <Button position={'fixed'} top={'30px'} size={'sm'} onClick={handlelogout}>
      Logout
    </Button>
  )
}

export default LogoutButton
