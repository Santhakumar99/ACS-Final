import React from "react";
import ChartContent from "../Charts/ChartContent";
import BarChart from "../Charts/BarChart";
import CardCount from "./CardCount";

const CardsContent = () => {
  const cardStyle = {
    padding: "10px",
    fontFamily: "Arial",
  };
  return (
    <div>
      <div style={cardStyle} className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              {/* <div className="card-title">card 1</div> */}
              <CardCount />
            </div>
          </div>
        </div>
      </div>
      <div style={cardStyle} className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Pie Chart </div>
              <ChartContent />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Bar Chart</div>
              <BarChart />
            </div>
          </div>
        </div>
      </div>
      <div style={cardStyle} className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">card 4</div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">card 5</div>
            </div>
          </div>
        </div>
      </div>
      <div style={cardStyle} className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">card 6</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsContent;
