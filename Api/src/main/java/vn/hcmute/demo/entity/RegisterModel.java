package vn.hcmute.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterModel {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    private int sex;
    private Date dob;
    private String address;
}
