import React from "react";

const Stats = ({ stats }) => {
  return (
    <div className="stats-wrapper">
      {stats !== undefined &&
        stats.map((stat) => {
          const barPercentage = (stat.base / 200) * 100;
          return (
            <div key={stat.statName} className="stats-inner">
              <div className="stat-bar-outer"></div>
              <div
                className="stat-bar"
                style={{
                  backgroundImage: `linear-gradient(to top, #e3350d ${barPercentage}%, #596067 ${barPercentage}%, #596067 100%)`,
                }}
              ></div>
              <span className="stats-number">{stat.base}</span>

              <h4>{stat.statName}</h4>
            </div>
          );
        })}
    </div>
  );
};

export default Stats;
