package com.codecademy.jackpot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/details")
public class DetailsController {
    @Autowired
    private DetailsRepo detailsRepo;
    @GetMapping
    public Iterable<Details> findAll() {
       return detailsRepo.findAll();
    }
    @PostMapping("/add")
    public Details addDetails(@RequestBody Details details) {
        return detailsRepo.save(details);
    }





}
