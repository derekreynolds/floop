/**
 * 
 */
package io.floop.social.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.social.twitter.api.TwitterProfile;
import org.springframework.social.twitter.api.UserOperations;
import org.springframework.stereotype.Service;

/**
 * @author reno
 *
 */
@Service
public class TwitterServiceImpl implements TwitterService {

	private final Twitter twitter;
	
	@Autowired
	public TwitterServiceImpl (final Twitter twitter) {
		this.twitter = twitter;
	}
	
	/* (non-Javadoc)
	 * @see io.floop.social.service.TwitterService#getUserProfile(java.lang.String)
	 */
	@Override
	public TwitterProfile getUserProfile(String userName) {
		
	    UserOperations userOperations = twitter.userOperations();	   
        return userOperations.getUserProfile(userName);

	}

}
