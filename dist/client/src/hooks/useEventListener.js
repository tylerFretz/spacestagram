"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useEventListener(eventName, handler, element) {
    // Create a ref that stores handler
    const savedHandler = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        // Define the listening target
        const targetElement = element?.current || window;
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }
        // Update saved handler if necessary
        if (savedHandler.current !== handler) {
            savedHandler.current = handler;
        }
        // Create event listener that calls handler function stored in ref
        const eventListener = event => {
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!savedHandler?.current) {
                savedHandler.current(event);
            }
        };
        targetElement.addEventListener(eventName, eventListener);
        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element, handler]);
}
exports.default = useEventListener;
