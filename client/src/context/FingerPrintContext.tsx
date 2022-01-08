import React, { createContext, useState, useEffect, useContext } from 'react';
import FingerPrintJS from '@fingerprintjs/fingerprintjs';

type State = {
	fingerPrintId: string
}

const FingerPrintContext = createContext({} as State);

const FingerPrintContextProvider: React.FC = ({ children }) => {
	const [id, setId] = useState('');

	useEffect(() => {
		const fpPromise = FingerPrintJS.load();
		
		fpPromise
			.then(fp => fp.get())
			.then(result => setId(result.visitorId));
	}, []);

	return (
		<FingerPrintContext.Provider value={{ fingerPrintId: id }}>
			{children}
		</FingerPrintContext.Provider>
	)
}

const useFingerPrintId = () => useContext(FingerPrintContext);

export { useFingerPrintId, FingerPrintContextProvider };