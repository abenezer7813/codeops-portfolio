import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';

@Controller('events')
export class EventsController {
    constructor(private readonly eventService: EventsService) {

    }
    @Get()
    findAll(@Query()query:FindEventsQueryDto) {
        return this.eventService.findAll(query)
    }
    @Get('upcoming')
    findUpcoming() {
        return this.eventService.findUpcoming()
    }
    @Get(':id')
    findOne(@Param("id") id: string) {
        return this.eventService.findOne(id)
    }
    @Get(':id/sessions')
    findSessions(@Param('id')eventId:string){
        return this.eventService.findSessions(eventId)
    }
    @Get(':id/sessions/:sessionId')
    findSession(@Param('id')eventId:string,@Param('sessionId')sessionId:string){
   return this.eventService.findSession(eventId,sessionId)
    }
    @Post()
    createEvent(@Body()body:CreateEventDto){
        return this.eventService.create(body)

    }
}
