import React, { createContext, useState, useMemo, useContext } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext({ toggleThemeMode: () => {} });

const ThemeContextProvider: React.FC = ({ children }) => {
	const [mode, setMode] = useState<PaletteMode>('dark');
	const colorMode = useMemo(() => ({
		toggleThemeMode: () => {
			setMode(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
		},
	}), []);

	const theme = useMemo(() => createTheme({
		palette: {
			mode,
		},
	}), [mode]);

	return (
		<ThemeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

const useThemeToggle = () => useContext(ThemeContext);

export { useThemeToggle, ThemeContextProvider };