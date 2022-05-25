//
//  ContentView.swift
//  json
//
//  Created by Nino Pedergnana on 06.05.22.
//

import SwiftUI

struct Itunes : Decodable {
    var results : [ItunesEntry]
}

struct ItunesEntry : Decodable, Identifiable {
    var artistName : String
    var collectionName: String
    var artworkUrl60: String
    var collectionId: Int
    
    var id : Int {
        get {
            return collectionId
        }
    }

    
}

extension String {
    var urlEncoded: String? {
        let allowedCharacterSet = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "~-_."))
        return self.addingPercentEncoding(withAllowedCharacters: allowedCharacterSet)
    }
}

struct ContentView: View {

    @State var data : [ItunesEntry] = [ItunesEntry]()
    @State var searchString = ""
    
    
    var body: some View { //data is accepted because
        NavigationView {
            VStack {
                TextField("Artist"
                          , text: $searchString, onEditingChanged: {t in},
                onCommit: {
                    Task {
                        await data = loadJSON()
                    }
                })
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding().accessibility(hint: Text("Search..."))
                List(data) {
                    entry in
                    NavigationLink(destination: DetailView(collectionID: entry.collectionId)){
                        HStack{
                            VStack(alignment: .leading) {
                                Text(entry.collectionName).font(.custom("collection", size: 18.0))
                                Spacer()
                                Text(entry.artistName).font(.custom("artist", size: 13.0))
                            }
                            Spacer()
                            AsyncImage(url: URL(string: entry.artworkUrl60))
                        }
                    }
                }.onAppear(perform: {
                    Task {
                        await data = loadJSON()
                    }
                    
                }).refreshable {
                    Task {
                        await data = loadJSON()
                        print("refresh called")
                    }
                  }
            }
        }
        
        
    }
    
    func download() async throws -> Data {
        let url = URL(string: "https://itunes.apple.com/search?term=\(searchString.urlEncoded ?? "")&entity=album")
        let urlRequest = URLRequest(url: url!)
        let (data, _) = try await URLSession.shared.data(for: urlRequest) // _ is the response.
        //optional: check response
        return data
    }
    
    func loadJSON() async -> [ItunesEntry] {
        do {
        // previous lab with json
        //read the file. Note that you can also use a url later
        // let file = Bundle.main.url(forResource: "itunes_json",
        //   withExtension: "json")
            
        //create a data instance
        let data = try await download()
        let decoder = JSONDecoder()
        //and decode it to Entry
        let itunes = try decoder.decode(Itunes.self, from: data)
            return itunes.results

    } catch {
        fatalError("Couldn't load file from main bundle:\n\(error)")
    }
    }
    
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}



