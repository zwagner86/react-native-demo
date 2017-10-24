import filter from 'lodash/filter';
import find from 'lodash/find';
import includes from 'lodash/includes';
import data from './facilities/facilities.json';

const FACILITY_FETCH = 'FACILITY_FETCH';
const FACILITY_FILTER = 'FACILITY_FILTER';
const FACILITY_SELECT = 'FACILITY_SELECT';
const FACILITY_RESET = 'FACILITY_RESET';
const initialState = {
    isPending: false,
    data: {
        facilities: [],
        filteredFacilities: [],
        selectedFacility: null
    },
    error: null
};

export default function user(state = initialState, {type, payload}) {
    switch (type) {
        case FACILITY_FETCH: {
            return {
                ...state,
                data: {
                    ...state.data,
                    facilities: data,
                    filteredFacilities: [],
                    selectedFacility: null
                }
            };
        }

        case FACILITY_FILTER: {
            return {
                ...state,
                data: {
                    ...state.data,
                    filteredFacilities: filter(state.data.facilities, facility => {
                        const {
                            title,
                            id
                        } = facility;

                        return includes(title, payload) || includes(id.toString(), payload);
                    })
                }
            };
        }

        case FACILITY_SELECT: {
            return {
                ...state,
                data: {
                    ...state.data,
                    filteredFacilities: [],
                    selectedFacility: find(state.data.facilities, ['id', payload])
                }
            };
        }

        case FACILITY_RESET: {
            return {
                ...state,
                data: {
                    ...state.data,
                    filteredFacilities: [],
                    selectedFacility: null
                }
            };
        }

        default:
            return state;
    }
}

export const facilityFetch = () => {
    return {
        type: FACILITY_FETCH
    };
};

export const facilityFilter = searchString => {
    return {
        type: FACILITY_FILTER,
        payload: searchString
    };
};

export const facilitySelect = facilityId => {
    return {
        type: FACILITY_SELECT,
        payload: facilityId
    };
};

export const facilityReset = () => {
    return {
        type: FACILITY_RESET
    };
};
