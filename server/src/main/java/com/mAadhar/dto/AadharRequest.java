package com.mAadhar.dto;

public class AadharRequest {
	private int citizenId;
	private String issueDate;
	
	public AadharRequest() {
		
	}

	public AadharRequest(int citizenId, String issueDate) {
		super();
		this.citizenId = citizenId;
		this.issueDate = issueDate;
	}

	public int getCitizenId() {
		return citizenId;
	}

	public void setCitizenId(int citizenId) {
		this.citizenId = citizenId;
	}

	public String getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}
	
	
}
