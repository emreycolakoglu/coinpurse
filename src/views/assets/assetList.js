import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";
import Table from "react-bootstrap/Table";
import { AssetService } from "../../sources/db/assetService";

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    doit();
  }, []);

  async function doit() {
    const assets = new AssetService();
    const asx = await assets.getAssets();
    setAssets(asx);
  }

  return (
    <View>
      <Navbar />
      <Content>
        <div>
          <Link to="/assets/create" className="btn btn-primary">
            Create
          </Link>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a, i) => {
                return (
                  <tr key={i}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Content>
    </View>
  );
}
