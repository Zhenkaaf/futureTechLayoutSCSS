const rootSelector = "[data-js-tabs]";

class Tabs {
    selectors = {
        root: rootSelector,
        button: "[data-js-tabs-button]",
        content: "[data-js-tabs-content]",
    };
    stateClasses = {
        isActive: "is-active",
    };

    stateAtrributes = {
        ariaSelected: "aria-selected",
        tabIndex: "tabindex",
    };

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(
            this.selectors.button
        );
        this.contentElements = this.rootElement.querySelectorAll(
            this.selectors.content
        );
        this.state = this.getProxyState({
            activeTabIndex: [...this.buttonElements].findIndex(
                (buttonElement) => {
                    return buttonElement.classList.contains(
                        this.stateClasses.isActive
                    );
                }
            ),
        });
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
    }
    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop];
            },
            set: (target, prop, value) => {
                target[prop] = value;
                this.updateUI();
                return true;
            },
        });
    }

    updateUI() {
        const { activeTabIndex } = this.state;
        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex;
            buttonElement.classList.toggle(
                this.stateClasses.isActive,
                isActive
            );
            buttonElement.setAttribute(
                this.stateAtrributes.ariaSelected,
                isActive.toString()
            );
            buttonElement.setAttribute(
                this.stateAtrributes.tabIndex,
                isActive ? "0" : "-1"
            );
        });
        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex;
            contentElement.classList.toggle(
                this.stateClasses.isActive,
                isActive
            );
        });
    }

    previousTab = () => {
        const newTabIndex =
            this.state.activeTabIndex === 0
                ? this.limitTabsIndex
                : this.state.activeTabIndex - 1;
        this.state.activeTabIndex = newTabIndex;
        this.buttonElements[newTabIndex].focus();
    };
    nextTab = () => {
        const newTabIndex =
            this.state.activeTabIndex === this.limitTabsIndex
                ? 0
                : this.state.activeTabIndex + 1;
        this.state.activeTabIndex = newTabIndex;
        this.buttonElements[newTabIndex].focus();
    };
    firstTab = () => {
        this.activateTab(0);
    };
    lastTab = () => {
        this.activateTab(this.limitTabsIndex);
    };

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;
    }
    onKeyDown = (event) => {
        const { code, metaKey } = event;
        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code];

        const isMacHomeKey = metaKey && code === "ArrowLeft";
        if (isMacHomeKey) {
            this.firstTab();

            return;
        }
        const isMacEndKey = metaKey && code === "ArrowRight";
        if (isMacEndKey) {
            this.lastTab();

            return;
        }

        action?.();
    };

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener("click", () =>
                this.onButtonClick(index)
            );
        });
        this.rootElement.addEventListener("keydown", this.onKeyDown);
    }
}

class TabsCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element);
        });
    }
}

export default TabsCollection;