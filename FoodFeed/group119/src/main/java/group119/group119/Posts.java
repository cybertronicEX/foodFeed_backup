package group119.group119;

// import java.sql.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Posts {
    @Id
    private String id;
    private String owner;
    private String ownerid;
    private String content1;
    private String content2;
    private String content3;
    private String content4;

    private String caption;
    // private Date date;
}