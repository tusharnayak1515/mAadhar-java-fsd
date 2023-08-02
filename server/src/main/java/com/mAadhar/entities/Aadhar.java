package com.mAadhar.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "aadhar_cards")
public class Aadhar {
	@Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name = "aadhar_number", unique = true, nullable = false)
   private String aadharNumber;
   
   private int duplicates;
   
   @OneToOne(cascade = CascadeType.ALL)
   private User user;
   
   public Aadhar() {
   	
   }

   public Aadhar(String aadharNumber, User user, int duplicates) {
       this.aadharNumber = aadharNumber;
       this.user = user;
       this.duplicates = duplicates;
   }

   public User getUser() {
       return user;
   }

   public void setUser(User user) {
       this.user = user;
   }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAadharNumber() {
		return aadharNumber;
	}

	public void setAadharNumber(String aadharNumber) {
		this.aadharNumber = aadharNumber;
	}

	public int getDuplicates() {
		return duplicates;
	}

	public void setDuplicates(int duplicates) {
		this.duplicates = duplicates;
	}

    @Override
    public String toString() {
        return "Aadhar [id=" + id + ", aadharNumber=" + aadharNumber + ", duplicates=" + duplicates + ", user=" + user
                + "]";
    }
   
}