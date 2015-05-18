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
public class Location {

	private Boolean selected;
	
	private Geo geo;
	



	/**
	 * @return the selected
	 */
	public Boolean getSelected() {
		return selected;
	}

	/**
	 * @param selected the selected to set
	 */
	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
	
	/**
	 * @return the geo
	 */
	public Geo getGeo() {
		return geo;
	}

	/**
	 * @param geo the geo to set
	 */
	public void setGeo(Geo geo) {
		this.geo = geo;
	}
}
