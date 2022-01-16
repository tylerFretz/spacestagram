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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/styles");
const react_spring_1 = require("react-spring");
const useElementSize_1 = __importDefault(require("../../hooks/useElementSize"));
const ArrowDropDown_1 = __importDefault(require("@mui/icons-material/ArrowDropDown"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    toggleButton: {
        border: 'none',
        backgroundColor: 'inherit',
        cursor: 'pointer',
        display: 'inline-block',
        color: theme.palette.mode === 'dark' ? '#AAA' : '#000',
        padding: 0,
        fontSize: '1.1rem',
        '&:hover': {
            color: theme.palette.success.light
        },
    }
}));
const ToggleableText = ({ text }) => {
    const [hidden, setHidden] = (0, react_1.useState)(false);
    const [textRef, { height }] = (0, useElementSize_1.default)();
    const classes = useStyles();
    const slideInStyles = (0, react_spring_1.useSpring)({
        config: { ...react_spring_1.config.slow },
        from: { opacity: 0, height: 0 },
        to: {
            opacity: hidden ? 1 : 0,
            height: hidden ? height : 0
        }
    });
    const toggleHidden = (event) => {
        event.preventDefault();
        setHidden(prev => !prev);
    };
    return (<>
			<react_spring_1.animated.div style={{ ...slideInStyles, overflow: 'hidden' }}>
				<material_1.Typography variant='body2' component='p' ref={textRef} style={{ textIndent: '30px', textAlign: 'justify' }}>
					{text}
				</material_1.Typography>
			</react_spring_1.animated.div>
			<button onClick={toggleHidden} className={classes.toggleButton} aria-label='toggle description'>
				{hidden ? 'Hide description' : 'Read description'}
				<ArrowDropDown_1.default style={{
            transform: hidden ? '' : 'rotate(180deg)',
            transition: 'transform 900ms ease'
        }}/>
			</button>
		</>);
};
exports.default = ToggleableText;
