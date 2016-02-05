//
//  HVTShareExtensionStorage.m
//  havit
//
//  Created by Tyler Powers on 06/01/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "HVTShareExtensionStorage.h"

NSString *const kShareExtensionStorageKeyFriends = @"friends";
NSString *const kShareExtensionStorageKeyUser = @"user";


@interface HVTShareExtensionStorage ()
@property (nonatomic, strong) NSUserDefaults *sharedUserDefaults;

@end


@implementation HVTShareExtensionStorage

RCT_EXPORT_MODULE();

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.sharedUserDefaults = [[NSUserDefaults alloc] initWithSuiteName: @"group.havit"];
  }
  return self;
}

RCT_EXPORT_METHOD(updateFriends:(NSDictionary *)friendsDict)
{
  [self.sharedUserDefaults setObject:friendsDict forKey:kShareExtensionStorageKeyFriends];
}

RCT_EXPORT_METHOD(updateCurrentUser:(NSDictionary *)userDict)
{
  [self.sharedUserDefaults setObject:userDict forKey:kShareExtensionStorageKeyUser];
  [self.sharedUserDefaults synchronize];
}

- (NSDictionary *)friends {
  return [self.sharedUserDefaults objectForKey:kShareExtensionStorageKeyFriends];
}

- (NSDictionary *)currentUser {
  return [self.sharedUserDefaults objectForKey:kShareExtensionStorageKeyUser];
}

@end
