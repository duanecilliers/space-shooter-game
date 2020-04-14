import isGameEntity from 'components/entities/isGameEntity'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'
import gameConfig from 'configs/gameConfig'
import createLaserBeam from './createLaserGun'
import createExplosion from './createExplosion'

const createPlayerShip = function createPlayerShipFunc(scene: Phaser.Scene) {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}
  let ship: Phaser.Physics.Arcade.Sprite
  let cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
  let spacebar
  let gun
  let projectiles: Phaser.Physics.Arcade.Group
  let explosion
  let animations: {
    up: string;
    left: string;
    right: string
  }

  const { VIEWHEIGHT, VIEWWIDTH } = gameConfig.GAME

  const spawnPosition = { x: VIEWWIDTH / 2, y: VIEWHEIGHT - 50 }

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create () {
    projectiles = scene.physics.add.group()

    // Create explosion state
    explosion = createExplosion(scene)
    explosion.create()

    ship = scene.physics.add.sprite(spawnPosition.x, spawnPosition.y, spriteConfig.PLAYER_SHIP.KEY)
      .setScale(2)

    animations = createAnimations()
    ship.anims.play(animations.up)

    ship.setCollideWorldBounds(true)
    cursorKeys = scene.input.keyboard.createCursorKeys()

    spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    /**
     * @todo Rename beam gun
     */
    gun = createLaserBeam(scene, projectiles)
    gun.create()
  }

  /**
   * @todo add turning animations
   */
  function createAnimations () {
    const createAnim = (spriteKey: string, animKey: string, frames: number[]) => {
      const _animKey = `${spriteKey}_${animKey}`
      const _frames = scene.anims.generateFrameNumbers(spriteKey, { frames })
      scene.anims.create({
        key: _animKey,
        frames: _frames,
        frameRate: 20,
        repeat: -1
      })
      return _animKey
    }

    return {
      up: createAnim(spriteConfig.PLAYER_SHIP.KEY, 'up', [2, 7]),
      left: createAnim(spriteConfig.PLAYER_SHIP.KEY, 'left', [0, 5]),
      right: createAnim(spriteConfig.PLAYER_SHIP.KEY, 'right', [4, 9])
    }
  }

  function playerMoveManager () {
    const { left, right, up, down } = cursorKeys
    const { SPEED } = gameConfig.PLAYER

    if (left.isDown) {
      ship.setVelocityX(-SPEED)
      ship.anims.stop()
      // flip directions if moving downwards
      if (down.isDown) {
        ship.anims.play(animations.right)
      } else {
        ship.anims.play(animations.left)
      }
    } else if (right.isDown) {
      ship.setVelocityX(SPEED)
      ship.anims.stop()
      // flip directions if moving downwards
      if (down.isDown) {
        ship.anims.play(animations.left)
      } else {
        ship.anims.play(animations.right)
      }
    } else if (up.isDown) {
      ship.setVelocityY(-SPEED)
    } else if (down.isDown) {
      ship.setVelocityY(SPEED)
        .setAngle(180)
    } else {
      ship.setAngle(0)
        .setVelocity(0, 0)
      ship.anims.stop()
      ship.anims.play(animations.up)
    }
  }

  function shootBeam () {
    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
      /** @todo add modifer for beam? */
      const beam = gun.shoot(ship.x, ship.y, Math.random() > 0.5 ? 'ball' : 'beam')
    }
  }

  function getProjectiles () {
    return projectiles
  }

  function getShip () {
    return ship
  }

  function consumePowerUp(player, powerUp) {
    powerUp.destroy()
  }

  function handleEnemyDestruction (enemy, projectile) {
    projectile.destroy()
  }

  /** @todo create a coinFlip util, using it a lot - `Math.random() > .5` */
  function onCollission () {
    console.log('collision')
    explosion.explode(ship.x, ship.y)
    ship.disableBody()
    scene.tweens.add({
      targets: ship,
      duration: 300,
      y: ship.y + 60,
      angle: Math.random() > .5 ? -45 : 45,
      alpha: 0.3,
      x: Math.random() > .5 ? ship.x + 30 : ship.x - 30,
      onComplete: () => {
        ship.enableBody(true, spawnPosition.x, spawnPosition.y, true, true)
        ship.alpha = 1
        ship.angle = 0
      }
    })

  }

  function update () {
    shootBeam()
    gun.update()
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
    getProjectiles,
    getShip,
    consumePowerUp,
    handleEnemyDestruction,
    onCollission
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
