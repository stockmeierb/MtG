import React from 'react'
import {fetchCards} from '../store/search'
import {connect} from 'react-redux'

class SearchForm extends React.Component {
  constructor() {
    super()
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.getResults(this.state.query)
    //this.props.history.push('/candies') //change to redirect to results screen
  }

  render() {
    const {query} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="query">Search: </label>
          <input
            required
            name="query"
            type="text"
            value={query}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getResults: query => dispatch(fetchCards(query))
  }
}

export default connect(null, mapDispatch)(SearchForm)
