import React from "react";
import { Box } from "@chakra-ui/layout";
import SignInContainer from "./subs/SignInContainer";

const Login = (props) => {
    return (
        <Box width="100vw" height="100vh" backgroundColor="#F8F8F8">
            <Box>
                <SignInContainer {...props} />
            </Box>
        </Box>
    );
};

export default Login;
