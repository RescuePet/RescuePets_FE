import React from 'react'
import Layout from "../../../layouts/Layout"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {__getMissingPostDetail} from "../../../redux/modules/petworkSlice"
import { useEffect } from 'react';

const EditCatch = () => {
  const { id } = useParams();
  // console.log(data)
  return (
    <Layout>EditCatch{id}</Layout>
  )
}

export default EditCatch