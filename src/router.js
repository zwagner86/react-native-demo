import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {FontAwesome} from 'react-native-vector-icons';

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Search from './screens/Search';
import Profile from './screens/Profile';

const headerStyle = {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator(
    {
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                title: 'Sign In',
                headerLeft: null,
                headerStyle
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                title: 'Sign Up',
                headerLeft: null,
                headerStyle
            }
        }
    },
    {
        headerMode: 'none',
        cardStyle: {backgroundColor: '#ffffff'}
    }
);

export const SignedIn = TabNavigator(
    {
        Home: {
            screen: Search,
            navigationOptions: {
                tabBarLabel: 'Search',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesome
                        name="search"
                        size={30}
                        color={tintColor}
                    />
                )
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesome
                        name="user"
                        size={30}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }
        }
    }
);

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOut,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: 'none',
            cardStyle: {backgroundColor: '#ffffff'},
            initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
        }
    );
};
