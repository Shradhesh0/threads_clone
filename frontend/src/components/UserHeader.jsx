import { VStack,Box, Avatar } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import {BsInstagram } from 'react-icons/bs'
import {CgMoreO} from 'react-icons/cg'
import { Menu,MenuButton,MenuList,Portal,MenuItem } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { useColorMode } from "@chakra-ui/react";

const UserHeader =()=>{
  
  const {colorMode} = useColorMode() ;
  const toast = useToast({
    containerStyle:{
      width:'100px',
      maxWidth:'100%'
    }
  }) ;
  const copyUrl = ()=>{
    try{
      const currenturl =  window.location.href ;
    navigator.clipboard.writeText(currenturl).then(()=>{
      toast({
        description: "profile link copied",
        duration: 2000,
        containerStyle: {
          width: '100px',
          maxWidth: '100%',
        },
      })
    })
    }catch(e){
      toast({
        description: "profile not copied",
        duration: 2000,
        status:'error' ,
      })
    }
  }

  return(
    <VStack gap={4} alignItems={"start"} >
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Firstname Lastname
          </Text>
          <Flex gap={2} alignItems={'center'} >
            <Text fontSize={'sm'}>username</Text>
            <Text fontSize={'xs'} bg={"gray.dark"} color={"gray.light"} borderRadius={"full"} p={1}>thrads.net</Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="firstnameLastname" src="/zuck-avatar.png" size={{
            base:'md',
            md:'xl'
          }} />
        </Box>
      </Flex>
      <Text>Co-founder executive chairmen and ceo of meta platform</Text>
      <Flex w={'full'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={2}>
          <Text color={'gray.light'}>3.2k followers</Text>
          <Box w={1} h={1} borderRadius={'full'} bg={"gray.light"} ></Box>
          <Link color={'gray.light'}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container" sx={colorMode == 'dark' ? {
        ':hover': { 
          backgroundColor:  'gray.light', // Change background color on hover
        },
      }:{
        ':hover': {
          backgroundColor:  'gray.400', // Change background color on hover
        },
      }}>
           <BsInstagram  size={24} cursor={"pointer"}/>
          </Box>
          <Box className="icon-container" sx={colorMode == 'dark' ? {
        ':hover': { 
          backgroundColor:  'gray.light', // Change background color on hover
        },
      }:{
        ':hover': {
          backgroundColor:  'gray.400', // Change background color on hover
        },
      }}>
          <Menu>
            <MenuButton><CgMoreO  size={24} cursor={"pointer"}/></MenuButton>
             <Portal>
               <MenuList bg={'gray.dark'}>
                 <MenuItem bg={'gray.dark'} color={colorMode == 'dark' ? 'gray.light':'gray.400'} onClick={copyUrl}>Copy Link</MenuItem>
              </MenuList>
             </Portal>
            </Menu>
           
          </Box>
        </Flex>
      </Flex>
      <Flex w={'full'}>
        <Flex borderBottom={'1.5px solid white '} pb={3} cursor={'pointer'} flex={1} justifyContent={'center'}>
          <Text fontWeight={'bold'} >Threads</Text>
        </Flex>
        <Flex borderBottom={'1px solid gray '} pb={3} cursor={'pointer'} flex={1} justifyContent={'center'}>
          <Text fontWeight={'bold'} >Replies</Text>
        </Flex>
      </Flex>  
   </VStack>
  )
}

export default UserHeader ;