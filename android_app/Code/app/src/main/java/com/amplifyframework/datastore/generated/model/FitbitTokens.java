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

/** This is an auto generated class representing the FitbitTokens type in your schema. */
@SuppressWarnings("all")
@ModelConfig(pluralName = "FitbitTokens", authRules = {
  @AuthRule(allow = AuthStrategy.PUBLIC, operations = { ModelOperation.CREATE, ModelOperation.UPDATE, ModelOperation.DELETE, ModelOperation.READ })
})
public final class FitbitTokens implements Model {
  public static final QueryField ID = field("FitbitTokens", "id");
  public static final QueryField ACCESS_TOKEN = field("FitbitTokens", "access_token");
  public static final QueryField REFRESH_TOKEN = field("FitbitTokens", "refresh_token");
  public static final QueryField USER_ID = field("FitbitTokens", "user_id");
  public static final QueryField EXPIRES_IN = field("FitbitTokens", "expires_in");
  private final @ModelField(targetType="ID", isRequired = true) String id;
  private final @ModelField(targetType="String") String access_token;
  private final @ModelField(targetType="String") String refresh_token;
  private final @ModelField(targetType="String") String user_id;
  private final @ModelField(targetType="Int") Integer expires_in;
  private @ModelField(targetType="AWSDateTime", isReadOnly = true) Temporal.DateTime createdAt;
  private @ModelField(targetType="AWSDateTime", isReadOnly = true) Temporal.DateTime updatedAt;
  public String getId() {
      return id;
  }
  
  public String getAccessToken() {
      return access_token;
  }
  
  public String getRefreshToken() {
      return refresh_token;
  }
  
  public String getUserId() {
      return user_id;
  }
  
  public Integer getExpiresIn() {
      return expires_in;
  }
  
  public Temporal.DateTime getCreatedAt() {
      return createdAt;
  }
  
  public Temporal.DateTime getUpdatedAt() {
      return updatedAt;
  }
  
  private FitbitTokens(String id, String access_token, String refresh_token, String user_id, Integer expires_in) {
    this.id = id;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.user_id = user_id;
    this.expires_in = expires_in;
  }
  
  @Override
   public boolean equals(Object obj) {
      if (this == obj) {
        return true;
      } else if(obj == null || getClass() != obj.getClass()) {
        return false;
      } else {
      FitbitTokens fitbitTokens = (FitbitTokens) obj;
      return ObjectsCompat.equals(getId(), fitbitTokens.getId()) &&
              ObjectsCompat.equals(getAccessToken(), fitbitTokens.getAccessToken()) &&
              ObjectsCompat.equals(getRefreshToken(), fitbitTokens.getRefreshToken()) &&
              ObjectsCompat.equals(getUserId(), fitbitTokens.getUserId()) &&
              ObjectsCompat.equals(getExpiresIn(), fitbitTokens.getExpiresIn()) &&
              ObjectsCompat.equals(getCreatedAt(), fitbitTokens.getCreatedAt()) &&
              ObjectsCompat.equals(getUpdatedAt(), fitbitTokens.getUpdatedAt());
      }
  }
  
  @Override
   public int hashCode() {
    return new StringBuilder()
      .append(getId())
      .append(getAccessToken())
      .append(getRefreshToken())
      .append(getUserId())
      .append(getExpiresIn())
      .append(getCreatedAt())
      .append(getUpdatedAt())
      .toString()
      .hashCode();
  }
  
  @Override
   public String toString() {
    return new StringBuilder()
      .append("FitbitTokens {")
      .append("id=" + String.valueOf(getId()) + ", ")
      .append("access_token=" + String.valueOf(getAccessToken()) + ", ")
      .append("refresh_token=" + String.valueOf(getRefreshToken()) + ", ")
      .append("user_id=" + String.valueOf(getUserId()) + ", ")
      .append("expires_in=" + String.valueOf(getExpiresIn()) + ", ")
      .append("createdAt=" + String.valueOf(getCreatedAt()) + ", ")
      .append("updatedAt=" + String.valueOf(getUpdatedAt()))
      .append("}")
      .toString();
  }
  
  public static BuildStep builder() {
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
  public static FitbitTokens justId(String id) {
    try {
      UUID.fromString(id); // Check that ID is in the UUID format - if not an exception is thrown
    } catch (Exception exception) {
      throw new IllegalArgumentException(
              "Model IDs must be unique in the format of UUID. This method is for creating instances " +
              "of an existing object with only its ID field for sending as a mutation parameter. When " +
              "creating a new object, use the standard builder method and leave the ID field blank."
      );
    }
    return new FitbitTokens(
      id,
      null,
      null,
      null,
      null
    );
  }
  
  public CopyOfBuilder copyOfBuilder() {
    return new CopyOfBuilder(id,
      access_token,
      refresh_token,
      user_id,
      expires_in);
  }
  public interface BuildStep {
    FitbitTokens build();
    BuildStep id(String id) throws IllegalArgumentException;
    BuildStep accessToken(String accessToken);
    BuildStep refreshToken(String refreshToken);
    BuildStep userId(String userId);
    BuildStep expiresIn(Integer expiresIn);
  }
  

  public static class Builder implements BuildStep {
    private String id;
    private String access_token;
    private String refresh_token;
    private String user_id;
    private Integer expires_in;
    @Override
     public FitbitTokens build() {
        String id = this.id != null ? this.id : UUID.randomUUID().toString();
        
        return new FitbitTokens(
          id,
          access_token,
          refresh_token,
          user_id,
          expires_in);
    }
    
    @Override
     public BuildStep accessToken(String accessToken) {
        this.access_token = accessToken;
        return this;
    }
    
    @Override
     public BuildStep refreshToken(String refreshToken) {
        this.refresh_token = refreshToken;
        return this;
    }
    
    @Override
     public BuildStep userId(String userId) {
        this.user_id = userId;
        return this;
    }
    
    @Override
     public BuildStep expiresIn(Integer expiresIn) {
        this.expires_in = expiresIn;
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
    private CopyOfBuilder(String id, String accessToken, String refreshToken, String userId, Integer expiresIn) {
      super.id(id);
      super.accessToken(accessToken)
        .refreshToken(refreshToken)
        .userId(userId)
        .expiresIn(expiresIn);
    }
    
    @Override
     public CopyOfBuilder accessToken(String accessToken) {
      return (CopyOfBuilder) super.accessToken(accessToken);
    }
    
    @Override
     public CopyOfBuilder refreshToken(String refreshToken) {
      return (CopyOfBuilder) super.refreshToken(refreshToken);
    }
    
    @Override
     public CopyOfBuilder userId(String userId) {
      return (CopyOfBuilder) super.userId(userId);
    }
    
    @Override
     public CopyOfBuilder expiresIn(Integer expiresIn) {
      return (CopyOfBuilder) super.expiresIn(expiresIn);
    }
  }
  
}
