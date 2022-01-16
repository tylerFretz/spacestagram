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
exports.ThemeContextProvider = exports.useTheme = exports.useThemeToggle = void 0;
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const ThemeActionsContext = (0, react_1.createContext)({ toggleThemeMode: () => { } });
const ThemeStateContext = (0, react_1.createContext)('');
const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = (0, react_1.useState)('dark');
    const colorMode = (0, react_1.useMemo)(() => ({
        toggleThemeMode: () => {
            setMode(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
        },
    }), []);
    const theme = (0, react_1.useMemo)(() => (0, styles_1.createTheme)({
        palette: {
            mode: mode
        },
    }), [mode]);
    return (<ThemeStateContext.Provider value={mode}>
			<ThemeActionsContext.Provider value={colorMode}>
				<styles_1.ThemeProvider theme={theme}>
					<material_1.CssBaseline />
					{children}
				</styles_1.ThemeProvider>
			</ThemeActionsContext.Provider>
		</ThemeStateContext.Provider>);
};
exports.ThemeContextProvider = ThemeContextProvider;
const useThemeToggle = () => (0, react_1.useContext)(ThemeActionsContext);
exports.useThemeToggle = useThemeToggle;
const useTheme = () => (0, react_1.useContext)(ThemeStateContext);
exports.useTheme = useTheme;
