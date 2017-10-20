import React, {Component} from 'react';
import {
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
    _onSearchButtonPress = () => {
        console.log('search');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{marginVertical: 20}}>
                    <FormLabel>Search License Plate</FormLabel>
                    <FormInput
                        autoCapitalize="none"
                        placeholder="License Plate Number"
                    />
                    <FormLabel>Search Facilities</FormLabel>
                    <FormInput
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="All Facilities"
                    />
                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="#03A9F4"
                        title="Search"
                        onPress={this._onSearchButtonPress}
                    />
                </View>
                <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    {plates.map(({rentalId, licensePlate, facilityTitle}) => (
                        <Card
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
