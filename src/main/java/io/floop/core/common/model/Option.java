/**
 * 
 */
package io.floop.core.common.model;

/**
 * @author Derek Reynolds
 *
 */
public class Option {

	private boolean anonymous;
	
	private boolean publiclyViewable;
		
	private Location location;
	
	private Socialize socialize;



	/**
	 * @return the socialize
	 */
	public Socialize getSocialize() {
		return socialize;
	}

	/**
	 * @param socialize the socialize to set
	 */
	public void setSocialize(Socialize socialize) {
		this.socialize = socialize;
	}

	/**
	 * @return the location
	 */
	public Location getLocation() {
		return location;
	}

	/**
	 * @param location the location to set
	 */
	public void setLocation(Location location) {
		this.location = location;
	}

	/**
	 * @return the anonymous
	 */
	public boolean isAnonymous() {
		return anonymous;
	}

	/**
	 * @param anonymous the anonymous to set
	 */
	public void setAnonymous(boolean anonymous) {
		this.anonymous = anonymous;
	}

	/**
	 * @return the publiclyViewable
	 */
	public boolean isPubliclyViewable() {
		return publiclyViewable;
	}

	/**
	 * @param publiclyViewable the publiclyViewable to set
	 */
	public void setPubliclyViewable(boolean publiclyViewable) {
		this.publiclyViewable = publiclyViewable;
	}
	
	
}
