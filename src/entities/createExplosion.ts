import isGameEntity from 'components/entities/isGameEntity'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'

const createExplosion = function createExplosionFunc(scene: Phaser.Scene) {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create() {
    const frames = scene.anims.generateFrameNumbers(spriteConfig.LASER_BOLTS.KEY, {})
    scene.anims.create({
      key: 'explode',
      frames: [frames[0], frames[1]],
      frameRate: 20,
      repeat: 1,
      hideOnComplete: true
    })
  }

  function explode(x: number, y: number
  ) {
    const explosion: Phaser.Physics.Arcade.Sprite = scene.physics.add.sprite(x, y, spriteConfig.EXPLOSION.KEY)
      .setScale(4)

    explosion.anims.play('explode')
  }

  function update() {
  }

  // functions and properties listed here will be public.
  const localState = {
    // props
    name: 'explosion',
    // methods
    create,
    update,
    printInfo,
    explode
  }

  // These are the substates, or components, that describe the functionality of the resulting object.
  return createState('Explosion', state, {
    localState,
    isGameEntity: isGameEntity(state),
    hasPosition: hasPosition(state),
    canEmit: canEmit(state),
  })
}

export default createExplosion
