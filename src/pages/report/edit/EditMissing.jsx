import React from 'react'
import Layout from "../../../layouts/Layout"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {__getMissingPostDetail} from "../../../redux/modules/petworkSlice"
import { useEffect } from 'react';

const EditMissing = () => {
   const { id } = useParams();
   console.log(id)
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { missingPostDetail } = useSelector((state) => state?.petwork);

   console.log(missingPostDetail)
   useEffect(() => {
    dispatch(__getMissingPostDetail(id));
  }, [id]);




  return (
    <Layout>EditMissing121321312</Layout>
  )
}

export default EditMissing