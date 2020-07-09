import React from 'react';

class Square extends React.Component {
  render() {
    var classes = 'square';
    if (this.props.value === 'red') {
      classes += ' red';
    } else if (this.props.value === 'yellow') {
      classes += ' yellow'
    }
    return (
      <td className={classes} onClick={(e) => {
        e.preventDefault();
        this.props.handleClick(this.props.colIndex)
      }}></td>
    )
  }
}

export default Square;