//
//  RootShareViewController.m
//  ShareExtension
//
//  Created by Tyler Powers on 06/01/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RootShareViewController.h"
#import "RCTRootView.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "HVTShareExtensionStorage.h"

@implementation RootShareViewController


- (void)loadView {
  
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  
  //  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  NSDictionary *initialProps = @{@"title" : @"initialTitle",
                                 @"url" : @"initialURL"
                                 };
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"HavitShareApp"
                                               initialProperties:nil
                                                   launchOptions:initialProps];
  self.view = rootView;
  
  [self receiveShareExtensionDataIfAvailable];
  [self refreshDataFromContainerApp];
}

- (void)receiveShareExtensionDataIfAvailable {
  
  __block NSMutableDictionary *shareData = [@{
                                              @"title": @"title",
                                              @"url": @"url"
                                              } mutableCopy];
  
  NSData *attributedContentTextData = [self.extensionContext.inputItems[0] userInfo][NSExtensionItemAttributedContentTextKey];
  NSString *title = [[[NSMutableAttributedString alloc] initWithData:attributedContentTextData
                                                             options:@{}
                                                  documentAttributes:0
                                                               error:nil] string];
  NSLog(@"title: %@", title);
  
  shareData[@"title"] = title;
  
  NSItemProvider *extensionItemAttachmentProvider = [[self.extensionContext.inputItems.firstObject userInfo][NSExtensionItemAttachmentsKey] firstObject];
  [extensionItemAttachmentProvider loadItemForTypeIdentifier:@"public.url"
                                                     options:nil
                                           completionHandler:^(NSURL<NSSecureCoding> * _Nullable item, NSError * _Null_unspecified error) {
                                             
                                             NSString *urlAsString = [item absoluteString];
                                             shareData[@"url"] = urlAsString;
                                             
                                             NSLog(@"[IOS] Share data: %@", shareData);
                                             [self updateHavitShareReactNativeWithProps:shareData];
                                           }];
}

- (void)updateHavitShareReactNativeWithProps:(NSDictionary *)props {
  RCTRootView *havitShareReactNativeApp = (RCTRootView *)self.view;
  dispatch_async(dispatch_get_main_queue(), ^{
    havitShareReactNativeApp.appProperties = props;
  });
}

- (void)refreshDataFromContainerApp {

  HVTShareExtensionStorage *storage = [[HVTShareExtensionStorage alloc] init];
  NSDictionary *friends = [storage friends];
  NSDictionary *currentUser = [storage currentUser];
  
  RCTRootView *havitShareReactNativeApp = (RCTRootView *)self.view;
  
  // TOFIX: Redux-storage is loading from persistence AFTER this comes through without the delay
  // Fix this fragile ass shit soon!
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
  [havitShareReactNativeApp.bridge.eventDispatcher sendAppEventWithName:@"FriendsListUpdate"
                                                                   body:friends];
  
  [havitShareReactNativeApp.bridge.eventDispatcher sendAppEventWithName:@"CurrentUserUpdate"
                                                                   body:currentUser];
  });
}

@end
