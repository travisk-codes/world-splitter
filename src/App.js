import React, { useState } from 'react'
import './App.css'

function App() {
	const [randomBoolean, setrandomBoolean] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [inputA, setInputA] = useState('')
	const [inputB, setInputB] = useState('')

	const fetchrandomBoolean = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(
				`https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8`,
			)
			const json = await response.json()
			if (json.data[0] < 128) {
				setrandomBoolean(0)
			} else {
				setrandomBoolean(1)
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
				WORLD A
				<input value={inputA} onChange={(e) => setInputA(e.target.value)} />
			</label>
			<label>
				WORLD B
				<input
					placeholder={inputA ? 'Not ' + inputA : ''}
					value={inputB}
					onChange={(e) => setInputB(e.target.value)}
				/>
			</label>
			{isLoading ? 'Loading...' : ''}
			{randomBoolean ? inputA : inputB ? inputB : 'Not ' + inputA}
			<button onClick={fetchrandomBoolean}>SPLIT</button>
		</div>
	)
}

export default App
