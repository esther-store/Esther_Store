import React, { useState, useEffect, useContext } from "react";
import { getCategories } from "../services/getCategories";
import { deleteCategories } from "../services/ManageCategories/deleteCategories";
import { createCategory } from "../services/ManageCategories/createCategory";
import { updateCategory } from "../services/ManageCategories/updateCategory";
import AuthenticationContext from '../context/authenticationContext.jsx'

export function useManageCategories({toastRef, setSelectedCategories, setCategoryFormProperties}) {
  const {auth} = useContext(AuthenticationContext)
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoading] = useState(false);
  const [updateCategories, setUpdateCategories] = useState(false); //state to mark when to re-fetch the Categories

  const showToast = ({
    severity = "success",
    summary = "Éxito",
    detail = "Operación Exitosa",
    life = 3000,
  }) => {
    toastRef.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };

  //get Categories
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [updateCategories]);

  //update the categories list when is necesary
  function handleSetUpdateCategories(){
    setUpdateCategories(prev => !prev)
  }

  //delete one product by its id
  function handleDeleteCategory(categoryId) {
    const categoryIds = categoryId.map(category => category.id)
    setLoading(true);
    deleteCategories({ categories: categoryIds, token:auth.token })
      .then((res) => {
        handleSetUpdateCategories()
        setSelectedCategories([])
        showToast({
          severity: "success",
          summary: "Éxito",
          detail: "Operación Exitosa",
        });
      })
      .catch((err) => {
        setLoading(false);
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Fallo en la Operación",
        });
      });
    }  

    //delete multiple Categories by a list of ids
    function handleDeleteMultipleCategories(categories) {
        if(categories.length > 0) {
            //create a list only with the ids
            const categoriesId = categories.map(category => category.id)
            setLoading(true);
            deleteCategories({ categories: categoriesId, token:auth.token })
              .then((res) => {
                handleSetUpdateCategories()
                setSelectedCategories([])
                showToast({
                  severity: "success",
                  summary: "Éxito",
                  detail: "Operación Exitosa",
                });
              })
              .catch((err) => {
                setLoading(false);
                showToast({
                  severity: "error",
                  summary: "Error",
                  detail: "Fallo en la Operación",
                });
              });
        }
        else{
            showToast({
                severity: "error",
                summary: "Error",
                detail: "Debes seleccionar alguna categoria",
            })
        }
    }
  
    function handleCreateCategory({name, img}){
      if(name === undefined || name === "" || name == null){
        showToast({severity: "error", summary: "Error", detail: "Debes ingresar un nombre",})
      }
      else{
        setLoading(true)
        createCategory({name:name, img:img, token:auth.token})
        .then(res => {
          setUpdateCategories(prev => !prev)
          setSelectedCategories([])
          setCategoryFormProperties(prev => ({...prev, show:false}))
          setLoading(false)
          showToast({
            severity: "success",
            summary: "Éxito",
            detail: "Operación Exitosa",
          });
        })
        .catch(err => {
          setLoading(false)
          showToast({
            severity: "error",
            summary: "Error",
            detail: err.message,
        })
        })
      }
    }

    function handleUpdateCategory({id, name, img}){
      if(name === undefined || name === "" || name == null){
        showToast({severity: "error", summary: "Error", detail: "Debes ingresar un nombre",})
      }
      else{
        setLoading(true)
        updateCategory({id:id, name:name, img:img, token:auth.token})
        .then(res => {
          setUpdateCategories(prev => !prev)
          setSelectedCategories([])
          setCategoryFormProperties(prev => ({...prev, show:false}))
          setLoading(false)
          showToast({
            severity: "success",
            summary: "Éxito",
            detail: "Operación Exitosa",
          });
        })
        .catch(err => {
          setLoading(false)
          showToast({
            severity: "error",
            summary: "Error",
            detail: err.message,
        })
        })
      }
    }

  return {
    categories,
    loadingCategories,
    setLoading,
    updateCategories,
    setUpdateCategories,
    showToast,
    handleDeleteCategory,
    handleDeleteMultipleCategories,
    handleCreateCategory,
    handleUpdateCategory,
  };
}
