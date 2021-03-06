import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Tile from 'components/lv1/Tile'
import { DIV_X, DIV_Y } from 'datas/tile'

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflow: 'scroll',
    height: 640,
  },
  root: {
    width: props => `${props.fixedWidth}px`,
    pointerEvents: props => (props.tileIsSelectable ? '' : 'none'),
    cursor: 'pointer',
  },
  katagami: {
    backgroundImage: props => `url(${props.katagamiUrl})`,
    backgroundSize: 'cover',
    border: props => (props.tileIsSelectable ? '2px solid #00796B' : 'none'),
    width: props => `${props.fixedWidth}px`,
    height: props => `${props.fixedHeight}px`,
  },
}))

const KatagamiImage = props => {
  const {
    katagamiUrl,
    katagamiWidth,
    katagamiHeight,
    selectedTiles,
    handleToggleTile,
    tileIsSelectable,
    fixedWidth,
    division,
    stay,
    setStay,
    isResultPage = false,
  } = props
  const fixedHeight = (katagamiHeight / katagamiWidth) * fixedWidth
  const dx = DIV_X(division)
  const tileHeight = fixedHeight / DIV_Y(division)
  const savedTilesAreNotZero = selectedTiles.reduce((a, b) => a && b, true)
  const classes = useStyles({
    katagamiUrl,
    fixedWidth,
    fixedHeight,
    tileHeight,
    tileIsSelectable,
    savedTilesAreNotZero,
  })

  const TilesOnKatagami = () => {
    const labels = []
    for (let i = 1; i <= division; i++) {
      labels.push(
        <Tile
          key={i}
          number={i}
          square={dx}
          isSelected={selectedTiles[i - 1]}
          handleToggleTile={handleToggleTile}
          isResultPage={isResultPage}
          stay={stay}
          setStay={setStay}
        />
      )
    }
    return labels
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.katagami}>
          <TilesOnKatagami />
        </Grid>
      </div>
    </div>
  )
}

KatagamiImage.propTypes = {
  katagamiUrl: PropTypes.string.isRequired,
  katagamiWidth: PropTypes.number.isRequired,
  katagamiHeight: PropTypes.number.isRequired,
  fixedWidth: PropTypes.number.isRequired,
  division: PropTypes.number.isRequired,
  selectedTiles: PropTypes.arrayOf(PropTypes.bool).isRequired,
  tileIsSelectable: PropTypes.bool.isRequired,
  isResultPage: PropTypes.bool,
  stay: PropTypes.bool,
  setStay: PropTypes.func,
}

export default KatagamiImage
