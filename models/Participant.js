import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  competitionName: { type: String, required: true }
});

export default mongoose.model("Participant", participantSchema);
