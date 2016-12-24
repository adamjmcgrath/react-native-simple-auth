/**
 * Login with various social API's.
 * Including: Google, Twitter, Facebook, Instagram, Tumblr & LinkedIn.
 */

import { __ } from 'ramda';
import login from './lib/login';
import * as platform from './lib/platforms/react-native';
import * as _google from './lib/providers/google';
import * as _facebook from './lib/providers/facebook';
import * as _twitter from './lib/providers/twitter';
import * as _tumblr from './lib/providers/tumblr';

export const google = login(_google, platform);
export const facebook = login(_facebook, platform);
export const twitter = login(_twitter, platform);
export const tumblr = login(_tumblr, platform);

export default login(__, platform);
