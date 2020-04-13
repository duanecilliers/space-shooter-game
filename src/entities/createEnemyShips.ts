import { range, move } from 'ramda'
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
  const concurrentShips = 3
  const speed = 2
  let enemies: Phaser.Physics.Arcade.Group
  let explosion

  function printInfo() {
    console.log(`name: %c${state.name}`, 'color: red')
  }

  function create () {
    enemies = scene.physics.add.group()

    range(0, concurrentShips).forEach(createShip)

    explosion = createExplosion(scene)
    explosion.create()
  }

  function createShip () {
    const types = [spriteConfig.ENEMY_SMALL, spriteConfig.ENEMY_MEDIUM, spriteConfig.ENEMY_BIG]
    const randomIndex = Math.floor(Math.random() * types.length)
    const randomX = Phaser.Math.Between(0, gameConfig.GAME.VIEWWIDTH)
    const randomY = Phaser.Math.Between(-30, 200)
    const ship = scene.add.sprite(randomX, randomY, types[randomIndex].KEY, 0)
      .setScale(2)
    enemies.add(ship)
    createAnimation(ship, types[randomIndex])
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

  function moveShip(ship: any, speed: number) {
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
        createShip()
      }
    })
  }

  function update() {
    enemies.children.entries
      .forEach(ship => moveShip(ship, speed))
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
