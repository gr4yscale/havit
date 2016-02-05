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
#import "CodePush.h"

@import HockeySDK;

static BOOL didSetupHockeySDK = NO;


@interface RootShareViewController ()

@property (nonatomic, strong) __block NSMutableDictionary *propsForRNShareContainer;
@property (nonatomic, assign) NSInteger itemLoadOperationCount;

@end


@implementation RootShareViewController

RCT_EXPORT_MODULE()

- (void)loadView {
  
  NSURL *jsCodeLocation;

  #ifdef DEBUG
    jsCodeLocation = [NSURL URLWithString:@"http://admins-MacBook-Pro.local:8081/index.ios.bundle?dev=true"];
  #else
    jsCodeLocation = [CodePush bundleURL];
  #endif
  
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
  
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(completeShareExtensionRequest)
                                               name:@"completeShareExtensionRequestNotification" object:nil];
}

- (void)viewDidLoad {
  [super viewDidLoad];
  if (!didSetupHockeySDK) {
    [[BITHockeyManager sharedHockeyManager] configureWithIdentifier:@"[redacted]"];
    [[BITHockeyManager sharedHockeyManager].crashManager setCrashManagerStatus: BITCrashManagerStatusAutoSend];
    [[BITHockeyManager sharedHockeyManager] startManager];
  }
}

- (void)receiveShareExtensionDataIfAvailable {
  
  self.propsForRNShareContainer = [@{
                                     @"title": @"",
                                     @"url": @""
                                     } mutableCopy];

  // fuck you, apple. why do you have to make simple things such a pain in the ass?
  for (NSExtensionItem *item in self.extensionContext.inputItems) {
    
    // load attributedContenetTextData first
    if ([item userInfo][NSExtensionItemAttributedContentTextKey]) {
      NSData *attributedContentTextData = [item userInfo][NSExtensionItemAttributedContentTextKey];
      NSString *title = [[[NSMutableAttributedString alloc] initWithData:attributedContentTextData
                                                                 options:@{}
                                                      documentAttributes:0
                                                                   error:nil] string];
      NSLog(@"contentTextData: %@", title);
      [self loadItem:nil completedWithResults:title];
    }
    
    // now do the ridiculous dance for the other stuff
    for (NSItemProvider *itemProvider in item.attachments) {
      for (NSString *type in [itemProvider registeredTypeIdentifiers]) {
        if ([itemProvider hasItemConformingToTypeIdentifier:type]) {
          
          self.itemLoadOperationCount++;
          
          [itemProvider loadItemForTypeIdentifier:type
                                          options:nil
                                completionHandler:^(id item, NSError * _Null_unspecified error) {
                                  NSLog(@"Found item of type %@: %@", type, item);
                                  [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                                    [self loadItem:item completedWithResults:item];
                                  }];
                                }];
        };
      }
    }
  }
}

- (void)loadItem:(NSItemProvider *)item completedWithResults:(id)resultsItem {
  if ([resultsItem isKindOfClass:[NSURL class]]) {
    self.propsForRNShareContainer[@"url"] = [resultsItem absoluteString];
  }
  else if ([resultsItem isKindOfClass:[NSString class]]) {
    NSString *prefix = [[resultsItem substringToIndex:5] lowercaseString];
    // it's a string with a url prefix
    if ([prefix containsString:@"http"] || [prefix containsString:@"https"]) {
      self.propsForRNShareContainer[@"url"] = resultsItem;
    } else {
      // yes, it's a title actually
      self.propsForRNShareContainer[@"title"] = resultsItem;
    }
  }
  
  if (item) {
    self.itemLoadOperationCount--;
  }
  
  if (self.itemLoadOperationCount == 0) {
    [self updateHavitShareReactNativeWithProps:self.propsForRNShareContainer];
    NSLog(@"%@", self.propsForRNShareContainer);
  }
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
  
//  NSLog(@"friends! %@", friends);
  
  RCTRootView *havitShareReactNativeApp = (RCTRootView *)self.view;
  
  // TOFIX: Redux-storage is loading from persistence AFTER this comes through without the delay
  // Fix this fragile ass shit soon! ...30 mins of my life that i will never get back :(

  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
  [havitShareReactNativeApp.bridge.eventDispatcher sendAppEventWithName:@"FriendsListUpdate"
                                                                   body:friends];
  
  [havitShareReactNativeApp.bridge.eventDispatcher sendAppEventWithName:@"CurrentUserUpdate"
                                                                   body:currentUser];
  });
}

RCT_EXPORT_METHOD(shareComplete)
{
  // Annoyingly, we can't call cancelRequestReturningItems:completionHandler: direction on the extensionContext
  // Apple destroys the extension context when the caller function is coming from JavaScriptCore :(
  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"completeShareExtensionRequestNotification" object:self];
  });
}

- (void)completeShareExtensionRequest {
  [self.extensionContext completeRequestReturningItems:nil
                                     completionHandler:nil];
}

@end
