import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TimingInterceptor } from '../common/timing/timing.interceptor.js';
import { ApiKeyGuard } from '../common/api-key/api-key.guard.js';
@UseInterceptors(TimingInterceptor)
@ApiTags("events")
@Controller({ path: 'events', version: '1' })
export class EventsController {
    constructor(private readonly eventService: EventsService) {

    }
    @ApiOperation({ summary: "List of all evnts" })
    @Get()
    findAll(@Query() query: FindEventsQueryDto) {
        return this.eventService.findAll(query)
    }
    @ApiOperation({ summary: "upcoming events" })
    @Get('upcoming')
    findUpcoming() {
        return this.eventService.findUpcoming()
    }
    @Get('example')
    findPage(@Query('page', ParseIntPipe) page: number) {
        return { page, message: 'Page received successfully' };
    }
    @ApiOperation({ summary: "Single Event " })
    @Get(':id')
    findOne(@Param("id") id: string) {
        return this.eventService.findOne(id)
    }
    @ApiOperation({ summary: "sessions of an event" })
    @Get(':id/sessions')
    findSessions(@Param('id') eventId: string) {
        return this.eventService.findSessions(eventId)
    }
    @ApiOperation({ summary: "detail of a single  session" })

    @Get(':id/sessions/:sessionId')
    findSession(@Param('id') eventId: string, @Param('sessionId') sessionId: string) {
        return this.eventService.findSession(eventId, sessionId)
    }
    @UseGuards(ApiKeyGuard)
    @ApiOperation({ summary: "Creating new event" })
    @ApiOkResponse({ type: CreateEventDto })
    @Post()
    createEvent(@Body() body: CreateEventDto) {
        return this.eventService.create(body)

    }


}
