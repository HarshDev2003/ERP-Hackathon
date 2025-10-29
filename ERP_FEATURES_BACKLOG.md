# ERP-based Integrated Student Management System — Feature Additions and Tasks

This document lists missing features and concrete tasks aligned with the brief HOMPS-25025 (SSPU BHILAI) to evolve the app into a cohesive, low‑cost ERP.

## 1) Executive/Principal Dashboard (real-time institutional overview)
Features
- KPIs: Admissions funnel, Fee collection (due/paid), Hostel occupancy (beds free/filled, waitlist), Library snapshot (issued/overdue), Exams calendar, Complaints summary.
- Filters by term, program, class.
Tasks
- [ ] Backend: Aggregation endpoints for KPIs (admissions, fees, hostel, library, exams).
- [ ] Frontend: New “Executive Dashboard” (Admin/Principal read-only) with cards/charts.
- [ ] Role: Add Principal/Executive role with read-only access.

## 2) Streamlined Admission Intake (public)
Features
- Public application form (with captcha and doc uploads), status tracking (Draft→Submitted→Verified→Approved/Rejected).
- Dedup checks (name+DoB+mobile), email/SMS acknowledgements.
Tasks
- [ ] Backend: Application schema (documents, stage, audit), upload storage (S3/GDrive), webhooks.
- [ ] Frontend: Public form + Admin verification queue (bulk verify, assign class on approve).
- [ ] Notifications: Email/SMS on submit/decision.

## 3) Automated Fee Receipting
Features
- Online payment gateway, auto-generated digital receipts (PDF with QR), ledger posting, refunds, concessions, installments, reminders.
Tasks
- [ ] Integrate payment gateway abstraction (Razorpay/Stripe pluggable).
- [ ] Receipt service (PDF template, QR, email); receipt table and student ledger entries.
- [ ] Dues engine (schedule by term), cron reminders (email/SMS).

## 4) Live Hostel Management
Features
- Room/bed inventory, allocation, transfers, deallocation, occupancy heatmap, waiting list, hostel fee receipting.
Tasks
- [ ] Schemas: HostelBlock/Room/Bed, allocations, waitlist.
- [ ] Endpoints + UI: Assign/transfer/release, occupancy view, fee link to receipts.

## 5) Library Module
Features
- Catalog (books), Issue/Return, Due dates, Fines, Inventory import/export, Student linkage.
Tasks
- [ ] Schemas: Book, Copy/Inventory, Transactions (issue/return), Fines.
- [ ] Endpoints + Librarian UI, overdue cron + notices.

## 6) Cloud Suite Integration (low-cost ERP backbone)
Features
- Google Forms→Webhook to Admissions; periodic export to Google Sheets (single source of truth mirror).
- Google Drive backup of receipts & exports; Gmail for notifications (via API).
Tasks
- [ ] Webhook endpoint to accept Google Form payloads → create Application records.
- [ ] Export jobs (CSV) to GDrive/Sheets for Students/Fees/Hostel/Library.
- [ ] Docs: How to wire Apps Script triggers; environment secrets.

## 7) Role-Based Access Control (RBAC)
Features
- Roles: Admin, Principal(Exec RO), Accountant, HostelWarden, Librarian, Teacher, Student.
- Permission matrix at route and UI level.
Tasks
- [ ] Middleware: RBAC guard by role + permission map.
- [ ] Frontend gating: hide/disable navigation/actions by role.

## 8) Security & Backups
Features
- Nightly Mongo backups to cloud (S3/Drive), PII encryption (email/mobile/address), audit logging, rate-limiting, 2FA (optional).
Tasks
- [ ] Backup scripts + scheduler; restore runbook.
- [ ] Encryption-at-rest for sensitive fields, secrets via env.
- [ ] Audit log middleware (who/when/what), Admin viewer.
- [ ] Rate limit auth and write endpoints; optional TOTP 2FA for Admin.

## 9) Audit & Compliance
Features
- Full CRUD trail across admissions, fees, hostel, library.
Tasks
- [ ] AuditLog model; log on controller layer; UI to search/export logs.

## 10) Data Import/Export Pipelines
Features
- Bulk CSV import (students, subjects, fees, books); scheduled exports to Sheets.
Tasks
- [ ] CSV parsers + mapping UI; validations + dry-run; error report.

## 11) Certificates & Documents
Features
- Generate Bonafide, Admit Card, Fee Receipts with templates.
Tasks
- [ ] Document templates, generation service (PDF), distribution (email/download), sequence numbering.

## 12) Notifications (Email/SMS)
Features
- Triggers: Application submit/approval, Payment success/failure, Hostel allocation, Overdue library items.
Tasks
- [ ] Notification service abstraction (email/SMS providers), templates, opt-out prefs.

## 13) Workflow Approvals
Features
- Fee concession approval, Hostel room change approval, Library membership approval.
Tasks
- [ ] Generic workflow engine (states, approvers), UI inbox for approvers, SLA indicators.

## 14) API/Webhooks
Features
- Public webhook for Google Forms; internal webhooks for Sheet sync; event bus for modules.
Tasks
- [ ] Event emitter for key actions; outgoing webhooks config; retry & DLQ.

## Cross-Cutting Technical Tasks
- [ ] Configurable Terms/Programs/Departments (taxonomy) with mappings.
- [ ] Timezone/locale support; date normalization.
- [ ] Seed scripts and demo data.
- [ ] Documentation: Process maps, data flow diagrams, setup guide, backup/restore.

---
Scope notes
- Keep existing modules; extend with above features.
- Favor pluggable adapters (payments, email/SMS, storage) to stay vendor-neutral.
