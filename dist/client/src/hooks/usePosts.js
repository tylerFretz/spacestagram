"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVote = exports.useGetPostVote = exports.usePostsByDateRange = exports.usePostByDate = void 0;
const react_query_1 = require("react-query");
const axios_1 = __importDefault(require("axios"));
const FingerPrintContext_1 = require("../context/FingerPrintContext");
const BASE_URL = '/api/posts';
// ### Helper functions ###
const getPost = async (date) => {
    const { data } = await axios_1.default.get(`${BASE_URL}/nasa/${date}`);
    return data;
};
const getPosts = async (startDate, endDate) => {
    const { data } = await axios_1.default.get(`${BASE_URL}/nasa/list/${startDate}/${endDate}`);
    return data;
};
const getPostVote = async (date, id) => {
    const { data } = await axios_1.default.get(`${BASE_URL}/votes/${date}`, { headers: { 'Authorization': id } });
    return data;
};
const vote = async (date, id) => {
    const { data } = await axios_1.default.post(`${BASE_URL}/vote/${date}`, null, {
        headers: { 'Authorization': id }
    });
    return data;
};
// ### React-query custom hooks ###
const usePostByDate = (date) => ((0, react_query_1.useQuery)(['posts', 'list', date], () => getPost(date)));
exports.usePostByDate = usePostByDate;
const usePostsByDateRange = (startDate, endDate) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useQuery)(['posts', 'list'], () => getPosts(startDate, endDate), {
        // create specific keys for each post in the cache so they can be accessed easier
        onSuccess: (data) => {
            data.forEach(post => {
                queryClient.setQueryData(['posts', 'list', post.date], post);
            });
        }
    });
};
exports.usePostsByDateRange = usePostsByDateRange;
const useGetPostVote = (date) => {
    const { fingerPrintId } = (0, FingerPrintContext_1.useFingerPrintId)();
    return (0, react_query_1.useQuery)(['posts', 'votes', date], () => getPostVote(date, fingerPrintId));
};
exports.useGetPostVote = useGetPostVote;
const useVote = (date) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    const { fingerPrintId } = (0, FingerPrintContext_1.useFingerPrintId)();
    return (0, react_query_1.useMutation)((newVoteCount) => vote(date, fingerPrintId), {
        onSuccess: (newVote) => {
            queryClient.setQueryData(['posts', 'votes', date], newVote);
        }
    });
};
exports.useVote = useVote;
