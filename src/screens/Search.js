import debounce from 'lodash/debounce';
import filter from 'lodash/filter';
import find from 'lodash/find';
import includes from 'lodash/includes';
import facilityData from '../modules/facilities/facilities.json';
import reservationData from '../modules/reservations/reservations.json';

import React, {Component} from 'react';
import {
    Platform,
    FlatList,
    Text,
    View
} from 'react-native';
import {
    Card,
    Button
} from 'react-native-elements';
import AutocompleteInput from '../components/AutocompleteInput';
import FormInput from '../components/FormInput';

export default class Search extends Component {
    state = {
        facilities: null,
        reservations: null,
        filteredFacilities: null,
        selectedFacility: null,
        facilityInputText: '',
        plateInputText: '',
        showSearchButton: true,
        showFilterList: false,
        isFetchingReservations: false
    };

    constructor(props) {
        super(props);

        this._triggerNewFilter = debounce(this._filterFacilities, 300);
    }

    componentDidMount() {
        this._fetchFacilities();
    }
 
    componentDidUpdate(prevProps, prevState) {
        const {
            facilityInputText,
            showFilterList
        } = this.state;
        const {
            facilityInputText: prevFacilityInputText
        } = prevState;

        if (showFilterList && prevFacilityInputText !== facilityInputText) {
            if (facilityInputText.length > 0) {
                this._triggerNewFilter(facilityInputText);
            }
        }
    }

    _onPlateTextChange = text => {
        this.setState({
            plateInputText: text
        });
    }

    _onSearchButtonPress = () => {
        const {
            plateInputText,
            selectedFacility
        } = this.state;
        const facilitySearchId = (selectedFacility) ? selectedFacility.id.toString() : '';

        this.setState({
            isFetchingReservations: true
        });

        const reservations = filter(reservationData, reservation => {
            const {
                license_plate: licensePlate,
                facility_id: facilityId
            } = reservation;

            if (facilitySearchId) {
                return includes(licensePlate.toLowerCase(), plateInputText.toLowerCase()) && includes(facilityId.toString(), facilitySearchId);
            } else {
                return includes(licensePlate.toLowerCase(), plateInputText.toLowerCase());
            }
        });

        this.setState({
            reservations
        });
    }

    _onAutocompleteChange = text => {
        const newState = {
            facilityInputText: text
        };

        if (text.length > 0) {
            newState.showFilterList = true;
            newState.showSearchButton = false;
        } else {
            this._triggerNewFilter.cancel();
            newState.showFilterList = false;
            newState.showSearchButton = true;
            newState.filteredFacilities = null;
            newState.selectedFacility = null;
        }

        this.setState(newState);
    }

    _onInputCleared = () => {
        this._triggerNewFilter.cancel();
        this.setState({
            facilityInputText: '',
            showSearchButton: true,
            showFilterList: false,
            filteredFacilities: null,
            selectedFacility: null
        });
    }

    _onPredictionSelect = prediction => {
        this.setState({
            facilityInputText: prediction.title,
            showSearchButton: true,
            showFilterList: false,
            filteredFacilities: null,
            selectedFacility: find(this.state.facilities, ['id', prediction.id])
        });
    }

    _fetchFacilities = () => {
        this.setState({
            facilities: facilityData
        });
    }

    _filterFacilities = text => {
        this.setState({
            filteredFacilities: filter(this.state.facilities, facility => {
                const {
                    title,
                    id
                } = facility;

                return includes(title, text) || includes(id.toString(), text);
            })
        });
    }

    _reservationKeyExtractor = (item, index) => {
        return item.rental_id;
    }

    _renderReservationCard = ({item}) => {
        const {
            rental_id: rentalId,
            license_plate: licensePlate,
            facility_title: facilityTitle
        } = item;

        return (
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
        );
    }

    render() {
        const {
            showSearchButton,
            showFilterList,
            facilityInputText,
            filteredFacilities,
            reservations
        } = this.state;

        return (
            <View style={{flex: 1}}>
                <View style={{marginVertical: 20}}>
                    <FormInput
                        autoCapitalize="none"
                        placeholder="License Plate Number"
                        labelText="Search License Plate"
                        onChangeText={this._onPlateTextChange}
                    />
                    <AutocompleteInput
                        autoCapitalize="none"
                        value={facilityInputText}
                        data={filteredFacilities}
                        showFilterList={showFilterList}
                        placeholder="All Facilities"
                        labelText="Search Facilities"
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
                {reservations &&
                    <FlatList
                        style={{paddingVertical: 20}}
                        data={reservations}
                        keyExtractor={this._reservationKeyExtractor}
                        renderItem={this._renderReservationCard}
                    />
                }
            </View>
        );
    }
}
