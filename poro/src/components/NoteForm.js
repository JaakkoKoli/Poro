import React from 'react'
import { createNew } from './../reducers/noteReducer'
import { connect } from 'react-redux'

class NoteForm extends React.Component {

  addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    this.props.createNew(content)
  }

  render() {
    return (
      <form onSubmit={this.addNote}>
        <input name="note" />
        <button>lisää</button>
      </form>
    )
  }
}

export default connect(
  null,
  { createNew }
)(NoteForm)