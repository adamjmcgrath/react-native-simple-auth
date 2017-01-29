import { curry, mergeAll } from 'ramda';

export default curry((provider, platform, opts) =>
  provider.authorize(platform, mergeAll([provider.opts, platform.opts, opts]))
          .then(provider.identify(platform.request)),
);
