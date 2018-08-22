import React from 'react'
import { connect } from 'react-redux'
import Media from '../components/Media'
import * as mediaDataActions from '../actions/mediaDataActions'

const mapStateToProps = (state) => {
  return {
    media: state.app.mediareducer.media,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMedia: () => {
      dispatch(mediaDataActions.getPhotos())
    },
  }
}

const MediaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Media)

export default MediaContainer
