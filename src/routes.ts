import { Router } from "express";
import { CreateRoomController } from "./controllers/CreateRoomController";
import { CreateRoomSubjectController } from "./controllers/CreateRoomSubjectController";
import { CreateSubjectController } from "./controllers/CreateSubjectController";
import { CreateVideoController } from "./controllers/CreateVideoController";
const routes = Router()

/**
 * Rotas para disciplina/subject
 */
routes.post('/subjects', new CreateSubjectController().handle);

/**
 * Rotas para aulas/salas/room
 */
routes.post('/rooms', new CreateRoomController().handle);
routes.post('/rooms/subject', new CreateRoomSubjectController().handle);

/**
 * Rotas para aulas/salas/room
 */
routes.post('/videos', new CreateVideoController().handle);

export default routes;