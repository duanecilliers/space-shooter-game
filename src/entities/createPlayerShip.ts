import isGameEntity from 'components/entities/isGameEntity'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'
import gameConfig from 'configs/gameConfig'

const createPlayerShip = function createPlayerShipFunc() {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}
  let ship: Phaser.GameObjects.TileSprite

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create (scene: Phaser.Scene) {
    const { VIEWHEIGHT, VIEWWIDTH } = gameConfig.GAME

    ship = scene.add.tileSprite(
      VIEWWIDTH / 2,
      VIEWHEIGHT - 50,
      16,
      24,
      spriteConfig.PLAYER_SHIP.KEY,
      1
    ).setScale(2)
  }

  function update () {
    console.log('update')
  }

  // functions and properties listed here will be public.
  const localState = {
    // props
    name: 'Player name',
    // methods
    create,
    update,
    printInfo,
  }

  // These are the substates, or components, that describe the functionality of the resulting object.
  return createState('Player', state, {
    localState,
    isGameEntity: isGameEntity(state),
    hasPosition: hasPosition(state),
    canEmit: canEmit(state),
  })
}

export default createPlayerShip
