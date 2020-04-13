export function scaleToGameWidth(obj, percent, gameConfig) {
  obj.displayWidth = gameConfig.width * percent
  obj.scaleY = obj.scaleX
}

export function center(obj, gameConfig) {
  const { width, height } = gameConfig
  obj.x = width / 2
  obj.y = height / 2
}

export function centerH(obj, gameConfig) {
  obj.y = gameConfig.width / 2
}

export function centerV(obj, gameConfig) {
  obj.y = gameConfig.height / 2
}
