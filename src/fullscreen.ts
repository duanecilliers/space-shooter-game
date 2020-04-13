interface Document {
  msExitFullscreen: () => void;
  mozCancelFullScreen: () => void;
  webkitExitFullscreen: () => void;
  fullscreenElement: () => void;
  mozFullScreenElement: () => void;
  webkitFullscreenElement: () => void;
  msFullscreenElement: () => void;
}

interface IElement extends HTMLElement {
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
  msRequestFullscreen?: () => void;
}

document.getElementById('fullscreen_toggle').onclick = () => {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    const element: IElement = document.getElementById('game')
    // const element = document.getElementsByTagName('canvas')[0]
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      // element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  }
};
