/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import Actions from "./Actions"
import { useState } from "react"
import {BsThreeDots} from 'react-icons/bs'
import { Divider } from "@chakra-ui/react"


const Comment = ({comment ,createdAt,likes,avatarimg,username}) => {
  const [liked,setLiked] = useState(false) ;

  return (
    <>
    <Flex gap={4}>
      <Avatar src={avatarimg} ></Avatar>
      <Flex w={'full'} justifyContent={'space-between'} >
        <Flex flexDirection={'column'} gap={1} >
          <Text fontWeight={'bold'} >{username}</Text>
          <Text>{comment}</Text>
          <Actions liked={liked} setLiked={setLiked} ></Actions>
          <Text color={'gray.light'} fontSize={'sm'} >{
             likes+ (liked ? 1:0 ) 
            } likes</Text>
        </Flex>
      </Flex>
      <Flex gap={4} >
            <Text fontSize={'sm'} color={'gray.light'}  >{createdAt}</Text>
            <BsThreeDots cursor={'pointer'} />
      </Flex>

    </Flex>
      <Divider my={4} bg={'gray.light'} ></Divider>
    </>
    
  )
}

export default Comment
