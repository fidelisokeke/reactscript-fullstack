// import { message } from "antd";
// import { message } from "antd";
// import { message } from "antd";
import supabaseConfig from "../config/supabase-config";
// import { data } from "react-router-dom";

export const registerUser = async (values: any) => {
  try {
    //check if email exists or not
    const userExistingResponse = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", values.email);
    if (userExistingResponse.data && userExistingResponse.data.length > 0) {
      throw new Error("Email Already registered, use another email.");
    }

    const signupResponse = await supabaseConfig.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (signupResponse.error) {
      throw new Error(signupResponse.error.message);
    }

    //get the user_id from the response and store remaining data in the user_profiles table
    const userId = signupResponse.data.user?.id;
    const userProfilesTableData = {
      id: userId,
      name: values.name,
      profile_pic: "",
    };

    const userProfileResponse = await supabaseConfig
      .from("user_profiles")
      .insert([userProfilesTableData]);

    if (userProfileResponse.error) {
      throw new Error(userProfileResponse.error.message);
    }
  } catch (error: any) {
    throw new Error(error.message || "something went wrong");
  }
};
export const loginUser = async (values: any) => {
  try {
    const loginResponse = await supabaseConfig.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (loginResponse.error) {
      throw new Error(loginResponse.error.message);
    }

    return {
      success: true,
      message: "user logged in sucessfully",
    };
  } catch (error: any) {
    throw new Error(error.message || "something went wrong");
  }
};
export const getLoggedInUser = async () => {
  try {
    //get session from supabase
    const userRespose = await supabaseConfig.auth.getUser();
    if (userRespose.error) {
      throw new Error(userRespose.error.message);
    }

    //then get user from supabase

    const userId = userRespose.data.user?.id;
    const userProfileResponse = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("id", userId);

    if (userProfileResponse.error || userProfileResponse.data.length === 0) {
      throw new Error(userProfileResponse?.error?.message);
    }

    const result = {
      ...userProfileResponse.data[0],
      ...userRespose.data.user,
    };
    return {
      success: true,
      message: "user fetched successfully",
      data: result,
    };
  } catch (error: any) {
    throw new Error(error.message || "something went wrong");
  }
};

export const updateUserProfile = async (values: any) => {
  try {
    const userProfileResponse = await supabaseConfig
      .from("user_profiles")
      .update({
        name: values.name,
        profile_pic: values.profile_pic,
      })
      .eq("id", values.id);
    if (userProfileResponse.error) {
      throw new Error(userProfileResponse.error.message);
    }
    return {
      success: true,
      message: "user profile updated successfully",
    };
  } catch (error: any) {
    throw new Error(error.message || "something went wrong");
  }
};
