import React from "react";
import SignUpContainer from "./subs/SignUpContainer";
import { Box } from "@chakra-ui/layout";

const SignUp = () => {
    return (
        <Box width="100vw" height="100vh" backgroundColor="#F8F8F8">
            <Box >
                <SignUpContainer />
            </Box>
        </Box>
    );
};

export default SignUp;
