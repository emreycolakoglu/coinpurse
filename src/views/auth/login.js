import React from "react";
import { GoogleLogin } from "react-google-login";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";

export default function login() {
  return (
    <View>
      <Navbar />
      <Content>
        <GoogleLogin
          clientId="636903529410-mc5rg3i5qopj7dtnlbs313rapippchbs.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(response) => {
            console.log(response);
          }}
          onFailure={(response) => {
            console.log(response);
          }}
          cookiePolicy={"single_host_origin"}
        />
      </Content>
    </View>
  );
}
