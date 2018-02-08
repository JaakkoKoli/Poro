import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class VisibilityFilter extends React.Component {

  filterClicked = (value) => () => {
    this.props.filterChange(value)
  }
  checked = (label) => {
    return label === this.props.filter
  }

  render() {
    return (
      <div>
        kaikki
        <input
          type='radio'
          name='filter'
          onChange={this.filterClicked('ALL')}
          checked={this.checked('ALL')}
        />
        tärkeät
        <input
          type='radio'
          name='filter'
          onChange={this.filterClicked('IMPORTANT')}
          checked={this.checked('IMPORTANT')}
        />
        eitärkeät
        <input
          type='radio'
          name='filter'
          onChange={this.filterClicked('NONIMPORTANT')}
          checked={this.checked('NONIMPORTANT')}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({ filter: state.filter }),
  { filterChange }
)(VisibilityFilter)