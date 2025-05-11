package com.todoapp.task.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDTO {
    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime dueDate;
    private String userId;
    private String listId;
}