import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthLayout from '../components/layout/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import CustomFormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import { Formik } from "formik";
import * as Yup from "yup";
import CustomForm from '../components/forms/Form';
import PasswordStrength from '../components/forms/PasswordStrength';
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "At least 6 characters")
    .matches(/[A-Z]/, "Must contain uppercase letter")
    .matches(/[a-z]/, "Must contain lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[@$!%*?&]/, "Must contain special character"),

  confirmPassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

function CreatePasswordScreen({ navigation , setIsLoggedIn }: any) {

  return (
    <AuthLayout>
      <AuthHeader title="Create Password" step={3} navigation={navigation} />

      <CustomForm
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
      onSubmit={(values) => {
  console.log(values);
  setIsLoggedIn(true); 
}}
      >
      
          <>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Set up your password</Text>

              <CustomFormField
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
              />
              <PasswordStrength />
              <CustomFormField
                name="confirmPassword"
                label="Confirm password"
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>

            <View style={styles.footer}>
              <SubmitButton title="Next" />
            </View>
          </>
        </CustomForm> 
    
    </AuthLayout>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 25,
  },

  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default CreatePasswordScreen;