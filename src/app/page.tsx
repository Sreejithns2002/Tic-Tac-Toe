'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"

type Player = 'X' | 'O' | null

function calculateWinner(squares: Player[]): Player {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Square({ value, onSquareClick }: { value: Player; onSquareClick: () => void }) {
  return (
    <Button 
      className="w-20 h-20 text-4xl font-bold"
      onClick={onSquareClick}
    >
      {value}
    </Button>
  )
}

export default function Home() {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(squares)
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  function resetGame() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      <div className="mb-4 text-xl font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <Button onClick={resetGame} className="mt-4">
        Reset Game
      </Button>
    </div>
  )
}