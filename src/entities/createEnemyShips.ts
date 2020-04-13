import isGameEntity from 'components/entities/isGameEntity'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'
import gameConfig from 'configs/gameConfig'

interface IShip extends Phaser.GameObjects.TileSprite {}

const createEnemyShips = function createEnemyShipsFunc() {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}
  let enemySmall: IShip
  let enemyMedium: IShip
  let enemyBig: IShip

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create (scene: Phaser.Scene) {
    enemySmall = scene.add.tileSprite(150, 200, 16, 16, spriteConfig.ENEMY_SMALL.KEY, 1)
      .setScale(2)
    enemyMedium = scene.add.tileSprite(300, 200, 32, 16, spriteConfig.ENEMY_MEDIUM.KEY, 1)
      .setScale(2)
    enemyBig = scene.add.tileSprite(450, 200, 32, 32, spriteConfig.ENEMY_BIG.KEY, 1)
      .setScale(2)
  }

  function moveShip(ship: IShip, speed: number) {
    ship.y += speed
    if (ship.y > gameConfig.GAME.VIEWHEIGHT) {
      resetShipPos(ship)
    }
  }

  function resetShipPos(ship: IShip) {
    // console.log('resetShipPos', scene)
    ship.y = -50
    ship.x = Phaser.Math.Between(0, gameConfig.GAME.VIEWWIDTH)
  }

  function getRandomSpeed () {
    const speeds = [2, 3, 4]
    // return speeds[Math.floor(Math.random() * speeds.length)] * 2
    return 3
  }

  function update() {
    moveShip(enemySmall, getRandomSpeed())
    moveShip(enemyMedium, getRandomSpeed())
    moveShip(enemyBig, getRandomSpeed())
  }

  // functions and properties listed here will be public.
  const localState = {
    // props
    name: 'enemyShips',
    // methods
    create,
    update,
    printInfo,
  }

  // These are the substates, or components, that describe the functionality of the resulting object.
  return createState('EnemyShips', state, {
    localState,
    isGameEntity: isGameEntity(state),
    hasPosition: hasPosition(state),
    canEmit: canEmit(state),
  })
}

export default createEnemyShips
