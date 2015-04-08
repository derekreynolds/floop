/**
 * 
 */
package io.floop.core.common.model;

import org.springframework.data.geo.Point;

/**
 * @author Derek Reynolds
 *
 */
public class Option {

	private boolean anonymous;
	
	private boolean publiclyViewable;
	
	private boolean restrictedLocation;
	
	private Point location;
	

	/**
	 * @return the location
	 */
	public Point getLocation() {
		return location;
	}

	/**
	 * @param location the location to set
	 */
	public void setLocation(Point location) {
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

	/**
	 * @return the restrictedLocation
	 */
	public boolean isRestrictedLocation() {
		return restrictedLocation;
	}

	/**
	 * @param restrictedLocation the restrictedLocation to set
	 */
	public void setRestrictedLocation(boolean restrictedLocation) {
		this.restrictedLocation = restrictedLocation;
	}
	
	
	
}
