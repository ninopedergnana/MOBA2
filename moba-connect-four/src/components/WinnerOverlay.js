export default function WinnerOverlay({ color, resetGame }) {
    return (
        <div style={ styles.overlay }>
            Player { color } won the game!
            <button onClick={ resetGame }>Play Again</button>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        backgroundColor: '#ffffffde',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 62,
    },
}