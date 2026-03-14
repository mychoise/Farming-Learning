import { create } from "zustand";

type FilterStore = {
  season: string[];
  difficulty: string[];

  allCrops: any[];
  filteredCrops: any[];

  setSeason: (season: string[]) => void;
  setDifficulty: (difficulty: string[]) => void;

  setCrops: (crops: any[]) => void;
  applyFilters: () => void;

  resetFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  season: [],
  difficulty: [],

  allCrops: [],
  filteredCrops: [],

  setSeason: (season) => set({ season }),

  setDifficulty: (difficulty) => set({ difficulty }),

  setCrops: (crops) =>
    set({
      allCrops: crops,
      filteredCrops: crops,
    }),

  applyFilters: () => {
    const { season, difficulty, allCrops } = get();

    const filtered = allCrops.filter((crop) => {
      const seasonMatch =
        season.length === 0 || season.includes(crop.crop.season);

      const difficultyMatch =
        difficulty.length === 0 || difficulty.includes(crop.crop.difficulty);

      return seasonMatch && difficultyMatch;
    });

    set({ filteredCrops: filtered });
  },

  resetFilters: () =>
    set((state) => ({
      season: [],
      difficulty: [],
      filteredCrops: state.allCrops,
    })),
}));
