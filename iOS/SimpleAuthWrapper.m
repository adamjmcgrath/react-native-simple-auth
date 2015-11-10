#import "SimpleAuthWrapper.h"
#import <SimpleAuth/SimpleAuth.h>

@implementation SimpleAuthWrapper

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(configure:(NSString*)provider config:(NSDictionary*)config
                  callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"Configuring %@ with %@", provider, config);
  SimpleAuth.configuration[provider] = config;
  callback(@[provider]);
};

RCT_EXPORT_METHOD(authorize:(NSString*)provider
                  callback:(RCTResponseSenderBlock)callback) {
  [SimpleAuth authorize:provider completion:^(id responseObject, NSError *error) {

    NSLog(@"\nResponse: %@\nError:%@", responseObject, error);
    
    if (responseObject) {
      NSDictionary *credentials = [responseObject objectForKey: @"credentials"];
      NSString *token = [credentials objectForKey: @"token"];
      NSString *secret = [credentials objectForKey: @"secret"];
      
      NSDictionary *result;
      if (secret == nil) {
        result = @{@"token": token};
      }
      else {
        result = @{@"token": token, @"secret": secret};
      }
      
      NSDictionary *extra;
      if ([responseObject objectForKey:@"extra"]) {
        extra = [responseObject objectForKey: @"extra"];
      } else {
        extra = responseObject;
      }
      
      callback(@[[NSNull null], result, [extra objectForKey: @"raw_info"]]);
    } else {
      if (error) {
        NSMutableDictionary *dict=[NSMutableDictionary dictionaryWithCapacity:1];
        [dict setObject:[NSNumber numberWithInteger:error.code] forKey:@"code"];

        // Add an error description, if it exists.
        NSDictionary *userInfo = [error userInfo];
        if (userInfo) {
          NSString *errorString = [[userInfo objectForKey:NSUnderlyingErrorKey] localizedDescription];
          if (errorString) {
            [dict setObject:errorString forKey:@"description"];
          }
        }

        callback(@[dict]);
      } else {
        callback(@[@true]);
      }
    }

  }];
}

@end
