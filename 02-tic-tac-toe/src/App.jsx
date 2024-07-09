import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

// esto es un componente-> factoría de elementos
const Square = ({children, isSelected, updateBoard, index}) => {
  const className=`square ${isSelected ? "is-selected":""}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const Winner = ({winner,refreshPage}) => {
    let text = "DRAW"
    if(!winner) return 
    else if(winner==TURNS.O || winner==TURNS.X) text = "The winner is " + winner

    return(
      <section className="winner">
        <section className="text">
          {text}
          <button onClick={refreshPage}>
            New game
          </button>
        </section>
      </section>
    )
}

function App() {
  const [board,setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(false) // false es no hay winner, true es empate

  const WINNER_MOVES = [
    [0,3,6], [1,4,7],[2,5,8],
    [0,1,2],[3,4,5],[6,7,8],
    [0,4,8],[2,4,6]
  ]

  const updateBoard = (index) => {
    if(board[index]) return

    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    !newBoard.includes(null)? 
    setWinner(true): 
    WINNER_MOVES.forEach(([a,b,c]) => {
      const theresWinner = newBoard[a] && newBoard[a]==newBoard[b] && newBoard[a]==newBoard[c]
      if (theresWinner) {
        setWinner(turn)
      }
    })

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map((_,index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {board[index]}
                </Square>
              )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <Winner winner={winner} refreshPage={refreshPage}/>
    </main>
  )
}

export default App
