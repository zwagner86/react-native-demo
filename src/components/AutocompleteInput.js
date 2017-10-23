import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Animated,
    ActivityIndicator,
    Dimensions,
    ListView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 15,
        ...Platform.select({
            ios: {
                borderBottomColor: '#bdc6cf',
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
            }
        })
    },
    clearIcon: {
        marginLeft: 0,
        marginRight: 5
    },
    textInput: {
        flex: 1,
        ...Platform.select({
            android: {
                minHeight: 46,
                width: width - 30
            },
            ios: {
                minHeight: 36,
                width
            }
        }),
        color: '#86939e'
    },
    activityIndicator: {
        marginLeft: 5,
        marginRight: 5
    },
    listViewContainer: {
        flex: 0
    },
    listView: {
        //flex: 1,
        zIndex: 1000,
        backgroundColor: 'white',
        margin: 10,
        position: 'absolute'
    },
    listItem: {
        padding: 10
    },
    listItemSeparator: {
        borderWidth: 0.5,
        borderColor: 'lightgrey'
    }
});

class AutocompleteInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showClearButton: false,
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

    _onFocus = () => {
        const {
            onFocus
        } = this.props;

        this._shouldShowClearButton();

        if (onFocus) {
            onFocus();
        }
    }

    _onChangeText = text => {
        const {
            onChangeText
        } = this.props;

        this._shouldShowClearButton(text);

        if (onChangeText) {
            onChangeText(text);
        }
    }

    _onBlur = () => {
        this.setState({
            showClearButton: false
        });
    }

    _onClearInput = () => {
        this.clearInput();
    }

    _onPredictionPress = prediction => {
        const {
            onPredictionSelect
        } = this.props;

        console.log(prediction);
        onPredictionSelect(prediction);
    }

    _setListData = data => {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2;
            }
        });

        this.dataSource = ds.cloneWithRows(data);
    }

    _shouldShowClearButton = value => {
        const v = value || this.state.value;
        const showClearButton = (v);

        this.setState({
            showClearButton
        });
    }

    clearInput = () => {
        const {
            onInputCleared
        } = this.props;

        this.setState({
            showClearButton: false
        });

        if (onInputCleared) {
            onInputCleared();
        }
    }

    isFocused = () => {
        return this._input.isFocused();
    }

    _renderActivityIndicator = () => {
        const {
            isLoading,
            activityIndicatorStyle
        } = this.props;
        const animating = (isLoading === true);
        const size = animating ? {} : {width: 0, height: 0, marginLeft: 0, marginRight: 0};

        return (
            <ActivityIndicator
                animating={animating}
                style={[styles.activityIndicator, activityIndicatorStyle, size]}
            />
        );
    }

    _renderClearButton = () => {
        const {
            clearButtonIcon,
            clearButtonSize,
            clearButtonColor,
            clearButtonStyle
        } = this.props;
        const {
            showClearButton
        } = this.state;

        if (showClearButton) {
            return (
                <TouchableOpacity onPress={this._onClearInput}>
                    <Icon
                        name={clearButtonIcon}
                        size={clearButtonSize}
                        style={[styles.clearIcon, clearButtonStyle]}
                        color={clearButtonColor}
                    />
                </TouchableOpacity>
            );
        }
    }

    renderRow = prediction => {
        const onRowPress = () => {
            this._onPredictionPress(prediction);
        };

        return (
            <TouchableOpacity
                onPress={onRowPress}
                style={styles.listItem}
            >
                <Text>{prediction.facilityTitle}</Text>
            </TouchableOpacity>
        );
    }
    
    renderSeparator = () => {
        return <View style={styles.listItemSeparator} />;
    }

    render() {
        const {
            style,
            textInputStyle,
            editable,
            placeholder,
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
            onChange
        } = this.props;
        const {
            focus,
            value
        } = this.state;

        return (
            <View>
                <Animated.View style={[styles.inputContainer, style]}>
                    <TextInput
                        ref={node => { this._input = node; }}
                        style={[styles.textInput, textInputStyle]}
                        focus={focus}
                        value={value}
                        editable={editable}
                        onFocus={this._onFocus}
                        placeholder={placeholder}
                        onChangeText={this._onChangeText}
                        selectTextOnFocus={selectTextOnFocus}
                        onBlur={this._onBlur}
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
                    {this._renderClearButton()}
                    {this._renderActivityIndicator()}
                </Animated.View>
                <View style={styles.listViewContainer}>
                    <ListView
                        enableEmptySections
                        style={styles.listView}
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        renderSeparator={this.renderSeparator}
                    />
                </View>
            </View>
        );
    }
}

const {
    autoCorrect,
    keyboardType,
    multiline,
    placeholderTextColor,
    returnKeyType,
    selectTextOnFocus,
    placeholder,
    editable,
    autoCapitalize,
    maxLength,
    onEndEditing,
    onChange
} = TextInput.propTypes;
const textInputProps = {
    autoCorrect,
    keyboardType,
    multiline,
    placeholderTextColor,
    returnKeyType,
    selectTextOnFocus,
    placeholder,
    editable,
    autoCapitalize,
    maxLength,
    onEndEditing,
    onChange
};

AutocompleteInput.propTypes = {
    ...textInputProps,
    value: PropTypes.string,
    isLoading: PropTypes.bool,
    textInputStyle: TextInput.propTypes.style,
    clearButtonIcon: PropTypes.string,
    clearButtonColor: PropTypes.string,
    clearButtonSize: PropTypes.number,
    clearButtonStyle: PropTypes.object,
    activityIndicatorStyle: ActivityIndicator.propTypes.style,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    onPredictionSelect: PropTypes.func,
    onInputCleared: PropTypes.func,
    underlineColorAndroid: PropTypes.string
};

AutocompleteInput.defaultProps = {
    editable: true,
    clearButtonIcon: 'times',
    clearButtonColor: 'lightgrey',
    clearButtonSize: 20,
    underlineColorAndroid: 'transparent'
};

export default AutocompleteInput;
