import React from 'react';
import PropTypes from 'prop-types';

class MoveHistory extends React.Component {
    render() {
        const history = this.props.history;
        const stepNumber = this.props.stepNumber;
        const descending = this.props.descending;

        const moves = history.map((step, move) => {
            // Culculate the position of each move as (col,row)
            const col = 3
            const y = Math.floor(step['position'] / col) + 1, x = (step['position'] % col) + 1;

            const desc = move ?
                'Go to move #' + move + ' ( ' + y + ', ' + x + ' )' :
                'Go to game start';
            const fontWeight = move === stepNumber ? { fontWeight: 'bold' } : { fontWeight: 'normal' };

            return (
                <li key={move}>
                    <button onClick={() => this.props.jumpTo(move)} style={fontWeight}>{desc}</button>
                </li>
            )
        }
        )

        let orderedMoves;
        // Change the order of the moves
        if (descending) {
            orderedMoves = <ol reversed>{moves.reverse()}</ol>
        } else {
            orderedMoves = <ol>{moves}</ol>
        }

        return (
            <div>
                {orderedMoves}
            </div>
        )
    }
}


// Proptype checking
MoveHistory.propTypes = {
    history: PropTypes.array,
    stepNumber: PropTypes.number,
    descending: PropTypes.bool,
    jumpTo: PropTypes.func,
}

export default MoveHistory;