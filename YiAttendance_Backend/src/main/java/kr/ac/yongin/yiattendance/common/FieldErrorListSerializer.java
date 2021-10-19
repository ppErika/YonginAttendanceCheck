package kr.ac.yongin.yiattendance.common;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.FieldError;

import java.io.IOException;
import java.util.List;

@Slf4j
public class FieldErrorListSerializer extends JsonSerializer<List<FieldError>> {

    @Override
    public void serialize(List<FieldError> fieldErrorList,
                          JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartArray();
        fieldErrorList.forEach(fieldError -> {
            try {
                jsonGenerator.writeStartObject();
                String code = fieldError.getCode();
                if (code != null) {
                    jsonGenerator.writeStringField("code", code);
                }
                jsonGenerator.writeStringField("field", fieldError.getField());
                Object rejectedValue = fieldError.getRejectedValue();
                if (rejectedValue != null) {
                    jsonGenerator.writeStringField("rejectedValue", rejectedValue.toString());
                }
                jsonGenerator.writeStringField("defaultMessage", fieldError.getDefaultMessage());
                jsonGenerator.writeEndObject();
            } catch (IOException e1) {
                log.error(e1.getStackTrace().toString());
            }
        });
        jsonGenerator.writeEndArray();

    }
}
