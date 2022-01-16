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
const date_fns_1 = require("date-fns");
const material_1 = require("@mui/material");
const styles_1 = require("@mui/styles");
const usePosts_1 = require("../hooks/usePosts");
const PostCard = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./PostCard'))));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    listContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0% 10%',
        padding: '2% 5%',
        [theme.breakpoints.down('sm')]: {
            margin: '2% 0'
        }
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px'
    }
}));
const PostList = () => {
    const [startDate, setStartDate] = (0, react_1.useState)((0, date_fns_1.format)((0, date_fns_1.subDays)(Date.now(), 4), 'yyyy-MM-dd'));
    const api = (0, usePosts_1.usePostsByDateRange)(startDate, (0, date_fns_1.format)(Date.now(), 'yyyy-MM-dd'));
    const classes = useStyles();
    (0, react_1.useEffect)(() => {
        api.refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    const loadMore = (event) => {
        event.preventDefault();
        setStartDate((0, date_fns_1.format)((0, date_fns_1.subDays)(Date.parse(startDate), 4), 'yyyy-MM-dd'));
    };
    return api.data ? (<section className={classes.listContainer}>
			<material_1.Stack direction='column' spacing={2} alignItems='center'>
				<react_1.Suspense fallback={<material_1.CircularProgress size={200}/>}>
					{api.data.map((post) => (<PostCard key={post.date} date={post.date}/>))}
				</react_1.Suspense>
				<div style={{ position: 'relative' }}>
						<material_1.Button variant='contained' disabled={api.isFetching} onClick={loadMore}>
							Load more
						</material_1.Button>
						{api.isFetching && (<material_1.CircularProgress size={24} className={classes.progress}/>)}
				</div>
			</material_1.Stack>
		</section>) : null;
};
exports.default = PostList;
