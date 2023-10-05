import { axiosClient } from "../lib/axiosClient";

const createJournal = (journal) => {
  return axiosClient.post("/api/journals", { journal });
};

const getAllJournals = () => {
  return axiosClient.get("/api/journals");
};

const getJournalById = (id) => {
  return axiosClient.get(`/api/journals/${id}`);
};

const updateJournal = (id, journal) => {
  return axiosClient.put(`/api/journals/${id}`, { journal });
};

const deleteJournal = (id) => {
  return axiosClient.delete(`/api/journals/${id}`);
};

const journalsApi = {
  createJournal,
  getAllJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
};

export default journalsApi;
