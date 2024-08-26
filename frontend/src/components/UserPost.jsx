import { Link } from "react-router-dom"
import { Avatar, Box, Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import {BsThreeDots} from 'react-icons/bs'
import Actions from './Actions.jsx'
import { useState } from "react"
 
const UserPost = ({postImage,postTitle,likes,replies}) => {
  const [liked ,setLiked] =useState(false)  ;
  return (
    <Link to={'/markzukerberg/post/1'} >
      <Flex gap={3} mb={4} py={5}> 
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Avatar size='md' name="mark Zukafrbarg"  src="/zuck-avatar.png" />
          <Box h={'full'} w='1px' my={2} bg={'gray.light'} ></Box>
          <Box position={'relative'} w={'full'}>
            <Avatar size={'xs'} name="dfst" src="https://bit.ly/kent-c-dodds" position={'absolute'} top={'0px'}
            left={'15px'} padding={'2px'}></Avatar>
            <Avatar size={'xs'} name="sdt" src="https://bit.ly/prosper-baba" position={'absolute'} bottom={'0px'}
            right={'-5px'} padding={'2px'}></Avatar>
            <Avatar size={'xs'} name="asdt" src="https://bit.ly/ryan-florence" position={'absolute'} bottom={'0px'}
            left={'4px'} padding={'2px'}></Avatar>
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
           <Flex justifyContent={'space-between'} w={'full'}>
             <Flex w={'full' } alignItems={'center'} >
             <Text fontSize={'sm'} fontWeight={'bold'} >markzukerberg</Text>
             <Image src="/verified.png" w={4} h={4} ml={1}></Image>
             </Flex>

             <Flex gap={4} alignItems={'center'}>
              <Text fontSize={'sm'} color={'gray.light'}  >1d</Text>
              <BsThreeDots />
             </Flex>
           </Flex>

           <Text fontSize={'sm'}>{postTitle}</Text>
           {postImage && (
            <Box 
            borderRadius={6}
            overflow={'hidden'}
            border={'1px solid'}
            borderColor={'gray.light'}
            >
               <Image src={postImage} w={'full'}></Image>
            </Box>
           )}
           <Flex gap={3} my={2}>
            <Actions liked={liked} setLiked={setLiked} />
           </Flex>
           <Flex gap={2} alignItems={'center'}>
            <Text color={'gray.light'} fontSize={'sm'} >{replies} replies</Text>
            <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'} ></Box>
            <Text color={'gray.light'} fontSize={'sm'} >{likes} likes</Text>
           </Flex>
        </Flex>
      </Flex>
    </Link>
  )
}

export default UserPost
