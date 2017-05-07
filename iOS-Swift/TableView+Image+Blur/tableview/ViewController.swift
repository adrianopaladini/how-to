//
//  ViewController.swift
//  tableview
//
//  Created by Adriano Paladini on 05/09/16.
//  Copyright © 2016 Adriano Paladini. All rights reserved.
//

import UIKit

class TableViewController: UITableViewController {
    
    var imageArray = ["01","02","03","04","05"]
    var textArray = ["Teste 1", "Teste 2", "Teste 3", "Teste 4", "Teste 5"]
    
    

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return textArray.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell") as UITableViewCell!
        
        let text = cell?.viewWithTag(2) as! UILabel
        let imageView = cell?.viewWithTag(1) as! UIImageView
        
        imageView.image = UIImage(named: imageArray[indexPath.row])
        
        text.text = textArray[indexPath.row]
        
        return cell!
    }
    

}

