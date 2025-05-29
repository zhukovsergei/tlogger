package ch.tlogger.app.repository;

import ch.tlogger.app.domain.DailyLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DailyLogRepository extends JpaRepository<DailyLog, UUID> {
    
    List<DailyLog> findAllByOrderByLogDateDesc();
    
    Optional<DailyLog> findByLogDate(LocalDate logDate);
    
    List<DailyLog> findByLogDateBetweenOrderByLogDateDesc(LocalDate startDate, LocalDate endDate);
} 