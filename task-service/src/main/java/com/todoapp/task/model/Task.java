package com.todoapp.task.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime dueDate;
    private String userId;
    private String listId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}