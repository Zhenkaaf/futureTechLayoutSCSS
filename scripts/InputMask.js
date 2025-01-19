const rootSelector = "[ data-js-input-mask]";

class InputMask {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.init();
  }

  init() {
    const islibReady = typeof window.IMask !== "undefined";
    if (islibReady) {
      window.IMask(this.rootElement, {
        mask: this.rootElement.dataset.jsInputMask,
      });
    } else {
      console.error("imask library isn't connected");
    }
  }
}

class InputMaskCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new InputMask(element);
    });
  }
}

export default InputMaskCollection;
