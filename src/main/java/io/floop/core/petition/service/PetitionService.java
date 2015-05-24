/**
 * 
 */
package io.floop.core.petition.service;

import io.floop.core.petition.model.PetitionTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface PetitionService {

	Slice<PetitionTemplate> getList(Pageable pageable);
	
	Slice<PetitionTemplate> getTop5(Pageable pageable);
	
	PetitionTemplate getById(String id);
	
	void save(PetitionTemplate petition);
	
}
