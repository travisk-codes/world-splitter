import React, { useState } from 'react'
import './App.css'

function App() {
	const [isSplashVisible, setIsSplashVisible] = useState(true)
	const [randomBoolean, setrandomBoolean] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [result, setResult] = useState('')
	const [delay, setDelay] = useState(0)
	const [inputA, setInputA] = useState('')
	const [inputB, setInputB] = useState('')

	const fetchrandomBoolean = async () => {
		setIsLoading(true)
		let startTime = Date.now()
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
			setDelay(Date.now() - startTime)
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
			if (inputA) {
				setResult(inputA)
			} else {
				setResult('Not ' + inputB)
			}
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
				<div id='quote-by'>― Stanford Encyclopedia of Philosophy</div>
				<div>
					This app will contact a quantum random number generator located at The
					Australian National University in Canberra, splitting the universe
					(and yourself) into two versions. Which world will you end up in?
				</div>
				<div>
					Unlike all other interpretations of quantum mechanics, the
					now-mainstream Many-Worlds or "Everettian" interpretation doesn't
					require adding non-physical phenomena to the world. It is only what
					the math describing the universe tells us.
				</div>
			</div>
		)
	}

	const renderInputs = () => {
		if (isSplashVisible) return
		return (
			<>
				<label>
					<div className='earth'>
						<img src='earth.svg' alt='World A' />
						<div>A</div>
					</div>
					<input
						placeholder={
							inputB ? 'Not ' + inputB : 'World where I do the dishes'
						}
						value={inputA}
						onChange={(e) => setInputA(e.target.value)}
					/>
				</label>
				<label>
					<div className='earth'>
						<img src='earth.svg' alt='World B' />
						<div>B</div>
					</div>
					<input
						placeholder={inputA ? 'Not ' + inputA : "World where I don't"}
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
			return <button onClick={resetInputs}>SPLIT AGAIN</button>
		}
		if (isSplashVisible) {
			return <button onClick={() => setIsSplashVisible(false)}>BEGIN</button>
		}
		return (
			<button
				disabled={inputA || inputB ? false : true}
				onClick={fetchrandomBoolean}
			>
				SPLIT
			</button>
		)
	}

	const renderResult = () => {
		if (!result) return
		return (
			<div id='result'>
				{isLoading ? (
					'Splitting the Universe...'
				) : (
					<div>
						The world branched in two ~{delay} milliseconds ago. If you {result}
						, there will literally be a version of you that doesn't.
					</div>
				)}
			</div>
		)
	}

	return (
		<div className='app'>
			<h1>Universe Splitter</h1>
			{renderSplashPage()}
			{renderInputs()}
			{renderButton()}
			{renderResult()}
			<div id='background' />
		</div>
	)
}

export default App
