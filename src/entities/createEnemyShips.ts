import { range, empty } from 'ramda'
import isGameEntity from 'components/entities/isGameEntity'
import createExplosion from 'entities/createExplosion'
import canEmit from 'components/events/canEmit'
import hasPosition from 'components/hasPosition'
import createState from 'utils/createState'
import spriteConfig from 'configs/spriteConfig'
import gameConfig from 'configs/gameConfig'

interface ISprite extends Phaser.GameObjects.Sprite {}

const createEnemyShips = function createEnemyShipsFunc(scene: Phaser.Scene) {
  // variables and functions here are private unless listed below in localState.
  const state: any = {}
  let enemySmall: ISprite
  let enemyMedium: ISprite
  let enemyBig: ISprite
  let enemies: Phaser.Physics.Arcade.Group
  let explosion

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create () {
    enemies = scene.physics.add.group()
    enemySmall = scene.add.sprite(150, 200, spriteConfig.ENEMY_SMALL.KEY, 0)
      .setScale(2)

    enemyMedium = scene.add.sprite(300, 200, spriteConfig.ENEMY_MEDIUM.KEY, 0)
      .setScale(2)

    enemyBig = scene.add.sprite(450, 200, spriteConfig.ENEMY_BIG.KEY, 0)
      .setScale(2)

    enemies.add(enemySmall)
    enemies.add(enemyMedium)
    enemies.add(enemyBig)

    createAnimation(enemySmall, spriteConfig.ENEMY_SMALL)
    createAnimation(enemyMedium, spriteConfig.ENEMY_MEDIUM)
    createAnimation(enemyBig, spriteConfig.ENEMY_BIG)
    createAnimation(enemyBig, spriteConfig.EXPLOSION, false, { repeat: 0, hideOnComplete: true })

    explosion = createExplosion(scene)
    explosion.create()
  }

  function createAnimation(
    ship: ISprite,
    shipConfig: any,
    play = true,
    animConfig: Phaser.Types.Animations.Animation = {}
  ) {
    const key = `${shipConfig.KEY}_anim`
    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers(shipConfig.KEY, {}),
      frameRate: 20,
      repeat: -1,
      ...animConfig
    })
    if (play) {
      ship.anims.play(key)
    }
  }

  function moveShip(ship: ISprite, speed: number) {
    ship.y += speed
    if (ship.y > gameConfig.GAME.VIEWHEIGHT) {
      // set random delay
      resetShipPos(ship)
    }
  }

  function resetShipPos(ship: ISprite) {
    // console.log('resetShipPos', scene)
    ship.y = -(Phaser.Math.Between(50, 300))
    ship.x = Phaser.Math.Between(0, gameConfig.GAME.VIEWWIDTH)
  }

  function getRandomSpeed () {
    const speeds = [2, 3, 4]
    // return speeds[Math.floor(Math.random() * speeds.length)] * 2
    return 3
  }

  function getShips () {
    return enemies
  }

  function destroyShip (ship: Phaser.Physics.Arcade.Sprite) {
    explosion.explode(ship.x, ship.y)
    scene.tweens.add({
      targets: ship,
      duration: 500,
      angle: 270,
      x: ship.x - 10,
      y: ship.y - 10,
      onComplete: () => {
        explosion.explode(ship.x, ship.y)
        ship.destroy()
      }
    })
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
    getShips,
    destroyShip
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
