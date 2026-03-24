const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crm');

// Create schema
const LeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    source: String,
    status: { type: String, default: "new" },
    notes: String
});

const Lead = mongoose.model("Lead", LeadSchema);

// Add lead
app.post('/leads', async (req, res) => {
    const lead = new Lead(req.body);
    await lead.save();
    res.send(lead);
});

// Get leads
app.get('/leads', async (req, res) => {
    const leads = await Lead.find();
    res.send(leads);
});

// Update status
app.put('/leads/:id/status', async (req, res) => {
    await Lead.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });
    res.send("Status updated");
});

app.listen(5000, () => console.log("Server running on port 5000"));
// Add Notes
app.put('/leads/:id/notes', async (req, res) => {
    await Lead.findByIdAndUpdate(req.params.id, {
        notes: req.body.notes
    });
    res.send("Notes added");
});
// DELETE LEAD
app.delete('/leads/:id', async (req, res) => {
    await Lead.findByIdAndDelete(req.params.id);
    res.send("Lead deleted");
});