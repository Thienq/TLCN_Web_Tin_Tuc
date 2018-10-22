package hcmute.edu.vn.userservice.repository;

import hcmute.edu.vn.nuservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findById(long uid);
    Optional<User> findByEmailAndPassword(String email, String pass);
}
