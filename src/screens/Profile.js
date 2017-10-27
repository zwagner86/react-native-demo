import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Card,
    Text
} from 'react-native-elements';
import {onSignOut} from '../auth';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingVertical: 20
    },
    card: {
        borderWidth: 0,
        padding: 20
    },
    cardContent: {
        backgroundColor: '#bcbec1',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginBottom: 20
    },
    initials: {
        color: 'white',
        fontSize: 28
    }
});

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
            <View style={styles.container}>
                <Card
                    title="John Doe"
                    style={styles.card}
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.initials}>
                            JD
                        </Text>
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
