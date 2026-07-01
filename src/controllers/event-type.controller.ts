import { 
    createEventTypeService, 
    deleteEventTypeService, 
    getEventTypePublic, 
    getEventTypesByUserIdService, 
    updateEventTypeService ,getEventTypeByEventIdService
} from "../services/event-types.service.js";
import { Request, Response } from "express";
import { sendSuccess } from "../utils/api-response.js";

// Helper to safely extract user ID from request (populated by authentication middleware)
function getAuthenticatedUserId(req: Request): number {
    const userId = (req as any).userId || (req as any).user?.id || (req as any).user || req.headers['x-user-id'];
    return Number(userId);
}

// Find all event types of a host/user
export async function getEventsByUser(req: Request, res: Response) {
   const hostId = Number(req.params.hostId);
    const response = await getEventTypesByUserIdService(hostId);
    sendSuccess(res, response);
}

// get event by id
export async function getEventTypeById(req:Request,res:Response){
    const {eventId} = req.params;
    const response = await getEventTypeByEventIdService(Number(eventId));
    sendSuccess(res,response);
}

// Create a new event type for the authenticated user
export async function createEventType(req: Request, res: Response) {
    const userId = getAuthenticatedUserId(req);
    console.log(userId);
    const response = await createEventTypeService(userId, req.body);
    sendSuccess(res, response, 201, "Event type created successfully");
}

// Update an existing event type of the user
export async function updateEventType(req: Request, res: Response) {
    const userId = getAuthenticatedUserId(req);
    const eventId = Number(req.params.eventId);
    const response = await updateEventTypeService(eventId, req.body, userId);
    sendSuccess(res, response, 200, "Event type updated successfully");
}

// Delete an event type of the user
export async function deleteEventType(req: Request, res: Response) {
    const userId = getAuthenticatedUserId(req);
    const eventId = Number(req.params.eventId);
    const response = await deleteEventTypeService(userId, eventId);
    sendSuccess(res, response, 200, "Event type deleted successfully");
}

// Get public event details by userId and event slug
export async function getPublicEventType(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const slug = req.params.slug as string;
    const response = await getEventTypePublic(slug, userId);
    sendSuccess(res, response);
}
