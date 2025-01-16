const rootSelector = "[data-js-video-player]";

class VideoPlayer {
  selectors = {
    root: rootSelector,
    video: "[data-js-video-player-video]",
    panel: "[data-js-video-player-panel]",
    playButton: "[data-js-video-player-play-button]",
  };
  stateClasses = {
    isActive: "is-active",
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.videoElement = this.rootElement.querySelector(this.selectors.video);
    this.panelElement = this.rootElement.querySelector(this.selectors.panel);
    this.playButtonElement = this.rootElement.querySelector(
      this.selectors.playButton
    );
    this.bindEvents();
  }

  onPlayButtonClick = () => {
    this.videoElement.play();
    this.videoElement.controls = true;
    this.panelElement.classList.remove(this.stateClasses.isActive);
    /* Сохранение контекста this: Стрелочные функции не имеют собственного значения this, и вместо этого наследуют его от окружающего контекста (в данном случае от конструктора класса VideoPlayer). Это гарантирует, что внутри стрелочной функции this будет указывать на экземпляр класса, а не на элемент, который инициирует событие.
Например, если бы вы использовали обычную функцию, контекст this внутри неё мог бы быть переопределён, и вы бы не могли получить доступ к свойствам экземпляра класса. */
  };
  onVideoPause = () => {
    this.videoElement.controls = false;
    this.panelElement.classList.add(this.stateClasses.isActive);
  };
  bindEvents() {
    this.playButtonElement.addEventListener("click", this.onPlayButtonClick);
    this.videoElement.addEventListener("pause", this.onVideoPause);
  }
}

class VideoPlayerCollection {
  constructor() {
    this.init();
  }
  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new VideoPlayer(element);
    });
  }
}

export default VideoPlayerCollection;
