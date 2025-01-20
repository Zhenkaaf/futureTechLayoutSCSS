class BaseComponent {
  constructor() {
    if (this.constructor === BaseComponent) {
      throw new Error(
        "It is impossible to crerate instance of abstract class BaseComponent"
      );
    }
  }
  getProxyState(initialState) {
    return new Proxy(initialState, {
      get: (target, prop) => {
        return target[prop];
      },
      set: (target, prop, newValue) => {
        const oldValue = target[prop];
        target[prop] = newValue;
        if (newValue !== oldValue) {
          this.updateUI();
        }
        return true;
      },
    });
  }

  updateUI() {
    throw new Error("It needs to realize updateUI method");
  }
}

export default BaseComponent;
