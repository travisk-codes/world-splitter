import React, { useState } from 'react'
import './App.css'

function App() {
	const [isSplashVisible, setIsSplashVisible] = useState(true)
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

	const resetInputs = () => {
		setResult('')
		setInputA('')
		setInputB('')
	}

	const renderSplashPage = () => {
		if (!isSplashVisible) return
		return (
			<div id='splash'>
				<blockquote id='quote'>
					"The Many-Worlds Interpretation of quantum mechanics holds that there
					are many worlds which exist in parallel at the same space and time as
					our own. The existence of the other worlds makes it possible to remove
					randomness and action at a distance from quantum theory and thus from
					all physics."
				</blockquote>
				<div id='quote-by'>-- Stanford Encyclopedia of Philosophy</div>
				<div>
					This app will contact a quantum random number generator located at The
					Australian National University in Canberra, splitting the universe
					(and yourself) into two versions. Which universe will you end up in?
				</div>
			</div>
		)
	}

	const renderInputs = () => {
		if (result) return
		if (isLoading) return
		if (isSplashVisible) return
		return (
			<>
				<label>
					<input
						placeholder='Do the dishes'
						value={inputA}
						onChange={(e) => setInputA(e.target.value)}
					/>
					Universe A
				</label>
				<label>
					<input
						placeholder={inputA ? 'Not ' + inputA : 'Play videogames'}
						value={inputB}
						onChange={(e) => setInputB(e.target.value)}
					/>
					Universe B
				</label>
			</>
		)
	}

	const renderButton = () => {
		if (isLoading) return
		if (result) {
			return <button onClick={resetInputs}>SPLIT AGAIN</button>
		}
		if (isSplashVisible) {
			return <button onClick={() => setIsSplashVisible(false)}>BEGIN</button>
		}
		return (
			<button disabled={inputA ? false : true} onClick={fetchrandomBoolean}>
				SPLIT
			</button>
		)
	}

	return (
		<div className='app'>
			<h1>Universe Splitter</h1>
			{renderSplashPage()}
			{renderInputs()}
			{isLoading ? 'Splitting the Universe...' : result}
			{renderButton()}
		</div>
	)
}

export default App
