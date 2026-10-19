package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.TodoRequestDto;
import com.example.backend.dto.TodoResponseDto;
import com.example.backend.service.TodoService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController 
@RequestMapping("/api/todos")
@AllArgsConstructor 
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoResponseDto> addTodo(@Valid @RequestBody TodoRequestDto todoRequestDto) {
        TodoResponseDto savedTodo = todoService.addTodo(todoRequestDto);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TodoResponseDto> getTodoById(@PathVariable("id") Long todoId) {
        TodoResponseDto todoDto = todoService.getTodoById(todoId);
        return ResponseEntity.ok(todoDto);
    }

    @GetMapping
    public ResponseEntity<List<TodoResponseDto>> getAllTodos() {
        List<TodoResponseDto> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }
    
    @PutMapping("{id}")
    public ResponseEntity<TodoResponseDto> updateTodo(@PathVariable("id") Long todoId,
                                                      @Valid @RequestBody TodoRequestDto todoRequestDto) {
        TodoResponseDto updatedTodo = todoService.updateTodo(todoId, todoRequestDto);
        return ResponseEntity.ok(updatedTodo);
    }
    
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.ok("Todo başarıyla silindi.");
    }


    
}
