//
//  ViewController.swift
//  Photos
//
//  Created by Adriano Paladini on 09/09/16.
//  Copyright © 2016 IBM. All rights reserved.
//

import UIKit

class ViewController: UIViewController,
                      UIImagePickerControllerDelegate,
                      UINavigationControllerDelegate  {

    
    let picker = UIImagePickerController()
    
    @IBOutlet weak var previewImage: UIImageView!
    
    
    @IBAction func getImage(_ sender: AnyObject) {
        
        picker.delegate = self
        //picker.allowsEditing = true
        picker.sourceType = .savedPhotosAlbum
        //picker.mediaTypes = UIImagePickerController.availableMediaTypes(for: .photoLibrary)!
        
        present(picker, animated: true, completion: nil)
        
    }
    
    

    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        
        dismiss(animated:true, completion: nil)
    }
    
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        
        
        let chosenImage = info[UIImagePickerControllerEditedImage ] as! UIImage
        
        previewImage.image = chosenImage
        
        
        dismiss(animated:true, completion: nil)
        
        
    }
    
    
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

