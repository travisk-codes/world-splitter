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

	const fetchrandomBoolean = async (e) => {
		e.preventDefault()
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
				setResult('not ' + inputB)
			}
		} else {
			if (inputB) {
				setResult(inputB)
			} else {
				setResult('not ' + inputA)
			}
		}
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
				<div id='splash-button'>
					<button onClick={() => setIsSplashVisible(false)}>CONTINUE</button>
				</div>
			</div>
		)
	}

	const renderInputs = () => {
		if (isSplashVisible) return
		return (
			<form onSubmit={fetchrandomBoolean}>
				<label>
					<div className='earth'>
						<img src='world-splitter/earth.svg' alt='World A' />
						<div>A</div>
					</div>
					<input
						placeholder={inputB ? 'not ' + inputB : 'do the dishes'}
						value={inputA}
						onChange={(e) => setInputA(e.target.value)}
					/>
				</label>
				<label>
					<div className='earth'>
						<img src='world-splitter/earth.svg' alt='World B' />
						<div>B</div>
					</div>
					<input
						placeholder={inputA ? 'not ' + inputA : 'play videogames'}
						value={inputB}
						onChange={(e) => setInputB(e.target.value)}
					/>
				</label>
				{renderButton()}
				<button id='about' onClick={() => setIsSplashVisible(true)}>
					ABOUT
				</button>
			</form>
		)
	}

	const renderButton = () => {
		if (isLoading) return
		if (result) {
			return <button onClick={fetchrandomBoolean}>SPLIT AGAIN</button>
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
		if (isSplashVisible) return
		if (isLoading) return <div id='loading'>{'Splitting the Universe...'}</div>
		if (!result) return
		return (
			<div id='result'>
				<div>
					<h2>{result}</h2>
					The world branched in two approximately{' '}
					{Math.round(delay / 2 / 100) / 10} seconds ago. If you promised to do
					the resulting action, a real, literal, physical version of you will do
					the other.
				</div>
			</div>
		)
	}

	return (
		<div className='app'>
			<h1>Universe Splitter</h1>
			{renderSplashPage()}
			{renderInputs()}
			{renderResult()}
			<div id='background' />
		</div>
	)
}

export default App
