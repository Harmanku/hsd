"use client";
import React from "react";
import StoryComponent from "./StoryComponent";
import PartnerStories from "./PartnerStories";

const Judgement = ({ userSystem }:any) => {
  const filterPending = (stories:any) => {
    if (!stories) {
      return null;
    }

    let res = stories.map((ele:any, index:any) => {
      ele.bigIndex = index;
      return ele;
    });
    res = res.filter((ele:any) => ele.pending);
    
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
