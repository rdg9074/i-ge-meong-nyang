import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommunityShowpetDetail.css";
import { useSelector } from "react-redux";
import Comments from "../../components/comments/Comments";
import CommentInput from "../../components/comments/CommentInput";
import { getShowList } from "../../api/community";
import CardList from "../../components/CardList";

function CommunityShowpet({ id }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getShowListApi();
  }, []);

  const getShowListApi = async () => {
    const { data } = await getShowList();
    setList(data.data);
  };
  return (
    <div id="showpet">
      <CardList cards={list} />
    </div>
  );
}

export default CommunityShowpet;
