package com.findit.repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;

import com.findit.entity.Item;
import com.findit.entity.ReportType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface ItemRepository extends JpaRepository<Item, Long>{
	List<Item> findByReportType(ReportType reportType);//
	List<Item> findByItemNameContainingIgnoreCase(String itemName);//
	List<Item> findByLocationContainingIgnoreCase(String location);//
	List<Item> findByItemNameContainingIgnoreCaseAndLocationContainingIgnoreCase(
	        String itemName, String location);//
	List<Item> findByItemNameContainingIgnoreCaseAndLocationContainingIgnoreCaseAndReportType(
	        String itemName, String location, ReportType reportType);//
	List<Item> findByItemNameContainingIgnoreCaseAndReportType(
	        String itemName, ReportType reportType);////
	List<Item> findByLocationContainingIgnoreCaseAndReportType(
	        String location, ReportType reportType);////
	        
	Page<Item> findByReportType(ReportType reportType, Pageable pageable);
	@Query("""
	        SELECT i FROM Item i
	        WHERE (:itemName IS NULL OR
	               LOWER(i.itemName) LIKE LOWER(CONCAT('%', :itemName, '%')))
	        AND (:location IS NULL OR
	             LOWER(i.location) LIKE LOWER(CONCAT('%', :location, '%')))
	        AND (:reportType IS NULL OR i.reportType = :reportType)
	        """)
	Page<Item> searchItems(
	        @Param("itemName") String itemName,
	        @Param("location") String location,
	        @Param("reportType") ReportType reportType,
	        Pageable pageable
	);
	
	List<Item> findByUser_Id(Long userId);
}
