//
//  ViewController.swift
//  testeSegue
//
//  Created by Adriano Paladini on 06/09/16.
//  Copyright © 2016 Adriano Paladini. All rights reserved.
//

import UIKit

class ViewController: UITableViewController {
    
    
    @IBOutlet var table: UITableView!
    
    var imgArray = ["01", "02", "03", "04", "05"]
    var textArray = ["Teste 1","Teste 2","Teste 3","Teste 4","Teste 5"]

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return imgArray.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell: UITableViewCell = tableView.dequeueReusableCell(withIdentifier: "cell") as UITableViewCell!
        
        let imgView = cell.viewWithTag(1) as! UIImageView
        let textView = cell.viewWithTag(2) as! UILabel
        
        imgView.image = UIImage(named: imgArray[indexPath.row])
        textView.text = textArray[indexPath.row]
        
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        let Destination = segue.destination as! ViewTwo
        
        let index = table.indexPathForSelectedRow?.row
        
        Destination.img = imgArray[index!]
        Destination.title = textArray[index!]
        
    }
    
    
    
    
}

