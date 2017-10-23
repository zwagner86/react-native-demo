import React, {Component} from 'react';
import {
    Platform,
    ScrollView,
    Text,
    View
} from 'react-native';
import {
    Card,
    Button,
    FormLabel,
    FormInput
} from 'react-native-elements';
import AutocompleteInput from '../components/AutocompleteInput';

const plates = [
    {
        rentalId: 8943647,
        licensePlate: 'NEWMAN1',
        facilityTitle: '21 E Cullerton St.  - Under EL'
    },
    {
        rentalId: 8131279,
        licensePlate: 'nerfths',
        facilityTitle: '1315 S Plymouth Ct. - Personal Spot - Spot #4'
    },
    {
        rentalId: 8765256,
        licensePlate: 'N448100',
        facilityTitle: '260 E Chestnut St.'
    },
    {
        rentalId: 8863163,
        licensePlate: 'N2TEETH',
        facilityTitle: '1741 W Nursery Rd. - Aloft BWI Lot'
    }
];

export default class Search extends Component {
    state = {
        facilityInput: null,
        facilityInputText: '',
        autoCompleteData: [],
        showSearchButton: true
    };

    _onSearchButtonPress = () => {
        console.log('search');
    }

    _onAutocompleteChange = text => {
        console.log(text);
        const newState = {
            facilityInputText: text
        };

        if (text.length > 0) {
            newState.showSearchButton = false;
            newState.autoCompleteData = plates;
        } else {
            newState.showSearchButton = false;
            newState.autoCompleteData = [];
        }

        this.setState(newState);
    }

    _onInputCleared = () => {
        this.setState({
            facilityInputText: '',
            autoCompleteData: [],
            showSearchButton: true
        });
    }

    _onPredictionSelect = prediction => {
        this.setState({
            showSearchButton: true,
            autoCompleteData: []
        });
    }

    render() {
        const {
            showSearchButton,
            facilityInputText,
            autoCompleteData
        } = this.state;

        return (
            <View style={{flex: 1}}>
                <View style={{marginVertical: 20, zIndex: 2}}>
                    <FormLabel>Search License Plate</FormLabel>
                    <FormInput
                        autoCapitalize="none"
                        placeholder="License Plate Number"
                    />
                    <FormLabel>Search Facilities</FormLabel>
                    <AutocompleteInput
                        autoCapitalize="none"
                        value={facilityInputText}
                        data={autoCompleteData}
                        placeholder="All Facilities"
                        onChangeText={this._onAutocompleteChange}
                        onInputCleared={this._onInputCleared}
                        onPredictionSelect={this._onPredictionSelect}
                    />
                    {showSearchButton &&
                        <Button
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="#0082ff"
                            title="Search"
                            borderRadius={Platform.OS === 'android' ? 0 : 50}
                            onPress={this._onSearchButtonPress}
                        />
                    }
                </View>
                <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    {plates.map(({rentalId, licensePlate, facilityTitle}) => (
                        <Card
                            style={{
                                marginVertical: 10,
                                marginLeft: 20,
                                marginRight: 20,
                                padding: 20,
                                shadowColor: '#000',
                                shadowRadius: 3,
                                shadowOffset: {width: 3, height: 3},
                                shadowOpacity: 0.2
                            }}
                            title={`PLATE: ${licensePlate}`}
                            key={rentalId}
                        >
                            <Text style={{marginBottom: 10}}>
                                Location: {facilityTitle}
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                Rental ID: {rentalId}
                            </Text>
                        </Card>
                    ))}
                </ScrollView>
            </View>
        );
    }
}
