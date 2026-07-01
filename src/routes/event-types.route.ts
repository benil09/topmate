import express, { Router } from "express";
import { 
    createEventType, 
    deleteEventType, 
    getEventsByUser, 
    updateEventType,
    getEventTypeById
} from "../controllers/event-type.controller.js";
import { validate } from "../middlewares/validate.js";
import { createEventTypeSchema, updateEventTypeSchema } from "../dtos/event-type.dto.js";

const eventTypesRouter:Router = express.Router();

// Get all event types for a specific user (host)
eventTypesRouter.get("/user/:hostId", getEventsByUser); // ✅

// Get event by id
eventTypesRouter.get("/:eventId", getEventTypeById); // ✅

// Create a new event type
eventTypesRouter.post("/", validate(createEventTypeSchema), createEventType); //✅x

// Update an existing event type
eventTypesRouter.put("/:eventId", validate(updateEventTypeSchema), updateEventType);

// Delete an event type
eventTypesRouter.delete("/:eventId", deleteEventType);

export default eventTypesRouter;
