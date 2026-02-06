import mongoose, { Document, Model, Schema } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid'; // Literal types for better TS support
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true, // This already creates a unique index automatically
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: ['online', 'offline', 'hybrid'],
      trim: true,
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: 'Agenda must have at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: 'At least one tag is required',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook using ASYNC/AWAIT (Fixes "next is not a function" error)
eventSchema.pre('save', async function (this: IEvent) {
  // 1. Generate slug only if title is new or modified
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') 
      .replace(/\s+/g, '-') 
      .replace(/-+/g, '-') 
      .replace(/^-+|-+$/g, ''); 
  }

  // 2. Normalize date to ISO format if modified
  if (this.isModified('date')) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format'); // Mongoose will catch this error
    }
    this.date = parsedDate.toISOString().split('T')[0];
  }

  // 3. Normalize time format (HH:MM) if modified
  if (this.isModified('time')) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(this.time)) {
      throw new Error('Time must be in HH:MM format');
    }
    const [hours, minutes] = this.time.split(':');
    this.time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }
});

// NOTE: I removed the duplicate manual index definition for "slug" here 
// because unique: true in the schema already handles it.

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;