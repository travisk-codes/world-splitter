import React from 'react'
import './App.css'

function App() {
	React.useEffect(() => {
		const fetchRandomNumber = async () => {
			try {
				const response = await fetch(
					`https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8`,
				)
				const json = await response.json()
				console.log(json.data[0])
			} catch (e) {
				console.error(e.name, e.message)
			}
		}
		fetchRandomNumber()
	})
	return (
		<div className='App'>
			<h1>World Splitter</h1>
			<label>
				WORLD A<input />
			</label>
			<label>
				WORLD B<input />
			</label>
			<button>SPLIT</button>
		</div>
	)
}

export default App
