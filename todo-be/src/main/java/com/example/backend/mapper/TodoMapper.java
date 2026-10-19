package com.example.backend.mapper;

import com.example.backend.dto.TodoRequestDto;
import com.example.backend.dto.TodoResponseDto;
import com.example.backend.entity.Todo;

public class TodoMapper {

    public static Todo mapToEntity(TodoRequestDto requestDto){
        return Todo.builder()
                   .title(requestDto.getTitle())
                   .completed(requestDto.isCompleted())
                   .build();
    }

    public static TodoResponseDto mapToResponseDto(Todo todo){
        return TodoResponseDto.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .completed(todo.isCompleted())
                .build();
    }
    
}
