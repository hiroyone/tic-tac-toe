import React from 'react';
import PropTypes from 'prop-types';

// Helper function to render Square box
function Square(props) {
    const className = props.winPos ? "square highlight" : "square"
    return (
        <button
            className={className}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    // Highlight the winning squares
    highlight(i) {
        return (
            this.props.winPositions.includes(i) ? true : false
        )
    }

    // Render Square box
    renderSquare(i) {
        return (<Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            key={i}
            winPos={this.highlight(i)}
        />);
    }

    render() {
        // Compose matrix based on col and row
        let divs = [];
        const col = 3, row = 3
        // Outer loop to create parent
        for (let i = 0; i < col; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < row; j++) {
                children.push(this.renderSquare((i * col) + j))
            }
            //Create the parent and add the children
            divs.push(<div className="board-row" key={i}>{children}</div>)
        }

        return (
            <div>
            {divs}
            </div>
        )
    }
}

// Proptype checking
Board.propTypes = {
    squares: PropTypes.array,
    onClick: PropTypes.func,
    winPositions: PropTypes.array,
}

export default Board;