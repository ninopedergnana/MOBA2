//
//  main.swift
//  Game Of Life
//
//  Created by Nino Pedergnana on 29.04.22.
//

import Foundation

var width = 60
var height = 20

var board: [[String]] = Array(repeating: Array(repeating: "_", count: width), count: height)

func printBoard() {
  for row in board {
    for element in row {
      print(element, terminator: "")
    }
    print()
  }
}

func clone() -> [[String]] {
  var newBoard: [[String]] = Array(repeating: Array(repeating: "_", count: width), count: height)
  for i in 0..<height {
    for j in 0..<width {
    newBoard[i][j] = board[i][j]
    }
  }
  return newBoard
}

func initBoard() {
  for i in 0..<height {
    for j in 0..<width {
      let randomValue = Int.random(in: 0...5)
      if randomValue == 1 {
        board[i][j] = "0"
      }
    }
  }
}

func fetchNeighbours(i: Int, j: Int) -> Int {
  var amount = 0

  for x in i - 1...i + 1 {
    for y in j - 1...j + 1 {
      if y < width && x >= 0 && y >= 0
      && x < height
      && (x != i || y != j) {
        if board[x][y] == "0" {
          amount += 1
        }
      }
    }
  }

  return amount
}

func createNextGeneration (){
    var newBoard = clone()
    
    for i in 0..<height {
      for j in 0..<width {
          let neighbourCount = fetchNeighbours(i: i, j: j)
          if (newBoard[i][j] == "0") {
              if (neighbourCount <= 3 && neighbourCount >= 2) {
                  newBoard[i][j] = "0"
              } else {
                  newBoard[i][j] = "_"
              }
          }
          else {
              if (neighbourCount == 3) {
                  newBoard[i][j] = "0"
              } else {
                  newBoard[i][j] = "_"
              }
          }
      }
    }
    board = newBoard
}

initBoard()

while true {
  printBoard()
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
  createNextGeneration()
    Thread.sleep(forTimeInterval: 2)
}
