import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./CardsSkeleton.css";

function CardsSkeleton() {
  return (
    <div className="wrapper">
      {Array(15)
        .fill(0)
        .map((_, idx) => (
          <div className="card-skeleton" key={idx}>
            <div className="img-skeleton">
              <Skeleton
                height={144}
                width={250}
                baseColor="#d1d1d1"
                highlightColor="#f8f8f8"
              />
            </div>
            <div className="title-skeleton">
              <Skeleton
                height={20}
                width={250}
                baseColor="#d1d1d1"
                highlightColor="#f8f8f8"
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default CardsSkeleton;
