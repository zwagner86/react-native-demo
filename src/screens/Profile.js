import React, {Component} from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {onSignOut} from '../auth';
import Button from '../components/Button';

export default class Profile extends Component {
    _onButtonPress = () => {
        const {
            navigation
        } = this.props;

        onSignOut()
            .then(() => {
                navigation.navigate('SignedOut');
            });
    }

    render() {
        return (
            <View style={{backgroundColor: '#ffffff', paddingVertical: 20}}>
                <Card
                    title="John Doe"
                    style={{borderWidth: 0, padding: 20}}
                >
                    <View
                        style={{
                            backgroundColor: '#bcbec1',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            alignSelf: 'center',
                            marginBottom: 20
                        }}
                    >
                        <Text style={{color: 'white', fontSize: 28}}>JD</Text>
                    </View>
                    <Button
                        title="Sign Out"
                        onPress={this._onButtonPress}
                    />
                </Card>
            </View>
        );
    }
}
