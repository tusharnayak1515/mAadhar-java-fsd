package com.mAadhar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mAadhar.entities.Aadhar;
import com.mAadhar.repositories.AadharRepo;

@Service
public class AadharService {

    private final AadharRepo aadharRepo;

    @Autowired
    public AadharService(AadharRepo aadharRepo) {
        this.aadharRepo = aadharRepo;
    }

    public Aadhar findAadharByCitizenId(int citizenId) {
        return aadharRepo.findByUser_CitizenId(citizenId);
    }

    public Aadhar saveAadhar(Aadhar aadhar) {
        return aadharRepo.save(aadhar);
    }

    public Aadhar findById(long id) {
		Optional<Aadhar> optionalUser = this.aadharRepo.findById(id);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

    public void deleteAadhar(Long id) {
        aadharRepo.deleteById(id);
    }
    
    public List<Aadhar> getAllAppliedAadharCardRequests() {
        return this.aadharRepo.findByStatus("applied");
    }
}
