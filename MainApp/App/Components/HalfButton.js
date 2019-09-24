import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/HalfButtonStyles'
import PropTypes from 'prop-types'

export default class HalfButton extends React.Component {
  render () {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text && this.props.text.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}

HalfButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  styles: PropTypes.object
}
