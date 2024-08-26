import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,

	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import authScreen from "../atoms/authAtom";


import { useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

// import useShowToast from "../hooks/useShowToast";
// import userAtom from "../atoms/userAtom";

export default function LoginCad() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreen);
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);

	const handlelogin = async () => {
		try {
			const res= await fetch('/api/users/login',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(inputs),
			})
	const data = await res.json() 
			if(data.error){
				showToast("Error", data.error, "error");
				return;
			}
			console.log(data) ;
			localStorage.setItem('user-threads',JSON.stringify(data));
			setUser(data);
		} catch (error) {
			console.log("Error from login cad ->")
			showToast("Error", error, "error");
		}
	};

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Login
					</Heading>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8} w={{
          sm: "400px",
          base:"full"
        }}>
					<Stack spacing={4}>	
						<FormControl isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type='text'
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
								value={inputs.email}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
									value={inputs.password}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handlelogin}
							>
								Login
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Don&apos;t have an account?{" "}
								<Link color={"blue.400"}
                 onClick={() => setAuthScreen("signup") }
                 >
									Signup
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
