import isEmpty from 'lodash/isEmpty';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import FormInput from './FormInput';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    listViewContainer: {
        maxHeight: 100
    },
    listView: {
        width: width - 40,
        maxHeight: 100,
        marginHorizontal: 20,
        marginVertical: 5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#bdc6cf'
    },
    listItem: {
        flex: 1,
        padding: 10
    }
});

class AutocompleteInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    componentWillMount() {
        this._setListData(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });

        this._setListData(nextProps.data);
    }

    _onPredictionPress = prediction => {
        const {
            onPredictionSelect
        } = this.props;

        onPredictionSelect(prediction);
    }

    _setListData = data => {
        this.dataSource = data;
    }

    clearInput = () => {
        const {
            onInputCleared
        } = this.props;

        if (onInputCleared) {
            onInputCleared();
        }
    }

    _keyExtractor = (item, index) => {
        return item.id;
    }

    _renderItem = ({item}) => {
        const onRowPress = () => {
            this._onPredictionPress(item);
        };

        return (
            <TouchableOpacity
                onPress={onRowPress}
                style={styles.listItem}
            >
                <Text style={{color: '#0082ff'}}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    _renderNoResults = ({item}) => {
        return (
            <View
                style={styles.listItem}
            >
                <Text>{item.title}</Text>
            </View>
        );
    }

    _renderAutocompleteList = () => {
        const {
            showFilterList
        } = this.props;

        if (showFilterList && !isEmpty(this.dataSource)) {
            return (
                <View style={styles.listViewContainer}>
                    <FlatList
                        style={styles.listView}
                        data={this.dataSource}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </View>
            );
        }

        if (showFilterList && this.dataSource !== null && isEmpty(this.dataSource)) {
            return (
                <View style={styles.listViewContainer}>
                    <FlatList
                        style={styles.listView}
                        data={[{title: 'No Results Found.', key: 1}]}
                        renderItem={this._renderNoResults}
                    />
                </View>
            );
        }

        return null;
    }

    render() {
        const {
            editable,
            placeholder,
            labelText,
            selectTextOnFocus,
            autoCorrect,
            keyboardType,
            multiline,
            placeholderTextColor,
            returnKeyType,
            autoCapitalize,
            maxLength,
            underlineColorAndroid,
            onEndEditing,
            onChangeText,
            onChange,
            onBlur,
            onFocus
        } = this.props;
        const {
            value
        } = this.state;

        return (
            <View>
                <FormInput
                    value={value}
                    editable={editable}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    labelText={labelText}
                    onChangeText={onChangeText}
                    selectTextOnFocus={selectTextOnFocus}
                    onBlur={onBlur}
                    autoCorrect={autoCorrect}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    placeholderTextColor={placeholderTextColor}
                    returnKeyType={returnKeyType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onEndEditing={onEndEditing}
                    onChange={onChange}
                    underlineColorAndroid={underlineColorAndroid}
                />
                {this._renderAutocompleteList()}
            </View>
        );
    }
}

AutocompleteInput.propTypes = {
    ...TextInput.propTypes,
    labelText: PropTypes.string,
    isLoading: PropTypes.bool,
    showFilterList: PropTypes.bool,
    textInputStyle: TextInput.propTypes.style,
    onPredictionSelect: PropTypes.func,
    onInputCleared: PropTypes.func
};

AutocompleteInput.defaultProps = {
    editable: true
};

export default AutocompleteInput;
