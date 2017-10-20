import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Card, Button, FormLabel, FormInput} from 'react-native-elements';
import {onSignIn} from '../auth';

export default class SignUp extends Component {
    _onSignUpButtonPress = () => {
        const {
            navigation
        } = this.props;

        onSignIn()
            .then(() => {
                navigation.navigate('SignedIn');
            });
    }

    _onSignInButtonPress = () => {
        const {
            navigation
        } = this.props;

        navigation.navigate('SignIn');
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="Confirm Password..."
                    />
        
                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="#03A9F4"
                        title="SIGN UP"
                        onPress={this._onSignUpButtonPress}
                    />
                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="transparent"
                        textStyle={{color: '#bcbec1'}}
                        title="Sign In"
                        onPress={this._onSignInButtonPress}
                    />
                </Card>
            </View>
        );
    }
}
