package com.codecademy.jackpot;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface DetailsRepo extends MongoRepository<Details, String> {
}
