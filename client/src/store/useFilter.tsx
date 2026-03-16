import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

type FilterStore = {
  season: string[];
  difficulty: string[];
  allCrops: any[];
  filteredCrops: any[];
  setSeason: (season: string[]) => void;
  setDifficulty: (difficulty: string[]) => void;
  setCrops: () => void;
  applyFilters: () => void;
  resetFilters: () => void;
  currentPage: number;
  totalPage: number;
  setPagination: (page: number) => void;
  totalCrops: number;
  getIndividualCrop: (id: string) => void;
  IndividualCrop: any;
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  season: [],
  difficulty: [],
  IndividualCrop: null,
  allCrops: [],
  filteredCrops: [],
  currentPage: 1,
  totalPage: 1,
  totalCrops: 0,
  setSeason: (season) => set({ season }),

  setDifficulty: (difficulty) => set({ difficulty }),

  setCrops: async () => {
    const page = get().currentPage;
    const result = await axiosInstance.get(`/crop/all?page=${page}`);
    const totalPage = Math.ceil(result.data.pagination.total / 9);
    console.log(result.data);
    set({
      allCrops: result.data.crop,
      filteredCrops: result.data.crop,
      currentPage: result.data.pagination.page,
      totalPage,
      totalCrops: result.data.pagination.total,
    });
    console.log("hi");
  },

  applyFilters: async () => {
    const { season, difficulty, currentPage } = get();
    const difficult = difficulty.map((difficult) =>
      difficult.toLocaleLowerCase(),
    );

    console.log("Filter clicked");

    const result = await axiosInstance.get("/crop/all", {
      params: {
        page: currentPage,
        season: season.join(","),
        difficulty: difficult.join(","),
      },
    });

    console.log(result.data);
    set({
      allCrops: result.data.crop,
      filteredCrops: result.data.crop,
      currentPage: result.data.pagination.page,
      totalPage: Math.ceil(result.data.pagination.total / 9),
    });
  },

  resetFilters: () =>
    set((state) => ({
      season: [],
      difficulty: [],
      filteredCrops: state.allCrops,
    })),
  setPagination: async (page) => {
    const result = await axiosInstance.get(`/crop/all?page=${page}`);
    console.log(result.data);
    set({
      allCrops: result.data.crop,
      filteredCrops: result.data.crop,
      currentPage: result.data.pagination.page,
      totalPage: Math.ceil(result.data.pagination.total / 9),
    });
  },

  getIndividualCrop: async (id) => {
    try {
      const result = await axiosInstance.get(`/crop/crop/${id}`);
      console.log(result.data.crop);
      set({ IndividualCrop: result.data.crop });
    } catch (error) {
      console.log("eror");
    }
  },
}));
