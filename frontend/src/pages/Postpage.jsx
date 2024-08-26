import { Flex } from "@chakra-ui/react";
import { Text,Image } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import {BsThreeDots} from 'react-icons/bs';
import { Box } from "@chakra-ui/react";
import Actions from "../components/Actions";
import { useState } from "react";
import { Divider } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Comment from "../components/Comment";

const Postpage =()=>{
  const [liked,setLiked] = useState(false) ;
  const {colorMode} = useColorMode() ;
  return(
    <>
    <Flex>
      <Flex w={'full' } alignItems={'center'} gap={3} >
            <Avatar size='md' name="mark Zukafrbarg"  src="/zuck-avatar.png" />
            <Text fontSize={'sm'} fontWeight={'bold'} >markzukerberg</Text>
            <Image src="/verified.png" w={4} h={4}  ></Image>
      </Flex>
      <Flex gap={4} alignItems={'center'}>
            <Text fontSize={'sm'} color={'gray.light'}  >1d</Text>
            <BsThreeDots cursor={'pointer'} />
      </Flex>
    </Flex>
    <Text my={3} >Let's talk about threads.</Text>
    <Box 
            borderRadius={6}
            overflow={'hidden'}
            border={'1px solid'}
            borderColor={'gray.light'}
            >
               <Image src={'/post1.png'} w={'full'}></Image>
            </Box>
    <Flex gap={3} my={3}>
      <Actions liked={liked} setLiked={setLiked} ></Actions>
    </Flex>
    <Flex gap={2} alignItems={'center'}>
            <Text color={'gray.light'} fontSize={'sm'} >324replies</Text>
            <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'} ></Box>
            <Text color={'gray.light'} fontSize={'sm'} >{
             200+ (liked ? 1:0 ) 
            } likes</Text>
           </Flex>

    <Divider my={4} bg={colorMode =='dark' ? 'gray.light':'gray.dark'} ></Divider>
    <Flex justifyContent={'space-between'}>
      <Flex alignItems={'center'} gap={2} >
        <Text color={'gray.light'} >👏</Text>
        <Text color={'gray.light'} >Get the app for like,reply and post</Text>
      </Flex>
      <Button  >
        Get
      </Button>
    </Flex>
    <Divider my={4} bg={colorMode =='dark' ? 'gray.light':'gray.dark'} ></Divider>
    
    <Comment 
     comment={"This looks very nice sir"}
     createdAt ={"1d"}
     likes ={100}
     avatarimg ={"https://bit.ly/prosper-baba"}
     username ={"johndoe"}
    />
    <Comment 
     comment={"This looks very nice sir"}
     createdAt ={"1d"}
     likes ={100}
     avatarimg ={"https://bit.ly/prosper-baba"}
     username ={"johndoe"}
    /><Comment 
    comment={"This looks very nice sir"}
    createdAt ={"1d"}
    likes ={100}
    avatarimg ={"https://bit.ly/prosper-baba"}
    username ={"johndoe"}
   />

    </>
  )
}

export default Postpage ;