import React, { useState } from 'react'
import './App.css'

function App() {
	const [randomNumber, setRandomNumber] = useState(0)

	const fetchRandomNumber = async () => {
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
			{randomNumber}
			<button onClick={fetchRandomNumber}>SPLIT</button>
		</div>
	)
}

export default App
