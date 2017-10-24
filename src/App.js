import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {createRootNavigator} from './router';
import reducers from './modules';
import {isSignedIn} from './auth';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        isSignedIn()
            .then(res => this.setState({signedIn: res, checkedSignIn: true}))
            .catch(err => alert('An error occurred'));
    }

    render() {
        const {checkedSignIn, signedIn} = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);
        
        return (
            <Provider store={createStore(reducers)}>
                <Layout />
            </Provider>
        );
    }
}
