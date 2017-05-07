//
//  ViewController.swift
//  camera
//
//  Created by Adriano Paladini on 09/09/16.
//  Copyright © 2016 Adriano Paladini. All rights reserved.
//

import UIKit
import MediaPlayer
import AVKit

class ViewController: UIViewController {

    @IBOutlet weak var videoView: UIView!
    
    
    //var movie: MPMoviePlayerViewController! = nil
    var movie: AVPlayerViewController! = nil

    
    func createVideo() {
        
        //let myVideoFile = Bundle.main.url(forResource: "FiberFix", withExtension: "mp4")
        
        let myVideoFile = URL(string: "http://images.apple.com/media/us/iphone-7/2016/5937a0dc_edb0_4343_af1c_41ff71808fe5/films/feature/iphone7-feature-tft-cc-us-20160907_960x400.mp4")
        
        
        //movie = MPMoviePlayerViewController(contentURL: myVideoFile)
        
        let myPlayer = AVPlayer(url: myVideoFile!)
        
        movie = AVPlayerViewController()
        movie.player = myPlayer
        movie.videoGravity = AVLayerVideoGravityResizeAspectFill
        movie.allowsPictureInPicturePlayback = true
        //movie.showsPlaybackControls = false
        
        self.view.addSubview(movie.view)
        
        movie.view.frame = self.view.bounds
        
        movie.player?.play()
        
    }
    
    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        createVideo()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

