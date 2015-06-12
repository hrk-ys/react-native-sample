//
//  TextView.h
//  TextSample
//
//  Created by Hiroki Yoshifuji on 2015/06/12.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTShadowView.h"

@interface TextView : UITextView

@end

@interface ShadowView : RCTShadowView
@property (nonatomic, copy) NSString *text;
@end