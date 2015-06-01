//
//  DetailViewController.swift
//  ReactNativeSample
//
//  Created by Hiroki Yoshifuji on 2015/04/24.
//  Copyright (c) 2015年 Hiroki Yoshifuji. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {

    @IBOutlet weak var wrapView: UIView!
    var rootView:RCTRootView? = nil


    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        var jsCodeLocation = NSURL(string:"http://localhost:8081/index.ios.bundle")
        
        rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "SimpleApp", launchOptions: nil)
        rootView!.frame = wrapView.bounds
        
        rootView?.autoresizingMask = .FlexibleWidth | .FlexibleHeight
        wrapView.addSubview(rootView!)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func motionEnded(motion: UIEventSubtype, withEvent event: UIEvent) {
        rootView?.motionEnded(motion, withEvent: event)
    }
}




class SampleManager : RCTBridgeModule
{
    static func moduleName() -> String? {
        return nil
    }
    
    /*
    + (NSString *)moduleName {
    __attribute__((used, section("__DATA,RCTExportModule")))
    static const char *__rct_export_entry__ = { __func__ };
    return nil;
    };

    + (NSString *)moduleName { __attribute__((used, section("__DATA,RCTExportModule" \
    ))) static const char *__rct_export_entry__ = { __func__ }; return @#js_name; }
*/
}

/*
@interface SampleManager : NSObject <RCTBridgeModule>
@end

@implementation SampleManager

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(callFunc:(NSString *)name param:(NSString *)param dict:(NSDictionary*)dict findEvents:(RCTResponseSenderBlock)callback)
{
    NSLog(@"name: %@", name);
    NSLog(@"str:  %@", param);
    NSLog(@"dict: %@", dict);
    
    
    callback(@[ [NSNull null], @{ @"hoge": @"val" } ]);
}

@end
*/