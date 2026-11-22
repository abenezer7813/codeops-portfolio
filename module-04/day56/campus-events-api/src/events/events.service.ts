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
        {
            id: 'evt-106',
            title: 'Web Development Bootcamp',
            description: 'A hands-on workshop covering modern frontend and backend development.',
            location: 'Computer Lab 1',
            eventDate: '2026-12-02T09:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-107',
            title: 'Basketball Championship',
            description: 'Inter-department basketball competition.',
            location: 'University Basketball Court',
            eventDate: '2026-12-06T13:00:00.000Z',
            category: 'sports',
            isPublished: true,
        },
        {
            id: 'evt-108',
            title: 'Graduate Career Preparation',
            description: 'Learn how to prepare professional CVs and succeed in job interviews.',
            location: 'Main Hall',
            eventDate: '2026-12-08T08:30:00.000Z',
            category: 'career',
            isPublished: true,
        },
        {
            id: 'evt-109',
            title: 'Photography Exhibition',
            description: 'Explore creative photography captured by university students.',
            location: 'Student Centre',
            eventDate: '2026-12-12T10:00:00.000Z',
            category: 'arts',
            isPublished: true,
        },
        {
            id: 'evt-110',
            title: 'AI and Machine Learning Seminar',
            description: 'An introduction to artificial intelligence and real-world applications.',
            location: 'Engineering Block, Room 4',
            eventDate: '2026-12-15T09:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-111',
            title: 'Inter-Department Volleyball',
            description: 'Departments compete for the university volleyball championship.',
            location: 'Main Sports Ground',
            eventDate: '2026-12-17T14:00:00.000Z',
            category: 'sports',
            isPublished: true,
        },
        {
            id: 'evt-112',
            title: 'Entrepreneurship and Innovation Forum',
            description: 'Discover how to transform creative ideas into successful businesses.',
            location: 'Business Faculty Hall',
            eventDate: '2026-12-19T09:00:00.000Z',
            category: 'business',
            isPublished: true,
        },
        {
            id: 'evt-113',
            title: 'Student Cultural Day',
            description: 'Celebrate cultural diversity through traditional food, clothing, music and dance.',
            location: 'University Main Field',
            eventDate: '2026-12-22T10:00:00.000Z',
            category: 'social',
            isPublished: true,
        },
        {
            id: 'evt-114',
            title: 'Cybersecurity Awareness Workshop',
            description: 'Learn about online security, password protection and common cyber threats.',
            location: 'Computer Lab 2',
            eventDate: '2026-12-24T09:00:00.000Z',
            category: 'technology',
            isPublished: false,
        },
        {
            id: 'evt-115',
            title: 'Public Speaking Competition',
            description: 'Students demonstrate their communication and presentation skills.',
            location: 'Main Auditorium',
            eventDate: '2026-12-26T13:00:00.000Z',
            category: 'education',
            isPublished: true,
        },
        {
            id: 'evt-116',
            title: 'UI/UX Design Masterclass',
            description: 'Explore user research, wireframing and modern interface design.',
            location: 'Innovation Hub',
            eventDate: '2027-01-05T09:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-117',
            title: 'University Marathon',
            description: 'A campus-wide running competition promoting fitness and healthy living.',
            location: 'University Main Gate',
            eventDate: '2027-01-08T06:30:00.000Z',
            category: 'sports',
            isPublished: true,
        },
        {
            id: 'evt-118',
            title: 'Internship Opportunities Meetup',
            description: 'Connect with companies offering internship opportunities to students.',
            location: 'Career Development Centre',
            eventDate: '2027-01-10T09:00:00.000Z',
            category: 'career',
            isPublished: true,
        },
        {
            id: 'evt-119',
            title: 'Campus Music Festival',
            description: 'Enjoy live performances from talented student musicians.',
            location: 'University Main Field',
            eventDate: '2027-01-12T15:00:00.000Z',
            category: 'arts',
            isPublished: true,
        },
        {
            id: 'evt-120',
            title: 'Database Design Workshop',
            description: 'Learn relational database design, SQL and data modeling.',
            location: 'Computer Lab 3',
            eventDate: '2027-01-15T09:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-121',
            title: 'Chess Tournament',
            description: 'An open chess competition for students from all departments.',
            location: 'Student Recreation Centre',
            eventDate: '2027-01-17T10:00:00.000Z',
            category: 'sports',
            isPublished: true,
        },
        {
            id: 'evt-122',
            title: 'Financial Literacy Seminar',
            description: 'Understand budgeting, saving and personal financial management.',
            location: 'Business Faculty Room 2',
            eventDate: '2027-01-19T09:00:00.000Z',
            category: 'education',
            isPublished: true,
        },
        {
            id: 'evt-123',
            title: 'Drama and Theatre Night',
            description: 'Experience original plays and performances written by students.',
            location: 'Main Auditorium',
            eventDate: '2027-01-22T17:00:00.000Z',
            category: 'arts',
            isPublished: false,
        },
        {
            id: 'evt-124',
            title: 'Mobile App Development Workshop',
            description: 'Build your first cross-platform mobile application.',
            location: 'Engineering Block, Lab 2',
            eventDate: '2027-01-25T09:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-125',
            title: 'Table Tennis Championship',
            description: 'Students compete in singles and doubles table tennis matches.',
            location: 'Indoor Sports Hall',
            eventDate: '2027-01-28T13:00:00.000Z',
            category: 'sports',
            isPublished: true,
        },
        {
            id: 'evt-126',
            title: 'Leadership Development Summit',
            description: 'Develop teamwork, leadership and decision-making skills.',
            location: 'Main Conference Hall',
            eventDate: '2027-02-02T09:00:00.000Z',
            category: 'education',
            isPublished: true,
        },
        {
            id: 'evt-127',
            title: 'Startup Pitch Competition',
            description: 'Student entrepreneurs present innovative business ideas to judges.',
            location: 'Innovation Hub',
            eventDate: '2027-02-05T10:00:00.000Z',
            category: 'business',
            isPublished: true,
        },
        {
            id: 'evt-128',
            title: 'Digital Art Exhibition',
            description: 'Discover illustrations, digital paintings and creative student designs.',
            location: 'University Art Gallery',
            eventDate: '2027-02-08T11:00:00.000Z',
            category: 'arts',
            isPublished: true,
        },
        {
            id: 'evt-129',
            title: 'Cloud Computing with AWS',
            description: 'Explore cloud infrastructure, deployment and scalable applications.',
            location: 'Computer Lab 1',
            eventDate: '2027-02-11T09:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-130',
            title: 'Inter-Faculty Football Final',
            description: 'The top university teams compete for the football championship.',
            location: 'Main Stadium',
            eventDate: '2027-02-14T15:00:00.000Z',
            category: 'sports',
            isPublished: true,
        },
        {
            id: 'evt-131',
            title: 'Professional Networking Day',
            description: 'Meet industry professionals and build valuable career connections.',
            location: 'Main Hall',
            eventDate: '2027-02-17T09:00:00.000Z',
            category: 'career',
            isPublished: true,
        },
        {
            id: 'evt-132',
            title: 'Environmental Awareness Campaign',
            description: 'Join students in promoting environmental protection and sustainability.',
            location: 'University Main Field',
            eventDate: '2027-02-20T08:00:00.000Z',
            category: 'social',
            isPublished: true,
        },
        {
            id: 'evt-133',
            title: 'Open Source Contribution Day',
            description: 'Learn how to contribute to real-world open-source software projects.',
            location: 'Innovation Hub',
            eventDate: '2027-02-23T09:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-134',
            title: 'Photography and Videography Workshop',
            description: 'Learn camera techniques, lighting and video editing fundamentals.',
            location: 'Media Centre',
            eventDate: '2027-02-26T10:00:00.000Z',
            category: 'arts',
            isPublished: false,
        },
        {
            id: 'evt-135',
            title: 'Badminton Open Championship',
            description: 'An exciting badminton tournament open to all university students.',
            location: 'Indoor Sports Hall',
            eventDate: '2027-03-02T13:00:00.000Z',
            category: 'sports',
            isPublished: true,
        },
        {
            id: 'evt-136',
            title: 'Research and Innovation Symposium',
            description: 'Students present research findings and innovative academic projects.',
            location: 'Main Auditorium',
            eventDate: '2027-03-05T09:00:00.000Z',
            category: 'education',
            isPublished: true,
        },
        {
            id: 'evt-137',
            title: 'Freelancing Career Workshop',
            description: 'Learn how to find clients, build a portfolio and work remotely.',
            location: 'Career Development Centre',
            eventDate: '2027-03-08T09:00:00.000Z',
            category: 'career',
            isPublished: true,
        },
        {
            id: 'evt-138',
            title: 'Student Business Expo',
            description: 'Explore student-owned businesses, products and entrepreneurial ideas.',
            location: 'University Main Field',
            eventDate: '2027-03-11T10:00:00.000Z',
            category: 'business',
            isPublished: true,
        },
        {
            id: 'evt-139',
            title: 'Programming Competition',
            description: 'Teams solve algorithmic challenges and compete for exciting prizes.',
            location: 'Computer Lab 2',
            eventDate: '2027-03-14T09:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-140',
            title: 'University Talent Show',
            description: 'Students showcase their talents in singing, dancing and entertainment.',
            location: 'Main Auditorium',
            eventDate: '2027-03-17T17:00:00.000Z',
            category: 'arts',
            isPublished: true,
        },
        {
            id: 'evt-141',
            title: 'Mental Wellness Awareness Day',
            description: 'Activities and discussions promoting student wellbeing and healthy habits.',
            location: 'Student Centre',
            eventDate: '2027-03-20T09:00:00.000Z',
            category: 'social',
            isPublished: true,
        },
        {
            id: 'evt-142',
            title: 'Robotics and Automation Exhibition',
            description: 'Discover student-built robots and practical automation projects.',
            location: 'Engineering Exhibition Hall',
            eventDate: '2027-03-23T10:00:00.000Z',
            category: 'technology',
            isPublished: true,
        },
        {
            id: 'evt-143',
            title: 'Swimming Competition',
            description: 'University swimmers compete in different swimming categories.',
            location: 'University Swimming Pool',
            eventDate: '2027-03-26T08:00:00.000Z',
            category: 'sports',
            isPublished: false,
        },
        {
            id: 'evt-144',
            title: 'Graduation Preparation Fair',
            description: 'Explore postgraduate study options, career paths and professional development.',
            location: 'Main Hall',
            eventDate: '2027-03-29T09:00:00.000Z',
            category: 'career',
            isPublished: true,
        },
        {
            id: 'evt-145',
            title: 'Student Community Service Day',
            description: 'Students work together on volunteer activities supporting the local community.',
            location: 'University Main Gate',
            eventDate: '2027-04-02T08:00:00.000Z',
            category: 'social',
            isPublished: true,
        }
    ];

    // Used in step 4
    private readonly sessions: Session[] = [
        { id: 'ses-201', eventId: 'evt-101', title: 'What is the cloud?', startsAt: '2026-12-04T09:00:00.000Z', endsAt: '2026-12-04T10:00:00.000Z', room: 'Room 2' },
        { id: 'ses-202', eventId: 'evt-101', title: 'Deploying your first app', startsAt: '2026-12-04T10:30:00.000Z', endsAt: '2026-12-04T12:00:00.000Z', room: 'Room 2' },
        { id: 'ses-203', eventId: 'evt-105', title: 'Kick-off and team forming', startsAt: '2026-10-15T09:00:00.000Z', endsAt: '2026-10-15T10:00:00.000Z', room: 'Floor 3 Lounge' },
        { id: 'ses-204', eventId: 'evt-105', title: 'Final demos', startsAt: '2026-10-16T09:00:00.000Z', endsAt: '2026-10-16T12:00:00.000Z', room: 'Floor 3 Lounge' },
    ];

    findAll(query: FindEventsQueryDto): PaginatedEvents {

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
        const page = query.page ?? 1
        const limit = query.limit ?? 6;
        const total = result.length

        const offset = (page - 1) * limit
        const totalPages = Math.ceil(total / limit);
        const items: Event[] = result.slice(offset, offset + limit)

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
