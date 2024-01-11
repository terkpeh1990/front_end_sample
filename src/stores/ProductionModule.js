import { get, post, query, update } from "@/@core/services/ApiService";
import { defineStore } from "pinia";

export const useProductionStore = defineStore("production", () => {
  const url = localStorage.getItem("baseUrl");

  const productionData = ref([]);

  const fetchProductions = async (page = 1, search = "", page_size) => {
    let params = { page, page_size };
    if (search !== "") {
      params = { ...params, search };
    }

    return query("/production/request", { params })
      .then(async res => {
        productionData.value = res.data;

        return res.data;
      })
      .catch(err => {
        productionData.value = [];
        
        return err.response;
      });
  };

  const fetchProductionHistory = async (page = 1, search = "", page_size) => {
    let params = { page, page_size };
    if (search !== "") {
      params = { ...params, search };
    }

    return query("/production/history", { params })
      .then(async res => {
        return res.data;
      })
      .catch(err => {
        return err.response;
      });
  };

  const fetchShifts = async () => {
    return get("/shifts")
      .then(async res => {
        return res.data;
      })
      .catch(err => {
        return err.response;
      });
  };

  const createProduction = async payload => {
    return post("/production/request/", payload)
      .then(async res => {
        return res;
      })
      .catch(err => {
        return err.response;
      });
  };

  const createShift = async payload => {
    return post("/shifts/", payload)
      .then(async res => {
        return res;
      })
      .catch(err => {
        return err.response;
      });
  };

  const fetchSingleProduction = async productionId => {
    return get("/production/request", productionId)
      .then(async data => {
        return data;
      })
      .catch(err => {
        return err.response;
      });
  };

  const approveProduction = async (productionId, payload) => {
    return update("/production/approve/request", productionId, payload)
      .then(async data => {
        return data;
      })
      .catch(err => {
        return err.response;
      });
  };

  const approveSupply = async (productionId, payload) => {
    return update(`/production/approved/issued/materials`, productionId, payload)
      .then(async data => {
        return data;
      })
      .catch(err => {
        return err.response;
      });
  };

  const beginProduction = async (productionId, payload) => {
    return update(`/production/start`, productionId, payload)
      .then(async data => {
        return data;
      })
      .catch(err => {
        return err.response;
      });
  };

  const issueMaterial = async (productionId, rmId, payload) => {
    return update(
      `/production/issue/raw_material/${productionId}`,
      rmId,
      payload,
    )
      .then(async data => {
        return data;
      })
      .catch(err => {
        return err.response;
      });
  };

  const completeSupply = async (productionId, payload) => {
    return update(
      `/production/comfirmed/issued/materials`,
      productionId,
      payload,
    )
      .then(async data => {
        return data;
      })
      .catch(err => {
        return err.response;
      });
  };

  const cancelProduction = async (productionId, payload) => {
    return update("/production/cancel/request", productionId, payload)
      .then(async data => {
        return data;
      })
      .catch(err => {
        return err.response;
      });
  };

  return {
    fetchProductions,
    createProduction,
    createShift,
    fetchShifts,
    fetchSingleProduction,
    fetchProductionHistory,
    productionData,
    approveProduction,
    cancelProduction,
    issueMaterial,
    completeSupply,
    approveSupply,
    beginProduction,
  };
});
