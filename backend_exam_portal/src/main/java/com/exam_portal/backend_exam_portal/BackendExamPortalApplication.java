package com.exam_portal.backend_exam_portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
public class BackendExamPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendExamPortalApplication.class, args);
	}

}
