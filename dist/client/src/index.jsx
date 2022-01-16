"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const react_query_1 = require("react-query");
const ThemeContext_1 = require("./context/ThemeContext");
const FingerPrintContext_1 = require("./context/FingerPrintContext");
const queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 2 * 60 * 1000
        }
    }
});
react_dom_1.default.render(<react_1.default.StrictMode>
	  <react_query_1.QueryClientProvider client={queryClient}>
		<FingerPrintContext_1.FingerPrintContextProvider>
			<ThemeContext_1.ThemeContextProvider>
				<App_1.default />
			</ThemeContext_1.ThemeContextProvider>
		</FingerPrintContext_1.FingerPrintContextProvider>
	  </react_query_1.QueryClientProvider>
  </react_1.default.StrictMode>, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
