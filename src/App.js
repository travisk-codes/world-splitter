import React, { useState } from 'react'
import './App.css'

function formatOutput(anInput, aMap){
	return anInput.split(" ").map(s => {
		return (s in aMap) ? aMap[s] : s
	}).join(" ");
}

function App() {
	const splashState = localStorage.getItem('should-show-splash-page-first')
		? false
		: true
	const [isSplashVisible, setIsSplashVisible] = useState(splashState)
	const [isAboutVisible, setIsAboutVisible] = useState(false)
	const [options, setOptions] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [delay, setDelay] = useState(0)
	const [inputA, setInputA] = useState('')
	const [inputB, setInputB] = useState('')

	//you  can add more to these as you find strange edge cases
	const selfReplyMap = {
		my:"your",
		your:"their"
	}

	const copyReplyMap = {
		my:"their",
		your:"their"
	}

	const fetchrandomBoolean = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		let startTime = Date.now()
		try {
			const response = await fetch(
				`https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8`,
			)
			const json = await response.json()
			setIsLoading(false)
			if (json.data[0] < 128) {
				setOptions({
					self: inputA.length ? inputA : 'not ' + inputB,
					copy: inputB.length ? inputB : 'not ' + inputA,
				})
			} else {
				setOptions({
					self: inputB.length ? inputB : 'not ' + inputA,
					copy: inputA.length ? inputA : 'not ' + inputB,
				})
			}
			setDelay(Date.now() - startTime)
		} catch (e) {
			console.error(e.name, e.message)
		}
	}

	const renderSplashPage = () => {
		if (!isSplashVisible) return
		return (
			<div id='splash'>
				<blockquote id='quote'>
					"The{' '}
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://en.wikipedia.org/wiki/Many-worlds_interpretation'
					>
						Many-Worlds Interpretation
					</a>{' '}
					of quantum mechanics holds that there are many worlds which exist in
					parallel at the same space and time as our own. The existence of the
					other worlds makes it possible to remove randomness and action at a
					distance from quantum theory and thus from all physics."
				</blockquote>
				<div id='quote-by'>
					―{' '}
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://plato.stanford.edu/entries/qm-manyworlds/'
					>
						Stanford Encyclopedia of Philosophy
					</a>
				</div>
				<div>
					This app will contact a{' '}
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://qrng.anu.edu.au/'
					>
						quantum random number generator
					</a>{' '}
					located at{' '}
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.anu.edu.au/'
					>
						The Australian National University in Canberra
					</a>
					, splitting the universe (and yourself) into two versions. If you
					promise to do the resulting action no matter the outcome a real,
					literal, physical version of you will do the other. Which world will
					you end up in?
				</div>
				<div>
					Unlike all other interpretations of quantum mechanics, the{' '}
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://en.wikipedia.org/wiki/Many-worlds_interpretation#Polls'
					>
						now-mainstream
					</a>{' '}
					Many-Worlds or "Everettian" interpretation doesn't require adding
					non-physical phenomena to the world. It is only what the math
					describing the universe tells us.
				</div>
				<div id='splash-button'>
					<button
						onClick={() => {
							localStorage.setItem('should-show-splash-page-first', true)
							setIsSplashVisible(false)
						}}
					>
						CONTINUE
					</button>
				</div>
			</div>
		)
	}

	const renderAboutPage = () => {
		if (!isAboutVisible) return
		return (
			<div id='splash'>
				World Splitter is made by Travis Kohlbeck. You can donate to their{' '}
				<a href='https://www.patreon.com/travisk_creates'>Patreon</a> or if you
				are looking to hire, check out their{' '}
				<a href='https://hire.travisk.info'>portfolio</a>. The source code can
				be found on{' '}
				<a href='https://github.com/travisk-codes/world-splitter'>GitHub</a>.
				Thanks for visiting! ❤️
				<div id='splash-button'>
					<button
						onClick={() => {
							setIsAboutVisible(false)
						}}
					>
						BACK
					</button>
				</div>
			</div>
		)
	}

	const renderInputs = () => {
		if (isSplashVisible || isAboutVisible) return null
		return (
			<form onSubmit={fetchrandomBoolean}>
				<label>
					<div className='earth'>
						<svg viewBox='0 0 156 156'>
							<circle cx='78' cy='78' r='78' fill='#235c96' />
							<path
								d='m8 78c0 15.6 5 29.8 13.6 41.4l-3.2-22.2zm15-43.4 9.2-2.2c7.8-11.4 18.8-17.4 28.8-19.2l-15.8 11 15.6-3.8 11.2-6.2-3.2-5.6c-18.4 2.4-34.8 12-45.8 26zm10.2 43.2 6.6 13.2 19.6 1.8 10.6 40h13l14.8-18-0.8-11.2c6.4-5 11.4-11.2 13.4-19.2l-10 2.4-13-20.4 3-2 12.8 18 12.6-11c-6.6-0.8-11-4-12.8-9.6l22.8 3.6 8.2 16.8 3.6-22.4 10.2 12c-2.6-29.6-23.8-54-51.8-61.4 0 6.8-3.8 12.4-9.2 15.6l-7.2-4.2-13.8 8 4.8 4.6 7.4-8.8-1.4 10.8c-9 0-13.4 1.4-19 4.4l-1.2 5.6-6.2-1.4-2.6 7 5.4 1.6c3-3.8 5.4-6.2 11.2-7.6l6 6.6-3.6 1.2 2.2 1.8 3.2-3.8-4.6-6.4c4.6 0 7.2 2.8 8.8 9.8l8.2-12 10 4.2-1 2.6-11.8 1v4.4l9 0.6-2.8 7.2c-16.4 0-21.2-0.4-24.6-7.8l-13.6-0.8c-10 6-15 13.8-16.4 23.2zm19.4-41.4 8 2v-8zm44.4 7.8 4-2.2 5.4 11.2-3.6 0.8zm2.2 79.8 3.6 1.4 6-13.8-7.6 4.8z'
								fill='#94ba32'
							/>
							<text
								x='50%'
								y='55%'
								dominant-baseline='middle'
								text-anchor='middle'
								style={{
									fill: 'white',
									fontSize: 120,
									fontWeight: 'bold',
								}}
							>
								A
							</text>
						</svg>
					</div>
					<input
						placeholder={inputB ? 'not ' + inputB : 'do the dishes'}
						value={inputA}
						onChange={(e) => setInputA(e.target.value)}
					/>
				</label>
				<label>
					<div className='earth'>
						<svg viewBox='0 0 156 156' width='100%' height='100%'>
							<circle cx='78' cy='78' r='78' fill='#235c96' />
							<path
								d='m8 78c0 15.6 5 29.8 13.6 41.4l-3.2-22.2zm15-43.4 9.2-2.2c7.8-11.4 18.8-17.4 28.8-19.2l-15.8 11 15.6-3.8 11.2-6.2-3.2-5.6c-18.4 2.4-34.8 12-45.8 26zm10.2 43.2 6.6 13.2 19.6 1.8 10.6 40h13l14.8-18-0.8-11.2c6.4-5 11.4-11.2 13.4-19.2l-10 2.4-13-20.4 3-2 12.8 18 12.6-11c-6.6-0.8-11-4-12.8-9.6l22.8 3.6 8.2 16.8 3.6-22.4 10.2 12c-2.6-29.6-23.8-54-51.8-61.4 0 6.8-3.8 12.4-9.2 15.6l-7.2-4.2-13.8 8 4.8 4.6 7.4-8.8-1.4 10.8c-9 0-13.4 1.4-19 4.4l-1.2 5.6-6.2-1.4-2.6 7 5.4 1.6c3-3.8 5.4-6.2 11.2-7.6l6 6.6-3.6 1.2 2.2 1.8 3.2-3.8-4.6-6.4c4.6 0 7.2 2.8 8.8 9.8l8.2-12 10 4.2-1 2.6-11.8 1v4.4l9 0.6-2.8 7.2c-16.4 0-21.2-0.4-24.6-7.8l-13.6-0.8c-10 6-15 13.8-16.4 23.2zm19.4-41.4 8 2v-8zm44.4 7.8 4-2.2 5.4 11.2-3.6 0.8zm2.2 79.8 3.6 1.4 6-13.8-7.6 4.8z'
								fill='#94ba32'
							/>
							<text
								x='50%'
								y='55%'
								dominant-baseline='middle'
								text-anchor='middle'
								style={{
									fill: 'white',
									fontSize: 120,
									fontWeight: 'bold',
								}}
							>
								B
							</text>
						</svg>{' '}
					</div>
					<input
						placeholder={inputA ? 'not ' + inputA : 'play videogames'}
						value={inputB}
						onChange={(e) => setInputB(e.target.value)}
					/>
				</label>
				<button
					disabled={inputA || inputB ? false : true}
					onClick={fetchrandomBoolean}
				>
					SPLIT
				</button>
			</form>
		)
	}

	const renderResult = () => {
		if (isSplashVisible) return
		if (isLoading)
			return (
				<div id='result'>
					<h2 id=''>{'Splitting The Universe...'}</h2>
				</div>
			)
		if (!options.self) return
		return (
			<div id='result'>
				<h2>You should {formatOutput(options.self, selfReplyMap)}</h2>
				The world branched in two approximately{' '}
				{Math.round(delay / 2 / 100) / 10} seconds ago. <br />A version of you
				has just been informed that they should {formatOutput(options.copy, copyReplyMap)}.
			</div>
		)
	}

	return (
		<div className='app'>
			<h1>Universe Splitter</h1>
			{renderSplashPage()}
			{renderAboutPage()}
			{renderInputs()}
			{renderResult()}

			{isSplashVisible || isAboutVisible ? null : (
				<div id='buttons'>
					<button id='explanation' onClick={() => setIsSplashVisible(true)}>
						EXPLANATION
					</button>

					<button id='about' onClick={() => setIsAboutVisible(true)}>
						ABOUT
					</button>
				</div>
			)}

			<div id='background' />
		</div>
	)
}

export default App
