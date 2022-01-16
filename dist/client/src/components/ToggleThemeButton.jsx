"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_spring_1 = require("react-spring");
const ThemeContext_1 = require("../context/ThemeContext");
const ToggleThemeButton = () => {
    const [isDarkMode, setIsDarkMode] = (0, react_1.useState)(false);
    const { toggleThemeMode } = (0, ThemeContext_1.useThemeToggle)();
    const properties = {
        sun: {
            r: 9,
            transform: 'rotate(40deg)',
            cx: 12,
            cy: 4,
            opacity: 0
        },
        moon: {
            r: 5,
            transform: 'rotate(90deg)',
            cx: 30,
            cy: 0,
            opacity: 1
        },
        springConfig: { mass: 4, tension: 250, friction: 35 }
    };
    const { r, transform, cx, cy, opacity } = isDarkMode ? properties['moon'] : properties['sun'];
    const svgContainerProps = (0, react_spring_1.useSpring)({
        transform,
        config: properties.springConfig
    });
    const centerCircleProps = (0, react_spring_1.useSpring)({
        r,
        fill: isDarkMode ? 'yellow' : 'black',
        config: properties.springConfig
    });
    const maskedCircleProps = (0, react_spring_1.useSpring)({
        cx,
        cy,
        config: properties.springConfig
    });
    const linesProps = (0, react_spring_1.useSpring)({ opacity, config: properties.springConfig });
    const toggle = () => {
        setIsDarkMode(prev => !prev);
        toggleThemeMode();
    };
    return (<react_spring_1.animated.svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' style={{ ...svgContainerProps, cursor: 'pointer' }} onClick={() => toggle()} onKeyUp={() => toggle()} tabIndex={0} aria-label='Toggle theme' role='button'>
			<mask id='mask'>
				<rect x='0' y='0' width='100%' height='100%' fill='white'/>
				<react_spring_1.animated.circle style={maskedCircleProps} cx='12' cy='4' r='9' fill='black'/>
			</mask>
			<react_spring_1.animated.circle style={centerCircleProps} fill='black' cx='12' cy='12' r='9' mask='url(#mask)'/>

			<react_spring_1.animated.g style={linesProps} fill='currentColor'>
				<line x1='12' y1='1' x2='12' y2='3'/>
				<line x1='12' y1='21' x2='12' y2='23'/>
				<line x1='4.22' y1='4.22' x2='5.64' y2='5.64'/>
				<line x1='18.36' y1='18.36' x2='19.78' y2='19.78'/>
				<line x1='1' y1='12' x2='3' y2='12'/>
				<line x1='21' y1='12' x2='23' y2='12'/>
				<line x1='4.22' y1='19.78' x2='5.64' y2='18.36'/>
				<line x1='18.36' y1='5.64' x2='19.75' y2='4.22'/>
			</react_spring_1.animated.g>
		</react_spring_1.animated.svg>);
};
exports.default = ToggleThemeButton;
