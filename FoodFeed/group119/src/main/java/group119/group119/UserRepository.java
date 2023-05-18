package group119.group119;

import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.stereotype.Repository;
// @Repository
public interface UserRepository extends MongoRepository<User,String>{}