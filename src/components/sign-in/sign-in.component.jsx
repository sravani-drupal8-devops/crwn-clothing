import React from 'react';
import CustomButton from '../custom-buttom/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth,signInWithGoogle } from '../../firebase/firebase.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ButtonsContainer, SignInContainer, SignInTitleContainer } from './sign-in.styles';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleSubmit = async event => {
        event.preventDefault();
        const {email,password} = this.state;
        try{
            await signInWithEmailAndPassword(auth,email,password);
            this.setState({ email: '', password:'' })
        } catch(error) {
            console.log(error);
        }
        
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <SignInContainer>
                <SignInTitleContainer>I already have an account</SignInTitleContainer>
                <span>Sign in with your email and password</span>

                <form onSubmit={ this.handleSubmit }>
                    <FormInput 
                        name="email" 
                        type="email" 
                        value={ this.state.email } 
                        handleChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput 
                        name="password" 
                        type="password" 
                        value={ this.state.password } 
                        handleChange = {this.handleChange}
                        label='Password'
                        required
                    />
                    <ButtonsContainer>
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton onClick={ signInWithGoogle } isGoogleSignIn> 
                            Sign In with Google 
                        </CustomButton>
                    </ButtonsContainer>
                </form>
            </SignInContainer>

        );
    }
}

export default SignIn;