import debounce from 'lodash/debounce';
import filter from 'lodash/filter';
import find from 'lodash/find';
import includes from 'lodash/includes';
import facilityData from '../modules/facilities/facilities.json';
import reservationData from '../modules/reservations/reservations.json';

import React, {Component} from 'react';
import {
    FlatList,
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Card} from 'react-native-elements';
import AutocompleteInput from '../components/AutocompleteInput';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

export default class Search extends Component {
    state = {
        facilities: null,
        reservations: null,
        filteredFacilities: null,
        selectedFacility: null,
        facilityInputText: '',
        plateInputText: '',
        showFilterList: false,
        isFetchingReservations: false,
        hasSearched: false,
        showSearch: true
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
            reservations,
            hasSearched: true//,
            //showSearch: false
        });
    }

    _onAutocompleteChange = text => {
        const newState = {
            facilityInputText: text
        };

        if (text.length > 0) {
            newState.showFilterList = true;
        } else {
            this._triggerNewFilter.cancel();
            newState.showFilterList = false;
            newState.filteredFacilities = null;
            newState.selectedFacility = null;
        }

        this.setState(newState);
    }

    _onInputCleared = () => {
        this._triggerNewFilter.cancel();
        this.setState({
            facilityInputText: '',
            showFilterList: false,
            filteredFacilities: null,
            selectedFacility: null
        });
    }

    _onPredictionSelect = prediction => {
        this.setState({
            facilityInputText: prediction.title,
            showFilterList: false,
            filteredFacilities: null,
            selectedFacility: find(this.state.facilities, ['id', prediction.id])
        });
    }

    _onSearchEditPress = () => {
        this.setState({
            showSearch: true
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
                    backgroundColor: 'white',
                    marginVertical: 10,
                    marginHorizontal: 20,
                    ...Platform.select({
                        android: {
                            paddingVertical: 0
                        },
                        ios: {
                            paddingVertical: 10
                        }
                    }),
                    paddingHorizontal: 20,
                    shadowColor: '#000',
                    shadowRadius: 3,
                    shadowOffset: {width: 3, height: 3},
                    shadowOpacity: 0.2
                }}
                key={rentalId}
            >
                <Text style={{marginBottom: 10, textAlign: 'center', fontSize: 20}}>
                    Plate Number: <Text style={{color: '#026bcf'}}>{licensePlate}</Text>
                </Text>
                <View style={{borderBottomWidth: 1, borderColor: '#002d5b'}} />
                <Text style={{marginVertical: 10}}>
                    Location: <Text style={{color: '#5c7996'}}>{facilityTitle}</Text>
                </Text>
                <Text style={{marginBottom: 10}}>
                    Rental ID: <Text style={{color: '#5c7996'}}>{rentalId}</Text>
                </Text>
            </Card>
        );
    }

    render() {
        const {
            showFilterList,
            facilityInputText,
            plateInputText,
            filteredFacilities,
            selectedFacility,
            reservations,
            hasSearched,
            showSearch
        } = this.state;
        const hasReservations = (reservations && reservations.length > 0);
        const hasPlateText = (plateInputText && plateInputText.length > 0);

        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                        paddingVertical: 20,
                        shadowColor: '#000',
                        shadowRadius: 3,
                        shadowOffset: {width: 3, height: 3},
                        shadowOpacity: 0.2
                    }}
                >
                    {!showSearch &&
                        <View style={{marginTop: 20, marginHorizontal: 20}}>
                            <TouchableOpacity onPress={this._onSearchEditPress}>
                                {hasPlateText &&
                                    <Text style={{paddingVertical: 5, fontSize: 16}}>{plateInputText}</Text>
                                }
                                {selectedFacility &&
                                    <Text style={{paddingVertical: 5, fontSize: 16}}>{selectedFacility.facility_title}</Text>
                                }
                                {!selectedFacility &&
                                    <Text style={{paddingVertical: 5, fontSize: 16}}>All Facilities</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    }
                    {showSearch &&
                        <View>
                            <FormInput
                                autoCapitalize="none"
                                value={plateInputText}
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
                            <Button
                                buttonStyle={{marginTop: 20}}
                                title="Search"
                                onPress={this._onSearchButtonPress}
                            />
                        </View>
                    }
                </View>
                {hasReservations &&
                    <View style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10}}>
                        <Text style={{flex: 7, flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', fontSize: 16}}>
                            Currently Active Reservations:
                        </Text>
                        <Text style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end', textAlign: 'right', color: '#002d5b'}}>{reservations.length} Results</Text>
                    </View>
                }
                {hasReservations &&
                    <FlatList
                        style={{paddingVertical: 20}}
                        data={reservations}
                        keyExtractor={this._reservationKeyExtractor}
                        renderItem={this._renderReservationCard}
                    />
                }
                {(!hasReservations && hasSearched) &&
                    <View style={{padding: 20}}>
                        <Text style={{paddingVertical: 10, fontSize: 16}}>No Results</Text>
                        <Text style={{color: '#5c7996'}}>You can try making your search more generic by using part of a license plate number or not limiting by facility.</Text>
                    </View>
                }
                {!hasSearched &&
                    <View style={{padding: 20}}>
                        <Text style={{paddingVertical: 10, fontSize: 16}}>Results</Text>
                        <Text style={{color: '#5c7996'}}>Choose a facility and/or search to see reservations that are currently active. All reservations across facilities are shown by default. Reservations can be filtered by facility and/or searched</Text>
                    </View>
                }
            </View>
        );
    }
}
