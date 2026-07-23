import fs from 'fs';
import path from 'path';
import { Appointment, ContactInquiry, Testimonial, GalleryItem, ServiceItem } from '../src/types';

const DB_FILE = path.join(process.cwd(), 'db.json');

export interface DbSchema {
  appointments: Appointment[];
  contacts: ContactInquiry[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  services: ServiceItem[];
  admins: { email: string; passwordHash: string; name: string }[];
}

// Initial seed data representing Srikanth and Ravikanth's premium enterprise
const initialServices: ServiceItem[] = [
  {
    id: 'gw-investigation',
    title: 'Ground Water Investigation',
    description: 'Advanced geophysical and geological analysis to determine underground aquifer parameters, depth, and yield capacity.',
    iconName: 'Droplet',
    details: [
      'Resistivity imaging & profiling surveys',
      'Aquifer mapping and yield forecasting',
      'Water quality pre-testing & chemical assays',
      'Borewell depth and casing recommendations'
    ],
    benefits: [
      'Reduces the risk of drilling dry borewells',
      'Accurate assessment of long-term sustainable yield',
      'Scientifically grounded depth parameters'
    ]
  },
  {
    id: 'hydro-survey',
    title: 'Hydrogeological Survey',
    description: 'Comprehensive watershed management and rock formation mapping to study groundwater recharge patterns.',
    iconName: 'Map',
    details: [
      'Structural and stratigraphical rock mapping',
      'Rainwater harvesting design & capacity modeling',
      'Permeability and porosity calculations',
      'Groundwater flow modeling'
    ],
    benefits: [
      'Optimizes natural aquifer recharge potentials',
      'Critical for regulatory clearances and compliance',
      'Prevents seawater or contaminant intrusion'
    ]
  },
  {
    id: 'borewell-consult',
    title: 'Borewell Consultancy',
    description: 'A-to-Z execution consultancy for borewell construction, rehabilitation, flushing, and pump installation.',
    iconName: 'Wrench',
    details: [
      'Drilling method selection (Rotary vs DTH)',
      'Casing pipe design (PVC vs MS) & gravel packing',
      'Borewell scanning, yield test (V-Notch method)',
      'Submersible pump horsepower & stage calculation'
    ],
    benefits: [
      'Saves up to 40% in drilling and material costs',
      'Ensures maximum lifespan of the borewell system',
      'Avoids pump burnouts due to dry running'
    ]
  },
  {
    id: 'water-planning',
    title: 'Water Resource Planning',
    description: 'Strategic conservation models, water budgeting, and balance assessments for large estates and communities.',
    iconName: 'LayoutGrid',
    details: [
      'Water auditing & balance sheets',
      'Zero liquid discharge (ZLD) consultations',
      'Greywater recycling system design',
      'Rainwater conservation masterplans'
    ],
    benefits: [
      'Ensures self-sufficiency through dry summers',
      'Major reduction in municipal water reliance',
      'Compliance with modern green building standards'
    ]
  },
  {
    id: 'field-invest',
    title: 'Field Investigation',
    description: 'On-site physical drilling supervision, soil core sampling, and groundwater level telemetry installations.',
    iconName: 'Compass',
    details: [
      'In-situ permeability & infiltration tests',
      'Piezometer installation & monitoring setup',
      'Lithological log recording during drilling',
      'Soil moisture profile measurements'
    ],
    benefits: [
      'Continuous geological tracking in real time',
      'Highly detailed local soil mechanics records',
      'Ensures perfect casing placement'
    ]
  },
  {
    id: 'industrial-consult',
    title: 'Industrial Consultancy',
    description: 'CGWA (Central Ground Water Authority) NOC approvals, impact assessment reports, and eco-compliance audits.',
    iconName: 'ShieldAlert',
    details: [
      'NOC preparation and application management',
      'Hydrogeological impact assessment reporting',
      'Industrial rainwater harvesting structures',
      'Flow meter telemetry integration'
    ],
    benefits: [
      'Fast-tracks legal clearances for industrial setups',
      'Ensures compliance with all national environmental laws',
      'Protects industrial units from heavy legal penalties'
    ]
  },
  {
    id: 'agriculture-consult',
    title: 'Agriculture Consultancy',
    description: 'Custom irrigation planning, micro-irrigation layout, and crop-water requirement modeling.',
    iconName: 'Leaf',
    details: [
      'Drip and sprinkler irrigation layout designs',
      'Soil salinity and water compatibility audits',
      'Solar borewell pump integration schemes',
      'Seasonal crop-water budget blueprints'
    ],
    benefits: [
      'Saves up to 60% water while boosting crop yields',
      'Solves soil salinity issues',
      'Enables high-yield organic cultivation'
    ]
  }
];

const initialGallery: GalleryItem[] = [
  {
    id: 'proj-1',
    title: 'Geophysical Resistivity Survey - Haryana Industrial Estate',
    category: 'Investigation',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    description: 'Completed a 3D resistivity profiling for a major automotive plant in Haryana, pinpointing three highly productive fracture zones in hard rock aquifers.'
  },
  {
    id: 'proj-2',
    title: 'Hydrogeological Impact Report - Rajasthan Greenfield Plant',
    category: 'Survey',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    description: 'Prepared and secured CGWA NOC for a multinational client. Designed a 20,000 cubic meter artificial recharge shaft network.'
  },
  {
    id: 'proj-3',
    title: 'Agriculture Water Audit - Punjab Organic Farms',
    category: 'Agricultural',
    imageUrl: 'https://images.unsplash.com/photo-1625246140679-b7c987827c11?auto=format&fit=crop&w=800&q=80',
    description: 'Re-engineered the borewell system and laid drip irrigation for a 200-acre modern farm. Reduced deep tube well draw by 45% while maintaining crop output.'
  },
  {
    id: 'proj-4',
    title: 'Deep Borewell Yield Testing - Uttar Pradesh Residential Hub',
    category: 'Borewell',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=800&q=80',
    description: 'Supervised drilling of 400m deep exploratory aquifers. Executed high-accuracy step-drawdown pumping tests for Neer Company collaboration.'
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rakesh Sharma',
    company: 'Neer Water Co.',
    role: 'Managing Director',
    feedback: 'Mr. Srikanth and Mr. Ravikanth bring unmatched expertise. Their electrical resistivity surveys are mathematically precise. In Northern India, there is nobody more trusted for hydrogeological surveys.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    approved: true
  },
  {
    id: 'test-2',
    name: 'Dr. Anita Desai',
    company: 'Northern Agri-Farms',
    role: 'Principal Consultant',
    feedback: 'Our farm was facing severe aquifer depletion in Punjab. HydroVision AI conducted a deep soil moisture and permeability survey. The recharge shaft they designed has completely stabilized our summer supply.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    approved: true
  },
  {
    id: 'test-3',
    name: 'Vikram Choudhary',
    company: 'Apex Industrial Infrastructure',
    role: 'VP Operations',
    feedback: 'Securing CGWA clearance for our Noida manufacturing unit was extremely challenging. Srikanth ji prepared an impeccable Hydrogeological Impact Report. Highly professional, and complete legal compliance.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    approved: true
  }
];

// Initial default database structure
const defaultDb: DbSchema = {
  appointments: [
    {
      id: 'apt-101',
      name: 'Ravi Verma',
      email: 'ravi.verma@example.com',
      phone: '+91 98765 43210',
      date: '2026-07-28',
      time: '11:00 AM',
      service: 'Ground Water Investigation',
      notes: 'Planning a new borewell for our farmhouse near Safdarjung Enclave.',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    }
  ],
  contacts: [
    {
      id: 'cnt-201',
      name: 'Dr. Harsh Vardhan',
      email: 'harsh.vardhan@agriflow.in',
      phone: '+91 94432 11099',
      subject: 'Inquiry regarding rainwater harvesting shaft design',
      message: 'We want to install three recharge shafts on our farm. Please advise on fees and soil resistivity testing details.',
      status: 'Unread',
      createdAt: new Date().toISOString()
    }
  ],
  testimonials: initialTestimonials,
  gallery: initialGallery,
  services: initialServices,
  admins: [
    {
      email: 'admin@hydrovision.ai',
      passwordHash: 'admin', // Simple cleartext comparison for demo simplicity, or bcrypt in full prod.
      name: 'Srikanth & Ravikanth'
    },
    {
      email: 'srikanth@hydrovision.ai',
      passwordHash: 'delhi2026',
      name: 'Srikanth'
    }
  ]
};

export class JsonDb {
  private static load(): DbSchema {
    try {
      if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
        return defaultDb;
      }
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error loading DB file, falling back to in-memory store', err);
      return defaultDb;
    }
  }

  private static save(data: DbSchema): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving DB file', err);
    }
  }

  // Appointment Operations
  static getAppointments(): Appointment[] {
    return this.load().appointments;
  }

  static addAppointment(apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment {
    const db = this.load();
    const newApt: Appointment = {
      ...apt,
      id: 'apt-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    db.appointments.push(newApt);
    this.save(db);
    return newApt;
  }

  static updateAppointmentStatus(id: string, status: Appointment['status']): Appointment | null {
    const db = this.load();
    const idx = db.appointments.findIndex(a => a.id === id);
    if (idx === -1) return null;
    db.appointments[idx].status = status;
    this.save(db);
    return db.appointments[idx];
  }

  static deleteAppointment(id: string): boolean {
    const db = this.load();
    const originalLen = db.appointments.length;
    db.appointments = db.appointments.filter(a => a.id !== id);
    this.save(db);
    return db.appointments.length < originalLen;
  }

  // Contact Operations
  static getContacts(): ContactInquiry[] {
    return this.load().contacts;
  }

  static addContact(cnt: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry {
    const db = this.load();
    const newCnt: ContactInquiry = {
      ...cnt,
      id: 'cnt-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'Unread',
      createdAt: new Date().toISOString()
    };
    db.contacts.push(newCnt);
    this.save(db);
    return newCnt;
  }

  static replyToContact(id: string, reply: string): ContactInquiry | null {
    const db = this.load();
    const idx = db.contacts.findIndex(c => c.id === id);
    if (idx === -1) return null;
    db.contacts[idx].status = 'Replied';
    db.contacts[idx].reply = reply;
    this.save(db);
    return db.contacts[idx];
  }

  static updateContactStatus(id: string, status: ContactInquiry['status']): ContactInquiry | null {
    const db = this.load();
    const idx = db.contacts.findIndex(c => c.id === id);
    if (idx === -1) return null;
    db.contacts[idx].status = status;
    this.save(db);
    return db.contacts[idx];
  }

  static deleteContact(id: string): boolean {
    const db = this.load();
    const originalLen = db.contacts.length;
    db.contacts = db.contacts.filter(c => c.id !== id);
    this.save(db);
    return db.contacts.length < originalLen;
  }

  // Services
  static getServices(): ServiceItem[] {
    return this.load().services;
  }

  static addService(service: ServiceItem): ServiceItem {
    const db = this.load();
    db.services.push(service);
    this.save(db);
    return service;
  }

  static deleteService(id: string): boolean {
    const db = this.load();
    const originalLen = db.services.length;
    db.services = db.services.filter(s => s.id !== id);
    this.save(db);
    return db.services.length < originalLen;
  }

  // Testimonials
  static getTestimonials(): Testimonial[] {
    return this.load().testimonials;
  }

  static addTestimonial(t: Omit<Testimonial, 'id' | 'approved'>): Testimonial {
    const db = this.load();
    const newT: Testimonial = {
      ...t,
      id: 'test-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      approved: false // Must be approved by admin
    };
    db.testimonials.push(newT);
    this.save(db);
    return newT;
  }

  static approveTestimonial(id: string, approve: boolean = true): Testimonial | null {
    const db = this.load();
    const idx = db.testimonials.findIndex(t => t.id === id);
    if (idx === -1) return null;
    db.testimonials[idx].approved = approve;
    this.save(db);
    return db.testimonials[idx];
  }

  static deleteTestimonial(id: string): boolean {
    const db = this.load();
    const originalLen = db.testimonials.length;
    db.testimonials = db.testimonials.filter(t => t.id !== id);
    this.save(db);
    return db.testimonials.length < originalLen;
  }

  // Gallery
  static getGallery(): GalleryItem[] {
    return this.load().gallery;
  }

  static addGalleryItem(item: GalleryItem): GalleryItem {
    const db = this.load();
    db.gallery.push(item);
    this.save(db);
    return item;
  }

  static deleteGalleryItem(id: string): boolean {
    const db = this.load();
    const originalLen = db.gallery.length;
    db.gallery = db.gallery.filter(g => g.id !== id);
    this.save(db);
    return db.gallery.length < originalLen;
  }

  // Admins Authentication
  static authenticate(email: string, passwordHash: string) {
    const db = this.load();
    const admin = db.admins.find(a => a.email.toLowerCase() === email.toLowerCase() && a.passwordHash === passwordHash);
    return admin ? { email: admin.email, name: admin.name } : null;
  }
}
