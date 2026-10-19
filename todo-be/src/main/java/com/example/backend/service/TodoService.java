package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.TodoRequestDto;
import com.example.backend.dto.TodoResponseDto;

public interface TodoService {


    TodoResponseDto addTodo(TodoRequestDto todoRequestDto);
    TodoResponseDto getTodoById(Long id);
    List<TodoResponseDto> getAllTodos();
    TodoResponseDto updateTodo(Long id, TodoRequestDto todoRequestDto);
    void deleteTodo(Long id);
    
}
