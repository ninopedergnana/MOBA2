import Row from './Row'


export default function Board({ board, makeTurn }) {
    return (
        <table style={ styles.table }>
            <tbody>
            { board.map((row, rowId) => (
                <Row key={ rowId } row={ row } makeTurn={ makeTurn }/>
            )) }
            </tbody>
        </table>
    )
}

const styles = {
    table: {
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
    },
}