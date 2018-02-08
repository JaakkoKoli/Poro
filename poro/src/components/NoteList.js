import React from 'react'
import { connect } from 'react-redux'
import { toggleImportance } from './../reducers/noteReducer'
import Note from './Note'

const NoteList = (props) => (
  <ul>
    {props.visibleNotes.map(note =>
      <Note
        key={note.id}
        note={note}
        handleClick={() => props.toggleImportance(note)}
      />
    )}
  </ul>
)

const notesToShow = (notes, filter) => {
  if (filter === 'ALL') {
    return notes
  }
  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
}

const mapStateToProps = (state) => {
  return {
    visibleNotes: notesToShow(state.notes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { toggleImportance }
)(NoteList)