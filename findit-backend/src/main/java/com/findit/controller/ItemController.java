package com.findit.controller;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Sort;
import com.findit.dto.ItemRequest;
import com.findit.dto.ItemResponse;
import com.findit.entity.ReportType;
import com.findit.service.ItemService;

import org.springframework.web.bind.annotation.PathVariable;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
@RestController
public class ItemController {
	
	private final ItemService itemService;

	public ItemController(ItemService itemService) {
	    this.itemService = itemService;
	}
	
	@PostMapping("/api/items")
	public ResponseEntity<ItemResponse> createItem(
	        @Valid @RequestBody ItemRequest request,
	        @AuthenticationPrincipal Jwt jwt) {

	    Long userId = Long.valueOf(jwt.getSubject());

	    ItemResponse savedItem = itemService.saveItem(request, userId);

	    return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
	}
	
	
	@GetMapping("/api/items/{id}")
	public ItemResponse getItemById(@PathVariable Long id) {
	    return itemService.getItemById(id);
	}
	
	@PutMapping("/api/items/{id}")
	public ResponseEntity<ItemResponse> updateItem(
	        @PathVariable Long id,
	        @Valid @RequestBody ItemRequest request,
	        @AuthenticationPrincipal Jwt jwt) {

	    Long userId = Long.valueOf(jwt.getSubject());

	    ItemResponse updatedItem = itemService.updateItem(id, request, userId);

	    return ResponseEntity.ok(updatedItem);
	}
	
	@DeleteMapping("/api/items/{id}")
	public ResponseEntity<Void> deleteItem(
	        @PathVariable Long id,
	        @AuthenticationPrincipal Jwt jwt) {

	    Long userId = Long.valueOf(jwt.getSubject());

	    itemService.deleteItem(id, userId);

	    return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/api/items/search")
	public Page<ItemResponse> searchItems(
	        @RequestParam(required = false) String itemName,
	        @RequestParam(required = false) String location,
	        @RequestParam(required = false) ReportType reportType,
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        @RequestParam(defaultValue = "createdAt") String sortBy,
	        @RequestParam(defaultValue = "desc") String direction) {

	    if (!sortBy.equals("createdAt")
	            && !sortBy.equals("itemName")
	            && !sortBy.equals("location")) {
	        throw new ResponseStatusException(
	                HttpStatus.BAD_REQUEST, "Invalid sorting field");
	    }

	    if (!direction.equalsIgnoreCase("asc")
	            && !direction.equalsIgnoreCase("desc")) {
	        throw new ResponseStatusException(
	                HttpStatus.BAD_REQUEST, "Invalid sorting direction");
	    }

	    Sort sort = direction.equalsIgnoreCase("asc")
	            ? Sort.by(sortBy).ascending()
	            : Sort.by(sortBy).descending();

	    Pageable pageable = PageRequest.of(page, size, sort);

	    return itemService.searchItems(
	            itemName, location, reportType, pageable);
	}
	
	@GetMapping("/api/items/sort")
	public List<ItemResponse> getItemsSortedByDate() {
	    return itemService.getItemsSortedByDate();
	}
	
	@GetMapping("/api/items")
	public Page<ItemResponse> getAllItems(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        @RequestParam(required = false) ReportType reportType,
	        @RequestParam(defaultValue = "createdAt") String sortBy,
	        @RequestParam(defaultValue = "desc") String direction) {

		if (!sortBy.equals("createdAt")
		        && !sortBy.equals("itemName")
		        && !sortBy.equals("location")) {

		    throw new ResponseStatusException(
		            HttpStatus.BAD_REQUEST,
		            "Invalid sorting field"
		    );
		}
		if (!direction.equalsIgnoreCase("asc")
		        && !direction.equalsIgnoreCase("desc")) {

		    throw new ResponseStatusException(
		            HttpStatus.BAD_REQUEST,
		            "Invalid sorting direction"
		    );
		}
		Sort sort = direction.equalsIgnoreCase("asc")
		        ? Sort.by(sortBy).ascending()
		        : Sort.by(sortBy).descending();
		
	    Pageable pageable = PageRequest.of(
	            page,
	            size,
	            sort
	    );

	    if (reportType == null) {
	        return itemService.getAllItems(pageable);
	    }

	    return itemService.getItemsByReportType(reportType, pageable);
	}
	
	@GetMapping("/api/items/my-reports")
	public ResponseEntity<List<ItemResponse>> getMyReports(
	        @AuthenticationPrincipal Jwt jwt) {

	    Long userId = Long.valueOf(jwt.getSubject());

	    List<ItemResponse> items = itemService.getMyReports(userId);

	    return ResponseEntity.ok(items);
	}
	
	@GetMapping("/api/admin/items")
	public ResponseEntity<Page<ItemResponse>> getAllItemsForAdmin(
	        Pageable pageable) {

	    Page<ItemResponse> items = itemService.getAllItems(pageable);

	    return ResponseEntity.ok(items);
	}
}
