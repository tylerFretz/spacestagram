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
const usePosts_1 = require("../../hooks/usePosts");
const useLockedBody_1 = __importDefault(require("../../hooks/useLockedBody"));
const PostActions_1 = __importDefault(require("./PostActions"));
const ToggleableText_1 = __importDefault(require("./ToggleableText"));
const ExpandableImage_1 = __importDefault(require("./ExpandableImage"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    postCard: {
        maxWidth: '60vw',
        [theme.breakpoints.down('md')]: {
            maxWidth: '95vw'
        }
    },
    contentTopContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
const PostCard = ({ date }) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const [locked, setLocked] = (0, useLockedBody_1.default)(false);
    const api = (0, usePosts_1.usePostByDate)(date);
    const toggleFullscreen = (event) => {
        event.preventDefault();
        setIsExpanded(prev => !prev);
        setLocked(!locked);
    };
    if (!api.data)
        return null;
    const post = api.data;
    return (<material_1.Card className={classes.postCard}>
			<ExpandableImage_1.default url={post.url} title={post.title} mediaType={post.media_type} toggleFullscreen={toggleFullscreen} isExpanded={isExpanded} description={post.explanation}/>
			<material_1.CardContent>
				<div className={classes.contentTopContainer}>
					<material_1.Typography variant='h5' component='h5'>
						{post.title}
					</material_1.Typography>
					<PostActions_1.default date={date} toggleFullscreen={toggleFullscreen} mediaType={post.media_type}/>
				</div>
				<material_1.Typography variant='subtitle1' component='h6'>{post.date}</material_1.Typography>
				<ToggleableText_1.default text={post.explanation}/>
			</material_1.CardContent>
		</material_1.Card>);
};
exports.default = PostCard;
