// import mongoose from "mongoose";

// const participantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   group: { type: String, required: true },
//   competitionName: { type: String, required: true }
// });

// export default mongoose.model("Participant", participantSchema);


import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  competitionName: { type: String, required: true },
});

// 🔐 Prevent duplicate submission for same name+group+competition
participantSchema.index(
  { name: 1, group: 1, competitionName: 1 },
  { unique: true }
);

export default mongoose.model("Participant", participantSchema);
