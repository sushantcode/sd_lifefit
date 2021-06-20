package com.amplifyframework.datastore.generated.model;

import com.amplifyframework.core.model.temporal.Temporal;

import java.util.List;
import java.util.UUID;
import java.util.Objects;

import androidx.core.util.ObjectsCompat;

import com.amplifyframework.core.model.AuthStrategy;
import com.amplifyframework.core.model.Model;
import com.amplifyframework.core.model.ModelOperation;
import com.amplifyframework.core.model.annotations.AuthRule;
import com.amplifyframework.core.model.annotations.Index;
import com.amplifyframework.core.model.annotations.ModelConfig;
import com.amplifyframework.core.model.annotations.ModelField;
import com.amplifyframework.core.model.query.predicate.QueryField;

import static com.amplifyframework.core.model.query.predicate.QueryField.field;

/** This is an auto generated class representing the UserDetails type in your schema. */
@SuppressWarnings("all")
@ModelConfig(pluralName = "UserDetails", authRules = {
  @AuthRule(allow = AuthStrategy.OWNER, ownerField = "owner", identityClaim = "cognito:username", operations = { ModelOperation.CREATE, ModelOperation.DELETE, ModelOperation.UPDATE })
})
public final class UserDetails implements Model {
  public static final QueryField ID = field("UserDetails", "id");
  public static final QueryField USERNAME = field("UserDetails", "username");
  public static final QueryField EMAIL = field("UserDetails", "email");
  public static final QueryField F_NAME = field("UserDetails", "fName");
  public static final QueryField L_NAME = field("UserDetails", "lName");
  public static final QueryField PHONE = field("UserDetails", "phone");
  public static final QueryField STREET = field("UserDetails", "street");
  public static final QueryField CITY = field("UserDetails", "city");
  public static final QueryField STATE = field("UserDetails", "state");
  public static final QueryField ZIPCODE = field("UserDetails", "zipcode");
  public static final QueryField GENDER = field("UserDetails", "gender");
  public static final QueryField PROFILE_PIC = field("UserDetails", "profile_pic");
  private final @ModelField(targetType="ID", isRequired = true) String id;
  private final @ModelField(targetType="String", isRequired = true) String username;
  private final @ModelField(targetType="String", isRequired = true) String email;
  private final @ModelField(targetType="String", isRequired = true) String fName;
  private final @ModelField(targetType="String", isRequired = true) String lName;
  private final @ModelField(targetType="String") String phone;
  private final @ModelField(targetType="String") String street;
  private final @ModelField(targetType="String") String city;
  private final @ModelField(targetType="String") String state;
  private final @ModelField(targetType="String") String zipcode;
  private final @ModelField(targetType="String") String gender;
  private final @ModelField(targetType="AWSURL") String profile_pic;
  private @ModelField(targetType="AWSDateTime", isReadOnly = true) Temporal.DateTime createdAt;
  private @ModelField(targetType="AWSDateTime", isReadOnly = true) Temporal.DateTime updatedAt;
  public String getId() {
      return id;
  }
  
  public String getUsername() {
      return username;
  }
  
  public String getEmail() {
      return email;
  }
  
  public String getFName() {
      return fName;
  }
  
  public String getLName() {
      return lName;
  }
  
  public String getPhone() {
      return phone;
  }
  
  public String getStreet() {
      return street;
  }
  
  public String getCity() {
      return city;
  }
  
  public String getState() {
      return state;
  }
  
  public String getZipcode() {
      return zipcode;
  }
  
  public String getGender() {
      return gender;
  }
  
  public String getProfilePic() {
      return profile_pic;
  }
  
  public Temporal.DateTime getCreatedAt() {
      return createdAt;
  }
  
  public Temporal.DateTime getUpdatedAt() {
      return updatedAt;
  }
  
  private UserDetails(String id, String username, String email, String fName, String lName, String phone, String street, String city, String state, String zipcode, String gender, String profile_pic) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fName = fName;
    this.lName = lName;
    this.phone = phone;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.gender = gender;
    this.profile_pic = profile_pic;
  }
  
  @Override
   public boolean equals(Object obj) {
      if (this == obj) {
        return true;
      } else if(obj == null || getClass() != obj.getClass()) {
        return false;
      } else {
      UserDetails userDetails = (UserDetails) obj;
      return ObjectsCompat.equals(getId(), userDetails.getId()) &&
              ObjectsCompat.equals(getUsername(), userDetails.getUsername()) &&
              ObjectsCompat.equals(getEmail(), userDetails.getEmail()) &&
              ObjectsCompat.equals(getFName(), userDetails.getFName()) &&
              ObjectsCompat.equals(getLName(), userDetails.getLName()) &&
              ObjectsCompat.equals(getPhone(), userDetails.getPhone()) &&
              ObjectsCompat.equals(getStreet(), userDetails.getStreet()) &&
              ObjectsCompat.equals(getCity(), userDetails.getCity()) &&
              ObjectsCompat.equals(getState(), userDetails.getState()) &&
              ObjectsCompat.equals(getZipcode(), userDetails.getZipcode()) &&
              ObjectsCompat.equals(getGender(), userDetails.getGender()) &&
              ObjectsCompat.equals(getProfilePic(), userDetails.getProfilePic()) &&
              ObjectsCompat.equals(getCreatedAt(), userDetails.getCreatedAt()) &&
              ObjectsCompat.equals(getUpdatedAt(), userDetails.getUpdatedAt());
      }
  }
  
  @Override
   public int hashCode() {
    return new StringBuilder()
      .append(getId())
      .append(getUsername())
      .append(getEmail())
      .append(getFName())
      .append(getLName())
      .append(getPhone())
      .append(getStreet())
      .append(getCity())
      .append(getState())
      .append(getZipcode())
      .append(getGender())
      .append(getProfilePic())
      .append(getCreatedAt())
      .append(getUpdatedAt())
      .toString()
      .hashCode();
  }
  
  @Override
   public String toString() {
    return new StringBuilder()
      .append("UserDetails {")
      .append("id=" + String.valueOf(getId()) + ", ")
      .append("username=" + String.valueOf(getUsername()) + ", ")
      .append("email=" + String.valueOf(getEmail()) + ", ")
      .append("fName=" + String.valueOf(getFName()) + ", ")
      .append("lName=" + String.valueOf(getLName()) + ", ")
      .append("phone=" + String.valueOf(getPhone()) + ", ")
      .append("street=" + String.valueOf(getStreet()) + ", ")
      .append("city=" + String.valueOf(getCity()) + ", ")
      .append("state=" + String.valueOf(getState()) + ", ")
      .append("zipcode=" + String.valueOf(getZipcode()) + ", ")
      .append("gender=" + String.valueOf(getGender()) + ", ")
      .append("profile_pic=" + String.valueOf(getProfilePic()) + ", ")
      .append("createdAt=" + String.valueOf(getCreatedAt()) + ", ")
      .append("updatedAt=" + String.valueOf(getUpdatedAt()))
      .append("}")
      .toString();
  }
  
  public static UsernameStep builder() {
      return new Builder();
  }
  
  /** 
   * WARNING: This method should not be used to build an instance of this object for a CREATE mutation.
   * This is a convenience method to return an instance of the object with only its ID populated
   * to be used in the context of a parameter in a delete mutation or referencing a foreign key
   * in a relationship.
   * @param id the id of the existing item this instance will represent
   * @return an instance of this model with only ID populated
   * @throws IllegalArgumentException Checks that ID is in the proper format
   */
  public static UserDetails justId(String id) {
    try {
      UUID.fromString(id); // Check that ID is in the UUID format - if not an exception is thrown
    } catch (Exception exception) {
      throw new IllegalArgumentException(
              "Model IDs must be unique in the format of UUID. This method is for creating instances " +
              "of an existing object with only its ID field for sending as a mutation parameter. When " +
              "creating a new object, use the standard builder method and leave the ID field blank."
      );
    }
    return new UserDetails(
      id,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }
  
  public CopyOfBuilder copyOfBuilder() {
    return new CopyOfBuilder(id,
      username,
      email,
      fName,
      lName,
      phone,
      street,
      city,
      state,
      zipcode,
      gender,
      profile_pic);
  }
  public interface UsernameStep {
    EmailStep username(String username);
  }
  

  public interface EmailStep {
    FNameStep email(String email);
  }
  

  public interface FNameStep {
    LNameStep fName(String fName);
  }
  

  public interface LNameStep {
    BuildStep lName(String lName);
  }
  

  public interface BuildStep {
    UserDetails build();
    BuildStep id(String id) throws IllegalArgumentException;
    BuildStep phone(String phone);
    BuildStep street(String street);
    BuildStep city(String city);
    BuildStep state(String state);
    BuildStep zipcode(String zipcode);
    BuildStep gender(String gender);
    BuildStep profilePic(String profilePic);
  }
  

  public static class Builder implements UsernameStep, EmailStep, FNameStep, LNameStep, BuildStep {
    private String id;
    private String username;
    private String email;
    private String fName;
    private String lName;
    private String phone;
    private String street;
    private String city;
    private String state;
    private String zipcode;
    private String gender;
    private String profile_pic;
    @Override
     public UserDetails build() {
        String id = this.id != null ? this.id : UUID.randomUUID().toString();
        
        return new UserDetails(
          id,
          username,
          email,
          fName,
          lName,
          phone,
          street,
          city,
          state,
          zipcode,
          gender,
          profile_pic);
    }
    
    @Override
     public EmailStep username(String username) {
        Objects.requireNonNull(username);
        this.username = username;
        return this;
    }
    
    @Override
     public FNameStep email(String email) {
        Objects.requireNonNull(email);
        this.email = email;
        return this;
    }
    
    @Override
     public LNameStep fName(String fName) {
        Objects.requireNonNull(fName);
        this.fName = fName;
        return this;
    }
    
    @Override
     public BuildStep lName(String lName) {
        Objects.requireNonNull(lName);
        this.lName = lName;
        return this;
    }
    
    @Override
     public BuildStep phone(String phone) {
        this.phone = phone;
        return this;
    }
    
    @Override
     public BuildStep street(String street) {
        this.street = street;
        return this;
    }
    
    @Override
     public BuildStep city(String city) {
        this.city = city;
        return this;
    }
    
    @Override
     public BuildStep state(String state) {
        this.state = state;
        return this;
    }
    
    @Override
     public BuildStep zipcode(String zipcode) {
        this.zipcode = zipcode;
        return this;
    }
    
    @Override
     public BuildStep gender(String gender) {
        this.gender = gender;
        return this;
    }
    
    @Override
     public BuildStep profilePic(String profilePic) {
        this.profile_pic = profilePic;
        return this;
    }
    
    /** 
     * WARNING: Do not set ID when creating a new object. Leave this blank and one will be auto generated for you.
     * This should only be set when referring to an already existing object.
     * @param id id
     * @return Current Builder instance, for fluent method chaining
     * @throws IllegalArgumentException Checks that ID is in the proper format
     */
    public BuildStep id(String id) throws IllegalArgumentException {
        this.id = id;
        
        try {
            UUID.fromString(id); // Check that ID is in the UUID format - if not an exception is thrown
        } catch (Exception exception) {
          throw new IllegalArgumentException("Model IDs must be unique in the format of UUID.",
                    exception);
        }
        
        return this;
    }
  }
  

  public final class CopyOfBuilder extends Builder {
    private CopyOfBuilder(String id, String username, String email, String fName, String lName, String phone, String street, String city, String state, String zipcode, String gender, String profilePic) {
      super.id(id);
      super.username(username)
        .email(email)
        .fName(fName)
        .lName(lName)
        .phone(phone)
        .street(street)
        .city(city)
        .state(state)
        .zipcode(zipcode)
        .gender(gender)
        .profilePic(profilePic);
    }
    
    @Override
     public CopyOfBuilder username(String username) {
      return (CopyOfBuilder) super.username(username);
    }
    
    @Override
     public CopyOfBuilder email(String email) {
      return (CopyOfBuilder) super.email(email);
    }
    
    @Override
     public CopyOfBuilder fName(String fName) {
      return (CopyOfBuilder) super.fName(fName);
    }
    
    @Override
     public CopyOfBuilder lName(String lName) {
      return (CopyOfBuilder) super.lName(lName);
    }
    
    @Override
     public CopyOfBuilder phone(String phone) {
      return (CopyOfBuilder) super.phone(phone);
    }
    
    @Override
     public CopyOfBuilder street(String street) {
      return (CopyOfBuilder) super.street(street);
    }
    
    @Override
     public CopyOfBuilder city(String city) {
      return (CopyOfBuilder) super.city(city);
    }
    
    @Override
     public CopyOfBuilder state(String state) {
      return (CopyOfBuilder) super.state(state);
    }
    
    @Override
     public CopyOfBuilder zipcode(String zipcode) {
      return (CopyOfBuilder) super.zipcode(zipcode);
    }
    
    @Override
     public CopyOfBuilder gender(String gender) {
      return (CopyOfBuilder) super.gender(gender);
    }
    
    @Override
     public CopyOfBuilder profilePic(String profilePic) {
      return (CopyOfBuilder) super.profilePic(profilePic);
    }
  }
  
}
