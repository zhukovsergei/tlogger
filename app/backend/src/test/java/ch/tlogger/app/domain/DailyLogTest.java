package ch.tlogger.app.domain;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class DailyLogTest {

    private DailyLog dailyLog;

    @BeforeEach
    void setUp() {
        dailyLog = new DailyLog();
    }

    @Test
    void testFieldsSettersAndGetters() {
        // Given
        UUID id = UUID.randomUUID();
        LocalDate logDate = LocalDate.of(2024, 1, 15);
        String content = "some content bla bla bla";
        LocalDateTime now = LocalDateTime.now();

        // When
        dailyLog.setId(id);
        dailyLog.setLogDate(logDate);
        dailyLog.setContent(content);
        dailyLog.setCreatedAt(now);
        dailyLog.setUpdatedAt(now);

        // Then
        assertEquals(id, dailyLog.getId());
        assertEquals(logDate, dailyLog.getLogDate());
        assertEquals(content, dailyLog.getContent());
        assertEquals(now, dailyLog.getCreatedAt());
        assertEquals(now, dailyLog.getUpdatedAt());
    }

    @Test
    void testBuilderPattern() {
        // Given
        UUID id = UUID.randomUUID();
        LocalDate logDate = LocalDate.of(2024, 1, 15);
        String content = "Builder test content";

        // When
        DailyLog built = DailyLog.builder()
                .id(id)
                .logDate(logDate)
                .content(content)
                .build();

        // Then
        assertEquals(id, built.getId());
        assertEquals(logDate, built.getLogDate());
        assertEquals(content, built.getContent());
    }

    @Test
    void testAllArgsConstructor() {
        // Given
        UUID id = UUID.randomUUID();
        LocalDate logDate = LocalDate.of(2024, 1, 15);
        String content = "Constructor test";
        LocalDateTime now = LocalDateTime.now();

        // When
        DailyLog constructed = new DailyLog(id, logDate, content, now, now);

        // Then
        assertEquals(id, constructed.getId());
        assertEquals(logDate, constructed.getLogDate());
        assertEquals(content, constructed.getContent());
        assertEquals(now, constructed.getCreatedAt());
        assertEquals(now, constructed.getUpdatedAt());
    }

    @Test
    void testGetIdentifierMethod() {
        // Given
        UUID id = UUID.randomUUID();
        dailyLog.setId(id);

        // When
        UUID identifier = dailyLog.getIdentifier();

        // Then
        assertEquals(id, identifier);
        assertEquals(dailyLog.getId(), identifier);
    }

    @Test
    void testOnCreateLifecycleMethod() {
        // Given
        LocalDateTime beforeCreate = LocalDateTime.now().minusSeconds(1);

        // When
        dailyLog.onCreate();

        // Then
        assertNotNull(dailyLog.getCreatedAt());
        assertNotNull(dailyLog.getUpdatedAt());
        assertTrue(dailyLog.getCreatedAt().isAfter(beforeCreate));
        assertTrue(dailyLog.getUpdatedAt().isAfter(beforeCreate));
        assertEquals(dailyLog.getCreatedAt(), dailyLog.getUpdatedAt());
    }

    @Test
    void testOnUpdateLifecycleMethod() throws InterruptedException {
        // Given
        dailyLog.onCreate(); // Initialize timestamps
        LocalDateTime originalCreatedAt = dailyLog.getCreatedAt();
        LocalDateTime originalUpdatedAt = dailyLog.getUpdatedAt();
        
        // Small delay to ensure timestamp difference
        Thread.sleep(10);

        // When
        dailyLog.onUpdate();

        // Then
        assertEquals(originalCreatedAt, dailyLog.getCreatedAt()); // Created should not change
        assertNotEquals(originalUpdatedAt, dailyLog.getUpdatedAt()); // Updated should change
        assertTrue(dailyLog.getUpdatedAt().isAfter(originalUpdatedAt));
    }

    @Test
    void testEqualsAndHashCode() {
        // Given
        UUID id = UUID.randomUUID();
        LocalDate logDate = LocalDate.of(2024, 1, 15);
        String content = "Test content";

        DailyLog log1 = DailyLog.builder()
                .id(id)
                .logDate(logDate)
                .content(content)
                .build();

        DailyLog log2 = DailyLog.builder()
                .id(id)  
                .logDate(logDate)
                .content(content)
                .build();

        // Then
        assertEquals(log1, log2);
        assertEquals(log1.hashCode(), log2.hashCode());
    }

    @Test
    void testToString() {
        // Given
        dailyLog.setId(UUID.randomUUID());
        dailyLog.setLogDate(LocalDate.of(2024, 1, 15));
        dailyLog.setContent("Test content");

        // When
        String toString = dailyLog.toString();

        // Then
        assertNotNull(toString);
        assertTrue(toString.contains("DailyLog"));
        assertTrue(toString.contains("Test content"));
    }
} 