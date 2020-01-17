import React from 'react';

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>
  }
  return <p>The water would not boil.</p>
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onTemperatureChange(e.target.value, this.props.scale);
  }

  render() {
    const scale = this.props.scale;
    return (
      <div>
        <fieldset>
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input 
            value={this.props.temperature}
            onChange={this.handleChange}/>
        </fieldset>
      </div>
    )
  }
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.onTemperatureChange = this.onTemperatureChange.bind(this)
    this.state = {
      temperature: '',
      scale: 'c'
    }
  }

  onTemperatureChange(tem, scale) {
    this.setState({
      temperature: tem,
      scale: scale
    })
  }
  
  render() {
    const temperature = this.state.scale === 'f' ? toCelsius(this.state.temperature) : this.state.temperature
    const celsius = this.state.scale === 'f' ? tryConvert(this.state.temperature, toCelsius) : this.state.temperature
    const fahrenheit = this.state.scale === 'c' ? tryConvert(this.state.temperature, toFahrenheit) : this.state.temperature
    return (
      <div>
        <BoilingVerdict celsius={temperature}/>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.onTemperatureChange}/>
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.onTemperatureChange}/>
      </div>
    )
  }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
