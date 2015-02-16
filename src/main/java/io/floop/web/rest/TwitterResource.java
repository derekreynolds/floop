/**
 * 
 */
package io.floop.web.rest;

import io.floop.social.service.TwitterService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.social.twitter.api.TwitterProfile;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * @author reno
 *
 */
@RestController
@RequestMapping("/api")
public class TwitterResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final TwitterService twitterService;
	   
	   @Autowired
	   public TwitterResource(final TwitterService twitterService) {
		   this.twitterService = twitterService;
	   }
	   
	   @RequestMapping(value = "/twitter/profile/{userName}",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<TwitterProfile> getProfile(@PathVariable String userName) {
	        log.debug("REST request to get User : {}", userName);
	        
	        return new ResponseEntity<>(twitterService.getUserProfile(userName), HttpStatus.OK);
	   }
}
