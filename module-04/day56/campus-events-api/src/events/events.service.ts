import { Injectable, NotFoundException } from '@nestjs/common';
import type { Event, PaginatedEvents, Session } from './event.types.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';
@Injectable()
export class EventsService {
    private readonly events: Event[] = [
        { id: 'evt-101', title: 'Intro to Cloud Computing', description: 'A beginner-friendly workshop on cloud basics.', location: 'Engineering Block, Room 2', eventDate: '2026-12-04T09:00:00.000Z', category: 'technology', isPublished: true },
        { id: 'evt-102', title: 'Inter-College Football Cup', description: 'Semi-finals between campus teams.', location: 'Main Stadium', eventDate: '2026-12-10T14:00:00.000Z', category: 'sports', isPublished: true },
        { id: 'evt-103', title: 'Career Fair 2026', description: 'Meet employers hiring junior developers.', location: 'Main Hall', eventDate: '2026-11-25T08:30:00.000Z', category: 'career', isPublished: true },
        { id: 'evt-104', title: 'Open Mic Night', description: 'Music, poetry and comedy by students.', location: 'Student Centre', eventDate: '2026-11-20T18:00:00.000Z', category: 'arts', isPublished: false },
        { id: 'evt-105', title: 'Hackathon: Build for Campus', description: '24 hours to build tools for campus life.', location: 'Main Library, Floor 3', eventDate: '2026-10-15T09:00:00.000Z', category: 'technology', isPublished: true },
    ];

    // Used in step 4
    private readonly sessions: Session[] = [
        { id: 'ses-201', eventId: 'evt-101', title: 'What is the cloud?', startsAt: '2026-12-04T09:00:00.000Z', endsAt: '2026-12-04T10:00:00.000Z', room: 'Room 2' },
        { id: 'ses-202', eventId: 'evt-101', title: 'Deploying your first app', startsAt: '2026-12-04T10:30:00.000Z', endsAt: '2026-12-04T12:00:00.000Z', room: 'Room 2' },
        { id: 'ses-203', eventId: 'evt-105', title: 'Kick-off and team forming', startsAt: '2026-10-15T09:00:00.000Z', endsAt: '2026-10-15T10:00:00.000Z', room: 'Floor 3 Lounge' },
        { id: 'ses-204', eventId: 'evt-105', title: 'Final demos', startsAt: '2026-10-16T09:00:00.000Z', endsAt: '2026-10-16T12:00:00.000Z', room: 'Floor 3 Lounge' },
    ];

    findAll(query: FindEventsQueryDto): PaginatedEvents{

        let result = this.events;
        if (query.category) {
            const category = query.category.toLowerCase();
            result = result.filter((e) => (e.category).toLocaleLowerCase() === category)
        }
        if (query.location) {
            const location = query.location.toLowerCase()
            result = result.filter((e) => e.location.toLocaleLowerCase().includes(location))
        }
        if (query.isPublished !== undefined) {
            result = result.filter((e) => e.isPublished === query.isPublished)
        }
        const direction = query.order === 'desc' ? -1 : 1
        if (query.sortBy) {
            result = [...result].sort((a, b) => {
                const diff = query.sortBy === 'title'
                    ? a.title.localeCompare(b.title)
                    : new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
                return diff * direction;
            });
        }
        const page=query.page??1
        const limit=query.limit??5;
        const total=result.length

        const offset=(page-1)*limit
        const totalPages = Math.ceil(total / limit);
       const  items:Event[]=result.slice(offset,offset+limit)

       return { items, total, page, limit, totalPages };
    }

    findOne(id: string): Event {
        const event = this.events.find((e) => e.id === id)
        if (!event) throw new NotFoundException(`Event ${id} not found`)
        return event
    }
    findSessions(eventId: string): Session[] {
        this.findOne(eventId)
        return this.sessions.filter((s) => s.eventId === eventId)
    }
    findSession(eventId: string, sessionId: string): Session {
        const sessions = this.findSessions(eventId)
        console.log(sessionId);
        const session = sessions.find((s) => s.id === sessionId)

        if (!session) throw new NotFoundException(`Session ${sessionId} not found`)
        return session
    }
    findUpcoming(): Event[] {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return this.events.filter((e) => new Date(e.eventDate) >= today)
    }

    //creating event 
    create(dto: CreateEventDto): Event {
        const newEvent: Event = {
            id: `evt-${101 + this.events.length}`,
            title: dto.title,
            description: dto.description,
            location: dto.location,
            eventDate: dto.eventDate,
            category: dto.category,
            isPublished: dto.isPublished ?? false
        }

        this.events.push(newEvent)
        return newEvent
    }
}
