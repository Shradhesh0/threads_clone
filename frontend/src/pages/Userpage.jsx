import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const Userpage =()=>{
  return(
    <>
     <UserHeader />
     <UserPost likes ={1200} replies={431} postImage ='/post1.png' postTitle ='Lets talk abount threads' />
     <UserPost likes ={123} replies={421} postImage ='/post1.png' postTitle ='Nice tutorial' />
     <UserPost likes ={11} replies={421} postImage ='/post1.png' postTitle ='nice project' />
     <UserPost likes ={500} replies={51}  postTitle ='xljxnz hreads' />

     

    </>
  )
}

export default Userpage ;