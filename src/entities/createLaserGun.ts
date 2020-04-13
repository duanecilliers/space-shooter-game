import isGameEntity from 'components/entities/isGameEntity'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'
import gameConfig from 'configs/gameConfig'

const createLaserGun = function createLaserGunFunc(
  scene: Phaser.Scene,
  projectiles: Phaser.Physics.Arcade.Group
) {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}
  const beams: Phaser.Physics.Arcade.Sprite[] = []

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create() {
    // fire 1
    const fire1frames = scene.anims.generateFrameNumbers(spriteConfig.LASER_BOLTS.KEY, {})
    scene.anims.create({
      key: 'ball',
      frames: [fire1frames[0], fire1frames[1]],
      frameRate: 20,
      repeat: -1
    })

    // fire 2
    const fire2frames = scene.anims.generateFrameNumbers(spriteConfig.LASER_BOLTS.KEY, {})
    scene.anims.create({
      key: 'beam',
      frames: [fire2frames[2], fire2frames[3]],
      frameRate: 20,
      repeat: -1
    })
  }

  function shoot (
    x: number,
    y: number,
    type: 'ball' | 'beam' = 'ball'
  ) {
    const beam: Phaser.Physics.Arcade.Sprite = scene.physics.add.sprite(x, y, spriteConfig.LASER_BOLTS.KEY)
    beam.anims.play(type)
    projectiles.add(beam)
    scene.physics.world.enableBody(beam)
    beam.setVelocityY(-250)
    beams.push(beam)
    return beam
  }

  function update () {
    // cleanup beams
    if (beams.length > 0 && beams[0].y < 32) {
      beams[0].destroy()
      beams.shift()
    }
  }

  // functions and properties listed here will be public.
  const localState = {
    // props
    name: 'laserBeam',
    // methods
    create,
    shoot,
    update,
    printInfo,
  }

  // These are the substates, or components, that describe the functionality of the resulting object.
  return createState('LaserBeam', state, {
    localState,
    isGameEntity: isGameEntity(state),
    hasPosition: hasPosition(state),
    canEmit: canEmit(state),
  })
}

export default createLaserGun
