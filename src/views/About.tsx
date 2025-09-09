import React from "react";
import "@/assets/styles/about.css";
type Feature = {
  icon: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
};

const features: Feature[] = [
  {
    icon: "🔐",
    title: "JWT Authentication",
    description: "Secure login for drivers, passengers, and admins",
    status: "completed",
  },
  {
    icon: "👥",
    title: "Role-Based Access Control",
    description: "Different permissions for Admin, Driver, and Passenger",
    status: "completed",
  },
  {
    icon: "🚕",
    title: "Ride Booking Flow",
    description: "Passengers request rides, drivers accept and complete them",
    status: "in-progress",
  },
  {
    icon: "📍",
    title: "Live Location Tracking",
    description: "Track rides in real time using OpenStreetMap + Socket.IO",
    status: "planned",
  },
  {
    icon: "📊",
    title: "Admin Dashboard",
    description: "Manage users, drivers, and rides with analytics",
    status: "planned",
  },
  {
    icon: "📧",
    title: "Email Verification",
    description: "Confirm accounts with secure email links",
    status: "planned",
  },
];

const techStack = {
  backend: [
    {
      name: "NestJS",
      icon: "🏗️",
      description: "Progressive Node.js framework",
    },
    {
      name: "PostgreSQL",
      icon: "🐘",
      description: "Reliable open source database",
    },
    { name: "TypeORM", icon: "🗄️", description: "Database ORM for PostgreSQL" },
    { name: "Socket.IO", icon: "⚡", description: "Real-time ride updates" },
    { name: "JWT", icon: "🔑", description: "Authentication system" },
  ],
  frontend: [
    { name: "React", icon: "⚛️", description: "Modern frontend library" },
    {
      name: "TypeScript",
      icon: "📘",
      description: "Typed JavaScript at scale",
    },
    {
      name: "TailwindCSS",
      icon: "🎨",
      description: "Utility-first CSS framework",
    },
    { name: "Axios", icon: "📡", description: "Promise-based HTTP client" },
    {
      name: "Leaflet + OSM",
      icon: "🗺️",
      description: "Free map & geolocation system",
    },
  ],
};

export default function RideSharingDemo() {
  return (
    <div className="readme-container">
      {/* Header */}
      <div className="header">
        <div className="title-row">
          <span>🚀</span>
          <span>Ride Sharing Demo</span>
        </div>
        <h1>NestJS + React Ride Sharing Platform</h1>
        <p>
          A full-stack demo application showcasing authentication, ride booking,
          driver tracking, and real-time communication.
        </p>
        <div className="badges">
          <span className="badge backend">NestJS</span>
          <span className="badge frontend">React</span>
          <span className="badge database">PostgreSQL</span>
          <span className="badge auth">JWT Auth</span>
        </div>
      </div>

      {/* Features */}
      <div className="section">
        <h2>
          <span>⚡</span> Features
        </h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`feature-card status-${feature.status}`}
            >
              <div className="feature-header">
                <span className="feature-icon">{feature.icon}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <span className={`status ${feature.status}`}>
                    {feature.status.replace("-", " ")}
                  </span>
                </div>
              </div>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="section">
        <h2>
          <span>🛠️</span> Tech Stack
        </h2>
        <div className="stack-grid">
          <div>
            <h3>Backend</h3>
            {techStack.backend.map((tech) => (
              <div key={tech.name} className="stack-item">
                <span className="stack-icon">{tech.icon}</span>
                <div>
                  <p className="stack-name">{tech.name}</p>
                  <p className="stack-desc">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3>Frontend</h3>
            {techStack.frontend.map((tech) => (
              <div key={tech.name} className="stack-item">
                <span className="stack-icon">{tech.icon}</span>
                <div>
                  <p className="stack-name">{tech.name}</p>
                  <p className="stack-desc">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="section">
        <h2>
          <span>🗺️</span> Development Roadmap
        </h2>
        <div className="roadmap">
          <div className="phase complete">
            <h4>Phase 1: Foundation</h4>
            <p>✅ Authentication, Role-based access, Basic ride entities</p>
          </div>
          <div className="phase progress">
            <h4>Phase 2: Ride Management</h4>
            <p>🚧 CRUD for rides, Live ride updates, Admin panel</p>
          </div>
          <div className="phase planned">
            <h4>Phase 3: Advanced Features</h4>
            <p>📋 Email verification, Analytics, Search & Filters</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-about">
        <p>Built with ❤️ to demonstrate a ride-sharing platform demo</p>
        <div className="footer-links">
          <a href="#">GitHub</a>
        </div>
      </div>
    </div>
  );
}
