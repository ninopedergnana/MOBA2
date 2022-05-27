import { useEffect, useState } from 'react'
import Board from './components/Board'
import BottomBar from './components/BottonBar'
import './App.css'
import WinnerOverlay from './components/WinnerOverlay'


function App() {
    const [board, setBoard] = useState([])
    const [color, setColor] = useState('red')
    const [winner, setWinner] = useState(undefined)

    useEffect(() => {
        resetGame()
    }, [])

    function resetGame() {
        const temp = []
        for (let i = 0; i < 6; i++) {
            const row = []
            for (let j = 0; j < 7; j++) {
                row.push(undefined)
            }
            temp.push(row)
        }
        setBoard(temp)
        setColor('red')
        setWinner(undefined)
    }

    function checkWinner() {
        return Math.random() > 0.9
    }

    const toggleColor = () => color === 'red' ? setColor('blue') : setColor('red')

    function makeTurn(col) {
        if (board[0][col]) return
        let row = 1
        while (row < 6 && !board[row][col]) row++
        board[row - 1][col] = color
        setBoard([...board])
        if (checkWinner()) setWinner(color)
        else toggleColor()
    }

    return (
        <div className="App" style={ styles.center }>
            <Board board={ board } makeTurn={ makeTurn }/>
            <BottomBar color={ color } resetGame={ resetGame }/>
            { winner &&
            <WinnerOverlay color={ color } resetGame={ resetGame }/>
            }
        </div>
    )
}

export default App

const styles = {
    center: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

