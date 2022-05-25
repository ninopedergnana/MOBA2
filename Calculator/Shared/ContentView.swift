//
//  ContentView.swift
//  Shared
//
//  Created by Nino Pedergnana on 29.04.22.
//

import SwiftUI

enum Operation {
    case addition
    case subtraction
    case division
    case multiplication
}

struct ContentView: View {
    @State var first: String = ""
    @State var second: String = ""
    @State var op: Operation = .addition
    @State var result: Int = 0
    
    func evaluate(first: Int, second: Int, op: Operation) -> Int {
      switch op {
        case .addition:
          return first + second
        case .subtraction:
          return first - second
        case .division:
          if(second == 0) { return 0}
          return first / second
        case .multiplication:
          return first * second
      }
    }
    
    var body: some View {
        VStack {
            TextField("Phone Number", text: $first, onEditingChanged: {t in}, onCommit: {})
        .textFieldStyle(RoundedBorderTextFieldStyle()).padding()
        .keyboardType(UIKeyboardType.decimalPad)
          HStack {
            Button("+") {op = .addition}
            Button("-") {op = .subtraction}
            Button("/") {op = .division}
            Button("*") {op = .multiplication}
          }
          TextField("Phone Number", text: $second, onEditingChanged: {t in}, onCommit: {})
        .textFieldStyle(RoundedBorderTextFieldStyle()).padding()
        .keyboardType(UIKeyboardType.decimalPad)
          
            Button("Evaluate") {self.result = evaluate(first: Int(first)!, second: Int(second)!, op: op)}
            Text("result: \(result)")
        }
    }
}

