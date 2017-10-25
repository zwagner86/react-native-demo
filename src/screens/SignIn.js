import React, {Component} from 'react';
import {
    View,
    Image
} from 'react-native';
import {Card} from 'react-native-elements';
import {onSignIn} from '../auth';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

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
                <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 20}}>
                    <Image
                        style={{resizeMode: 'contain', width: 120, height: 120}}
                        source={require('../images/sh_logo.png')}
                    />
                </View>
                <Card style={{borderWidth: 0}}>
                    <FormInput
                        autoCapitalize="none"
                        placeholder="Email address..."
                        labelText="Email"
                    />
                    <FormInput
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="Password..."
                        labelText="Password"
                    />
                    <Button
                        buttonStyle={{marginTop: 20}}
                        title="Sign In"
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
