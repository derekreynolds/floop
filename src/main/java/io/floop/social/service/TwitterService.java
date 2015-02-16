/**
 * 
 */
package io.floop.social.service;

import org.springframework.social.twitter.api.TwitterProfile;

/**
 * @author reno
 *
 */
public interface TwitterService {

	TwitterProfile getUserProfile(String userName);
	
}
