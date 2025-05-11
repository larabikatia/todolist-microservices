package com.todoapp.list.service;

import com.todoapp.list.dto.TaskListDTO;
import com.todoapp.list.model.TaskList;
import com.todoapp.list.repository.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskListService {

    @Autowired
    private TaskListRepository taskListRepository;

    public List<TaskList> getAllLists() {
        return taskListRepository.findAll();
    }

    public List<TaskList> getListsByUser(Long userId) {
        return taskListRepository.findByUserId(userId);
    }

    public Optional<TaskList> getListById(Long id) {
        return taskListRepository.findById(id);
    }

    public TaskList createList(TaskListDTO taskListDTO) {
        TaskList taskList = new TaskList();
        taskList.setName(taskListDTO.getName());
        taskList.setDescription(taskListDTO.getDescription());
        taskList.setUserId(taskListDTO.getUserId());
        taskList.setCreatedAt(LocalDateTime.now());
        taskList.setUpdatedAt(LocalDateTime.now());
        return taskListRepository.save(taskList);
    }

    public TaskList updateList(Long id, TaskListDTO taskListDTO) {
        Optional<TaskList> existingList = taskListRepository.findById(id);
        if (existingList.isPresent()) {
            TaskList taskList = existingList.get();
            taskList.setName(taskListDTO.getName());
            taskList.setDescription(taskListDTO.getDescription());
            taskList.setUpdatedAt(LocalDateTime.now());
            return taskListRepository.save(taskList);
        }
        return null;
    }

    public boolean deleteList(Long id) {
        if (taskListRepository.existsById(id)) {
            taskListRepository.deleteById(id);
            return true;
        }
        return false;
    }
}