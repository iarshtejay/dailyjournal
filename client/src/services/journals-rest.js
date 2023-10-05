import { axiosClient } from "../lib/axiosClient";

const createJournal = (newEntry) => {
  return axiosClient.post("/api/journals", newEntry);
};

const getAllJournals = () => {
  return axiosClient.get("/api/journals");
};

const getJournalById = (id) => {
  return axiosClient.get(`/api/journals/${id}`);
};

const updateJournal = (id, updatedEntry) => {
  return axiosClient.put(`/api/journals/${id}`, updatedEntry);
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
