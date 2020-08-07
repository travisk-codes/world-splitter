import React, { useState } from 'react'
import './App.css'

function App() {
	const [randomBoolean, setrandomBoolean] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [result, setResult] = useState('')
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
			getResult()
		} catch (e) {
			console.error(e.name, e.message)
		}
	}

	const getResult = () => {
		if (!inputA && !inputB) {
			setResult('')
			return
		}
		if (randomBoolean) {
			setResult(inputA)
		} else {
			if (inputB) {
				setResult(inputB)
			} else {
				setResult('Not ' + inputA)
			}
		}
	}

	const renderInputs = () => {
		if (result) return
		if (isLoading) return
		return (
			<>
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
			</>
		)
	}

	const renderButton = () => {
		if (isLoading) return
		if (result) {
			return <button onClick={() => setResult('')}>SPLIT AGAIN</button>
		}
		return <button onClick={fetchrandomBoolean}>SPLIT</button>
	}

	return (
		<div className='App'>
			<h1>World Splitter</h1>
			{renderInputs()}
			{isLoading ? 'Splitting the Universe...' : result}
			{renderButton()}
		</div>
	)
}

export default App
