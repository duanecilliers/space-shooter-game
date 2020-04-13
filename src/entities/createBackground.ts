import isGameEntity from 'components/entities/isGameEntity'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'
import gameConfig from 'configs/gameConfig'
import { center } from 'utils/align'
import createGrid from 'utils/grid'

interface ISprite extends Phaser.GameObjects.TileSprite { }

const createBackground = function createBackgroundFunc(scene: Phaser.Scene) {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}

  let background: ISprite
  let stars: ISprite
  let planetCluster: ISprite
  let planet: ISprite
  let planet2: ISprite

  const grid = createGrid({
    scene,
    rows: 8,
    cols: 8
  })

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create() {
    const { add, game } = scene
    const { VIEWHEIGHT, VIEWWIDTH } = gameConfig.GAME
    console.log(VIEWWIDTH, VIEWHEIGHT)

    // background
    background = add.tileSprite(0, 0, 272, 160, spriteConfig.BACKGROUND.KEY)
      // .setOrigin(0, 0)
      .setScale(5)
      // .setAlpha(.8)
      .setDisplaySize(VIEWWIDTH * 2, VIEWHEIGHT * 2)
    center(background, game.config)

    // stars
    stars = add.tileSprite(0, 0, VIEWWIDTH, VIEWHEIGHT, spriteConfig.STARS.KEY)
      .setOrigin(0, 0)
      .setScale(5)
      .setDisplaySize(VIEWWIDTH, VIEWHEIGHT)

    // planet cluster
    planetCluster = add.tileSprite(0, 0, 272, 160, spriteConfig.PLANET_CLUSTER.KEY)
    center(planetCluster, game.config)

    // planet 1
    planet = add.tileSprite(200, 150, 88, 87, spriteConfig.PLANET.KEY)
    grid.placeAtIndex(2, planet)

    // planet 2
    planet2 = add.tileSprite(300, 200, 51, 115, spriteConfig.PLANET2.KEY)
    grid.placeAtIndex(54, planet2)

    // Debug
    // grid.show()
    // grid.showNumbers()
  }

  function moveObject(obj: ISprite, speed: number) {
    obj.y += speed
    if (obj.y > gameConfig.GAME.VIEWHEIGHT) {
      resetObjectPos(obj)
    }
  }

  function resetObjectPos(obj: ISprite) {
    // console.log('resetObjectPos', scene)
    obj.y = -50
    obj.x = Phaser.Math.Between(0, gameConfig.GAME.VIEWWIDTH)
  }

  function update() {
    // background.tilePositionY += .1
    stars.tilePositionY += .1
    moveObject(planet, .5)
    moveObject(planet2, .2)
    moveObject(planetCluster, .1)
  }

  function destroy() {
    if (background) state.getScene().background.destroy()
  }

  // functions and properties listed here will be public.
  const localState = {
    // props
    name: 'Player name',
    // methods
    create,
    update,
    destroy,
    printInfo,
  }

  // These are the substates, or components, that describe the functionality of the resulting object.
  return createState('Background', state, {
    localState,
    isGameEntity: isGameEntity(state),
    hasPosition: hasPosition(state),
    canEmit: canEmit(state),
  })
}

export default createBackground
