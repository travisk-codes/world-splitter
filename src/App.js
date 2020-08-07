import React, { useState } from 'react'
import './App.css'

function App() {
	const [randomNumber, setRandomNumber] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const fetchRandomNumber = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(
				`https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8`,
			)
			const json = await response.json()
			if (json.data[0] < 128) {
				setRandomNumber(0)
			} else {
				setRandomNumber(1)
			}
			setIsLoading(false)
		} catch (e) {
			console.error(e.name, e.message)
		}
	}

	return (
		<div className='App'>
			<h1>World Splitter</h1>
			<label>
				WORLD A<input />
			</label>
			<label>
				WORLD B<input />
			</label>
			{isLoading ? 'Loading...' : ''}
			{randomNumber}
			<button onClick={fetchRandomNumber}>SPLIT</button>
		</div>
	)
}

export default App
