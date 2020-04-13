import isGameEntity from 'components/entities/isGameEntity'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'
import gameConfig from 'configs/gameConfig'
import createLaserBeam from './createLaserGun'

const createPlayerShip = function createPlayerShipFunc(scene: Phaser.Scene) {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}
  let ship: Phaser.Physics.Arcade.Sprite
  let cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
  let spacebar
  let gun
  let animations: {
    straightAnimation: string;
  }

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create () {
    const { VIEWHEIGHT, VIEWWIDTH } = gameConfig.GAME

    ship = scene.physics.add.sprite(VIEWWIDTH / 2,VIEWHEIGHT - 50, spriteConfig.PLAYER_SHIP.KEY)
      .setScale(2)

    animations = createAnimations()
    ship.anims.play(animations.straightAnimation)

    ship.setCollideWorldBounds(true)
    cursorKeys = scene.input.keyboard.createCursorKeys()

    spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    /**
     * @todo Rename beam gun
     */
    gun = createLaserBeam(scene)
    gun.create()
  }

  /**
   * @todo add turning animations
   */
  function createAnimations () {
    // move straight
    const straightKey = `${spriteConfig.PLAYER_SHIP.KEY}_anim`
    const straightframes = scene.anims.generateFrameNumbers(spriteConfig.PLAYER_SHIP.KEY, {})
    scene.anims.create({
      key: straightKey,
      frames: [straightframes[2], straightframes[7]],
      frameRate: 20,
      repeat: -1
    })

    return {
      straightAnimation: straightKey
    }
  }

  function playerMoveManager () {
    const { left, right, up, down } = cursorKeys
    const { SPEED } = gameConfig.PLAYER

    if (left.isDown) {
      ship.setVelocityX(-SPEED)
    } else if (right.isDown) {
      ship.setVelocityX(SPEED)
    } else if (up.isDown) {
      ship.setVelocityY(-SPEED)
    } else if (down.isDown) {
      ship.setVelocityY(SPEED)
    }
  }

  function shootBeam () {
    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
      /** @todo add modifer for beam? */
      gun.shoot(ship.x, ship.y, Math.random() > 0.5 ? 'ball' : 'beam')
    }
  }

  function update () {
    shootBeam()
    playerMoveManager()
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
