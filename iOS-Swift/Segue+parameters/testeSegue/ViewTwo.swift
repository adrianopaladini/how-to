//
//  ViewTwo.swift
//  testeSegue
//
//  Created by Adriano Paladini on 06/09/16.
//  Copyright © 2016 Adriano Paladini. All rights reserved.
//

import UIKit

class ViewTwo: UIViewController {
    
    
    @IBOutlet weak var fullImage: UIImageView!
    
    var img = String()
    
    override func viewDidLoad() {
        
        fullImage.image = UIImage(named: img)
        
    }
    
    
    
}
