import React from 'react';

export interface NavItem {
  label: string;
  id: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  icon: React.ElementType;
  isNew?: boolean;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Onboarding' | 'Leave';
  performance: number; // 0-100
  attendance?: number; // %
  risk?: 'Low' | 'Medium' | 'High';
  email: string;
  phone: string;
  joinDate: string;
  documents: { name: string; type: 'pdf' | 'img'; date: string }[];
}

export interface Client {
  id: number;
  name: string;
  health: 'Good' | 'Warning' | 'Critical';
  attrition: string;
  issues: number;
  lastCheck: string;
  location: string;
  employees: number;
  contactPerson: string;
}

export interface JobPost {
  id: number;
  title: string;
  type: string;
  applicants: number;
  status: 'Open' | 'Closed';
}

export enum AppView {
  LOGIN = 'LOGIN',
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD', // Command Center (Owner)
  WORKFORCE = 'WORKFORCE', // Employee App
  AGENCY = 'AGENCY', // KAM Portal
  MARKETPLACE = 'MARKETPLACE'
}

export enum UserRole {
  OWNER = 'OWNER',
  KAM = 'KAM',
  GUEST = 'GUEST'
}

export interface ComplianceMetric {
  name: string;
  score: number;
  status: 'Good' | 'Warning' | 'Critical';
}