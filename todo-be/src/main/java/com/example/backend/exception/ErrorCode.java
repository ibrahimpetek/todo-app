package com.example.backend.exception;

public enum ErrorCode {
    TODO_NOT_FOUND("TODO_001", "Aranan todo kaydı bulunamadı."),
    INVALID_TODO_INPUT("TODO_002", "Girilen todo bilgileri kurallara uymuyor."),
    TODO_ALREADY_EXISTS("TODO_003", "Bu başlığa sahip bir todo zaten mevcut."); // İleride benzersizlik kontrolü istersen

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}