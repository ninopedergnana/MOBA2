export default function Row({ row, makeTurn }) {
    return (
        <tr>
            { row.map((cell, cellId) => (
                <td key={ cellId } style={ styles.td } className={ cell }
                    onClick={ () => makeTurn(cellId) }/>
            )) }
        </tr>
    )
}

const styles = {
    td: {
        height: '10vh',
        width: '10vh',
        padding: 2,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'black',
    },
}