import React from "react";
import Navbar from "../components/navbar/navbar";
import View from "../components/view/view";
import SingleValueCard from "../components/cards/singleValueCard";

export default function Dashboard() {
  return (
    <View>
      <Navbar />
      <div style={{width: "250px"}}>
        <SingleValueCard
          value="25"
          unit="₺"
          header="Test Value"
          title="Today"
        />
      </div>
    </View>
  );
}
