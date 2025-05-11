package com.todoapp.list.dto;

import lombok.Data;

@Data
public class TaskListDTO {
    private String name;
    private String description;
    private Long userId;
}