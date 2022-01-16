"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const usePosts_1 = require("../../hooks/usePosts");
const PostActions = ({ date, toggleFullscreen, mediaType }) => {
    const { mutate } = (0, usePosts_1.useVote)(date);
    const voteCount = (0, usePosts_1.useGetPostVote)(date);
    if (!voteCount.data)
        return null;
    const count = voteCount.data.votes;
    return (<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ display: 'flex', margin: '0 1rem' }}>
				<material_1.Checkbox icon={<icons_material_1.FavoriteBorder />} checkedIcon={<icons_material_1.Favorite color='error'/>} onChange={() => mutate()} inputProps={{ 'aria-label': 'Like checkbox' }} checked={voteCount.data.userLiked} style={{ padding: '0 5%' }}/>
				<p aria-label='Vote count' style={{ margin: '0 5%' }}>{count}</p>
			</div>
			{mediaType === 'image' && (<material_1.IconButton onClick={toggleFullscreen} aria-label='Toggle Fullscreen' style={{ padding: '0 5%' }}>
					<icons_material_1.Fullscreen />
				</material_1.IconButton>)}
		</div>);
};
exports.default = PostActions;
