"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@mui/styles");
const PostList_1 = __importDefault(require("./components/PostList"));
const Header_1 = __importDefault(require("./components/Header"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    root: {
        backgroundColor: theme.palette.mode === 'dark' ? '#222222' : '#DDE4E7',
        transition: 'background 0.5s ease'
    }
}));
const App = () => {
    const classes = useStyles();
    return (<div className={classes.root}>
			<Header_1.default />
			<PostList_1.default />
		</div>);
};
exports.default = App;
