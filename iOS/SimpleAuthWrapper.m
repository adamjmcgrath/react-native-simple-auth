#import "SimpleAuthWrapper.h"
#import <SimpleAuth/SimpleAuth.h>

@implementation SimpleAuthWrapper

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(configure:(NSString*)provider config:(NSDictionary*)config) {
  NSLog(@"Configuring %@ with %@", provider, config);
  SimpleAuth.configuration[provider] = config;
};

RCT_EXPORT_METHOD(authorize:(NSString*)provider callback:(RCTResponseSenderBlock)callback) {
  [SimpleAuth authorize:provider completion:^(id responseObject, NSError *error) {
    NSLog(@"\nResponse: %@\nError:%@", responseObject, error);
    callback(@[[NSDictionary *], responseObject], @[[NSError *], error);
  }];
}

@end
