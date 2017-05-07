//
//  ViewController.swift
//  http+json
//
//  Created by Adriano Paladini on 08/09/16.
//  Copyright © 2016 Adriano Paladini. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    
    let myUrl = "http://www.learnswiftonline.com/Samples/subway.json"
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //httpSimpleGet(url: myUrl)
        
        let r = JSON.fromURL(myUrl)
        
        print( r["stations"][0]["stationName"] )
        
        
    }


    
    func httpGet(url: String) {
        let requestURL = URL(string: url)!
        
        let urlRequest: NSMutableURLRequest = NSMutableURLRequest(url: requestURL)
        let session = URLSession.shared
        let task = session.dataTask(with: urlRequest as URLRequest) {
            (data, response, error) -> Void in
            
            let httpResponse = response as! HTTPURLResponse
            let statusCode = httpResponse.statusCode
            if (statusCode == 200) {
                do{
                    
                    let json = try JSONSerialization.jsonObject(with: data!, options: .allowFragments ) as AnyObject
                    
                    print( json["stations"] )
                    
                }catch {
                    print("Error")
                }
            }
        }
        task.resume()
    
    }

    
    
    
    
    func httpSimpleGet(url: String) {
        let requestURL = URL(string: url)!
        
        let data = NSData(contentsOf: requestURL) as! Data
        
        do{
            
            let json = try JSONSerialization.jsonObject(with: data, options: .allowFragments ) as AnyObject
            
            if let stations = json["stations"] as? [[String: AnyObject]] {
            
                if let station: AnyObject = stations[0] as AnyObject {
            
                    print( station["stationName"] )
                    
                }
            
            }
                
        }catch {
            print("Error")
        }
        
        
    }

    
    
    
    
}

