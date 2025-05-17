package br.edu.utfpr.pb.pw44s.server.dto;

import br.edu.utfpr.pb.pw44s.server.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor @AllArgsConstructor
public class OrderDTO {
    private Long id;
    private LocalDateTime date;

    private BigDecimal totalPrice;

    @NotNull
    private PaymentMethod paymentMethod;

    @NotNull
    private List<OrderItemsDTO> orderItems;
}
