package ch.tlogger.app.config;

import ch.tlogger.app.domain.User;
import ch.tlogger.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.UUID;

@Component
@Profile("dev")
public class DevUserFixture implements CommandLineRunner {
    private final UserRepository userRepository;

    public DevUserFixture(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            userRepository.save(User.builder()
                    .id(UUID.randomUUID())
                    .username("admin")
                    .email("admin@example.com")
                    .password(new BCryptPasswordEncoder().encode("admin123"))
                    .roles(Set.of("ROLE_ADMIN"))
                    .build());
        }
        if (userRepository.findByUsername("user").isEmpty()) {
            userRepository.save(User.builder()
                    .id(UUID.randomUUID())
                    .username("user")
                    .email("user@example.com")
                    .password(new BCryptPasswordEncoder().encode("user123"))
                    .roles(Set.of("ROLE_USER"))
                    .build());
        }
    }
} 