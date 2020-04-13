import { range } from 'ramda'
import isGameEntity from 'components/entities/isGameEntity'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'
import gameConfig from 'configs/gameConfig'

const createPowerUps = function createPowerUpsFunc(scene: Phaser.Scene) {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}

  let powerUps: Phaser.Physics.Arcade.Group
  const maxPowerUps = 4

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create() {
    const { VIEWHEIGHT, VIEWWIDTH } = gameConfig.GAME

    createAnimation('red', { start: 0, end: 1 })
    createAnimation('gray', { start: 2, end: 3 })

    powerUps = scene.physics.add.group()

    range(0, maxPowerUps).forEach((i) => {
      const powerUp = scene.physics.add.sprite(16, 16, spriteConfig.POWER_UPS.KEY)
        .setScale(2)
        .setRandomPosition(0, 0, VIEWWIDTH, VIEWHEIGHT)
      powerUps.add(powerUp)

      if (Math.random() > 0.5) {
        powerUp.play('red')
      } else {
        powerUp.play('gray')
      }

      powerUp.setVelocity(100, 100)
        .setCollideWorldBounds(true)
        .setBounce(1)
    })
  }

  function createAnimation (key: string, frames) {
    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers(spriteConfig.POWER_UPS.KEY, frames),
      frameRate: 20,
      repeat: -1
    })
  }

  function update() {
    console.log('update')
  }

  // functions and properties listed here will be public.
  const localState = {
    // props
    name: 'powerUps',
    // methods
    create,
    update,
    printInfo,
  }

  // These are the substates, or components, that describe the functionality of the resulting object.
  return createState('PowerUps', state, {
    localState,
    isGameEntity: isGameEntity(state),
    hasPosition: hasPosition(state),
    canEmit: canEmit(state),
  })
}

export default createPowerUps
