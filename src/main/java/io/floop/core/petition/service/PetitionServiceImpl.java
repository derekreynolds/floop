/**
 * 
 */
package io.floop.core.petition.service;

import io.floop.core.petition.model.PetitionTemplate;
import io.floop.core.petition.repository.PetitionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

/**
 * @author Derek Reynolds
 *
 */
@Service
public class PetitionServiceImpl implements PetitionService {

	private final PetitionRepository petitionRepository;
	
	@Autowired
	public PetitionServiceImpl(PetitionRepository petitionRepository) {
		this.petitionRepository = petitionRepository;
	}
	
	/* (non-Javadoc)
	 * @see io.floop.rate.service.PetitionService#getList(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<PetitionTemplate> getList(Pageable pageable) {
		
		return petitionRepository.findAll(pageable);
	}	

	/* (non-Javadoc)
	 * @see io.floop.rate.service.PetitionService#getTop5(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<PetitionTemplate> getTop5(Pageable pageable) {
		
		return petitionRepository.findTop5ByOrderByEndDateDesc(pageable);
	}

	/* (non-Javadoc)
	 * @see io.floop.rate.service.PetitionService#getById(java.lang.String)
	 */
	@Override
	public PetitionTemplate getById(String id) {
		
		return petitionRepository.findOne(id);
	}

	/* (non-Javadoc)
	 * @see io.floop.rate.service.PetitionService#save(io.floop.rate.model.Rate)
	 */
	@Override
	public void save(PetitionTemplate rate) {
		petitionRepository.save(rate);		
	}

	
	
}
