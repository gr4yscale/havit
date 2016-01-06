//
//  HVTShareExtensionStorage.h
//  havit
//
//  Created by Tyler Powers on 06/01/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

extern NSString *const kShareExtensionStorageKeyFriends;
extern NSString *const kShareExtensionStorageKeyUser;

@interface HVTShareExtensionStorage : NSObject <RCTBridgeModule>

- (NSDictionary *)friends;
- (NSDictionary *)currentUser;

@end
