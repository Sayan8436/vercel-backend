import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: String,
  group: String,
  competitionName: String
});

export default mongoose.model("Participant", participantSchema);
