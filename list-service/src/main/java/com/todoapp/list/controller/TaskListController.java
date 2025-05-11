package com.todoapp.list.controller;

import com.todoapp.list.dto.TaskListDTO;
import com.todoapp.list.model.TaskList;
import com.todoapp.list.service.TaskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lists")
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @GetMapping
    public ResponseEntity<List<TaskList>> getAllLists() {
        return ResponseEntity.ok(taskListService.getAllLists());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskList>> getListsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(taskListService.getListsByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskList> getListById(@PathVariable Long id) {
        Optional<TaskList> taskList = taskListService.getListById(id);
        return taskList.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TaskList> createList(@RequestBody TaskListDTO taskListDTO) {
        TaskList createdList = taskListService.createList(taskListDTO);
        return new ResponseEntity<>(createdList, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskList> updateList(@PathVariable Long id, @RequestBody TaskListDTO taskListDTO) {
        TaskList updatedList = taskListService.updateList(id, taskListDTO);
        if (updatedList != null) {
            return ResponseEntity.ok(updatedList);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable Long id) {
        boolean deleted = taskListService.deleteList(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}