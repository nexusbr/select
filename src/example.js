import "react-select/dist/react-select.css";
import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { colourOptions } from './docs/data';
const util = require("util");
console.log ("ColorOptions: " + util.inspect(colourOptions));
type State = {
  inputValue: string,
};

// const filterColors = (inputValue: string) =>
//   colourOptions;

const filterColors = (inputValue: string) =>{
  // console.log ("filterColors-inputValue: " + inputValue);
  colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
  // console.log ("colourOptions-filter: " + util.inspect(colourOptions));
}

const loadOptions = (inputValue, callback) => {
  console.log ("loadOptions-inputValue: " + inputValue);
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      // console.log ("PromiseOptions-filterColors: " + util.inspect(filterColors("or")));
      resolve(filterColors(inputValue));
      // console.log ("PromiseOptions-filterColors2: " + util.inspect(filterColors("or")));
    }, 5000);
  });

export default class WithCallbacks extends Component<*, State> {
  state = { inputValue: '' };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    console.log ("handleInputChange: " + inputValue);
    return inputValue;
  };

  render() {
    return (
      <div>
        <pre>Valor digitado: "{this.state.inputValue}"</pre>
        <AsyncSelect
          loadingPlaceholder="Carregando..."
          placeholder="Digite o nome ou código..."
          searchPromptText="Digite para procurar"
          loadOptions={promiseOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          valueKey="value"
          labelKey="name"
        />
      </div>
    );
  }
}
