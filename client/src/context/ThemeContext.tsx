import React, { createContext, useState, useMemo, useContext } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeActionsContext = createContext({ toggleThemeMode: () => {} });
const ThemeStateContext = createContext<string>('');

const ThemeContextProvider: React.FC = ({ children }) => {
	const [mode, setMode] = useState<string | PaletteMode>('dark');
	const colorMode = useMemo(() => ({
		toggleThemeMode: () => {
			setMode(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
		},
	}), []);

	const theme = useMemo(() => createTheme({
		palette: {
			mode: mode as PaletteMode
		},
	}), [mode]);

	return (
		<ThemeStateContext.Provider value={mode}>
			<ThemeActionsContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</ThemeActionsContext.Provider>
		</ThemeStateContext.Provider>
	)
}

const useThemeToggle = () => useContext(ThemeActionsContext);
const useTheme = () => useContext(ThemeStateContext);

export { useThemeToggle, useTheme, ThemeContextProvider };