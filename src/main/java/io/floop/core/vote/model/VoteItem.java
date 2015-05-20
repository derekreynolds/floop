package io.floop.core.vote.model;

/**
 * 
 * @author Derek Reynolds
 *
 */
public class VoteItem {

	private Integer ordinal;
	
	private String item;

	/**
	 * @return the ordinal
	 */
	public Integer getOrdinal() {
		return ordinal;
	}

	/**
	 * @param ordinal the ordinal to set
	 */
	public void setOrdinal(Integer ordinal) {
		this.ordinal = ordinal;
	}

	/**
	 * @return the item
	 */
	public String getItem() {
		return item;
	}

	/**
	 * @param name the item to set
	 */
	public void setItem(String item) {
		this.item = item;
	}
	
	
	
}
