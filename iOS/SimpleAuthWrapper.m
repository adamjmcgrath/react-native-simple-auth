#import "SimpleAuthWrapper.h"
#import <SimpleAuth/SimpleAuth.h>

@implementation SimpleAuthWrapper

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(configure:(NSString*)provider config:(NSDictionary*)config
                  callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"Configuring %@ with %@", provider, config);
  if ([provider isEqualToString:@"instagram"]) {
    SimpleAuth.configuration[@"instagram"] = @{
       @"client_id": [config objectForKey: @"client_id"],
       SimpleAuthRedirectURIKey : [config objectForKey: @"redirect_uri"]
     };
  } else {
    SimpleAuth.configuration[provider] = config;
  }
  callback(@[provider]);
};

RCT_EXPORT_METHOD(authorize:(NSString*)provider
                  callback:(RCTResponseSenderBlock)callback) {
  [SimpleAuth authorize:provider completion:^(id responseObject, NSError *error) {

    NSLog(@"\nResponse: %@\nError:%@", responseObject, error);
    
    if (error) {
      NSDictionary *userInfo = [error userInfo];
      NSString *errorString = [[userInfo objectForKey:NSUnderlyingErrorKey] localizedDescription];
      NSDictionary *dict=@{@"code": [NSNumber numberWithInteger:error.code],
                           @"description": errorString};
      callback(@[dict]);
    } else if (responseObject) {
      NSDictionary *credentials = [responseObject objectForKey: @"credentials"];
      NSString *token = [credentials objectForKey: @"token"];
      
      NSDictionary *extra;
      if ([responseObject objectForKey:@"extra"]) {
        extra = [responseObject objectForKey: @"extra"];
      } else {
        extra = responseObject;
      }
      
      callback(@[[NSNull null], token, [extra objectForKey: @"raw_info"]]);
    } else {
      callback(@[@true]);
    }
  }];
}

@end
