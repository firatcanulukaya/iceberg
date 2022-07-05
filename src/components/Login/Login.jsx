import {Container, LoginWithGoogleBtn} from "./style";

const Login = () => {
    return (
        <Container>
            <LoginWithGoogleBtn>
                <i className="fa-brands fa-google"/>
                Login with Google
            </LoginWithGoogleBtn>
        </Container>
    )
}

export default Login;
