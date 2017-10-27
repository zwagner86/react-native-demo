import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import {Card} from 'react-native-elements';
import {onSignIn} from '../auth';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20
    },
    logo: {
        resizeMode: 'contain',
        width: 120,
        height: 120
    },
    card: {
        borderWidth: 0
    },
    button: {
        marginTop: 20
    },
    signOutButtonText: {
        color: '#bcbec1'
    }
});

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
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../images/sh_logo.png')}
                    />
                </View>
                <Card style={styles.card}>
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
                        buttonStyle={styles.button}
                        title="Sign In"
                        onPress={this._onButtonPress}
                    />
                    <Button
                        buttonStyle={styles.button}
                        backgroundColor="transparent"
                        textStyle={styles.signOutButtonText}
                        title="Sign Up"
                        onPress={this._onSignUpButtonPress}
                    />
                </Card>
            </View>
        );
    }
}
