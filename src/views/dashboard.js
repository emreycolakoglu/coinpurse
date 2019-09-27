import React from "react";
import Navbar from "../components/navbar/navbar";
import View from "../components/view/view";
import SingleValueCard from "../components/cards/singleValueCard";
import Content from "../components/view/content";

export default function Dashboard() {

  return (
    <View>
      <Navbar />
      <Content>
        <SingleValueCard
          value="25"
          unit="₺"
          header="Test Value"
          title="Today"
        />
      </Content>
    </View>
  );
}
