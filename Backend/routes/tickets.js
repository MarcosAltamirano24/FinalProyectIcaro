import express from "express";
import { Ticket } from "../models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) res.json(ticket);
    else res.status(404).json({ error: "Ticket no encontrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      await ticket.update(req.body);
      res.json(ticket);
    } else res.status(404).json({ error: "Ticket no encontrado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      await ticket.destroy();
      res.json({ message: "Ticket eliminado" });
    } else res.status(404).json({ error: "Ticket no encontrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
