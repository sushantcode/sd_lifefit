package com.amplifyframework.datastore.generated.model;

import com.amplifyframework.util.Immutable;
import com.amplifyframework.core.model.Model;
import com.amplifyframework.core.model.ModelProvider;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
/** 
 *  Contains the set of model classes that implement {@link Model}
 * interface.
 */

public final class AmplifyModelProvider implements ModelProvider {
<<<<<<< HEAD
<<<<<<< HEAD
  private static final String AMPLIFY_MODEL_VERSION = "ec3efd7c030a2a0cd97caf7aa3c2cf8b";
=======
  private static final String AMPLIFY_MODEL_VERSION = "934c7d32b8f4395042f8a3bf057eaa8f";
>>>>>>> final implementation
=======
  private static final String AMPLIFY_MODEL_VERSION = "ec3efd7c030a2a0cd97caf7aa3c2cf8b";
>>>>>>> 809bdb204432155dd1e0395fc126a258378deb8d
  private static AmplifyModelProvider amplifyGeneratedModelInstance;
  private AmplifyModelProvider() {
    
  }
  
  public static AmplifyModelProvider getInstance() {
    if (amplifyGeneratedModelInstance == null) {
      amplifyGeneratedModelInstance = new AmplifyModelProvider();
    }
    return amplifyGeneratedModelInstance;
  }
  
  /** 
   * Get a set of the model classes.
   * 
   * @return a set of the model classes.
   */
  @Override
   public Set<Class<? extends Model>> models() {
    final Set<Class<? extends Model>> modifiableSet = new HashSet<>(
<<<<<<< HEAD
<<<<<<< HEAD
          Arrays.<Class<? extends Model>>asList(FitbitTokens.class, UserDetails.class)
=======
          Arrays.<Class<? extends Model>>asList(UserDetails.class)
>>>>>>> final implementation
=======
          Arrays.<Class<? extends Model>>asList(FitbitTokens.class, UserDetails.class)
>>>>>>> 809bdb204432155dd1e0395fc126a258378deb8d
        );
    
        return Immutable.of(modifiableSet);
        
  }
  
  /** 
   * Get the version of the models.
   * 
   * @return the version string of the models.
   */
  @Override
   public String version() {
    return AMPLIFY_MODEL_VERSION;
  }
}
