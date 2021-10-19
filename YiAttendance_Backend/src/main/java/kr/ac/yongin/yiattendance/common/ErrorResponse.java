package kr.ac.yongin.yiattendance.common;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import kr.ac.yongin.yiattendance.exception.BusinessException;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String code;
    private final String message;
    @JsonSerialize(using = FieldErrorListSerializer.class)
    private final List<FieldError> detail;

    public static ResponseEntity<ErrorResponse> toResponseEntity(BusinessException businessException) {
        return ResponseEntity
                .status(businessException.getCode().getHttpStatus())
                .body(
                        ErrorResponse.builder()
                                .status(businessException.getCode().getHttpStatus().value())
                                .code(businessException.getCode().getCode())
                                .error(businessException.getCode().name())
                                .message(businessException.getMessage())
                                .detail(businessException.getErrors())
                                .build()
                );
    }
}
