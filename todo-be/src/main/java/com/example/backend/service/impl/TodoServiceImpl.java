package com.example.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.dto.TodoRequestDto;
import com.example.backend.dto.TodoResponseDto;
import com.example.backend.entity.Todo;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.mapper.TodoMapper;
import com.example.backend.repository.TodoRepository;
import com.example.backend.service.TodoService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public TodoResponseDto addTodo(TodoRequestDto todoRequestDto) {
        Todo todo = TodoMapper.mapToEntity(todoRequestDto);
        Todo savedTodo = todoRepository.save(todo);
        return TodoMapper.mapToResponseDto(savedTodo);
    }

    @Override
    public TodoResponseDto getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo bulunamadı, id: " + id));
        return TodoMapper.mapToResponseDto(todo);
    }

    @Override
    public List<TodoResponseDto> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();
        return todos.stream()
                .map(TodoMapper::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public TodoResponseDto updateTodo(Long id, TodoRequestDto todoRequestDto) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo bulunamadı, id: " + id));

        todo.setTitle(todoRequestDto.getTitle());
        todo.setCompleted(todoRequestDto.isCompleted());

        Todo updatedTodo = todoRepository.save(todo);
        return TodoMapper.mapToResponseDto(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Todo bulunamadı, id: " + id);
        }
        todoRepository.deleteById(id);
    }
}