import React, {Component} from 'react';
import {
    Platform,
    View,
    Image
} from 'react-native';
import {
    Card,
    Button,
    FormLabel,
    FormInput
} from 'react-native-elements';
import {onSignIn} from '../auth';

export default class SignIn extends Component {
    _onButtonPress = () => {
        const {
            navigation
        } = this.props;

        onSignIn()
            .then(() => {
                navigation.navigate('SignedIn');
            });
    }

    _onSignUpButtonPress = () => {
        const {
            navigation
        } = this.props;

        navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', paddingVertical: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                        style={{resizeMode: 'contain', width: 120, height: 120}}
                        source={require('../images/sh_logo.png')}
                    />
                </View>
                <Card style={{borderWidth: 0}}>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        autoCapitalize="none"
                        placeholder="Email address..."
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="Password..."
                    />
        
                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="#0082ff"
                        title="SIGN IN"
                        borderRadius={Platform.OS === 'android' ? 0 : 50}
                        onPress={this._onButtonPress}
                    />
                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="transparent"
                        textStyle={{color: '#bcbec1'}}
                        title="Sign Up"
                        onPress={this._onSignUpButtonPress}
                    />
                </Card>
            </View>
        );
    }
}
