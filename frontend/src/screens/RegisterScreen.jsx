import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { useRegisterMutation } from "../slices/userApiSlice";
import Loader from "../components/Loader";



const RegisterScreen = () => {

    const { userInfo } = useSelector(state => state.auth)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [registerUser, { isLoading }] = useRegisterMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Password Not Matching')
        } else {
            try {
                const res = await registerUser({ name, email, password }).unwrap()
                dispatch(setCredentials(res))
                navigate('/')
            } catch (err) {
                console.log(err.data?.message || err.error)
                toast.error(err.data?.message || err.error)
            }
        }

    }

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    return <FormContainer>
        <h1>Sign up</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {isLoading && <Loader />}

            <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>

            <Row className="py-3">
                <Col>
                    Already have an account?  <Link to="/login">Login</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>;
};

export default RegisterScreen;
