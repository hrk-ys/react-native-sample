//
//  TextView.m
//  TextSample
//
//  Created by Hiroki Yoshifuji on 2015/06/12.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import "TextView.h"
#import "RCTUtils.h"

@implementation TextView

- (instancetype) initWithFrame:(CGRect)frame
{
  if ([super initWithFrame:frame]) {
    self.editable = NO;
    self.dataDetectorTypes = UIDataDetectorTypeAll;
    
  }
  return self;
}

@end

static css_dim_t RCTMeasure(void *context, float width)
{
  ShadowView *shadowText = (__bridge ShadowView *)context;
  
  
  css_dim_t result;
  result.dimensions[CSS_WIDTH] = RCTCeilPixelValue(shadowText.text.length * 10);
  result.dimensions[CSS_HEIGHT] = RCTCeilPixelValue(100);
  return result;
}

@implementation ShadowView
{
}



- (void)fillCSSNode:(css_node_t *)node
{
  [super fillCSSNode:node];
  node->measure = RCTMeasure;
  node->children_count = 0;
}

@end
