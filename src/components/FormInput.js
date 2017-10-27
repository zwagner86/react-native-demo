import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    ViewPropTypes
} from 'react-native';
import {
    FormInput as FormInputElement,
    FormLabel,
    FormValidationMessage
} from 'react-native-elements';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    containerStyle: {},
    labelStyle: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 1
    },
    inputContainerStyle: {
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    inputStyle: {
        ...Platform.select({
            android: {
                minHeight: 36,
                width: width - 40
            },
            ios: {
                minHeight: 36,
                width: width - 40
            }
        }),
        color: 'gray'
    },
    errorStyle: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 1
    }
});

const FormInput = ({
    labelText,
    errorText,
    containerStyle,
    inputContainerStyle,
    labelStyle,
    inputStyle,
    errorStyle,
    underlineColorAndroid,
    ...inputProps
}) => {
    return (
        <View style={[styles.containerStyle, containerStyle]}>
            {labelText &&
                <FormLabel labelStyle={[styles.labelStyle, labelStyle]}>
                    {labelText}
                </FormLabel>
            }
            <FormInputElement
                containerStyle={styles.inputContainerStyle}
                inputStyle={[styles.inputStyle, inputStyle]}
                underlineColorAndroid={underlineColorAndroid || 'transparent'}
                {...inputProps}
            />
            {errorText &&
                <FormValidationMessage labelStyle={errorStyle}>
                    {errorText}
                </FormValidationMessage>
            }
        </View>
    );
};

FormInput.propTypes = {
    ...TextInput.propTypes,
    labelText: PropTypes.string,
    errorText: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    inputContainerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    errorStyle: Text.propTypes.style
};

export default FormInput;
