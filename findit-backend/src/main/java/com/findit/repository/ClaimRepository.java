package com.findit.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.findit.entity.Claim;
import com.findit.entity.ClaimStatus;

public interface ClaimRepository extends JpaRepository<Claim, Long>{
	boolean existsByItem_IdAndUser_IdAndStatus(
	        Long itemId,
	        Long userId,
	        ClaimStatus status
	);
	
	List<Claim> findByItem_Id(Long itemId);
	List<Claim> findByUser_Id(Long userId);
	List<Claim> findByItem_IdAndStatus(
	        Long itemId, ClaimStatus status);
}
