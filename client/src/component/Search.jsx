import React from 'react';
import StockShow from "./StockShow.jsx"

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      param: []
    }
  }

  onClick (e) {
    this.props.onSearch(this.state.input, (stockData) => {
      console.log(stockData);
      this.setState({
        input: '',
        param: stockData
      })
    })
  }

  onChange (e) {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input onChange={this.onChange.bind(this)} value={this.state.input}></input>
        <button onClick={this.onClick.bind(this)}>Search</button>
        { this.state.param.length === 0 ? null : <StockShow stock={this.state.param}/> }
      </div>
    )
  }
}


export default Search;