"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useEventListener_1 = __importDefault(require("./useEventListener"));
function useElementSize() {
    // Mutable values like 'ref.current' aren't valid dependencies
    // because mutating them doesn't re-render the component.
    // Instead, we use a state as a ref to be reactive.
    const [ref, setRef] = (0, react_1.useState)(null);
    const [size, setSize] = (0, react_1.useState)({
        width: 0,
        height: 0,
    });
    // Prevent too many rendering using useCallback
    const handleSize = (0, react_1.useCallback)(() => {
        setSize({
            width: ref?.offsetWidth || 0,
            height: ref?.offsetHeight || 0,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.offsetHeight, ref?.offsetWidth]);
    (0, useEventListener_1.default)('resize', handleSize);
    (0, react_1.useLayoutEffect)(() => {
        handleSize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.offsetHeight, ref?.offsetWidth]);
    return [setRef, size];
}
exports.default = useElementSize;
