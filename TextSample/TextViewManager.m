//
//  TextViewManager.m
//  TextSample
//
//  Created by Hiroki Yoshifuji on 2015/06/12.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import "TextViewManager.h"
#import "TextView.h"
#import "RCTSparseArray.h"

@implementation TextViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[TextView alloc] init];
}

- (RCTShadowView *)shadowView
{
  return [[ShadowView alloc] init];
}

RCT_EXPORT_SHADOW_PROPERTY(text, NSString)



- (RCTViewManagerUIBlock)uiBlockToAmendWithShadowViewRegistry:(RCTSparseArray *)shadowViewRegistry
{
  NSMutableArray *uiBlocks = [NSMutableArray new];
  
  for (RCTShadowView *rootView in shadowViewRegistry.allObjects) {
    if (![rootView isReactRootView]) {
      // This isn't a root view
      continue;
    }
    
    if (![rootView isTextDirty]) {
      // No text processing to be done
      continue;
    }
    
    RCTSparseArray *reactTaggedAttributedStrings = [[RCTSparseArray alloc] init];
    NSMutableArray *queue = [NSMutableArray arrayWithObject:rootView];
    for (NSInteger i = 0; i < [queue count]; i++) {
      RCTShadowView *shadowView = queue[i];
      RCTAssert([shadowView isTextDirty], @"Don't process any nodes that don't have dirty text");

      if ([shadowView isKindOfClass:[ShadowView class]]) {
        ShadowView *shadowText = (ShadowView *)shadowView;
        reactTaggedAttributedStrings[shadowText.reactTag] = [shadowText text];

        [shadowView setTextComputed];
      } else {
        for (RCTShadowView *child in [shadowView reactSubviews]) {
          if ([child isTextDirty]) {
            [queue addObject:child];
          }
        }
      }

    }
    
    [uiBlocks addObject:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
      [reactTaggedAttributedStrings enumerateObjectsUsingBlock:^(NSString *attributedString, NSNumber *reactTag, BOOL *stop) {
        TextView *text = viewRegistry[reactTag];
        text.text = attributedString;
      }];
    }];
  }
  
  return ^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    for (RCTViewManagerUIBlock shadowBlock in uiBlocks) {
      shadowBlock(uiManager, viewRegistry);
    }
  };
}

@end
