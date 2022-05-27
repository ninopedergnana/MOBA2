export default function BottomBar({ color, resetGame }) {
    return (
        <div style={ styles.bottomBar }>
            <p>Current turn: { color }</p>
            <button onClick={ resetGame }>Reset</button>
        </div>
    )
}

const styles = {
    bottomBar: {
        width: '70vh',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}