package com.todoapp.task.repository;

import com.todoapp.task.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUserId(String userId);
    List<Task> findByListId(String listId);
    List<Task> findByUserIdAndCompleted(String userId, boolean completed);
}