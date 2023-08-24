"use client";
import React from "react";
import StoryComponent from "./StoryComponent";
import PartnerStories from "./PartnerStories";

const Judgement = ({ userSystem }) => {
  const filterPending = (stories) => {
    if (!stories) {
      return null;
    }

    let res = stories.map((ele, index) => {
      ele.bigIndex = index;
      return ele;
    });
    res = res.filter((ele) => ele.pending);
    
    return res;
  };

  return (
    <>
      <StoryComponent
        userSystem={userSystem}
        stories={filterPending(userSystem.partnerStories)}
      />
      <PartnerStories userSystem={userSystem} />
    </>
  );
};

export default Judgement;
