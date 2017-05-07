//
//  ViewController.swift
//  collection
//
//  Created by Adriano Paladini on 06/09/16.
//  Copyright © 2016 Adriano Paladini. All rights reserved.
//

import UIKit

class CollViewController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    
    
    var imgArray = ["01","02","03","04","05",
                    "01","02","03","04","05",
                    "01","02","03","04","05",
                    "01","02","03","04","05",
                    "01","02","03","04","05",
                    "01","02","03","04","05"]
    

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    
    
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return imgArray.count
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath) as UICollectionViewCell
        
        
        let imgView = cell.viewWithTag(1) as! UIImageView
        
        imgView.image = UIImage(named: imgArray[indexPath.row])
        
        
        return cell
    }
    
    
    
    
    
    
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 1.0
    }
    
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 1.0
    }
    
    
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        let quadrado = collectionView.frame.width / 3 - 1
        
        
        return CGSize(width: quadrado, height: quadrado)
    }
    
    
    
    
    
    

}

