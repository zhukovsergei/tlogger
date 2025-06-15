package ch.tlogger.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        cors.addMapping("/**")
            .allowedOriginPatterns("*")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH")
            .allowedHeaders("*")
            .allowCredentials(false)
            .maxAge(3600);
        config.exposeIdsFor(ch.tlogger.app.domain.DailyLog.class);
    }
} 