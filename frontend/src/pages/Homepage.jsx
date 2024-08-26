import { Link } from "react-router-dom"
import { Flex } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"


const Homepage = () => {
  return (
    <Link to="/markzukerbargh">
     <Flex w={"full"} justifyContent={"center"} >
       <Button mx={"auto"} >Visit profile page</Button>
     </Flex>
    </Link>
  )
}

export default Homepage
