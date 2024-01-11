import { get, post } from '@/@core/services/ApiService';
import { createAxiosInstance } from "@/plugins/axios";
import { defineStore } from "pinia";

export const useRecipeStore = defineStore('recipe', () => {
 
  const url  = localStorage.getItem('baseUrl');

  const fetchRecipes = async () => {
    return get('/recipes')
      .then(async res => {
        
        return res.data;
      }).catch(err => {
        return err.response
      })
  }

  const createRecipe = async payload => {
    return post('/recipes/', payload)
      .then(async res => {
        
        return res;
      }).catch(err => {
        return err.response
      })
  }

  return { fetchRecipes, createRecipe }

})
