/**
 * 
 */
package io.floop.core.common.model;

import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;

/**
 * @author Derek Reynolds
 *
 */
public class Geo {

	@GeoSpatialIndexed
	private Point center;
	
	private Integer distance;
	
	private Integer accuracy;


	/**
	 * @return the center
	 */
	public Point getCenter() {
		return center;
	}

	/**
	 * @param center the center to set
	 */
	public void setCenter(Point center) {
		this.center = center;
	}

	/**
	 * @return the accuracy
	 */
	public Integer getAccuracy() {
		return accuracy;
	}

	/**
	 * @param accuracy the accuracy to set
	 */
	public void setAccuracy(Integer accuracy) {
		this.accuracy = accuracy;
	}

	/**
	 * @return the distance
	 */
	public Integer getDistance() {
		return distance;
	}

	/**
	 * @param distance the distance to set
	 */
	public void setDistance(Integer distance) {
		this.distance = distance;
	}
	
	
	
}
