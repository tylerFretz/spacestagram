"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/styles");
const useStyles = (0, styles_1.makeStyles)({
    imageContainer: {
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        textAlign: 'center'
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none'
    },
    imageModal: {
        width: '100%',
        maxHeight: '95vh',
        maxWidth: '95vw'
    },
    overlay: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 5, 0.9)',
        zIndex: 99,
        cursor: 'pointer',
        paddingTop: '1%'
    },
    overlayButton: {
        position: 'absolute',
        right: 0,
        margin: '1rem 1rem'
    }
});
const ExpandableImage = ({ url, title, mediaType, toggleFullscreen, isExpanded, description }) => {
    const classes = useStyles();
    return (<>
		{/* wrapping image in container to prevent layout shifts using the padding-bottom hack  */}
			<div className={classes.imageContainer}>
				<material_1.CardMedia className={classes.image} 
    // media type may be a video, in which case iframe is needed
    component={mediaType === 'image' ? 'img' : 'iframe'} alt={title} src={url} title={mediaType === 'image' ? `Image of ${title}` : `Video of ${title}`} allowFullScreen loading='lazy'/>
				{isExpanded && (<div className={classes.overlay}>
						<material_1.ClickAwayListener onClickAway={toggleFullscreen}>
						<div className={classes.imageContainer}>
							<img src={url} alt={title} className={classes.imageModal}></img>
						</div>
						</material_1.ClickAwayListener>
						<div style={{ padding: '1% 2%' }}>
							<material_1.Typography variant='subtitle1' style={{ textIndent: '30px', textAlign: 'justify', color: '#FFF' }}>
								{description}
							</material_1.Typography>
						</div>
					</div>)}
			</div>
		</>);
};
exports.default = ExpandableImage;
