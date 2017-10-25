import React from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Text,
    ViewPropTypes
} from 'react-native';
import {Button as ButtonElement} from 'react-native-elements';

const styles = StyleSheet.create({
    buttonStyle: {},
    textStyle: {}
});

const Button = ({
    buttonStyle,
    textStyle,
    backgroundColor,
    title,
    onPress,
    ...buttonProps
}) => {
    return (
        <ButtonElement
            buttonStyle={[styles.buttonStyle, buttonStyle]}
            textStyle={[styles.textStyle, textStyle]}
            backgroundColor={backgroundColor}
            title={title}
            borderRadius={Platform.OS === 'android' ? 0 : 50}
            onPress={onPress}
            {...buttonProps}
        />
    );
};

Button.propTypes = {
    buttonStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    backgroundColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

Button.defaultProps = {
    backgroundColor: '#0082ff'
};

export default Button;
