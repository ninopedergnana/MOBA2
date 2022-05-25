//
//  DetailView.swift
//  json
//
//  Created by Nino Pedergnana on 20.05.22.
//

import SwiftUI

struct DetailView: View {
    
    @State var collectionData : CollectionData?
    @State var songs : [CollectionData] = [CollectionData]()
    var collectionID: Int
    
    var body: some View {
        VStack{
            if(collectionData == nil) {
                ProgressView()
            } else {
                VStack{
                    Text(collectionData!.collectionName)
                    Text(collectionData!.releaseDate!)
                    Spacer()
                    AsyncImage(url: URL(string: collectionData!.artworkUrl60))
                    Spacer()
                    List(songs) {entry in
                        HStack(alignment: .center){
                            Text("\(entry.trackNumber!)")
                            Text(entry.trackName!)
                            Spacer()
                            Text("\(entry.trackTimeMillis! / 1000 / 60)")
                            }
                        }
                    }
                }
            
            
            
        }.onAppear(perform: {
            Task {
                await loadCollection()
            }
            
        }).refreshable {
            Task {
                await loadCollection()
                print("refresh called")
            }
        }
    }
    
    func loadCollection() async {
        let songies = await loadJSON(collectionID: collectionID)
        collectionData = songies.filter({return $0.wrapperType == "collection"}).first
        songs = songies.filter({return $0.wrapperType == "track"})
        print(songs)
    }
}
    
    struct Collection : Decodable {
        var results : [CollectionData]
    }

    struct CollectionData : Decodable, Identifiable {
        var wrapperType: String
        var collectionName : String
        var releaseDate: String?
        var artworkUrl60: String
        var trackName: String?
        var trackNumber: Int?
        var trackTimeMillis: Int?
        var trackId: Int? = 1
        
        var id : Int {
            get {
                return trackId!
                
            }
        }
    }

        
    
    
func download(collectionID: Int) async throws -> Data {
        let url = URL(string: "https://itunes.apple.com/lookup?id=\(collectionID)&entity=song")
        let urlRequest = URLRequest(url: url!)
        let (data, _) = try await URLSession.shared.data(for: urlRequest) // _ is the response.
        //optional: check response
        return data
    }
    
func loadJSON(collectionID: Int) async -> [CollectionData] {
        do {
        //create a data instance
        let data = try await download(collectionID: collectionID)
        let decoder = JSONDecoder()
        //and decode it to Entry
        let collections = try decoder.decode(Collection.self, from: data)
            return collections.results

        } catch {
            fatalError("Couldn't load file from main bundle:\n\(error)")
        }
    }

